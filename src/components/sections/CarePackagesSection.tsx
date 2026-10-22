'use client';

import React from 'react';
import { Clock, Info, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { CARE_PACKAGES_DATA } from '@/data/packages';
import { useCart } from '@/components/cart/CartProvider';

const PACKAGE_IMAGES: Record<string, string> = {
  'basic-care': '/images/care packages/Basic-Care 2–4 Hours of Caring Support.png',
  'half-day-care': '/images/care packages/Half-Day Care Support at Home.png',
  'full-day-care': '/images/care packages/Full-Day Elderly Care Support.png',
  'night-care': '/images/care packages/Night Care Support for Elders.png',
  '24-hour-care': '/images/care packages/24-Hour Continuous Care.jpeg',
  'equipment-rental-plan': '/images/care packages/Medical Equipment Rental.jpeg',
};

function getPackageImage(id: string, title: string): string {
  if (PACKAGE_IMAGES[id]) return PACKAGE_IMAGES[id];
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('basic') || lowerTitle.includes('2–4') || lowerTitle.includes('2-4')) {
    return '/images/care packages/Basic-Care 2–4 Hours of Caring Support.png';
  }
  if (lowerTitle.includes('half')) {
    return '/images/care packages/Half-Day Care Support at Home.png';
  }
  if (lowerTitle.includes('full')) {
    return '/images/care packages/Full-Day Elderly Care Support.png';
  }
  if (lowerTitle.includes('night')) {
    return '/images/care packages/Night Care Support for Elders.png';
  }
  if (lowerTitle.includes('24') || lowerTitle.includes('continuous')) {
    return '/images/care packages/24-Hour Continuous Care.jpeg';
  }
  if (lowerTitle.includes('equipment') || lowerTitle.includes('rental')) {
    return '/images/care packages/Medical Equipment Rental.jpeg';
  }
  return '/images/care packages/24-Hour Continuous Care.jpeg';
}

export function CarePackagesSection() {
  const { openServiceModal } = useCart();

  return (
    <section id="packages" className="section" aria-label="Flexible Care Duration Packages">
      <style>{`
        .package-card:hover .package-card-img {
          transform: scale(1.04);
        }
      `}</style>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-eyebrow">Flexible Care Shifts</span>
          <h2 className="section-title">Personalised Care Packages &amp; Durations</h2>
          <p className="section-subtitle">
            Care requirements change as recovery advances. We structure support into flexible time allocations without rigid lock-ins, tailored to the patient’s daily routine.
          </p>
        </div>

        {/* 6 Packages Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(1rem, 2.5vw, 1.5rem)',
          }}
        >
          {CARE_PACKAGES_DATA.map((pkg) => {
            const is24Hr = pkg.id === '24-hour-care';
            const isFullDay = pkg.id === 'full-day-care';
            const isRental = pkg.id === 'equipment-rental-plan';
            const imageSrc = getPackageImage(pkg.id, pkg.title);

            return (
              <div
                key={pkg.id}
                className="card package-card"
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 0,
                  borderRadius: 'var(--radius-lg)',
                  border: '2px solid var(--color-primary)',
                  borderTop: '3.5px solid var(--color-accent-gold)',
                  position: 'relative',
                  backgroundColor: '#FAFDFB',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)',
                  overflow: 'hidden',
                }}
              >
                {/* 1. Top Card Image */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '200px',
                    overflow: 'hidden',
                    borderTopLeftRadius: 'calc(var(--radius-lg) - 1px)',
                    borderTopRightRadius: 'calc(var(--radius-lg) - 1px)',
                    backgroundColor: 'var(--color-soft-mint)',
                    cursor: 'pointer',
                  }}
                  onClick={() => openServiceModal(pkg.title)}
                >
                  <img
                    src={imageSrc}
                    alt={pkg.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block',
                      borderTopLeftRadius: 'calc(var(--radius-lg) - 1px)',
                      borderTopRightRadius: 'calc(var(--radius-lg) - 1px)',
                      transition: 'transform var(--transition-normal)',
                    }}
                    className="package-card-img"
                  />
                </div>

                {/* 2. Card Content Body */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flexGrow: 1,
                    padding: 'clamp(1.15rem, 3.5vw, 1.5rem)',
                  }}
                >
                  <div>
                    {/* Top Bar: Duration Pill & Optional Featured Badge */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '0.85rem',
                      }}
                    >
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.3rem 0.65rem',
                          backgroundColor: is24Hr ? 'var(--color-primary)' : 'var(--color-soft-mint)',
                          borderRadius: 'var(--radius-full)',
                          color: is24Hr ? 'var(--color-white)' : 'var(--color-primary)',
                          fontSize: '0.76rem',
                          fontWeight: 700,
                        }}
                      >
                        <Clock size={13} aria-hidden="true" />
                        <span>{pkg.duration}</span>
                      </div>

                      {is24Hr ? (
                        <span
                          className="badge"
                          style={{
                            backgroundColor: 'rgba(197, 158, 78, 0.15)',
                            color: 'var(--color-accent-gold-dark)',
                            border: '1px solid var(--color-accent-gold)',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                          }}
                        >
                          <Sparkles size={11} /> Flagship Continuous Care
                        </span>
                      ) : isFullDay ? (
                        <span className="badge badge-mint" style={{ fontSize: '0.68rem' }}>
                          Most Requested Shift
                        </span>
                      ) : isRental ? (
                        <span className="badge badge-gold" style={{ fontSize: '0.68rem' }}>
                          Doorstep Setup
                        </span>
                      ) : null}
                    </div>

                    <h3
                      style={{
                        fontSize: '1.22rem',
                        marginBottom: '0.45rem',
                        lineHeight: 1.25,
                        color: 'var(--color-primary-dark)',
                      }}
                    >
                      {pkg.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '0.86rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.55,
                        marginBottom: '1rem',
                      }}
                    >
                      {pkg.description}
                    </p>

                    {/* Suitable For */}
                    <div
                      style={{
                        padding: '0.6rem 0.75rem',
                        backgroundColor: 'rgba(234, 245, 241, 0.7)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--color-border)',
                        fontSize: '0.78rem',
                        color: 'var(--color-text-secondary)',
                        marginBottom: '1rem',
                      }}
                    >
                      <strong style={{ color: 'var(--color-text-main)' }}>Recommended For:</strong> {pkg.suitableFor}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div style={{ paddingTop: '0.85rem', borderTop: '1px solid var(--color-border-subtle)' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '0.75rem',
                      }}
                    >
                      <span style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>Estimated Cost:</span>
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                        Quote on request
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => openServiceModal(pkg.title)}
                      className={`btn ${is24Hr ? 'btn-primary' : 'btn-primary'} btn-full btn-sm`}
                      aria-label={`Request a quote for ${pkg.title}`}
                    >
                      <WhatsAppIcon size={16} fill="var(--color-accent-gold)" />
                      <span>{pkg.quoteLabel}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Transparency Banner */}
        <div
          style={{
            marginTop: '2.25rem',
            padding: '1.15rem 1.35rem',
            backgroundColor: 'var(--color-soft-mint)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(20, 92, 89, 0.18)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            fontSize: '0.84rem',
            color: 'var(--color-primary-dark)',
            lineHeight: 1.55,
          }}
        >
          <Info size={19} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: 2 }} />
          <div>
            <strong style={{ color: 'var(--color-primary-dark)' }}>Transparent &amp; Fair Pricing Policy:</strong>{' '}
            Vee Pee Home Care does not publish arbitrary fixed prices online because patient acuity, clinical requirements, staff qualification, and location vary significantly. Final quotes, attendant availability, and equipment terms are confirmed transparently after evaluating the patient’s specific needs.
          </div>
        </div>
      </div>
    </section>
  );
}

