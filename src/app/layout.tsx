import type { Metadata, Viewport } from 'next';
import './globals.css';
import { BUSINESS_CONFIG } from '@/lib/business';
import { CartProvider } from '@/components/cart/CartProvider';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingNurseAssistant } from '@/components/layout/FloatingNurseAssistant';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ServiceEnquiryForm } from '@/components/forms/ServiceEnquiryForm';
import { ProductEnquiryForm } from '@/components/forms/ProductEnquiryForm';
import { ProductDetailDrawer } from '@/components/products/ProductDetailDrawer';
import { NavigationHandler } from '@/components/layout/NavigationHandler';
import { CartNotificationToast } from '@/components/cart/CartNotificationToast';

export const metadata: Metadata = {
  title: 'Vee Pee Home Care | Home Healthcare & Medical Equipment Support in Vellore',
  description:
    'Compassionate home nursing, elderly care, and medical equipment rental & supplies in Vellore, Tamil Nadu. Oxygen concentrators, hospital beds, CPAP/BiPAP, and vitals monitoring. Enquire on WhatsApp.',
  keywords: [
    'Vee Pee Home Care',
    'home healthcare Vellore',
    'home nursing care Vellore',
    'elderly patient care Vellore',
    'medical equipment rental Vellore',
    'oxygen concentrator rental Vellore',
    'hospital bed rental Vellore',
    'bedridden patient care Vellore',
    'Vellore home care services',
  ],
  authors: [{ name: 'Vee Pee Home Care' }],
  metadataBase: new URL('https://veepeehomecare.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/images/brand/logo.png', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/images/brand/logo.png',
    apple: '/images/brand/logo.png',
  },
  openGraph: {
    title: 'Vee Pee Home Care — Trusted Care. Comfort of Home.',
    description:
      'Personalised home nursing, elderly patient care, and essential medical equipment rentals in Vellore, Tamil Nadu. Direct WhatsApp enquiry.',
    url: 'https://veepeehomecare.com',
    siteName: 'Vee Pee Home Care',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/hero/hero-caregiver.svg',
        width: 1200,
        height: 630,
        alt: 'Vee Pee Home Care — Home Healthcare & Medical Equipment in Vellore',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#145C59',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data Schema for LocalBusiness
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BUSINESS_CONFIG.name,
    alternateName: BUSINESS_CONFIG.shortBrand,
    description:
      'Compassionate home nursing, elderly care, and medical equipment rental & supplies in Vellore, Tamil Nadu.',
    telephone: BUSINESS_CONFIG.phone,
    email: BUSINESS_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '101/A, Perumal Kovil Street, Melkavanur',
      addressLocality: 'Vellore',
      addressRegion: 'Tamil Nadu',
      postalCode: '632209',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'City',
      name: 'Vellore',
    },
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Bank Transfer',
    priceRange: '₹₹',
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if ('scrollRestoration' in history) {
                  history.scrollRestoration = 'manual';
                }
                if (window.location.hash) {
                  history.replaceState(null, '', window.location.pathname);
                }
                window.scrollTo(0, 0);
              } catch (e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NavigationHandler />
        <CartProvider>
          {/* Top Announcement Strip */}
          <AnnouncementBar />

          {/* Main Navigation Header */}
          <Header />

          {/* Main Content Area */}
          <main id="main-content" style={{ flex: 1 }}>
            {children}
          </main>

          {/* Semantic Footer */}
          <Footer />

          {/* Persistent Floating Nurse Assistant */}
          <FloatingNurseAssistant />

          {/* Slide-over Cart Drawer */}
          <CartDrawer />

          {/* Healthcare Service Request Modal */}
          <ServiceEnquiryForm />

          {/* Medical Product & Equipment Order Modal */}
          <ProductEnquiryForm />

          {/* Product Detail & Quick Enquiry Drawer */}
          <ProductDetailDrawer />

          {/* Non-intrusive Floating Cart Added Notification */}
          <CartNotificationToast />
        </CartProvider>
      </body>
    </html>
  );
}
