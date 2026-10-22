'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Heart, Stethoscope } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { BUSINESS_CONFIG } from '@/lib/business';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export function HeroSection() {
  const whatsappHref = buildWhatsAppUrl(BUSINESS_CONFIG.defaultConsultationMessage);

  return (
    <section
      id="hero"
      aria-label="Welcome to Vee Pee Home Care"
      className="hero-section"
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#0a2e2b',
      }}
    >
      {/* Full-width, full-bleed cinematic video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero/hero-caregiver.jpg"
        className="hero-video-bg"
        aria-label="Vee Pee Home Care nurse assisting elderly patient"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      >
        <source src="/videos/hero-care.mp4" type="video/mp4" />
        <source src="/images/hero/hero-video.mp4" type="video/mp4" />
        {/* Fallback image if video cannot be loaded */}
        <img
          src="/images/hero/hero-caregiver.jpg"
          alt="Compassionate nurse checking vitals on an elderly patient at home in Vellore"
          loading="lazy"
          decoding="async"
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            inset: 0,
            objectFit: 'cover',
            color: 'transparent',
          }}
        />
      </video>

      {/* Dark teal gradient overlay: stronger on left, transparent toward right */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Hero Content */}
      <div className="container hero-content-container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div className="hero-text-wrapper" style={{ maxWidth: '680px' }}>
          {/* Quality Care Pill Badge */}
          <div
            className="hero-pill-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.9rem',
              backgroundColor: 'var(--color-white)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--color-primary)',
              fontSize: '0.82rem',
              fontWeight: 700,
              marginBottom: '1.25rem',
              border: '1px solid rgba(255, 255, 255, 0.95)',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Heart size={14} style={{ color: 'var(--color-primary)', flexShrink: 0 }} aria-hidden="true" />
            <span>Quality Care at Your Home</span>
          </div>

          {/* Headline */}
          <h1
            className="hero-heading"
            style={{
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: '1.15rem',
              letterSpacing: '-0.025em',
              fontWeight: 800,
              textShadow: '0 2px 16px rgba(0, 0, 0, 0.35)',
            }}
          >
            Trusted Care. <br />
            <span style={{ color: 'var(--color-accent-gold)' }}>Comfort</span> of Home.
          </h1>

          {/* Supporting Copy */}
          <p
            className="hero-description"
            style={{
              color: 'rgba(255, 255, 255, 0.92)',
              lineHeight: 1.68,
              marginBottom: '2rem',
              maxWidth: '620px',
              textShadow: '0 1px 6px rgba(0, 0, 0, 0.35)',
            }}
          >
            Personalised home nursing, compassionate patient care, and essential medical equipment to support recovery, comfort, and everyday wellbeing across Vellore.
          </p>

          {/* Primary Action Buttons */}
          <div className="hero-cta-group">
            <a
              href="#services"
              className="btn btn-primary btn-lg hero-cta-btn"
              style={{
                minHeight: '48px',
                padding: '0.75rem 1.65rem',
                fontSize: '0.96rem',
                boxShadow: '0 4px 18px rgba(0, 0, 0, 0.3)',
              }}
              aria-label="Explore home healthcare services"
            >
              <span>Explore Our Services</span>
              <ArrowRight size={17} aria-hidden="true" />
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg hero-cta-btn hero-whatsapp-btn"
              style={{
                minHeight: '48px',
                padding: '0.75rem 1.65rem',
                fontSize: '0.96rem',
                backgroundColor: 'rgba(255, 255, 255, 0.96)',
                color: 'var(--color-primary-dark)',
                border: '1.5px solid rgba(255, 255, 255, 0.95)',
                boxShadow: '0 4px 18px rgba(0, 0, 0, 0.25)',
              }}
              aria-label="Enquire with Vee Pee Home Care on WhatsApp"
            >
              <WhatsAppIcon size={18} fill="#25D366" />
              <span>Enquire on WhatsApp</span>
            </a>
          </div>

          {/* 3 Benefit Points */}
          <div className="hero-benefits-grid">
            <div className="hero-benefit-item">
              <div
                className="hero-benefit-icon"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(8px)',
                  color: 'var(--color-accent-gold-light)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Heart size={17} aria-hidden="true" />
              </div>
              <div className="hero-benefit-text">
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.15rem' }}>
                  Compassionate Care
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.82)', lineHeight: 1.42 }}>
                  Dignity &amp; attentive daily bedside support
                </p>
              </div>
            </div>

            <div className="hero-benefit-item">
              <div
                className="hero-benefit-icon"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(8px)',
                  color: 'var(--color-accent-gold-light)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ShieldCheck size={17} aria-hidden="true" />
              </div>
              <div className="hero-benefit-text">
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.15rem' }}>
                  Personalised Plans
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.82)', lineHeight: 1.42 }}>
                  From 2-hour visits to 24-hour shifts
                </p>
              </div>
            </div>

            <div className="hero-benefit-item">
              <div
                className="hero-benefit-icon"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(8px)',
                  color: 'var(--color-accent-gold-light)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Stethoscope size={17} aria-hidden="true" />
              </div>
              <div className="hero-benefit-text">
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.15rem' }}>
                  Equipment Rental
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.82)', lineHeight: 1.42 }}>
                  Hospital beds, oxygen &amp; mobility aids
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          min-height: clamp(560px, 80vh, 760px);
          padding-top: clamp(3.5rem, 6vw, 5.5rem);
          padding-bottom: clamp(3.5rem, 6vw, 5.5rem);
        }

        .hero-heading {
          font-size: clamp(2.1rem, 4.5vw, 3.65rem);
        }

        .hero-description {
          font-size: clamp(0.96rem, 1vw + 0.5rem, 1.15rem);
        }

        .hero-cta-group {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
          align-items: center;
          margin-bottom: 2.5rem;
        }

        .hero-benefits-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.25rem;
          padding-top: 1.65rem;
          border-top: 1px solid rgba(255, 255, 255, 0.22);
        }

        .hero-benefit-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
        }

        .hero-video-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 70% 20%;
          display: block;
          z-index: 0;
        }

        @media (min-width: 992px) {
          .hero-video-bg {
            object-position: 72% 20%;
          }
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(
              90deg,
              rgba(10, 46, 44, 0.95) 0%,
              rgba(10, 46, 44, 0.88) 42%,
              rgba(10, 46, 44, 0.60) 68%,
              rgba(10, 46, 44, 0.20) 100%
            ),
            linear-gradient(
              180deg,
              rgba(10, 46, 44, 0.45) 0%,
              transparent 25%,
              transparent 75%,
              rgba(10, 46, 44, 0.65) 100%
            );
        }

        /* Seamless adaptation preserving exact desktop layout across tablets and mobiles */
        @media (max-width: 991px) and (min-width: 641px) {
          .hero-video-bg {
            object-position: 65% 20%;
          }
          .hero-benefits-grid {
            gap: 0.85rem;
          }
        }

        @media (max-width: 640px) {
          .hero-section {
            min-height: clamp(540px, 80vh, 720px);
            padding-top: clamp(3rem, 6vw, 4.5rem);
            padding-bottom: clamp(3rem, 6vw, 4.5rem);
          }
          .hero-heading {
            font-size: clamp(2rem, 7.5vw, 2.75rem);
            margin-bottom: 1.15rem;
          }
          .hero-description {
            font-size: clamp(0.92rem, 2.8vw, 1.05rem);
            line-height: 1.65;
            margin-bottom: 2rem;
          }
          .hero-cta-group {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            align-items: center;
            margin-bottom: 2.25rem;
          }
          .hero-cta-btn {
            min-height: 46px;
            padding: 0.72rem 1.35rem !important;
            font-size: 0.92rem !important;
          }
          .hero-benefits-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: clamp(0.45rem, 1.8vw, 0.85rem);
            padding-top: 1.4rem;
            border-top: 1px solid rgba(255, 255, 255, 0.22);
          }
          .hero-benefit-item {
            gap: 0.45rem;
          }
          .hero-benefit-item h4 {
            font-size: clamp(0.78rem, 2.2vw, 0.88rem) !important;
            line-height: 1.25 !important;
          }
          .hero-benefit-item p {
            font-size: clamp(0.68rem, 1.9vw, 0.76rem) !important;
            line-height: 1.35 !important;
          }
          .hero-video-bg {
            object-position: 65% 20%;
          }
        }

        @media (max-width: 480px) {
          .hero-benefit-item {
            flex-direction: column;
            gap: 0.35rem;
          }
          .hero-benefit-icon {
            width: 32px !important;
            height: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
