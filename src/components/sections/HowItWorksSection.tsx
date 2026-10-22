'use client';

import React from 'react';
import { Search, CheckSquare, FileText, Send, AlertCircle, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { BUSINESS_CONFIG } from '@/lib/business';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      icon: Search,
      title: 'Explore Services or Products',
      description:
        'Browse our catalogue of 15 home nursing and caregiver services or 19 medical equipment groups to identify what your patient needs.',
    },
    {
      num: '02',
      icon: CheckSquare,
      title: 'Select Care Scope or Items',
      description:
        'Choose specific shift packages (e.g. half-day, night care, 24-hr) or add required recovery equipment to your enquiry cart.',
    },
    {
      num: '03',
      icon: FileText,
      title: 'Share Basic Patient Location',
      description:
        'Provide your name, contact mobile number, preferred start date, and your residential locality in Vellore for prompt matching.',
    },
    {
      num: '04',
      icon: Send,
      title: 'Confirm Directly on WhatsApp',
      description:
        'A structured message opens in WhatsApp. Press send to connect with our coordinator who verifies staff availability and finalizes the quote.',
    },
  ];

  const whatsappHref = buildWhatsAppUrl(BUSINESS_CONFIG.defaultConsultationMessage);

  return (
    <section className="section section-alt" aria-label="How the Enquiry Process Works" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Clear &amp; Simple Flow</span>
          <h2 className="section-title">How Home Care Enquiries Work</h2>
          <p className="section-subtitle">
            A transparent, straightforward 4-step path to arranging home nursing, attendant care, or medical equipment rentals in Vellore.
          </p>
        </div>

        {/* 4 Steps Grid */}
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
                key={step.num}
                className="card"
                style={{
                  padding: 'clamp(1.25rem, 3.5vw, 2rem) clamp(1rem, 3vw, 1.75rem)',
                  backgroundColor: 'var(--color-white)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-xs)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Step Number Top Badge */}
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
                      width: 46,
                      height: 46,
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
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: 'var(--color-primary)',
                      backgroundColor: 'var(--color-soft-mint)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid rgba(20, 92, 89, 0.15)',
                    }}
                  >
                    Step {step.num}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.18rem', marginBottom: '0.65rem', color: 'var(--color-text-main)' }}>
                  {step.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Booking Distinction Disclaimer Box */}
        <div
          style={{
            marginTop: '2.5rem',
            padding: 'clamp(1rem, 3vw, 1.35rem) clamp(1rem, 3vw, 1.75rem)',
            backgroundColor: 'var(--color-warm-ivory)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(20, 92, 89, 0.18)',
            boxShadow: 'var(--shadow-xs)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            fontSize: '0.9rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-soft-mint)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: 2,
            }}
          >
            <AlertCircle size={20} aria-hidden="true" />
          </div>
          <div>
            <strong style={{ color: 'var(--color-text-main)', display: 'block', marginBottom: '0.25rem', fontSize: '0.95rem' }}>
              Important Process Advisory:
            </strong>
            Submitting a WhatsApp enquiry is a request for consultation and availability, not an automatic instant booking. Service duration, nurse allocation, equipment dispatch, and pricing are confirmed directly with you by Vee Pee Home Care after reviewing your patient’s specific requirements.
          </div>
        </div>

        {/* Action Button */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-lg"
            aria-label="Start your enquiry on WhatsApp"
            style={{ padding: '0.85rem clamp(1.25rem, 4vw, 2.25rem)', maxWidth: '100%' }}
          >
            <WhatsAppIcon size={18} fill="#25D366" />
            <span>Start an Enquiry on WhatsApp</span>
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
