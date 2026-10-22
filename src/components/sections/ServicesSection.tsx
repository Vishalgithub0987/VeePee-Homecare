'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Activity,
  HeartHandshake,
  Building2,
  BedDouble,
  Wind,
  Sparkles,
  Stethoscope,
  Baby,
  HeartPulse,
  Thermometer,
  Brain,
  Moon,
  UserCheck,
  TestTube2,
  Ambulance,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { SERVICES_DATA } from '@/data/services';
import { useCart } from '@/components/cart/CartProvider';

const ICON_MAP: Record<string, React.ElementType> = {
  Activity,
  HeartHandshake,
  Building2,
  BedDouble,
  Wind,
  Sparkles,
  Stethoscope,
  Baby,
  HeartPulse,
  Thermometer,
  Brain,
  Moon,
  UserCheck,
  TestTube2,
  Ambulance,
};

export function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { openServiceModal } = useCart();

  const categories = ['All', 'Nursing', 'Caregiver', 'Specialized', 'Equipment', 'Coordination'];

  const filteredServices = useMemo(() => {
    if (activeCategory === 'All') return SERVICES_DATA;
    return SERVICES_DATA.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="services" className="section section-alt" aria-label="Healthcare Services Catalogue">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-eyebrow">Comprehensive Healthcare Catalogue</span>
          <h2 className="section-title">Home Healthcare Services in Vellore</h2>
          <p className="section-subtitle">
            Providing compassionate bedside assistance, skilled clinical nursing, and equipment coordination tailored to recovery, comfort, and patient dignity.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.45rem',
            marginBottom: '2.25rem',
          }}
          role="tablist"
          aria-label="Filter Services by Category"
        >
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.45rem 1.1rem',
                fontSize: '0.85rem',
                fontWeight: activeCategory === cat ? 700 : 500,
                borderRadius: 'var(--radius-full)',
                border: '1px solid',
                borderColor: activeCategory === cat ? 'var(--color-primary)' : 'var(--color-border)',
                backgroundColor: activeCategory === cat ? 'var(--color-primary)' : 'var(--color-white)',
                color: activeCategory === cat ? 'var(--color-white)' : 'var(--color-text-main)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                boxShadow: activeCategory === cat ? '0 2px 6px rgba(20, 92, 89, 0.15)' : 'none',
              }}
            >
              {cat === 'All' ? 'All 15 Services' : cat}
            </button>
          ))}
        </div>

        {/* 15 Services Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(1rem, 2.5vw, 1.5rem)',
          }}
        >
          {filteredServices.map(service => {
            const Icon = ICON_MAP[service.iconName] || Activity;
            return (
              <article
                key={service.id}
                className="card service-card"
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 'clamp(1rem, 3vw, 1.35rem)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <div>
                  {/* Service Hero Image Visual */}
                  <div
                    className="service-img-wrap"
                    onClick={() => openServiceModal(service.name)}
                  >
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center 20%',
                        transition: 'transform var(--transition-normal)',
                      }}
                      className="service-img"
                    />

                    {/* Category & Clinical Badges overlaid on top of image */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '0.65rem',
                        left: '0.65rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        zIndex: 2,
                      }}
                    >
                      {service.isClinical && (
                        <span
                          className="badge badge-clinical"
                          style={{
                            boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                          }}
                        >
                          Clinical
                        </span>
                      )}
                      <span
                        className="badge badge-mint"
                        style={{
                          boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                        }}
                      >
                        {service.category}
                      </span>
                    </div>

                    {/* Service Icon Badge in bottom-right */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '0.65rem',
                        right: '0.65rem',
                        width: 38,
                        height: 38,
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'rgba(255, 255, 255, 0.94)',
                        backdropFilter: 'blur(4px)',
                        border: '1px solid rgba(20, 92, 89, 0.16)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-primary)',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                        zIndex: 2,
                      }}
                      aria-hidden="true"
                    >
                      <Icon size={19} strokeWidth={2.2} />
                    </div>
                  </div>

                  {/* Title & Short Description */}
                  <h3
                    style={{
                      fontSize: '1.15rem',
                      marginBottom: '0.45rem',
                      lineHeight: 1.28,
                      cursor: 'pointer',
                    }}
                    onClick={() => openServiceModal(service.name)}
                  >
                    {service.name}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.55,
                      marginBottom: '1rem',
                    }}
                  >
                    {service.shortDescription}
                  </p>

                  {/* Inclusions List */}
                  <div style={{ marginBottom: '1rem' }}>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        color: 'var(--color-primary)',
                        marginBottom: '0.45rem',
                      }}
                    >
                      Key Inclusions:
                    </span>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {service.inclusions.slice(0, 4).map((inc, i) => (
                        <li
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.45rem',
                            fontSize: '0.82rem',
                            color: 'var(--color-text-main)',
                            lineHeight: 1.4,
                          }}
                        >
                          <CheckCircle2
                            size={14}
                            style={{ color: 'var(--color-secondary)', flexShrink: 0, marginTop: 2 }}
                            aria-hidden="true"
                          />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Disclaimer if present */}
                  {service.disclaimer && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.4rem',
                        fontSize: '0.75rem',
                        color: 'var(--color-text-muted)',
                        backgroundColor: 'var(--color-warm-ivory)',
                        padding: '0.45rem 0.65rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--color-border)',
                        marginBottom: '1rem',
                        lineHeight: 1.35,
                      }}
                    >
                      <AlertCircle size={13} style={{ flexShrink: 0, marginTop: 2, color: 'var(--color-accent-gold-dark)' }} />
                      <span>{service.disclaimer}</span>
                    </div>
                  )}
                </div>

                {/* Card Action Button */}
                <div style={{ paddingTop: '0.85rem', borderTop: '1px solid var(--color-border-subtle)' }}>
                  <button
                    type="button"
                    onClick={() => openServiceModal(service.name)}
                    className="btn btn-secondary btn-full btn-sm"
                    aria-label={`Enquire about ${service.name}`}
                  >
                    <WhatsAppIcon size={16} fill="var(--color-primary)" />
                    <span>Enquire on WhatsApp</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Professional Coordination Note */}
        <div
          style={{
            marginTop: '2.5rem',
            padding: '1rem 1.25rem',
            backgroundColor: 'var(--color-white)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            textAlign: 'center',
            fontSize: '0.84rem',
            color: 'var(--color-text-secondary)',
            maxWidth: '1000px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <strong style={{ color: 'var(--color-text-main)' }}>Clinical &amp; Coordination Protocol:</strong>{' '}
          Vee Pee Home Care connects patients with qualified nursing staff and care attendants, and facilitates coordination with registered medical practitioners and diagnostic labs. All clinical nursing procedures are executed under valid physician prescriptions in compliance with regulatory healthcare guidelines.
        </div>
      </div>
    </section>
  );
}
