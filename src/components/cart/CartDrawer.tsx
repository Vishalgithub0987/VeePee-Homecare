'use client';

import React from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, AlertCircle } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { useCart } from './CartProvider';

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    totalCount,
    totalPricedAmount,
    hasUnpricedItems,
    openProductEnquiry,
  } = useCart();

  const handleProceedToCheckout = () => {
    openProductEnquiry();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`overlay ${isCartOpen ? 'is-active' : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Cart Drawer */}
      <div
        className={`drawer ${isCartOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Medical Products Cart"
        style={{
          width: 'min(94vw, 450px)',
          maxWidth: '100vw',
        }}
      >
        {/* Header */}
        <div className="drawer-header" style={{ padding: '1.15rem 1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-soft-mint)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShoppingBag size={18} aria-hidden="true" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', lineHeight: 1.2 }}>Your Cart</h2>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                {totalCount} {totalCount === 1 ? 'item' : 'items'} selected
              </span>
            </div>
          </div>

          <button
            type="button"
            className="drawer-close-btn"
            onClick={closeCart}
            aria-label="Close Cart"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="drawer-body" style={{ padding: '1.25rem' }}>
          {items.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '2.5rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.85rem',
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-soft-mint)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShoppingBag size={30} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 style={{ fontSize: '1.15rem' }}>Your Cart is Empty</h3>
              <p style={{ fontSize: '0.88rem', maxWidth: '280px' }}>
                Browse our 19 medical product groups including oxygen concentrators, hospital beds, and hygiene supplies.
              </p>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => {
                  closeCart();
                  const el = document.querySelector('#products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Browse Medical Products
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {items.map(item => {
                  const modeLabel = item.purchaseOrRental === 'rental' ? 'Rental Request' : 'Purchase';
                  return (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem',
                        backgroundColor: 'var(--color-warm-ivory)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      {/* Product Thumbnail */}
                      <div
                        style={{
                          position: 'relative',
                          width: 52,
                          height: 52,
                          borderRadius: 'var(--radius-sm)',
                          overflow: 'hidden',
                          backgroundColor: 'var(--color-white)',
                          border: '1px solid var(--color-border)',
                          flexShrink: 0,
                        }}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="52px"
                          style={{ objectFit: 'contain', padding: '3px' }}
                        />
                      </div>

                      {/* Info & Quantity */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-heading)',
                              fontWeight: 700,
                              fontSize: '0.86rem',
                              color: 'var(--color-text-main)',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {item.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            style={{
                              color: 'var(--color-text-muted)',
                              padding: '2px',
                              borderRadius: 'var(--radius-sm)',
                              transition: 'color var(--transition-fast)',
                            }}
                            title="Remove item"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginTop: '0.2rem' }}>
                          <span className={`badge ${item.purchaseOrRental === 'rental' ? 'badge-gold' : 'badge-mint'}`}>
                            {modeLabel}
                          </span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                            {item.price !== null ? `₹${(item.price * item.quantity).toLocaleString('en-IN')}` : 'Price on request'}
                          </span>
                        </div>

                        {/* Quantity Counter */}
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            marginTop: '0.45rem',
                            backgroundColor: 'var(--color-white)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '2px 4px',
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            style={{
                              width: 22,
                              height: 22,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--color-text-secondary)',
                            }}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span
                            style={{
                              minWidth: '20px',
                              textAlign: 'center',
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              color: 'var(--color-text-main)',
                            }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            style={{
                              width: 22,
                              height: 22,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--color-text-secondary)',
                            }}
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Clear Cart Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={clearCart}
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--color-text-muted)',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  Clear all items
                </button>
              </div>

              {/* Pricing Notice */}
              <div
                style={{
                  padding: '0.75rem 0.85rem',
                  backgroundColor: 'var(--color-soft-mint)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(20, 92, 89, 0.14)',
                  fontSize: '0.8rem',
                  color: 'var(--color-primary-dark)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.45rem',
                }}
              >
                <AlertCircle size={15} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: 2 }} />
                <span>
                  {hasUnpricedItems
                    ? 'Actual product rates, rental security deposit, and Vellore delivery charges will be confirmed by Vee Pee Home Care via WhatsApp.'
                    : 'Subtotals shown are estimated. Final terms and availability will be confirmed by Vee Pee Home Care.'}
                </span>
              </div>

              {/* Delivery and Consultation Notice */}
              <div
                style={{
                  padding: '0.75rem 0.85rem',
                  backgroundColor: 'var(--color-warm-ivory)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.8rem',
                  color: 'var(--color-text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  lineHeight: 1.45,
                }}
              >
                <ShoppingBag size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span>Doorstep delivery, setup, and equipment guidance available across all areas of Vellore.</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="drawer-footer" style={{ padding: '1.15rem 1.25rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.85rem',
              }}
            >
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                Estimated Total:
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: 'var(--color-primary)',
                }}
              >
                {totalPricedAmount > 0 ? `₹${totalPricedAmount.toLocaleString('en-IN')}` : 'Price on request'}
              </span>
            </div>

            <button
              type="button"
              onClick={handleProceedToCheckout}
              className="btn btn-primary btn-full btn-lg"
              aria-label="Proceed to Order Details and WhatsApp Enquiry"
            >
              <WhatsAppIcon size={18} fill="var(--color-accent-gold)" />
              <span>Proceed to Order Details</span>
              <ArrowRight size={17} aria-hidden="true" />
            </button>

            <span
              style={{
                display: 'block',
                textAlign: 'center',
                fontSize: '0.74rem',
                color: 'var(--color-text-muted)',
                marginTop: '0.55rem',
              }}
            >
              Enter delivery location &amp; contact info before sending on WhatsApp.
            </span>
          </div>
        )}
      </div>
    </>
  );
}
