'use client';

import React, { useState } from 'react';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { FAQS_DATA } from '@/data/faqs';
import { BUSINESS_CONFIG } from '@/lib/business';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const whatsappHref = buildWhatsAppUrl(
    'Hello Vee Pee Home Care, I have a question regarding your home healthcare services or medical equipment.'
  );

  return (
    <section id="faq" className="section section-alt" aria-label="Frequently Asked Questions">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Help &amp; Clarity</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Find prompt answers about home care coordination, flexible durations, medical equipment rentals, and our simple WhatsApp enquiry procedure.
          </p>
        </div>

        {/* Accordion Container */}
        <div
          style={{
            maxWidth: '1060px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
          }}
        >
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-white)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid',
                  borderColor: isOpen ? 'rgba(20, 92, 89, 0.35)' : 'var(--color-border)',
                  borderLeft: isOpen ? '4px solid var(--color-primary)' : '4px solid transparent',
                  boxShadow: isOpen ? 'var(--shadow-sm)' : 'var(--shadow-xs)',
                  overflow: 'hidden',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                  style={{
                    width: '100%',
                    padding: '1.15rem clamp(0.85rem, 3vw, 1.5rem)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    textAlign: 'left',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: isOpen ? 'var(--color-primary)' : 'var(--color-text-main)',
                    backgroundColor: isOpen ? 'rgba(234, 245, 241, 0.45)' : 'var(--color-white)',
                    cursor: 'pointer',
                    transition: 'background-color var(--transition-fast), color var(--transition-fast)',
                  }}
                >
                  <span style={{ fontSize: '1.02rem', lineHeight: 1.4 }}>{faq.question}</span>

                  <ChevronDown
                    size={20}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform var(--transition-normal)',
                      color: isOpen ? 'var(--color-primary)' : 'var(--color-text-muted)',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-question-${idx}`}
                    style={{
                      padding: '1.15rem clamp(0.85rem, 3vw, 1.5rem) 1.35rem',
                      fontSize: '0.92rem',
                      lineHeight: 1.7,
                      color: 'var(--color-text-secondary)',
                      borderTop: '1px solid var(--color-border-subtle)',
                      backgroundColor: 'rgba(250, 249, 245, 0.4)',
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div
          style={{
            maxWidth: '860px',
            margin: '2.75rem auto 0',
            textAlign: 'center',
            padding: 'clamp(1.5rem, 4vw, 2.25rem) clamp(1rem, 3.5vw, 2rem)',
            backgroundColor: 'var(--color-white)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid rgba(20, 92, 89, 0.18)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-soft-mint)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              border: '1px solid rgba(20, 92, 89, 0.12)',
            }}
          >
            <MessageSquare size={22} aria-hidden="true" />
          </div>

          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>
            Still have specific questions about care?
          </h3>
          <p style={{ fontSize: '0.92rem', marginBottom: '1.5rem', color: 'var(--color-text-secondary)', maxWidth: '620px', margin: '0 auto 1.5rem' }}>
            Our healthcare coordinators in Vellore are available to answer your patient-specific enquiries and clarify equipment availability.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            aria-label="Ask questions to Vee Pee Home Care on WhatsApp"
            style={{ padding: '0.75rem 1.75rem' }}
          >
            <WhatsAppIcon size={18} fill="#25D366" />
            <span>Ask Us on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
