'use client';

import React from 'react';
import { UserCheck, Users, BedDouble, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { BUSINESS_CONFIG } from '@/lib/business';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export function BenefitsSection() {
  const whatsappHref = buildWhatsAppUrl(BUSINESS_CONFIG.defaultConsultationMessage);

  const pillars = [
    {
      icon: UserCheck,
      title: 'Individualised Care Coordination',
      subtitle: 'Doctor-Prescribed Routines',
      description:
        'Every patient recovery journey is unique. Care schedules, vital charting, and nursing assistance are tailored directly around your treating physician’s orders and family routines.',
    },
    {
      icon: Users,
      title: 'Family & Caregiver Relief',
      subtitle: 'Rest for Loved Ones',
      description:
        'Caring for a chronically ill or bedbound elder is physically and emotionally demanding. Our daytime and overnight attendants give primary caregivers necessary rest and peace of mind.',
    },
    {
      icon: Clock,
      title: 'Flexible Care Durations',
      subtitle: 'From 2h to 24h Continuous Shifts',
      description:
        'From short 2-hour wound dressing visits to 12-hour nursing shifts and 24-hour continuous bedbound care, our flexible schedules adapt as your patient’s health progresses.',
    },
  ];

  return (
    <section
      aria-label="Service Principles and Benefits"
      className="section section-alt"
      id="benefits"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">Patient-Centred Principles</span>
          <h2 className="section-title">Healthcare Designed Around Patient Comfort</h2>
          <p className="section-subtitle">
            Reliable, compassionate home care support designed to assist patients in healing comfortably and help family caregivers manage daily care with confidence.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '1.75rem',
            marginBottom: '2rem',
          }}
        >
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-white)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--color-border)',
                  padding: 'clamp(1.25rem, 3.5vw, 2.25rem)',
                  boxShadow: 'var(--shadow-xs)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'border-color var(--transition-fast), transform var(--transition-fast)',
                }}
                className="benefit-pillar-card"
              >
                <div>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-soft-mint)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.25rem',
                      border: '1px solid rgba(20, 92, 89, 0.12)',
                    }}
                  >
                    <Icon size={24} aria-hidden="true" />
                  </div>

                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: 'var(--color-primary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {item.subtitle}
                  </span>

                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--color-text-main)',
                      marginBottom: '0.75rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.92rem',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.65,
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

        {/* Lower Medical Equipment & Dignified Care Banner */}
        <div
          style={{
            backgroundColor: 'var(--color-warm-ivory)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid rgba(20, 92, 89, 0.16)',
            padding: 'clamp(1.25rem, 3vw, 2.25rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.5rem',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-white)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              <BedDouble size={22} aria-hidden="true" />
            </div>
            <div>
              <h4 style={{ fontSize: '1.08rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.25rem' }}>
                Doorstep Medical Equipment Deployment
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.55, margin: 0 }}>
                Immediate home access to hospital cots, oxygen concentrators, CPAP/BiPAP units, and ripple mattresses with doorstep assembly across Vellore.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.85rem', flexWrap: 'wrap' }}>
            <a
              href="#products"
              className="btn btn-outline btn-sm"
              aria-label="View medical products and equipment rentals"
            >
              <span>View Medical Products</span>
              <ArrowRight size={15} aria-hidden="true" />
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              aria-label="Enquire about equipment availability on WhatsApp"
            >
              <WhatsAppIcon size={15} fill="var(--color-accent-gold)" />
              <span>Equipment Enquiry</span>
            </a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .benefit-pillar-card:hover {
          transform: translateY(-2px);
          border-color: rgba(20, 92, 89, 0.3) !important;
          box-shadow: var(--shadow-sm) !important;
        }
      `}</style>
    </section>
  );
}
