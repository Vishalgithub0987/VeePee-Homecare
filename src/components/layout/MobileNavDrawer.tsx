'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { BUSINESS_CONFIG } from '@/lib/business';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

export function MobileNavDrawer({ isOpen, onClose, links }: MobileNavDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add('scroll-locked');
      document.body.classList.add('scroll-locked');
      closeButtonRef.current?.focus();

      return () => {
        document.documentElement.classList.remove('scroll-locked');
        document.body.classList.remove('scroll-locked');
      };
    }
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    onClose();
    if (href === '#hero' || href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  };

  const whatsappHref = buildWhatsAppUrl(BUSINESS_CONFIG.defaultConsultationMessage);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`overlay ${isOpen ? 'is-active' : ''}`}
        onClick={onClose}
        onTouchMove={(e) => e.preventDefault()}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className={`drawer ${isOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        style={{
          width: '84%',
          maxWidth: '350px',
        }}
      >
        {/* Header */}
        <div className="drawer-header" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                position: 'relative',
                width: 50,
                height: 50,
                flexShrink: 0,
              }}
            >
              <Image
                src="/images/brand/logo.png"
                alt={BUSINESS_CONFIG.name}
                fill
                sizes="50px"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                  lineHeight: 1.15,
                }}
              >
                Vee Pee Home Care
              </span>
              <span style={{ fontSize: '0.68rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                Vellore, Tamil Nadu
              </span>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close Mobile Navigation"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Links Body */}
        <div className="drawer-body" style={{ padding: '0.75rem 0' }}>
          <nav aria-label="Mobile Nav Links">
            <ul style={{ listStyle: 'none' }}>
              {links.map(link => (
                <li key={link.href} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                  <button
                    type="button"
                    onClick={() => handleLinkClick(link.href)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem 1.25rem',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'var(--color-text-main)',
                      textAlign: 'left',
                      transition: 'background-color var(--transition-fast)',
                    }}
                  >
                    <span>{link.label}</span>
                    <ChevronRight size={16} style={{ color: 'var(--color-text-muted)' }} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick Contact Box */}
          <div
            style={{
              margin: '1.25rem 1rem 0',
              padding: '1rem',
              backgroundColor: 'var(--color-warm-ivory)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              fontSize: '0.84rem',
            }}
          >
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: 'var(--color-primary)',
                marginBottom: '0.65rem',
              }}
            >
              Direct Contact
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              <a
                href={`tel:${BUSINESS_CONFIG.rawPhone}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: 'var(--color-text-main)',
                  fontWeight: 600,
                }}
              >
                <Phone size={14} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
                <span>{BUSINESS_CONFIG.phone}</span>
              </a>

              <a
                href={`mailto:${BUSINESS_CONFIG.email}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: 'var(--color-text-secondary)',
                  wordBreak: 'break-all',
                  fontSize: '0.8rem',
                }}
              >
                <Mail size={14} style={{ color: 'var(--color-primary)', flexShrink: 0 }} aria-hidden="true" />
                <span>{BUSINESS_CONFIG.email}</span>
              </a>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.45rem',
                  color: 'var(--color-text-secondary)',
                  fontSize: '0.78rem',
                  lineHeight: 1.4,
                }}
              >
                <MapPin size={14} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                <span>101/A, Perumal Kovil St, Melkavanur, Vellore</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer WhatsApp Button */}
        <div className="drawer-footer" style={{ padding: '1rem 1.25rem' }}>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-full"
            onClick={onClose}
            aria-label="Enquire with Vee Pee Home Care on WhatsApp"
          >
            <WhatsAppIcon size={16} fill="var(--color-accent-gold)" />
            <span>Enquire on WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
}
