import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { BenefitsSection } from '@/components/sections/BenefitsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { CarePackagesSection } from '@/components/sections/CarePackagesSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { WhyChooseUsSection } from '@/components/sections/WhyChooseUsSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { CareApproachSection } from '@/components/sections/CareApproachSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section with Benefit Highlights */}
      <HeroSection />

      {/* 2. Trust & Service Principles */}
      <BenefitsSection />

      {/* 3. About Vee Pee Home Care */}
      <AboutSection />

      {/* 4. Complete Services Catalogue (All 15 Categories) */}
      <ServicesSection />

      {/* 5. Flexible Care Duration Packages */}
      <CarePackagesSection />

      {/* 6. Medical Products & Equipment Catalogue (All 19 Groups) */}
      <ProductsSection />

      {/* 7. Why Choose Vee Pee Home Care */}
      <WhyChooseUsSection />

      {/* 8. Simple 4-Step How It Works Flow */}
      <HowItWorksSection />

      {/* 9. Our Care Approach (Compassion & Dignity) */}
      <CareApproachSection />

      {/* 10. Frequently Asked Questions */}
      <FAQSection />

      {/* 11. Contact Details & Service Coverage Area */}
      <ContactSection />
    </>
  );
}
