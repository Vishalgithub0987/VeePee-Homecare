'use client';

import React, { useState, useMemo } from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState<'all' | 'rental' | 'purchase'>('all');

  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category));
    return ['All', ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Availability filter
      if (selectedAvailability === 'rental') {
        if (product.purchaseOrRental !== 'rental' && product.purchaseOrRental !== 'both') return false;
      } else if (selectedAvailability === 'purchase') {
        if (product.purchaseOrRental !== 'purchase' && product.purchaseOrRental !== 'both') return false;
      }

      // Search query
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.shortDescription.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCategory) return false;
      }

      return true;
    });
  }, [products, selectedCategory, selectedAvailability, searchQuery]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedAvailability('all');
  };

  return (
    <div>
      {/* Controls Bar: Search & Filter Tabs */}
      <div
        style={{
          backgroundColor: 'var(--color-white)',
          padding: 'clamp(0.85rem, 3vw, 1.15rem)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-xs)',
          marginBottom: '1.75rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
          }}
        >
          {/* Search Input & Mode Filter */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.65rem',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Search Box */}
            <div style={{ position: 'relative', flex: '1 1 240px', minWidth: 'min(100%, 200px)' }}>
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-muted)',
                }}
                aria-hidden="true"
              />
              <input
                type="search"
                className="form-input"
                placeholder="Search products by name, equipment, or symptom..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '2.35rem', fontSize: '0.88rem' }}
                aria-label="Search medical products"
              />
            </div>

            {/* Quick Rental vs Purchase Pill Tabs */}
            <div
              style={{
                display: 'inline-flex',
                backgroundColor: 'var(--color-warm-ivory)',
                padding: '3px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
              }}
            >
              {[
                { id: 'all', label: 'All Items' },
                { id: 'rental', label: 'Rental Available' },
                { id: 'purchase', label: 'For Sale' },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedAvailability(tab.id as 'all' | 'rental' | 'purchase')}
                  style={{
                    padding: '0.38rem 0.75rem',
                    fontSize: '0.78rem',
                    fontWeight: selectedAvailability === tab.id ? 700 : 500,
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: selectedAvailability === tab.id ? 'var(--color-primary)' : 'transparent',
                    color: selectedAvailability === tab.id ? 'var(--color-white)' : 'var(--color-text-secondary)',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Chips Horizontal Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              overflowX: 'auto',
              paddingBottom: '0.2rem',
              scrollbarWidth: 'thin',
            }}
            role="tablist"
            aria-label="Product Categories"
          >
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.35rem 0.8rem',
                  fontSize: '0.82rem',
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  borderRadius: 'var(--radius-full)',
                  whiteSpace: 'nowrap',
                  border: '1px solid',
                  borderColor: selectedCategory === cat ? 'var(--color-primary)' : 'var(--color-border)',
                  backgroundColor: selectedCategory === cat ? 'var(--color-soft-mint)' : 'var(--color-white)',
                  color: selectedCategory === cat ? 'var(--color-primary)' : 'var(--color-text-main)',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count & Meta */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          fontSize: '0.84rem',
          color: 'var(--color-text-secondary)',
        }}
      >
        <span>
          Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> medical product groups
        </span>

        {(searchQuery || selectedCategory !== 'All' || selectedAvailability !== 'all') && (
          <button
            type="button"
            onClick={handleReset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.8rem',
              color: 'var(--color-primary)',
              fontWeight: 600,
            }}
          >
            <RefreshCw size={12} />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Grid of Cards */}
      {filteredProducts.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))',
            gap: 'clamp(1rem, 2vw, 1.25rem)',
          }}
        >
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '3.5rem 1.5rem',
            backgroundColor: 'var(--color-white)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
          }}
        >
          <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.45rem' }}>
            No matching medical products found
          </p>
          <p style={{ fontSize: '0.88rem', marginBottom: '1.15rem' }}>
            Try adjusting your search terms or clearing the selected category filters.
          </p>
          <button type="button" onClick={handleReset} className="btn btn-secondary btn-sm">
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
