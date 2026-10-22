'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, ExternalLink, Clock, Compass, ShieldCheck, Truck } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { BUSINESS_CONFIG } from '@/lib/business';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export function ContactSection() {
  const whatsappHref = buildWhatsAppUrl(BUSINESS_CONFIG.defaultConsultationMessage);

  const serviceableAreas = [
    'Vellore City',
    'Melkavanur',
    'Katpadi',
    'Bagayam',
    'Sathuvachari',
    'Thorapadi',
    'Gandhi Nagar',
    'Ranipet',
    'Surrounding Localities in Tamil Nadu',
  ];

  return (
    <section id="contact" className="section" aria-label="Contact and Service Area">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-eyebrow">Get In Touch</span>
          <h2 className="section-title">Contact &amp; Service Coverage Area</h2>
          <p className="section-subtitle">
            Reach out directly to arrange compassionate nursing care, discuss an elder attendant shift, or request prompt medical equipment delivery to your doorstep.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(1.25rem, 3vw, 2rem)',
          }}
        >
          {/* Left Column: Official Contact Card */}
          <div
            className="card"
            style={{
              padding: 'clamp(1.25rem, 3.5vw, 2.25rem)',
              backgroundColor: 'var(--color-white)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--color-primary)', margin: 0 }}>
                Vee Pee Home Care
              </h3>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--color-accent-gold-dark)',
                  backgroundColor: 'var(--color-accent-gold-light)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(197, 158, 78, 0.25)',
                }}
              >
                Vellore Headquarters
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
              {/* Phone */}
              <a
                href={`tel:${BUSINESS_CONFIG.rawPhone}`}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
                aria-label={`Call Vee Pee Home Care helpline at ${BUSINESS_CONFIG.phone}`}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
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
                  <Phone size={20} aria-hidden="true" />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                    Direct Phone &amp; Helpline
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: 'var(--color-text-main)',
                      transition: 'color var(--transition-fast)',
                    }}
                  >
                    {BUSINESS_CONFIG.phone}
                  </span>
                  <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-secondary)' }}>
                    Click to call immediately
                  </span>
                </div>
              </a>

              {/* WhatsApp */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
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
                  <WhatsAppIcon size={20} fill="#25D366" />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                    Instant WhatsApp Support
                  </span>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: 'var(--color-primary)',
                    }}
                  >
                    Chat on WhatsApp (+91 93440 62629)
                  </a>
                  <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                    Fastest way to check service and equipment terms
                  </span>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
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
                  <Mail size={20} aria-hidden="true" />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                    Official Email
                  </span>
                  <a
                    href={`mailto:${BUSINESS_CONFIG.email}`}
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'var(--color-text-main)',
                      wordBreak: 'break-all',
                    }}
                  >
                    {BUSINESS_CONFIG.email}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
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
                  <MapPin size={20} aria-hidden="true" />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                    Office Address
                  </span>
                  <address
                    style={{
                      fontStyle: 'normal',
                      fontSize: '0.92rem',
                      lineHeight: 1.5,
                      color: 'var(--color-text-main)',
                      marginBottom: '0.45rem',
                    }}
                  >
                    {BUSINESS_CONFIG.address}
                  </address>

                  <a
                    href={BUSINESS_CONFIG.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: 'var(--color-primary)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink size={13} aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Interactive Google Map with Pinned Location */}
              <div
                style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-soft-mint)',
                  boxShadow: 'var(--shadow-xs)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    height: '210px',
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  <iframe
                    title="Vee Pee Home Care Office Location Map"
                    src="https://maps.google.com/maps?q=12.945915,78.980417&hl=en&z=15&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: 'block' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                  {/* Prominent Pinned Location Marker Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -100%)',
                      pointerEvents: 'none',
                      zIndex: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--color-primary-dark)',
                        color: 'var(--color-white)',
                        padding: '0.22rem 0.55rem',
                        borderRadius: 'var(--radius-xs)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        marginBottom: '2px',
                        border: '1px solid rgba(255,255,255,0.25)',
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          backgroundColor: '#22C55E',
                        }}
                      />
                      <span>Vee Pee Home Care</span>
                    </div>

                    {/* Red Map Pin Icon */}
                    <svg
                      width="26"
                      height="34"
                      viewBox="0 0 24 32"
                      fill="none"
                      style={{ filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.4))' }}
                    >
                      <path
                        d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20s12-11 12-20c0-6.627-5.373-12-12-12z"
                        fill="#E53E3E"
                      />
                      <circle cx="12" cy="11" r="4.5" fill="#FFFFFF" />
                    </svg>

                    {/* Pin Contact Shadow */}
                    <div
                      style={{
                        width: '10px',
                        height: '3px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0,0,0,0.35)',
                        marginTop: '-2px',
                      }}
                    />
                  </div>
                </div>

                {/* Map Bottom Bar / Pin Legend & Direction Link */}
                <div
                  style={{
                    padding: '0.55rem 0.85rem',
                    backgroundColor: 'var(--color-white)',
                    borderTop: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.4rem',
                    fontSize: '0.78rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-primary-dark)', fontWeight: 600 }}>
                    <MapPin size={13} style={{ color: '#E53E3E', flexShrink: 0 }} aria-hidden="true" />
                    <span>Pinned: 101/A, Perumal Kovil St, Melkavanur</span>
                  </div>

                  <a
                    href={BUSINESS_CONFIG.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontWeight: 700,
                      color: 'var(--color-primary)',
                      textDecoration: 'none',
                    }}
                  >
                    <span>Get Directions</span>
                    <ExternalLink size={12} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <div style={{ marginTop: '2rem' }}>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-full btn-lg"
                aria-label="Enquire with Vee Pee Home Care on WhatsApp"
              >
                <WhatsAppIcon size={18} fill="#25D366" />
                <span>Start WhatsApp Consultation</span>
              </a>
            </div>
          </div>

          {/* Right Column: Service Coverage in Vellore */}
          <div
            className="card"
            style={{
              padding: 'clamp(1.25rem, 3.5vw, 2.25rem)',
              backgroundColor: 'var(--color-white)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <Compass size={22} style={{ color: 'var(--color-primary)' }} />
                <h3 style={{ fontSize: '1.28rem', color: 'var(--color-text-main)', margin: 0 }}>
                  Service Coverage &amp; Delivery Areas
                </h3>
              </div>

              {/* Service Delivery & Coverage Visual */}
              <div
                style={{
                  marginBottom: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-warm-ivory)',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src="/images/contact/service-coverage.jpeg"
                    alt="Vee Pee Home Care Service Coverage and Doorstep Delivery across Vellore"
                    width={1536}
                    height={1024}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                    }}
                  />
                  {/* Floating Badge Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0.65rem',
                      left: '0.65rem',
                      backgroundColor: 'rgba(20, 92, 89, 0.92)',
                      backdropFilter: 'blur(4px)',
                      color: 'var(--color-white)',
                      padding: '0.28rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                    }}
                  >
                    <Truck size={13} />
                    <span>Doorstep Medical Delivery &amp; Home Nursing</span>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div
                  style={{
                    padding: '0.6rem 0.85rem',
                    backgroundColor: 'var(--color-white)',
                    borderTop: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.8rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-primary-dark)', fontWeight: 600 }}>
                    <ShieldCheck size={14} style={{ color: 'var(--color-primary)', flexShrink: 0 }} aria-hidden="true" />
                    <span>Serving All Residential Areas in Vellore</span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                We deploy nursing personnel and provide equipment rentals throughout Vellore and nearby residential communities in Tamil Nadu:
              </p>

              {/* Service Areas Pill Grid */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.6rem',
                  marginBottom: '1.25rem',
                }}
              >
                {serviceableAreas.map((area, idx) => (
                  <span
                    key={idx}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.45rem 0.85rem',
                      backgroundColor: 'var(--color-soft-mint)',
                      color: 'var(--color-primary-dark)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid rgba(20, 92, 89, 0.14)',
                    }}
                  >
                    <MapPin size={13} style={{ color: 'var(--color-primary)' }} />
                    <span>{area}</span>
                  </span>
                ))}
              </div>

              {/* Quick Area Verification Notice */}
              <div
                style={{
                  padding: '1.15rem 1.25rem',
                  backgroundColor: 'var(--color-warm-ivory)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(20, 92, 89, 0.14)',
                  fontSize: '0.88rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.55,
                }}
              >
                <strong style={{ color: 'var(--color-text-main)', display: 'block', marginBottom: '0.25rem' }}>
                  Not sure if your specific street is covered?
                </strong>
                Message us with your exact area or hospital name on WhatsApp. Our team will verify distance and staffing feasibility immediately.
              </div>
            </div>

            {/* Call Helpline Card */}
            <div
              style={{
                marginTop: '1.75rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--color-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} style={{ color: 'var(--color-primary)' }} />
                <span style={{ fontSize: '0.86rem', color: 'var(--color-text-secondary)' }}>
                  Phone &amp; WhatsApp inquiries active daily
                </span>
              </div>

              <a
                href={`tel:${BUSINESS_CONFIG.rawPhone}`}
                className="btn btn-outline btn-sm"
                aria-label={`Call Vee Pee Home Care at ${BUSINESS_CONFIG.phone}`}
              >
                <Phone size={14} />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
