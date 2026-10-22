'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ShieldCheck, LocateFixed, Loader2, CheckCircle2, AlertCircle, ShoppingBag } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { useCart } from '@/components/cart/CartProvider';
import { isValidIndianPhone, sanitizePhoneNumber } from '@/lib/validation';
import { reverseGeocodeCoords } from '@/lib/location';
import {
  buildWhatsAppUrl,
  buildCartEnquiryMessage,
  buildSingleProductEnquiryMessage,
} from '@/lib/whatsapp';
import { ProductEnquiryFormData } from '@/types';

export function ProductEnquiryForm() {
  const {
    isProductEnquiryOpen,
    closeProductEnquiry,
    items,
    productEnquirySingleItem,
    totalPricedAmount,
    hasUnpricedItems,
    clearCart,
    closeCart,
  } = useCart();

  const [formData, setFormData] = useState<ProductEnquiryFormData>({
    customerName: '',
    contactPhone: '',
    deliveryLocation: '',
    preferredDate: '',
    preferredTime: 'Immediate / As soon as possible (Urgent)',
    optionalNotes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  // Reset transient location state when modal opens/closes
  useEffect(() => {
    if (!isProductEnquiryOpen) {
      setLocationStatus(null);
      setIsLocating(false);
      setErrors({});
    }
  }, [isProductEnquiryOpen]);

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
            deliveryLocation: readableAddress,
          }));

          if (errors.deliveryLocation) {
            setErrors(prev => ({ ...prev, deliveryLocation: '' }));
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

  if (!isProductEnquiryOpen) return null;

  // Products to enquire: either single selected product or all items from cart
  const isSingleProduct = !!productEnquirySingleItem;
  const singleItem = productEnquirySingleItem;

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

    if (!formData.deliveryLocation.trim()) {
      newErrors.deliveryLocation = 'Please specify your delivery address or area in Vellore';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const sanitizedPhone = sanitizePhoneNumber(formData.contactPhone);
    const customerPayload = {
      name: formData.customerName.trim(),
      phone: sanitizedPhone,
      location: formData.deliveryLocation.trim(),
      preferredDate: formData.preferredDate || undefined,
      preferredTime: formData.preferredTime || undefined,
      notes: formData.optionalNotes?.trim() || undefined,
    };

    let message = '';
    if (isSingleProduct && singleItem) {
      message = buildSingleProductEnquiryMessage(
        singleItem.product.name,
        singleItem.mode,
        singleItem.quantity,
        singleItem.product.optionalPrice,
        customerPayload
      );
    } else {
      message = buildCartEnquiryMessage(items, customerPayload);
    }

    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');

    // After sending the cart list to WhatsApp, empty the cart and close drawers
    if (!isSingleProduct) {
      clearCart();
      closeCart();
    }

    closeProductEnquiry();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="overlay is-active"
        onClick={closeProductEnquiry}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-enquiry-modal-title"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(94vw, 560px)',
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
              Vee Pee Home Care Order
            </span>
            <h2 id="product-enquiry-modal-title" style={{ fontSize: '1.2rem', lineHeight: 1.2 }}>
              Medical Products &amp; Equipment Order
            </h2>
          </div>

          <button
            type="button"
            className="drawer-close-btn"
            onClick={closeProductEnquiry}
            aria-label="Close Product Order Form"
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
          {/* Privacy & Logistics Notice */}
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
              <strong>Privacy Notice:</strong> This pre-fills a direct WhatsApp message. No sensitive medical records are stored on our servers. Equipment availability, rental deposits, and doorstep delivery will be confirmed by Vee Pee Home Care.
            </span>
          </div>

          {/* Ordered Products Summary Card */}
          <div
            style={{
              marginBottom: '1.15rem',
              padding: '0.85rem 1rem',
              backgroundColor: 'var(--color-warm-ivory)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.55rem',
                borderBottom: '1px solid var(--color-border-subtle)',
                paddingBottom: '0.45rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShoppingBag size={14} style={{ color: 'var(--color-primary)' }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                  {isSingleProduct ? 'Selected Product' : `Order Items (${items.length})`}
                </span>
              </div>
              <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>
                Doorstep delivery in Vellore
              </span>
            </div>

            {isSingleProduct && singleItem ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    position: 'relative',
                    width: 48,
                    height: 48,
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-white)',
                    border: '1px solid var(--color-border)',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={singleItem.product.image}
                    alt={singleItem.product.name}
                    fill
                    sizes="48px"
                    style={{ objectFit: 'contain', padding: '0.2rem' }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                      {singleItem.product.name}
                    </span>
                    <span className={`badge ${singleItem.mode === 'rental' ? 'badge-gold' : 'badge-mint'}`}>
                      {singleItem.mode === 'rental' ? 'Rental' : 'Purchase'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', marginTop: '0.15rem' }}>
                    Qty: {singleItem.quantity} •{' '}
                    <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                      {singleItem.product.optionalPrice !== null
                        ? `₹${(singleItem.product.optionalPrice * singleItem.quantity).toLocaleString('en-IN')}`
                        : 'Price on request'}
                    </span>
                  </div>
                </div>
              </div>
            ) : items.length > 0 ? (
              <div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.45rem',
                    maxHeight: '140px',
                    overflowY: 'auto',
                    paddingRight: '0.25rem',
                  }}
                >
                  {items.map(item => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.65rem',
                        fontSize: '0.8rem',
                        padding: '0.25rem 0',
                        borderBottom: '1px dashed var(--color-border-subtle)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
                        <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>
                          {item.name}
                        </span>
                        <span className={`badge ${item.purchaseOrRental === 'rental' ? 'badge-gold' : 'badge-mint'}`}>
                          {item.purchaseOrRental === 'rental' ? 'Rental' : 'Purchase'}
                        </span>
                        <span style={{ color: 'var(--color-text-muted)' }}>×{item.quantity}</span>
                      </div>
                      <span style={{ fontWeight: 700, color: 'var(--color-primary)', flexShrink: 0 }}>
                        {item.price !== null
                          ? `₹${(item.price * item.quantity).toLocaleString('en-IN')}`
                          : 'On request'}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '0.55rem',
                    paddingTop: '0.45rem',
                    borderTop: '1.5px solid var(--color-border)',
                  }}
                >
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                    Estimated Subtotal:
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.98rem',
                      fontWeight: 800,
                      color: 'var(--color-primary)',
                    }}
                  >
                    {totalPricedAmount > 0
                      ? `₹${totalPricedAmount.toLocaleString('en-IN')}${hasUnpricedItems ? ' + items on request' : ''}`
                      : 'Price on request'}
                  </span>
                </div>
              </div>
            ) : (
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: 0 }}>
                No items selected. Please add products to your cart.
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* 2-Column: Customer Name & Phone */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                gap: '0.85rem',
              }}
            >
              <div className="form-group">
                <label htmlFor="product-customer-name" className="form-label form-label-required">
                  Your Name / Contact Person
                </label>
                <input
                  id="product-customer-name"
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
                <label htmlFor="product-customer-phone" className="form-label form-label-required">
                  Contact Mobile Number
                </label>
                <input
                  id="product-customer-phone"
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

            {/* Delivery Location in Vellore with Live Location Detection */}
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
                  htmlFor="product-delivery-location"
                  className="form-label form-label-required"
                  style={{ marginBottom: 0 }}
                >
                  Delivery Address / Area in Vellore
                </label>

                {/* "Use My Current Location" button (requests browser permission on click) */}
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
                  id="product-delivery-location"
                  type="text"
                  className={`form-input ${errors.deliveryLocation ? 'is-invalid' : ''}`}
                  placeholder="e.g. Melkavanur / Katpadi / Gandhi Nagar, Vellore"
                  value={formData.deliveryLocation}
                  onChange={e => {
                    setFormData({ ...formData, deliveryLocation: e.target.value });
                    if (errors.deliveryLocation) setErrors({ ...errors, deliveryLocation: '' });
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

              {errors.deliveryLocation && <span className="form-error">{errors.deliveryLocation}</span>}
            </div>

            {/* 2-Column: Preferred Date & Urgency/Timing */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                gap: '0.85rem',
              }}
            >
              <div className="form-group">
                <label htmlFor="product-preferred-date" className="form-label">
                  Preferred Delivery Date (Optional)
                </label>
                <input
                  id="product-preferred-date"
                  type="date"
                  className="form-input"
                  value={formData.preferredDate}
                  onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="product-preferred-time" className="form-label">
                  Delivery Timing / Urgency
                </label>
                <select
                  id="product-preferred-time"
                  className="form-select"
                  value={formData.preferredTime}
                  onChange={e => setFormData({ ...formData, preferredTime: e.target.value })}
                >
                  <option value="Immediate / As soon as possible (Urgent)">Immediate / As soon as possible (Urgent)</option>
                  <option value="Morning (8 AM – 12 PM)">Morning (8 AM – 12 PM)</option>
                  <option value="Afternoon (12 PM – 4 PM)">Afternoon (12 PM – 4 PM)</option>
                  <option value="Evening (4 PM – 8 PM)">Evening (4 PM – 8 PM)</option>
                  <option value="Flexible timings">Flexible timings</option>
                </select>
              </div>
            </div>

            {/* Special Instructions / Notes */}
            <div className="form-group" style={{ marginBottom: '0.45rem' }}>
              <label htmlFor="product-notes" className="form-label">
                Special Delivery Notes (Optional)
              </label>
              <textarea
                id="product-notes"
                className="form-textarea"
                rows={2}
                placeholder="e.g. Ground floor / elevator available, landmark near Melkavanur bus stop, urgent oxygen setup needed."
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
                aria-label="Send Order Enquiry on WhatsApp"
              >
                <WhatsAppIcon size={18} fill="var(--color-accent-gold)" />
                <span>Send Order on WhatsApp</span>
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
                Availability, rental deposit, and delivery will be confirmed by Vee Pee Home Care on WhatsApp.
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
