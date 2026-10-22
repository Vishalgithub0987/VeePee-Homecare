'use client';

import React from 'react';
import { Layers, HeartHandshake, PackageCheck, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { BUSINESS_CONFIG } from '@/lib/business';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export function WhyChooseUsSection() {
  const whatsappHref = buildWhatsAppUrl(BUSINESS_CONFIG.defaultConsultationMessage);

  const capabilities = [
    {
      icon: Layers,
      title: 'Unified Care & Equipment Under One Roof',
      description:
        'Instead of liaising with multiple separate vendors for nursing staff, elder attendants, hospital cots, and oxygen concentrators, Vee Pee Home Care coordinates both clinical care and recovery equipment through a single dependable team.',
    },
    {
      icon: HeartHandshake,
      title: 'Attendant Support for Family Caregivers',
      description:
        'Caring for a bedbound or post-operative loved one is emotionally and physically demanding. Our trained attendants manage daily hygiene, positioning, and routine bedside comfort so family members get essential rest.',
    },
    {
      icon: PackageCheck,
      title: 'Adaptive Acuity-Based Care Schedules',
      description:
        'We do not force rigid, long-term lock-ins. Shift durations, daily visits, and rental durations adapt naturally as your patient progresses from acute recovery to independent convalescence.',
    },
    {
      icon: Sparkles,
      title: 'Sanitized & Functionally Verified Equipment',
      description:
        'Every manual cot, motorized bed, alpha ripple mattress, and suction unit undergoes strict clinical sanitization and mechanical verification before arriving at your residence.',
    },
  ];

  return (
    <section className="section" aria-label="Why Choose Vee Pee Home Care" id="why-choose-us">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">Dependable Care Standards</span>
          <h2 className="section-title">Why Families Across Vellore Rely on Vee Pee Home Care</h2>
          <p className="section-subtitle">
            Thoughtful service design focused on removing logistical friction, ensuring attentive patient comfort, and giving families dependable support at every step.
          </p>
        </div>

        {/* Editorial Asymmetric Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(1.75rem, 3vw, 2.5rem)',
            alignItems: 'stretch',
          }}
        >
          {/* Left Column: Authoritative Clinical Trust Card */}
          <div
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-white)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(1.25rem, 3.5vw, 2.75rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-md)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Subtle corner glow */}
            <div
              style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '180px',
                height: '180px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                pointerEvents: 'none',
              }}
              aria-hidden="true"
            />

            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.3rem 0.75rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--color-warm-ivory)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  marginBottom: '1.25rem',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                <MapPin size={14} style={{ color: 'var(--color-accent-gold)' }} />
                <span>Central Melkavanur Base</span>
              </div>

              <h3
                style={{
                  color: 'var(--color-white)',
                  fontSize: 'clamp(1.35rem, 1.8vw, 1.65rem)',
                  lineHeight: 1.3,
                  marginBottom: '1rem',
                }}
              >
                Direct Hospital-to-Home Recovery Continuity
              </h3>

              <p
                style={{
                  color: 'rgba(252, 251, 247, 0.88)',
                  fontSize: '0.94rem',
                  lineHeight: 1.68,
                  marginBottom: '1.75rem',
                }}
              >
                When transitioning from hospital to residence, families often struggle to coordinate nursing visits and source medical equipment concurrently. Vee Pee Home Care bridges that gap with coordinated dispatch, strict hygiene standards, and responsive communication throughout Vellore.
              </p>

              {/* Verified Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {[
                  'Prescription-aligned clinical procedures',
                  'Doorstep delivery & installation across Vellore',
                  'Flexible duration shifts with transparent estimates',
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--color-accent-gold)', flexShrink: 0 }} aria-hidden="true" />
                    <span style={{ fontSize: '0.88rem', color: 'rgba(252, 251, 247, 0.95)', fontWeight: 500 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-full"
                style={{
                  backgroundColor: 'var(--color-accent-gold)',
                  color: 'var(--color-primary-dark)',
                  fontWeight: 700,
                  border: '1px solid rgba(214, 180, 106, 0.4)',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
                }}
                aria-label="Discuss your patient care requirements on WhatsApp"
              >
                <WhatsAppIcon size={17} fill="var(--color-primary-dark)" />
                <span>Discuss Patient Care on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: 4 Distinctive Capability Rows */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.15rem',
              justifyContent: 'space-between',
            }}
          >
            {capabilities.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  style={{
                    backgroundColor: 'var(--color-white)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-border)',
                    padding: 'clamp(1rem, 3vw, 1.4rem) clamp(0.9rem, 3vw, 1.6rem)',
                    boxShadow: 'var(--shadow-xs)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1.15rem',
                    transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
                  }}
                  className="capability-row"
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-soft-mint)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: '1px solid rgba(20, 92, 89, 0.12)',
                    }}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </div>

                  <div>
                    <h3
                      style={{
                        fontSize: '1.08rem',
                        fontWeight: 700,
                        marginBottom: '0.35rem',
                        color: 'var(--color-text-main)',
                        lineHeight: 1.3,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.88rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .capability-row:hover {
          border-color: rgba(20, 92, 89, 0.3) !important;
          box-shadow: var(--shadow-sm) !important;
        }
      `}</style>
    </section>
  );
}
