'use client';

import React from 'react';
import { Phone, MapPin } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/business';

export function AnnouncementBar() {
  return (
    <aside
      aria-label="Service announcement"
      className="announcement-bar"
      style={{
        backgroundColor: 'var(--color-primary-dark)',
        color: 'var(--color-warm-ivory)',
        fontSize: '0.8rem',
        padding: '0.35rem 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        zIndex: 'calc(var(--z-sticky) + 1)',
        minHeight: '34px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          width: '100%',
        }}
      >
        {/* Desktop / Tablet message */}
        <div className="announcement-desktop-msg" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 500 }}>
          <MapPin size={13} style={{ color: 'var(--color-accent-gold)', flexShrink: 0 }} aria-hidden="true" />
          <span>Compassionate Home Healthcare & Medical Equipment Support in Vellore</span>
        </div>

        {/* Mobile compact location note */}
        <div className="announcement-mobile-msg" style={{ display: 'none', alignItems: 'center', gap: '0.35rem', fontWeight: 600, fontSize: '0.75rem' }}>
          <MapPin size={12} style={{ color: 'var(--color-accent-gold)', flexShrink: 0 }} aria-hidden="true" />
          <span style={{ color: 'var(--color-soft-mint)' }}>Serving Vellore & Nearby</span>
        </div>

        {/* Contact info: Phone call link & location pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.78rem', flexShrink: 0 }}>
          <a
            href={`tel:${BUSINESS_CONFIG.rawPhone}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: 'var(--color-warm-ivory)',
              fontWeight: 700,
              fontSize: '0.78rem',
              transition: 'color var(--transition-fast)',
              whiteSpace: 'nowrap',
            }}
            aria-label={`Call Vee Pee Home Care at ${BUSINESS_CONFIG.phone}`}
          >
            <Phone size={12} style={{ color: 'var(--color-accent-gold)', flexShrink: 0 }} aria-hidden="true" />
            <span>{BUSINESS_CONFIG.phone}</span>
          </a>

          <span className="announcement-location-desktop" style={{ opacity: 0.3 }} aria-hidden="true">|</span>

          <span className="announcement-location-desktop" style={{ color: 'var(--color-soft-mint)', fontWeight: 500, whiteSpace: 'nowrap' }}>
            Serving Vellore & Surrounding Areas
          </span>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .announcement-desktop-msg {
            display: none !important;
          }
          .announcement-mobile-msg {
            display: flex !important;
          }
          .announcement-location-desktop {
            display: none !important;
          }
        }
        @media (max-width: 360px) {
          .announcement-mobile-msg span {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </aside>
  );
}
