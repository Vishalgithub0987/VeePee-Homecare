'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, Shield } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { BUSINESS_CONFIG } from '@/lib/business';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappHref = buildWhatsAppUrl(BUSINESS_CONFIG.defaultConsultationMessage);

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-primary-dark)',
        color: 'var(--color-warm-ivory)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        paddingTop: 'clamp(3rem, 5vw, 4.5rem)',
        paddingBottom: '2.5rem',
        fontSize: '0.92rem',
      }}
    >
      <div className="container">
        {/* Top 4-Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: 'clamp(2rem, 4vw, 3rem)',
            marginBottom: '3rem',
          }}
        >
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  position: 'relative',
                  width: 64,
                  height: 64,
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/images/brand/logo.png"
                  alt={`${BUSINESS_CONFIG.name} Brand Logo`}
                  fill
                  sizes="64px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: 'var(--color-white)',
                  }}
                >
                  {BUSINESS_CONFIG.name}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-soft-mint)', opacity: 0.85 }}>
                  Home Healthcare &amp; Medical Supplies
                </span>
              </div>
            </div>

            <p style={{ color: 'rgba(252, 251, 247, 0.8)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
              Compassionate, clinically responsible home nursing, elderly patient assistance, and medical equipment rentals serving families throughout Vellore and surrounding areas.
            </p>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm"
              style={{
                display: 'inline-flex',
                backgroundColor: 'var(--color-accent-gold)',
                color: 'var(--color-primary-dark)',
                fontWeight: 700,
                border: '1px solid rgba(214, 180, 106, 0.4)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              }}
              aria-label="Direct WhatsApp Consultation with Vee Pee Home Care"
            >
              <WhatsAppIcon size={16} fill="var(--color-primary-dark)" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3
              style={{
                fontSize: '1rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: 'var(--color-white)',
                marginBottom: '1rem',
                letterSpacing: '0.02em',
              }}
            >
              Quick Navigation
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { label: 'Home Overview', href: '#hero' },
                { label: 'About Vee Pee Cares', href: '#about' },
                { label: 'Home Healthcare Services', href: '#services' },
                { label: 'Medical Equipment & Products', href: '#products' },
                { label: 'Flexible Care Packages', href: '#packages' },
                { label: 'Frequently Asked Questions', href: '#faq' },
                { label: 'Contact & Location', href: '#contact' },
              ].map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{
                      color: 'rgba(252, 251, 247, 0.78)',
                      transition: 'color var(--transition-fast)',
                    }}
                    className="footer-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Care Categories */}
          <div>
            <h3
              style={{
                fontSize: '1rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: 'var(--color-white)',
                marginBottom: '1rem',
                letterSpacing: '0.02em',
              }}
            >
              Healthcare Offerings
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                'Home Nursing & Clinical Care',
                'Elderly & Convalescent Support',
                'Post-Discharge Recovery Care',
                'Bedridden Patient Nursing',
                'Oxygen & Respiratory Support',
                'Hospital Bed & Mattress Rental',
                'Home Doctor & Lab Coordination',
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#services"
                    style={{
                      color: 'rgba(252, 251, 247, 0.78)',
                      transition: 'color var(--transition-fast)',
                    }}
                    className="footer-link"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div>
            <h3
              style={{
                fontSize: '1rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: 'var(--color-white)',
                marginBottom: '1rem',
                letterSpacing: '0.02em',
              }}
            >
              Vellore Office
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <MapPin size={18} style={{ color: 'var(--color-accent-gold)', flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                <span style={{ color: 'rgba(252, 251, 247, 0.85)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  {BUSINESS_CONFIG.address}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <a
                  href={`tel:${BUSINESS_CONFIG.rawPhone}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    color: 'var(--color-white)',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                  className="footer-link"
                  aria-label={`Call Vee Pee Home Care at ${BUSINESS_CONFIG.phone}`}
                >
                  <Phone size={18} style={{ color: 'var(--color-accent-gold)', flexShrink: 0 }} aria-hidden="true" />
                  <span>{BUSINESS_CONFIG.phone}</span>
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={18} style={{ color: 'var(--color-accent-gold)', flexShrink: 0 }} aria-hidden="true" />
                <a
                  href={`mailto:${BUSINESS_CONFIG.email}`}
                  style={{ color: 'rgba(252, 251, 247, 0.85)', wordBreak: 'break-all' }}
                  className="footer-link"
                >
                  {BUSINESS_CONFIG.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Responsible Medical Safety Notice */}
        <div
          style={{
            padding: '1.15rem clamp(0.85rem, 3vw, 1.5rem)',
            backgroundColor: 'rgba(0, 0, 0, 0.18)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.85rem',
          }}
        >
          <Shield size={20} style={{ color: 'var(--color-accent-gold)', flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
          <div style={{ fontSize: '0.82rem', color: 'rgba(252, 251, 247, 0.78)', lineHeight: 1.55 }}>
            <strong style={{ color: 'var(--color-white)', display: 'block', marginBottom: '0.2rem' }}>
              Healthcare Service Notice &amp; Emergency Disclaimer:
            </strong>
            Vee Pee Home Care coordinates home nursing, attendant care, and medical equipment supply in Vellore, Tamil Nadu. Information on this website is for informational enquiry purposes only and does not replace professional hospital treatment, physician consultation, or clinical diagnosis. Clinical procedures require valid registered medical prescriptions. In the event of an acute medical emergency, immediately contact your local emergency hospital hotline or ambulance services (Dial 108).
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            fontSize: '0.82rem',
            color: 'rgba(252, 251, 247, 0.65)',
          }}
        >
          <div>
            &copy; {currentYear} {BUSINESS_CONFIG.name}. All rights reserved. Serving Vellore and surrounding locations.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem 0.85rem' }}>
            <span>Privacy-conscious enquiry</span>
            <span>•</span>
            <span>No clinical data stored</span>
            <span>•</span>
            <span>Direct WhatsApp support</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .footer-link:hover {
          color: var(--color-accent-gold) !important;
        }
      `}</style>
    </footer>
  );
}
