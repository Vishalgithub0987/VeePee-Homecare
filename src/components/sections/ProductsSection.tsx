'use client';

import React from 'react';
import { PRODUCTS_DATA } from '@/data/products';
import { ProductGrid } from '@/components/products/ProductGrid';

export function ProductsSection() {
  return (
    <section id="products" className="section section-alt" aria-label="Medical Products and Equipment Catalogue">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-eyebrow">Medical Supplies &amp; Equipment</span>
          <h2 className="section-title">Medical Products &amp; Equipment Catalogue</h2>
          <p className="section-subtitle">
            Reliable, hygienic medical equipment and recovery essentials available for doorstep rental or direct purchase in Vellore. Add items to your cart to request terms and availability.
          </p>
        </div>

        {/* Product Grid with Filters & Live Search */}
        <ProductGrid products={PRODUCTS_DATA} />

        {/* Equipment Maintenance & Delivery Note */}
        <div
          style={{
            marginTop: '2.5rem',
            padding: '1rem 1.25rem',
            backgroundColor: 'var(--color-white)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            fontSize: '0.84rem',
            color: 'var(--color-text-secondary)',
            textAlign: 'center',
            maxWidth: '1000px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <strong style={{ color: 'var(--color-text-main)' }}>Sanitization &amp; Delivery Standards:</strong>{' '}
          All rental cots, mattresses, and respiratory devices are thoroughly inspected, disinfected, and tested prior to dispatch. Doorstep setup and basic operational guidance are provided by our staff at the time of delivery in Vellore.
        </div>
      </div>
    </section>
  );
}
