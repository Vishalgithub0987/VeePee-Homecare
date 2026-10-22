'use client';

import React from 'react';
import { Stethoscope, ShoppingBag } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { BUSINESS_CONFIG } from '@/lib/business';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { useCart } from '@/components/cart/CartProvider';

export function MobileActionBar() {
  const { totalCount, openCart } = useCart();
  const whatsappHref = buildWhatsAppUrl(BUSINESS_CONFIG.defaultConsultationMessage);

  return (
    <nav
      className="mobile-bottom-bar safe-bottom-pad"
      aria-label="Mobile Quick Actions"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid var(--color-border)',
        boxShadow: '0 -2px 12px rgba(18, 55, 52, 0.06)',
        zIndex: 'calc(var(--z-sticky) - 1)',
        padding: '0.4rem 1rem',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '0.5rem',
          maxWidth: '420px',
          margin: '0 auto',
        }}
      >
        {/* WhatsApp Direct */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm"
          style={{
            padding: '0.35rem 0.5rem',
            fontSize: '0.78rem',
            borderRadius: 'var(--radius-sm)',
            minHeight: '38px',
            flexDirection: 'column',
            gap: '2px',
          }}
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon size={15} fill="var(--color-accent-gold)" />
          <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>WhatsApp</span>
        </a>

        {/* Browse Services */}
        <a
          href="#services"
          className="btn btn-secondary btn-sm"
          style={{
            padding: '0.35rem 0.5rem',
            fontSize: '0.78rem',
            borderRadius: 'var(--radius-sm)',
            minHeight: '38px',
            flexDirection: 'column',
            gap: '1px',
          }}
          aria-label="Browse all 15 home care services"
        >
          <Stethoscope size={15} aria-hidden="true" />
          <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>Services</span>
        </a>

        {/* Cart Drawer Trigger */}
        <button
          type="button"
          onClick={openCart}
          className="btn btn-outline btn-sm"
          style={{
            padding: '0.35rem 0.5rem',
            fontSize: '0.78rem',
            borderRadius: 'var(--radius-sm)',
            minHeight: '38px',
            flexDirection: 'column',
            gap: '1px',
            position: 'relative',
          }}
          aria-label={`Open Cart, ${totalCount} items`}
        >
          <div style={{ position: 'relative' }}>
            <ShoppingBag size={15} aria-hidden="true" />
            {totalCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: -5,
                  right: -9,
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-white)',
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  minWidth: 15,
                  height: 15,
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 2px',
                }}
              >
                {totalCount}
              </span>
            )}
          </div>
          <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>Cart</span>
        </button>
      </div>

      <style jsx global>{`
        @media (min-width: 992px) {
          .mobile-bottom-bar {
            display: none !important;
          }
        }
        @media (max-width: 991px) {
          body {
            padding-bottom: 66px !important;
          }
        }
      `}</style>
    </nav>
  );
}
