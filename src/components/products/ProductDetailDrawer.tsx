'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { useCart } from '@/components/cart/CartProvider';
import { buildWhatsAppUrl, buildSingleProductEnquiryMessage } from '@/lib/whatsapp';

export function ProductDetailDrawer() {
  const { activeProduct, closeProductModal, addItem, openProductEnquiry } = useCart();
  const [selectedMode, setSelectedMode] = useState<'purchase' | 'rental'>('purchase');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    if (activeProduct) {
      if (activeProduct.purchaseOrRental === 'rental') {
        setSelectedMode('rental');
      } else {
        setSelectedMode('purchase');
      }
      setQuantity(1);
      setAddedToast(false);
    }
  }, [activeProduct]);

  if (!activeProduct) return null;

  const handleAddToCart = () => {
    addItem(activeProduct, selectedMode, quantity, false);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      closeProductModal();
    }, 600);
  };

  const handleDirectWhatsApp = () => {
    openProductEnquiry({
      product: activeProduct,
      mode: selectedMode,
      quantity,
    });
  };

  return (
    <>
      <div
        className="overlay is-active"
        onClick={closeProductModal}
        onTouchMove={(e) => e.preventDefault()}
        aria-hidden="true"
      />

      <div
        className="drawer is-open"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-detail-title"
        style={{
          width: 'min(94vw, 460px)',
          maxWidth: '100vw',
        }}
      >
        {/* Header */}
        <div className="drawer-header" style={{ padding: '1.15rem 1.25rem' }}>
          <span className="badge badge-mint">{activeProduct.category}</span>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={closeProductModal}
            aria-label="Close Product Details"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="drawer-body" style={{ padding: '1.25rem' }}>
          {/* Main Visual */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 220,
              backgroundColor: 'var(--color-white)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              overflow: 'hidden',
              marginBottom: '1rem',
            }}
          >
            <Image
              src={activeProduct.image}
              alt={activeProduct.name}
              fill
              sizes="(max-width: 480px) 100vw, 460px"
              style={{ objectFit: 'contain', padding: '0.75rem' }}
            />
          </div>

          <h2 id="product-detail-title" style={{ fontSize: '1.25rem', marginBottom: '0.35rem', lineHeight: 1.25 }}>
            {activeProduct.name}
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.15rem',
                fontWeight: 800,
                color: 'var(--color-primary)',
              }}
            >
              {activeProduct.optionalPrice !== null
                ? `₹${activeProduct.optionalPrice.toLocaleString('en-IN')}`
                : 'Price on request'}
            </span>
            <span className="badge badge-gold">{activeProduct.availabilityLabel}</span>
          </div>

          <p style={{ fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem' }}>
            {activeProduct.detailedDescription || activeProduct.shortDescription}
          </p>

          {/* Mode Selector (Purchase vs Rental) */}
          {activeProduct.purchaseOrRental === 'both' && (
            <div style={{ marginBottom: '1rem' }}>
              <label className="form-label" style={{ fontSize: '0.84rem' }}>Select Option:</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setSelectedMode('purchase')}
                  className={`btn ${selectedMode === 'purchase' ? 'btn-primary' : 'btn-outline'}`}
                  style={{ minHeight: '38px', fontSize: '0.82rem' }}
                >
                  Direct Purchase
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMode('rental')}
                  className={`btn ${selectedMode === 'rental' ? 'btn-primary' : 'btn-outline'}`}
                  style={{ minHeight: '38px', fontSize: '0.82rem' }}
                >
                  Equipment Rental
                </button>
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="form-label" style={{ fontSize: '0.84rem' }}>Quantity:</label>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: 'var(--color-warm-ivory)',
                border: '1.5px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '0.25rem 0.55rem',
              }}
            >
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: 28,
                  height: 28,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-text-main)',
                  borderRadius: 'var(--radius-sm)',
                }}
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span
                style={{
                  minWidth: '32px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: 'var(--color-text-main)',
                }}
              >
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: 28,
                  height: 28,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-text-main)',
                  borderRadius: 'var(--radius-sm)',
                }}
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Safe Vellore Delivery Notice */}
          <div
            style={{
              padding: '0.75rem 0.85rem',
              backgroundColor: 'var(--color-soft-mint)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(20, 92, 89, 0.14)',
              fontSize: '0.8rem',
              color: 'var(--color-primary-dark)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
            }}
          >
            <Sparkles size={15} style={{ color: 'var(--color-accent-gold)', flexShrink: 0 }} />
            <span>Doorstep delivery, setup, and equipment guidance available across Vellore.</span>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="drawer-footer" style={{ padding: '1.15rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
          <button
            type="button"
            onClick={handleAddToCart}
            className="btn btn-primary btn-full"
            style={{ minHeight: '44px' }}
          >
            {addedToast ? (
              <>
                <Check size={16} />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                <span>Add to Cart ({quantity})</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDirectWhatsApp}
            className="btn btn-secondary btn-full"
            style={{ minHeight: '44px' }}
          >
            <WhatsAppIcon size={16} fill="var(--color-primary)" />
            <span>Direct WhatsApp Enquiry</span>
          </button>
        </div>
      </div>
    </>
  );
}
