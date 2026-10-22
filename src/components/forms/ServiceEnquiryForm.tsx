'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ShieldCheck, LocateFixed, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { useCart } from '@/components/cart/CartProvider';
import { SERVICES_DATA } from '@/data/services';
import { isValidIndianPhone, sanitizePhoneNumber } from '@/lib/validation';
import { buildWhatsAppUrl, buildServiceEnquiryMessage } from '@/lib/whatsapp';
import { ServiceEnquiryFormData } from '@/types';
import { reverseGeocodeCoords } from '@/lib/location';

export function ServiceEnquiryForm() {
  const { isServiceModalOpen, closeServiceModal, preselectedService } = useCart();

  const [formData, setFormData] = useState<ServiceEnquiryFormData>({
    customerName: '',
    contactPhone: '',
    preferredDate: '',
    preferredTime: 'Morning Shift (8 AM – 12 PM)',
    serviceLocation: '',
    selectedService: preselectedService || 'Home Nursing Care',
    careDuration: 'Full-Day (10–12 Hours)',
    optionalNotes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, selectedService: preselectedService }));
    }
  }, [preselectedService]);

  // Reset transient location state when modal opens/closes
  useEffect(() => {
    if (!isServiceModalOpen) {
      setLocationStatus(null);
      setIsLocating(false);
    }
  }, [isServiceModalOpen]);

  /**
   * Requests user permission and detects current location using Geolocation API
   */
  const handleDetectLocation = () => {
    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      setLocationStatus({
        type: 'error',
        message: 'Geolocation is not supported by your browser. Please enter your address manually.',
      });
      return;
    }

    setIsLocating(true);
    setLocationStatus({
      type: 'info',
      message: 'Requesting permission to access your current location...',
    });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          setLocationStatus({
            type: 'info',
            message: 'Resolving address from coordinates...',
          });

          const readableAddress = await reverseGeocodeCoords(latitude, longitude);

          setFormData(prev => ({
            ...prev,
            serviceLocation: readableAddress,
          }));

          if (errors.serviceLocation) {
            setErrors(prev => ({ ...prev, serviceLocation: '' }));
          }

          setLocationStatus({
            type: 'success',
            message: 'Live location detected. You can edit or add door/apartment details.',
          });
        } catch {
          setLocationStatus({
            type: 'error',
            message: 'Could not resolve address. Please type your location manually.',
          });
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        setIsLocating(false);
        let errorMsg = 'Unable to access your location. Please enter your address manually.';
        if (err.code === err.PERMISSION_DENIED) {
          errorMsg = 'Location permission was denied. Please enter your address manually.';
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          errorMsg = 'Location signal is unavailable. Please enter your address manually.';
        } else if (err.code === err.TIMEOUT) {
          errorMsg = 'Location request timed out. Please try again or type manually.';
        }

        setLocationStatus({
          type: 'error',
          message: errorMsg,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 60000,
      }
    );
  };

  if (!isServiceModalOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim() || formData.customerName.trim().length < 2) {
      newErrors.customerName = 'Please enter your full name (minimum 2 characters)';
    }

    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = 'Please enter your 10-digit contact mobile number';
    } else if (!isValidIndianPhone(formData.contactPhone)) {
      newErrors.contactPhone = 'Please enter a valid 10-digit Indian phone number (starts with 6-9)';
    }

    if (!formData.serviceLocation.trim()) {
      newErrors.serviceLocation = 'Please specify your location or street in Vellore';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = buildServiceEnquiryMessage({
      ...formData,
      contactPhone: sanitizePhoneNumber(formData.contactPhone),
    });

    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
    closeServiceModal();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="overlay is-active"
        onClick={closeServiceModal}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(94vw, 540px)',
          maxHeight: '90vh',
          backgroundColor: 'var(--color-white)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 'calc(var(--z-modal) + 1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid var(--color-border)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.15rem 1.35rem',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--color-warm-ivory)',
          }}
        >
          <div>
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '0.15rem',
              }}
            >
              Vee Pee Home Care Enquiry
            </span>
            <h2 id="service-modal-title" style={{ fontSize: '1.2rem', lineHeight: 1.2 }}>
              Request Healthcare Service
            </h2>
          </div>

          <button
            type="button"
            className="drawer-close-btn"
            onClick={closeServiceModal}
            aria-label="Close Service Enquiry Modal"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div
          style={{
            padding: 'clamp(1rem, 3vw, 1.35rem)',
            overflowY: 'auto',
            flex: 1,
          }}
        >
          {/* Medical Privacy Notice */}
          <div
            style={{
              padding: '0.75rem 0.85rem',
              backgroundColor: 'var(--color-soft-mint)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(20, 92, 89, 0.16)',
              marginBottom: '1.15rem',
              fontSize: '0.8rem',
              color: 'var(--color-primary-dark)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.55rem',
              lineHeight: 1.45,
            }}
          >
            <ShieldCheck size={16} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: 2 }} />
            <span>
              <strong>Privacy Notice:</strong> This pre-fills a direct WhatsApp message. No sensitive medical records are stored on our servers. For urgent clinical emergencies, please call local emergency services directly.
            </span>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Selected Service Dropdown */}
            <div className="form-group">
              <label htmlFor="service-select" className="form-label form-label-required">
                Required Service
              </label>
              <select
                id="service-select"
                className="form-select"
                value={formData.selectedService}
                onChange={e => setFormData({ ...formData, selectedService: e.target.value })}
              >
                {SERVICES_DATA.map(s => (
                  <option key={s.id} value={s.name}>
                    {s.name} ({s.category})
                  </option>
                ))}
              </select>

              {(() => {
                const currentService = SERVICES_DATA.find(s => s.name === formData.selectedService);
                if (!currentService) return null;
                return (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginTop: '0.55rem',
                      padding: '0.55rem 0.75rem',
                      backgroundColor: 'var(--color-warm-ivory)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: 54,
                        height: 38,
                        borderRadius: 'var(--radius-sm)',
                        overflow: 'hidden',
                        flexShrink: 0,
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <Image
                        src={currentService.image}
                        alt={currentService.name}
                        fill
                        sizes="54px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                          {currentService.name}
                        </span>
                        <span
                          className={`badge ${currentService.isClinical ? 'badge-clinical' : 'badge-mint'}`}
                          style={{ fontSize: '0.68rem', padding: '0.1rem 0.45rem' }}
                        >
                          {currentService.category}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: '0.74rem',
                          color: 'var(--color-text-muted)',
                          display: 'block',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          marginTop: '0.1rem',
                        }}
                      >
                        {currentService.shortDescription}
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* 2-Column: Customer Name & Phone */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                gap: '0.85rem',
              }}
            >
              <div className="form-group">
                <label htmlFor="customer-name" className="form-label form-label-required">
                  Your Name / Contact Person
                </label>
                <input
                  id="customer-name"
                  type="text"
                  className={`form-input ${errors.customerName ? 'is-invalid' : ''}`}
                  placeholder="e.g. S. Narayanan"
                  value={formData.customerName}
                  onChange={e => {
                    setFormData({ ...formData, customerName: e.target.value });
                    if (errors.customerName) setErrors({ ...errors, customerName: '' });
                  }}
                  required
                />
                {errors.customerName && <span className="form-error">{errors.customerName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="customer-phone" className="form-label form-label-required">
                  Contact Mobile Number
                </label>
                <input
                  id="customer-phone"
                  type="tel"
                  className={`form-input ${errors.contactPhone ? 'is-invalid' : ''}`}
                  placeholder="e.g. 9344062629"
                  value={formData.contactPhone}
                  onChange={e => {
                    setFormData({ ...formData, contactPhone: e.target.value });
                    if (errors.contactPhone) setErrors({ ...errors, contactPhone: '' });
                  }}
                  required
                />
                {errors.contactPhone && <span className="form-error">{errors.contactPhone}</span>}
              </div>
            </div>

            {/* Service Location in Vellore with Live Location Detection */}
            <div className="form-group">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.4rem',
                  marginBottom: '0.35rem',
                }}
              >
                <label
                  htmlFor="service-location"
                  className="form-label form-label-required"
                  style={{ marginBottom: 0 }}
                >
                  Patient Address / Area in Vellore
                </label>

                {/* Clear "Use My Current Location" button (requests browser permission on click) */}
                <button
                  type="button"
                  onClick={handleDetectLocation}
                  disabled={isLocating}
                  className="location-detect-btn"
                  aria-label="Detect and use my current live location"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.22rem 0.6rem',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                    backgroundColor: 'var(--color-soft-mint)',
                    border: '1px solid rgba(20, 92, 89, 0.22)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: isLocating ? 'wait' : 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  {isLocating ? (
                    <>
                      <Loader2 size={13} className="spin" aria-hidden="true" />
                      <span>Detecting...</span>
                    </>
                  ) : (
                    <>
                      <LocateFixed size={13} aria-hidden="true" />
                      <span>Use My Current Location</span>
                    </>
                  )}
                </button>
              </div>

              <div style={{ position: 'relative' }}>
                <input
                  id="service-location"
                  type="text"
                  className={`form-input ${errors.serviceLocation ? 'is-invalid' : ''}`}
                  placeholder="e.g. Melkavanur / Katpadi / Gandhi Nagar, Vellore"
                  value={formData.serviceLocation}
                  onChange={e => {
                    setFormData({ ...formData, serviceLocation: e.target.value });
                    if (errors.serviceLocation) setErrors({ ...errors, serviceLocation: '' });
                    if (locationStatus) setLocationStatus(null);
                  }}
                  required
                />
              </div>

              {/* Location Status Message (Loading / Success / Error) */}
              {locationStatus && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.75rem',
                    marginTop: '0.35rem',
                    color:
                      locationStatus.type === 'error'
                        ? 'var(--color-error)'
                        : locationStatus.type === 'success'
                        ? 'var(--color-success)'
                        : 'var(--color-text-secondary)',
                    lineHeight: 1.35,
                  }}
                  role={locationStatus.type === 'error' ? 'alert' : 'status'}
                >
                  {locationStatus.type === 'error' && (
                    <AlertCircle size={13} style={{ flexShrink: 0 }} aria-hidden="true" />
                  )}
                  {locationStatus.type === 'success' && (
                    <CheckCircle2 size={13} style={{ flexShrink: 0 }} aria-hidden="true" />
                  )}
                  {locationStatus.type === 'info' && (
                    <Loader2 size={13} className="spin" style={{ flexShrink: 0 }} aria-hidden="true" />
                  )}
                  <span>{locationStatus.message}</span>
                </div>
              )}

              {errors.serviceLocation && <span className="form-error">{errors.serviceLocation}</span>}
            </div>

            {/* 2-Column: Duration & Preferred Shift */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                gap: '0.85rem',
              }}
            >
              <div className="form-group">
                <label htmlFor="care-duration" className="form-label">
                  Expected Care Duration
                </label>
                <select
                  id="care-duration"
                  className="form-select"
                  value={formData.careDuration}
                  onChange={e => setFormData({ ...formData, careDuration: e.target.value })}
                >
                  <option value="Basic Care (2–4 Hours)">Basic Care (2–4 Hours)</option>
                  <option value="Half-Day Care (6–8 Hours)">Half-Day Care (6–8 Hours)</option>
                  <option value="Full-Day Home Care (10–12 Hours)">Full-Day Home Care (10–12 Hours)</option>
                  <option value="Night Care (Overnight)">Night Care (Overnight)</option>
                  <option value="24-Hour Continuous Care">24-Hour Continuous Care</option>
                  <option value="Doctor Visit / One-time Procedure">Doctor Visit / One-time Procedure</option>
                  <option value="To be discussed with coordinator">To be discussed with coordinator</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="preferred-time" className="form-label">
                  Preferred Time / Shift
                </label>
                <select
                  id="preferred-time"
                  className="form-select"
                  value={formData.preferredTime}
                  onChange={e => setFormData({ ...formData, preferredTime: e.target.value })}
                >
                  <option value="Morning Shift (8 AM – 12 PM)">Morning Shift (8 AM – 12 PM)</option>
                  <option value="Full Day (8 AM – 8 PM)">Full Day (8 AM – 8 PM)</option>
                  <option value="Night Shift (8 PM – 8 AM)">Night Shift (8 PM – 8 AM)</option>
                  <option value="Immediate / As soon as possible">Immediate / As soon as possible</option>
                  <option value="Flexible timings">Flexible timings</option>
                </select>
              </div>
            </div>

            {/* Preferred Start Date */}
            <div className="form-group">
              <label htmlFor="preferred-date" className="form-label">
                Preferred Start Date (Optional)
              </label>
              <input
                id="preferred-date"
                type="date"
                className="form-input"
                value={formData.preferredDate}
                onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
              />
            </div>

            {/* General Patient Notes */}
            <div className="form-group" style={{ marginBottom: '0.45rem' }}>
              <label htmlFor="patient-notes" className="form-label">
                General Condition &amp; Special Requests (Optional)
              </label>
              <textarea
                id="patient-notes"
                className="form-textarea"
                rows={2}
                placeholder="e.g. Patient recently discharged, requires daily wound dressing and vitals monitoring."
                value={formData.optionalNotes}
                onChange={e => setFormData({ ...formData, optionalNotes: e.target.value })}
              />
              <span className="form-hint">
                Please do not enter highly sensitive health diagnoses or credit card numbers.
              </span>
            </div>

            {/* Submit CTA */}
            <div style={{ marginTop: '1.25rem' }}>
              <button
                type="submit"
                className="btn btn-primary btn-full btn-lg"
                aria-label="Send Service Enquiry on WhatsApp"
              >
                <WhatsAppIcon size={18} fill="var(--color-accent-gold)" />
                <span>Send Enquiry on WhatsApp</span>
              </button>
              <span
                style={{
                  display: 'block',
                  textAlign: 'center',
                  fontSize: '0.74rem',
                  color: 'var(--color-text-secondary)',
                  marginTop: '0.55rem',
                }}
              >
                Availability, staff matching, and pricing will be confirmed by Vee Pee Home Care on WhatsApp.
              </span>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .location-detect-btn:hover:not(:disabled) {
          background-color: var(--color-primary-subtle) !important;
          border-color: var(--color-primary) !important;
          color: var(--color-primary-dark) !important;
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
