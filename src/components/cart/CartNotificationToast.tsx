'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, ShoppingBag, X, ArrowRight } from 'lucide-react';
import { useCart } from './CartProvider';

export function CartNotificationToast() {
  const { cartToast, clearCartToast, openCart, totalCount, isCartOpen } = useCart();
  const [isRecent, setIsRecent] = useState(false);

  // When a new product is added, show the expanded confirmation banner for 4 seconds
  useEffect(() => {
    if (cartToast) {
      setIsRecent(true);
      const timer = setTimeout(() => {
        setIsRecent(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [cartToast]);

  // If cart is empty or the cart drawer is currently open, do not render
  if (totalCount === 0 || isCartOpen) {
    return null;
  }

  // State A: Expanded banner right after an item is added
  if (isRecent && cartToast) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="floating-cart-container cart-toast-expanded"
        style={{
          position: 'fixed',
          zIndex: 250,
          backgroundColor: '#145C59',
          color: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 8px 24px rgba(20, 92, 89, 0.32), 0 2px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          padding: '0.65rem 0.95rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.85rem',
          animation: 'toastSlideIn 240ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 0 }}>
          <CheckCircle2 size={18} style={{ color: '#4ADE80', flexShrink: 0 }} aria-hidden="true" />
          <div style={{ minWidth: 0 }}>
            <p
              style={{
                fontSize: '0.82rem',
                fontWeight: 700,
                lineHeight: 1.2,
                color: '#FFFFFF',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '190px',
              }}
            >
              Added to Cart
            </p>
            <p
              style={{
                fontSize: '0.74rem',
                color: 'rgba(255, 255, 255, 0.85)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '190px',
              }}
            >
              {cartToast.name}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
          <button
            type="button"
            onClick={openCart}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.4rem 0.8rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#FFFFFF',
              color: '#145C59',
              fontSize: '0.8rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
              transition: 'transform var(--transition-fast)',
            }}
          >
            <ShoppingBag size={14} aria-hidden="true" />
            <span>View Cart ({totalCount})</span>
            <ArrowRight size={13} style={{ color: 'var(--color-primary)' }} />
          </button>

          <button
            type="button"
            onClick={() => setIsRecent(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.75)',
              cursor: 'pointer',
              padding: '0.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius-full)',
            }}
            aria-label="Minimize notification"
            title="Minimize"
          >
            <X size={15} aria-hidden="true" />
          </button>
        </div>

        <style jsx>{`
          .floating-cart-container {
            bottom: 24px;
            right: 96px;
            max-width: 440px;
          }

          @keyframes toastSlideIn {
            from {
              opacity: 0;
              transform: translateY(14px) scale(0.96);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @media (max-width: 768px) {
            .floating-cart-container {
              bottom: calc(var(--mobile-bar-height) + 12px);
              left: 12px;
              right: 12px;
              max-width: none;
            }
          }
        `}</style>
      </div>
    );
  }

  // State B: Persistent floating "View Cart" button that stays visible at all times
  return (
    <div
      className="floating-cart-container cart-persistent-dock"
      style={{
        position: 'fixed',
        zIndex: 250,
        animation: 'dockFadeIn 220ms ease-out',
      }}
    >
      <button
        type="button"
        onClick={openCart}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.65rem',
          padding: '0.6rem 1.15rem',
          borderRadius: 'var(--radius-full)',
          backgroundColor: '#145C59',
          color: '#FFFFFF',
          fontSize: '0.86rem',
          fontWeight: 700,
          border: '1.5px solid rgba(255, 255, 255, 0.35)',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          boxShadow: '0 6px 20px rgba(20, 92, 89, 0.32), 0 2px 6px rgba(0, 0, 0, 0.1)',
          transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
        }}
        aria-label={`Open Cart with ${totalCount} items`}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <ShoppingBag size={18} style={{ color: 'var(--color-accent-gold)' }} aria-hidden="true" />
          <span
            style={{
              position: 'absolute',
              top: -6,
              right: -8,
              backgroundColor: '#DC2626',
              color: '#FFFFFF',
              fontSize: '0.68rem',
              fontWeight: 800,
              minWidth: '17px',
              height: '17px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 3px',
              border: '1.5px solid #145C59',
            }}
          >
            {totalCount}
          </span>
        </div>

        <span style={{ marginLeft: '4px', letterSpacing: '-0.01em' }}>View Cart</span>
        <ArrowRight size={14} style={{ color: 'var(--color-accent-gold)' }} aria-hidden="true" />
      </button>

      <style jsx>{`
        .floating-cart-container {
          bottom: 24px;
          right: 96px;
        }

        .cart-persistent-dock button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(20, 92, 89, 0.42), 0 4px 10px rgba(0, 0, 0, 0.15) !important;
        }

        @keyframes dockFadeIn {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 768px) {
          .floating-cart-container {
            bottom: calc(var(--mobile-bar-height) + 12px);
            right: 14px;
          }
        }
      `}</style>
    </div>
  );
}
