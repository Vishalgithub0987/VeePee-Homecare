# Vee Pee Home Care — Production-Ready Website

A modern, compassionate, conversion-focused healthcare website and medical equipment rental/supply portal built for **Vee Pee Home Care**, based in Vellore, Tamil Nadu, India.

---

## 🏥 Business Details

- **Official Brand Name**: Vee Pee Home Care (*Editorial phrase: "Vee Pee Cares"*)
- **Phone**: `+91 93440 62629`
- **WhatsApp**: `+91 93440 62629` (International: `919344062629`)
- **Email**: `veepeehomecare@gmail.com`
- **Address**: `101/A, Perumal Kovil Street, Melkavanur, Vellore - 632209, Tamil Nadu, India`
- **Service Area**: Vellore City, Katpadi, Melkavanur, Bagayam, Sathuvachari, Thorapadi, Gandhi Nagar, Ranipet, and surrounding serviceable areas in Tamil Nadu.

---

## 🚀 Key Features

1. **Complete Services Catalogue (All 15 Services)**:
   - Home Nursing Care, Elderly Care, Post-Hospital Discharge Care, Bedridden Patient Care, Respiratory Care Support, Rehabilitation Support, Medical Equipment Rental, Mother and Baby Support, Palliative Care Support, Diabetes Care Support, Dementia Care, Night Nursing, Doctor Visit Coordination, Sample Collection, and Emergency Transport Coordination.
   - Interactive category filtering (Nursing, Caregiver, Specialized, Equipment, Coordination).
   - "Enquire About This Service" modal with Indian phone number validation and pre-filled WhatsApp routing.

2. **Medical Products & Equipment Catalogue (All 19 Groups)**:
   - Oxygen Concentrator (5L/10L), Manual Cot, Electronic Cot, Alpha Air Mattress, CPAP/BiPAP Machines, Suction Machines, IV Stand, Wheelchair & Walker, Nebulizer Kit, Orthopaedic Pillow, Underpads & Adult Diapers, Disposable Cleansing Wipes, BP Apparatus, Digital Thermometer, Pulse Oximeter, Stethoscope, Glucometer & Strips, Medical Gloves, and Antiseptic Hand Rub.
   - Live real-time search and category filtering.
   - Transparent "Price on request" handling without fabricated amounts.

3. **Persistent Floating Nurse Assistant**:
   - Fixed bottom-right consultation button using a locally stored vector illustration (`/images/assistant/nurse-assistant.svg`).
   - Tapping directly opens WhatsApp consultation with pre-filled enquiry text.

4. **Product Enquiry Cart & LocalStorage Persistence**:
   - Slide-over cart drawer with quantity adjustments, item removal, and subtotal calculation.
   - Client-safe LocalStorage persistence (`veepee_cart_v1`) with zero hydration mismatch.
   - Formatted WhatsApp message checkout where customers press Send manually.

5. **Flexible Care Packages**:
   - Basic Care (2–4 hrs), Half-Day Care (6–8 hrs), Full-Day Care (10–12 hrs), Night Care, 24-Hour Continuous Care, and Equipment Rental.

6. **Responsible Healthcare Disclaimers & Our Care Approach**:
   - No fake testimonials, fabricated star ratings, or false clinical guarantees.
   - Replaced with an ethical "Our Care Approach" section and prominent emergency notices (dial 108 for acute emergencies).

7. **Mobile-First & Touch-Optimized**:
   - Sticky bottom mobile action bar (WhatsApp, Services, Cart).
   - Fluid typography with CSS `clamp()`, zero horizontal overflow, and accessible touch targets.

8. **SEO & Accessibility (WCAG 2.2 AA)**:
   - Schema.org `LocalBusiness` JSON-LD structured data.
   - Semantic HTML, visible focus states, sitemap.xml, robots.txt, and metadata.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS with CSS Custom Properties (Variables)
- **Icons**: Lucide React
- **Static Export**: Configured with `output: 'export'` for 100% static hosting compatibility (zero backend or database dependencies).

---

## 📂 Project Structure

```text
VeePee/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/
│       ├── brand/
│       │   └── logo.png                # Business logo
│       ├── assistant/
│       │   └── nurse-assistant.svg     # Persistent floating assistant vector
│       ├── hero/
│       │   └── hero-caregiver.svg      # Hero section visual composition
│       ├── services/                   # All 15 service vector illustrations
│       └── products/                   # All 19 medical product vector illustrations
├── src/
│   ├── app/
│   │   ├── globals.css                 # Master design system tokens & typography
│   │   ├── layout.tsx                  # Root layout, SEO metadata, JSON-LD, CartProvider
│   │   ├── not-found.tsx               # Accessible 404 page
│   │   └── page.tsx                    # Main landing page
│   ├── components/
│   │   ├── cart/
│   │   │   ├── CartDrawer.tsx          # Slide-over cart panel with quantity controls
│   │   │   └── CartProvider.tsx        # React context & LocalStorage state manager
│   │   ├── forms/
│   │   │   └── ServiceEnquiryForm.tsx  # Service booking modal with validation
│   │   ├── layout/
│   │   │   ├── AnnouncementBar.tsx     # Top service location banner
│   │   │   ├── FloatingNurseAssistant.tsx # Fixed WhatsApp consultation widget
│   │   │   ├── Footer.tsx              # Semantic footer with emergency notice
│   │   │   ├── Header.tsx              # Sticky header with logo & navigation
│   │   │   ├── MobileActionBar.tsx     # Sticky mobile bottom quick actions
│   │   │   └── MobileNavDrawer.tsx     # Accessible slide-in mobile navigation
│   │   ├── products/
│   │   │   ├── ProductCard.tsx         # Product card with price/quote badges
│   │   │   ├── ProductDetailDrawer.tsx # Modal with purchase/rental selector
│   │   │   └── ProductGrid.tsx         # Live search & category filters
│   │   └── sections/
│   │       ├── AboutSection.tsx        # Brand philosophy and Vellore support
│   │       ├── BenefitsSection.tsx     # Value propositions and guiding values
│   │       ├── CareApproachSection.tsx # Ethical care principles (empathy, dignity)
│   │       ├── CarePackagesSection.tsx # 6 duration categories
│   │       ├── ContactSection.tsx      # Contact cards, map link, service coverage
│   │       ├── FAQSection.tsx          # Accordion answering all 9 questions
│   │       ├── HeroSection.tsx         # Primary hero with 3 key benefit points
│   │       ├── HowItWorksSection.tsx   # 4-step enquiry workflow
│   │       ├── ProductsSection.tsx     # Product catalogue wrapper
│   │       └── ServicesSection.tsx     # 15 services with clinical tags
│   ├── data/
│   │   ├── faqs.ts                     # FAQ question/answer dataset
│   │   ├── packages.ts                 # Care duration packages dataset
│   │   ├── products.ts                 # 19 medical products dataset
│   │   └── services.ts                 # 15 healthcare services dataset
│   ├── lib/
│   │   ├── business.ts                 # Single source of truth for business details
│   │   ├── validation.ts               # Indian phone validation utilities
│   │   └── whatsapp.ts                 # WhatsApp URL & message generation
│   └── types/
│       └── index.ts                    # TypeScript models
├── next.config.mjs                     # Static export configuration
├── package.json
└── tsconfig.json
```

---

## 💻 Getting Started Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production / Static Export
```bash
npm run build
```
This generates the optimized static build inside the `out/` folder ready for deployment.

---

## 🔧 Customization Guide

### 1. How to Update Business Details (Phone, Email, Address)
Open [`src/lib/business.ts`](file:///c:/Users/sofiy/Desktop/VeePee/src/lib/business.ts):
```typescript
export const BUSINESS_CONFIG = {
  name: 'Vee Pee Home Care',
  phone: '+91 93440 62629',
  rawPhone: '9344062629',
  whatsappNumber: '919344062629', // No + or spaces
  email: 'veepeehomecare@gmail.com',
  address: '101/A, Perumal Kovil Street, Melkavanur, Vellore - 632209, Tamil Nadu, India',
  // ...
};
```
Every component, footer, header, and WhatsApp generator pulls from this single file.

### 2. How to Update Product Data or Add New Products
Edit [`src/data/products.ts`](file:///c:/Users/sofiy/Desktop/VeePee/src/data/products.ts). Each item conforms to the typed `Product` interface:
```typescript
{
  id: 'oxygen-concentrator',
  slug: 'oxygen-concentrator',
  name: 'Oxygen Concentrator (5L / 10L)',
  category: 'Respiratory Equipment',
  shortDescription: '...',
  image: '/images/products/oxygen-concentrator.svg',
  availabilityLabel: 'Rental & Purchase Available',
  purchaseOrRental: 'both',
  optionalPrice: null, // Set to a number e.g. 45000 or null for "Price on request"
  featured: true,
}
```

### 3. Where Local Images Must Be Stored
All images are hosted inside `public/images/`:
- Brand Logo: `public/images/brand/logo.png`
- Floating Nurse Assistant: `public/images/assistant/nurse-assistant.svg`
- Hero Composition: `public/images/hero/hero-caregiver.svg`
- Service Artwork: `public/images/services/*.svg`
- Product Images: `public/images/products/*.svg`

### 4. How to Replace the Nurse Assistant Illustration
Replace `public/images/assistant/nurse-assistant.svg` with your own SVG, PNG, or WebP graphic. If using a different file format (e.g., `nurse-assistant.png`), update the image path in [`src/components/layout/FloatingNurseAssistant.tsx`](file:///c:/Users/sofiy/Desktop/VeePee/src/components/layout/FloatingNurseAssistant.tsx).

---

## 🌐 Deployment Instructions

Because the project is configured with `output: 'export'`, the website can be deployed statically to any web server or host.

### Deploying to Vercel
1. Push this repository to GitHub/GitLab.
2. Import the project in [Vercel](https://vercel.com).
3. Vercel automatically detects Next.js. Click **Deploy**.

### Deploying to Netlify
1. Connect your repository to [Netlify](https://www.netlify.com).
2. Set Build Command: `npm run build`
3. Set Publish Directory: `out`
4. Click **Deploy Site**.

### Deploying to GitHub Pages or Shared cPanel / Apache / Nginx
1. Run `npm run build`.
2. Upload the contents of the `out/` directory directly to your web server root (e.g. `public_html`).

---

## 🔒 Intentionally Excluded Backend Features

In compliance with the project architecture:
- **No Database / Server Backend**: Enquiries are client-side and sent directly via pre-filled WhatsApp links.
- **No WhatsApp Cloud API / OTPs**: Eliminates recurring API charges and privacy risks. The customer manually taps Send in WhatsApp.
- **No Fake Payment Gateways**: Prevents false booking claims; pricing and deposits are confirmed transparently by Vee Pee Home Care coordinators.
