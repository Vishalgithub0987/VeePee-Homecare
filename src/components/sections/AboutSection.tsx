'use client';

import React from 'react';
import Image from 'next/image';
import { HeartHandshake, Home, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { BUSINESS_CONFIG } from '@/lib/business';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export function AboutSection() {
  const whatsappHref = buildWhatsAppUrl(BUSINESS_CONFIG.defaultConsultationMessage);

  return (
    <section
      id="about"
      aria-label="About Vee Pee Home Care"
      className="section"
      style={{
        backgroundColor: 'var(--color-warm-ivory)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Visual Highlight Card with Caregiver Image */}
          <div>
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-md)',
                overflow: 'hidden',
                backgroundColor: 'var(--color-primary-dark)',
                color: 'var(--color-white)',
                minHeight: 'clamp(460px, 70vh, 560px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                border: '1px solid rgba(20, 92, 89, 0.25)',
              }}
            >
              {/* Full-bleed Caregiver Image — Clearly visible in desktop view */}
              <Image
                src="/images/hero/hero-caregiver.jpg"
                alt="Compassionate nurse checking vitals on an elderly patient at home in Vellore"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center 15%',
                  zIndex: 0,
                }}
                priority
              />

              {/* Gradient Overlay: Transparent at top so the nurse & patient image is clearly visible, smooth gradient toward the bottom content & grid */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 1,
                  background:
                    'linear-gradient(to bottom, rgba(10, 46, 44, 0.05) 0%, rgba(10, 46, 44, 0.22) 28%, rgba(10, 46, 44, 0.68) 54%, rgba(10, 46, 44, 0.92) 76%, rgba(10, 46, 44, 0.98) 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Card Body */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                  paddingTop: 'clamp(8rem, 16vw, 12rem)',
                }}
              >
                {/* Subtle Background Ornament */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-30px',
                    right: '-30px',
                    width: '160px',
                    height: '160px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    pointerEvents: 'none',
                  }}
                />

                <span
                  style={{
                    display: 'inline-block',
                    color: 'var(--color-accent-gold)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.85rem',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)',
                  }}
                >
                  Our Care Philosophy
                </span>

                <h3
                  style={{
                    color: 'var(--color-white)',
                    fontSize: 'clamp(1.3rem, 1.7vw, 1.65rem)',
                    lineHeight: 1.25,
                    marginBottom: '1rem',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.65)',
                  }}
                >
                  Supporting Healing with Compassion, Respect, and Familiar Comfort
                </h3>

                <p
                  style={{
                    color: 'rgba(252, 251, 247, 0.92)',
                    fontSize: '0.94rem',
                    lineHeight: 1.65,
                    marginBottom: '1.75rem',
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.6)',
                  }}
                >
                  We believe that home is where patients feel most at ease. By bringing quality bedside nursing, attentive elderly care, and essential recovery equipment straight to your doorstep, Vee Pee Home Care helps families in Vellore navigate health challenges with dignity and reassurance.
                </p>

                {/* 2-column feature grid at the bottom with transparent glassmorphic backdrop */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 130px), 1fr))',
                    gap: '0.85rem',
                    padding: '1.15rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(10, 46, 44, 0.55)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.25rem' }}>
                      <Home size={16} style={{ color: 'var(--color-accent-gold)' }} />
                      <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Familiar Home</span>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'rgba(252, 251, 247, 0.85)' }}>
                      Healing alongside loved ones
                    </span>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.25rem' }}>
                      <HeartHandshake size={16} style={{ color: 'var(--color-accent-gold)' }} />
                      <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Patient Dignity</span>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'rgba(252, 251, 247, 0.85)' }}>
                      Respectful personal hygiene
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div>
            <span className="section-eyebrow">About Vee Pee Home Care</span>
            <h2 className="section-title">
              Bridging Clinical Needs with Everyday Home Support
            </h2>

            <p style={{ marginBottom: '1rem', lineHeight: 1.68 }}>
              Home healthcare plays a vital role when an individual transitions from hospital to home, manages chronic illness, or requires attentive assistance in their senior years. At Vee Pee Home Care, our primary objective is to make exploring professional home care services and acquiring necessary medical equipment convenient and transparent for families in Vellore.
            </p>

            <p style={{ marginBottom: '1rem', lineHeight: 1.68 }}>
              Rather than navigating complex hospital systems for routine care, our coordinated home nursing, elderly attendant support, and medical equipment rentals allow patients to recuperate in an environment where they feel comfortable and safe. We assist with everything from vital signs monitoring and wound dressings to bedridden patient turning and hospital bed installations.
            </p>

            <p style={{ marginBottom: '1.75rem', lineHeight: 1.68 }}>
              We understand that choosing care for a family member is a deeply personal decision. That is why our enquiry process is structured to be simple and conversational. Reach out via WhatsApp or phone, share your patient’s requirements, and our coordination team will help you determine the appropriate care schedule or equipment solution.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', alignItems: 'center' }}>
              <a href="#services" className="btn btn-primary btn-sm" aria-label="Explore our 15 healthcare services">
                <span>View All Services</span>
                <ArrowRight size={15} aria-hidden="true" />
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
                aria-label="Speak with a care coordinator on WhatsApp"
              >
                <WhatsAppIcon size={16} fill="var(--color-primary)" />
                <span>Talk to Care Coordinator</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
