'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Eye, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/components/cart/CartProvider';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { items, addItem, openProductModal } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const defaultMode = product.purchaseOrRental === 'rental' ? 'rental' : 'purchase';
  const cartItem = items.find(item => item.productId === product.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addItem(product, defaultMode, 1, false);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1500);
  };

  return (
    <article
      className="card product-card"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.15rem',
        borderRadius: 'var(--radius-lg)',
        position: 'relative',
      }}
    >
      <div>
        {/* Thumbnail Image Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 175,
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-white)',
            border: '1px solid var(--color-border)',
            overflow: 'hidden',
            marginBottom: '0.85rem',
            cursor: 'pointer',
          }}
          onClick={() => openProductModal(product)}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: 'contain', padding: '0.5rem', transition: 'transform var(--transition-normal)' }}
            className="product-img"
          />

          {/* Availability Badge */}
          <div
            style={{
              position: 'absolute',
              top: '0.5rem',
              left: '0.5rem',
            }}
          >
            <span className={`badge ${product.purchaseOrRental === 'rental' ? 'badge-gold' : 'badge-mint'}`}>
              {product.purchaseOrRental === 'rental'
                ? 'Rental'
                : product.purchaseOrRental === 'both'
                ? 'Rental & Sale'
                : 'For Purchase'}
            </span>
          </div>
        </div>

        {/* Category & Title */}
        <span
          style={{
            display: 'block',
            fontSize: '0.72rem',
            fontWeight: 600,
            color: 'var(--color-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: '0.2rem',
          }}
        >
          {product.category}
        </span>

        <h3
          style={{
            fontSize: '1.02rem',
            fontWeight: 700,
            marginBottom: '0.35rem',
            lineHeight: 1.25,
            cursor: 'pointer',
          }}
          onClick={() => openProductModal(product)}
        >
          {product.name}
        </h3>

        <p
          style={{
            fontSize: '0.84rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.5,
            marginBottom: '0.85rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.shortDescription}
        </p>
      </div>

      {/* Pricing & Actions */}
      <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border-subtle)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '0.75rem',
          }}
        >
          <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
            Estimated Rate:
          </span>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              fontWeight: 800,
              color: 'var(--color-primary)',
            }}
          >
            {product.optionalPrice !== null
              ? `₹${product.optionalPrice.toLocaleString('en-IN')}`
              : 'Price on request'}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.45rem' }}>
          <button
            type="button"
            onClick={handleAddToCart}
            className={`btn btn-sm ${justAdded ? 'btn-success' : 'btn-primary'}`}
            style={{
              width: '100%',
              fontSize: '0.82rem',
              backgroundColor: justAdded ? '#1E7E50' : inCartQty > 0 ? '#196F6B' : undefined,
              borderColor: justAdded ? '#1E7E50' : undefined,
              transition: 'all var(--transition-fast)',
            }}
            aria-label={`Add ${product.name} to cart`}
          >
            {justAdded ? (
              <>
                <Check size={15} aria-hidden="true" />
                <span>Added ✓</span>
              </>
            ) : inCartQty > 0 ? (
              <>
                <Plus size={15} aria-hidden="true" />
                <span>Add More ({inCartQty})</span>
              </>
            ) : (
              <>
                <Plus size={15} aria-hidden="true" />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => openProductModal(product)}
            className="btn btn-outline btn-sm"
            style={{ padding: '0.45rem 0.6rem' }}
            title="View Details"
            aria-label={`View details for ${product.name}`}
          >
            <Eye size={15} aria-hidden="true" />
          </button>
        </div>
      </div>

      <style jsx global>{`
        .product-card:hover .product-img {
          transform: scale(1.03);
        }
      `}</style>
    </article>
  );
}
