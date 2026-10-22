'use client';

import React from 'react';
import { Heart, Shield, ClipboardList, Stethoscope } from 'lucide-react';

export function CareApproachSection() {
  const steps = [
    {
      num: '01',
      icon: Heart,
      title: 'Empathy & Warmth',
      subtitle: 'Attentive Bedside Demeanour',
      description:
        'Patients recovering at home or navigating advanced age often feel anxious. Our caregivers approach every patient with patience, gentle reassurance, and sincere emotional support.',
    },
    {
      num: '02',
      icon: Shield,
      title: 'Preserving Dignity',
      subtitle: 'Discreet Personal Hygiene',
      description:
        'From sponge baths and linen changes to toileting and diaper assistance, all personal care routines are conducted discreetly to preserve the patient’s privacy and self-respect.',
    },
    {
      num: '03',
      icon: ClipboardList,
      title: 'Family Transparency',
      subtitle: 'Daily Updates on Progress',
      description:
        'We keep primary family members informed regarding vital sign trends, medication schedules, nutrition intake, and mobility progress with clear daily communication.',
    },
    {
      num: '04',
      icon: Stethoscope,
      title: 'Physician Alignment',
      subtitle: 'Following Clinical Orders',
      description:
        'Home care works best when coordinated with medical professionals. We follow hospital discharge protocols carefully and facilitate lab sample collection when required.',
    },
  ];

  return (
    <section className="section" aria-label="Our Care Approach" id="care-approach">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">Ethical Care Framework</span>
          <h2 className="section-title">Our Standard of Care in Every Home</h2>
          <p className="section-subtitle">
            Grounding home care in empathy, dignity, and clinical diligence so families in Vellore can feel confident that their loved ones are in caring hands.
          </p>
        </div>

        {/* 4-Stage Connected Process Spectrum */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
            gap: '1.5rem',
            position: 'relative',
          }}
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-white)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--color-border)',
                  padding: 'clamp(1.25rem, 3.5vw, 2rem) clamp(1rem, 3vw, 1.75rem)',
                  boxShadow: 'var(--shadow-xs)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  transition: 'border-color var(--transition-fast), transform var(--transition-fast)',
                }}
                className="care-model-card"
              >
                <div>
                  {/* Top Row: Icon + Stage Indicator */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.25rem',
                    }}
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
                        border: '1px solid rgba(20, 92, 89, 0.12)',
                      }}
                    >
                      <Icon size={22} aria-hidden="true" />
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        color: 'rgba(20, 92, 89, 0.25)',
                      }}
                    >
                      {step.num}
                    </span>
                  </div>

                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: 'var(--color-secondary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {step.subtitle}
                  </span>

                  <h3
                    style={{
                      fontSize: '1.18rem',
                      fontWeight: 700,
                      color: 'var(--color-text-main)',
                      marginBottom: '0.65rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .care-model-card:hover {
          transform: translateY(-2px);
          border-color: rgba(20, 92, 89, 0.3) !important;
          box-shadow: var(--shadow-sm) !important;
        }
      `}</style>
    </section>
  );
}
