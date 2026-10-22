'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, ShoppingBag } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { BUSINESS_CONFIG } from '@/lib/business';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { useCart } from '@/components/cart/CartProvider';
import { MobileNavDrawer } from './MobileNavDrawer';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { totalCount, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Medical Products', href: '#products' },
    { label: 'Care Packages', href: '#packages' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const whatsappHref = buildWhatsAppUrl(BUSINESS_CONFIG.defaultConsultationMessage);

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 'var(--z-sticky)',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--color-border)',
          boxShadow: isScrolled ? 'var(--shadow-sm)' : 'none',
          transition: 'all var(--transition-normal)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: 'var(--header-height)',
            paddingTop: '0.35rem',
            paddingBottom: '0.35rem',
            gap: '1rem',
          }}
        >
          {/* Brand Logo & Editorial Wordmark */}
          <a
            href="#hero"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              textDecoration: 'none',
              minWidth: 0,
              flexShrink: 1,
            }}
            aria-label={`${BUSINESS_CONFIG.name} Homepage`}
          >
            <div
              className="brand-logo-box"
              style={{
                position: 'relative',
                width: 66,
                height: 66,
                flexShrink: 0,
              }}
            >
              <Image
                src="/images/brand/logo.png"
                alt={`${BUSINESS_CONFIG.name} Official Logo`}
                fill
                sizes="(max-width: 480px) 52px, 66px"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <div style={{ minWidth: 0, overflow: 'hidden' }}>
              <span
                className="brand-title"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.55rem',
                  fontWeight: 800,
                  color: 'var(--color-primary)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.025em',
                  whiteSpace: 'nowrap',
                }}
              >
                Vee Pee <span style={{ color: 'var(--color-text-main)', fontWeight: 600 }}>Home Care</span>
              </span>
              <span
                className="brand-subtitle"
                style={{
                  display: 'block',
                  fontSize: '0.82rem',
                  color: 'var(--color-text-secondary)',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                Healthcare & Equipment • Vellore
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '1.35rem',
            }}
            className="desktop-nav"
            aria-label="Main Navigation"
          >
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--color-text-main)',
                  transition: 'color var(--transition-fast)',
                  padding: '0.35rem 0',
                  position: 'relative',
                }}
                className="header-nav-link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            {/* Cart Trigger Button */}
            <button
              type="button"
              onClick={openCart}
              className="btn btn-secondary btn-sm header-cart-btn"
              style={{
                position: 'relative',
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-soft-mint)',
              }}
              aria-label={`Open Cart, ${totalCount} items`}
            >
              <ShoppingBag size={16} aria-hidden="true" style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
              <span className="cart-text" style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-primary-dark)' }}>Cart</span>
              {totalCount > 0 && (
                <span
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-white)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    minWidth: '18px',
                    height: '18px',
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 3px',
                    marginLeft: '0.15rem',
                  }}
                >
                  {totalCount}
                </span>
              )}
            </button>

            {/* Desktop Refined WhatsApp Consultation CTA */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm desktop-only"
              aria-label="Enquire with Vee Pee Home Care on WhatsApp"
            >
              <WhatsAppIcon size={16} fill="var(--color-accent-gold)" />
              <span>WhatsApp Us</span>
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(true)}
              className="mobile-nav-toggle"
              aria-label="Open Mobile Menu"
              aria-expanded={isMobileNavOpen}
            >
              <Menu size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        links={navLinks}
      />

      <style jsx>{`
        @media (min-width: 1081px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-only {
            display: inline-flex !important;
          }
          .mobile-nav-toggle {
            display: none !important;
          }
        }
        @media (max-width: 1080px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-only {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: flex !important;
          }
        }
        @media (max-width: 640px) {
          .brand-subtitle {
            display: none !important;
          }
          .header-cart-btn {
            padding: 0.45rem 0.65rem !important;
          }
          .cart-text {
            display: none !important;
          }
          .brand-logo-box {
            width: 52px !important;
            height: 52px !important;
          }
          .brand-title {
            font-size: 1.22rem !important;
          }
        }
        @media (max-width: 375px) {
          .brand-logo-box {
            width: 44px !important;
            height: 44px !important;
          }
          .brand-title {
            font-size: 1.08rem !important;
          }
          .mobile-nav-toggle {
            width: 38px !important;
            height: 38px !important;
          }
          .header-cart-btn {
            padding: 0.35rem 0.55rem !important;
          }
        }
        .header-nav-link:hover {
          color: var(--color-primary) !important;
        }
      `}</style>
    </>
  );
}
