import { Product } from '@/types';

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'oxygen-concentrator',
    slug: 'oxygen-concentrator',
    name: 'Oxygen Concentrator (5L / 10L)',
    category: 'Respiratory Equipment',
    shortDescription:
      'Continuous medical-grade oxygen delivery system suitable for home therapy as prescribed by your physician.',
    detailedDescription:
      'Provides high-purity continuous oxygen flow with built-in purity alarms and quiet motor operation. Available for flexible rental or direct purchase with doorstep installation in Vellore.',
    image: '/images/products/oxygen-concentrator.jpeg',
    availabilityLabel: 'Rental & Purchase Available',
    purchaseOrRental: 'both',
    optionalPrice: null, // Price on request
    featured: true,
  },
  {
    id: 'manual-cot',
    slug: 'manual-cot',
    name: 'Manual Hospital Cot (1 & 2 Function)',
    category: 'Hospital Furniture',
    shortDescription:
      'Sturdy mechanical patient bed with smooth hand-crank backrest and leg elevation for home recovery.',
    detailedDescription:
      'Equipped with collapsible side safety rails, heavy-duty caster wheels with brakes, and an IV pole holder. Designed for durable home care patient comfort and easy operation.',
    image: '/images/products/manual-cot.jpeg',
    availabilityLabel: 'Rental & Purchase Available',
    purchaseOrRental: 'both',
    optionalPrice: null,
    featured: true,
  },
  {
    id: 'electronic-cot',
    slug: 'electronic-cot',
    name: 'Electronic Motorized Hospital Cot',
    category: 'Hospital Furniture',
    shortDescription:
      'Full-featured motorized hospital bed with handheld remote control for effortless patient re-positioning.',
    detailedDescription:
      'Features electric backrest elevation, knee-rest incline, and overall bed height adjustment. Empowers bedbound patients with greater autonomy and eases caregiver physical strain.',
    image: '/images/products/electronic-cot.jpeg',
    availabilityLabel: 'Rental & Purchase Available',
    purchaseOrRental: 'both',
    optionalPrice: null,
    featured: true,
  },
  {
    id: 'alpha-mattress',
    slug: 'alpha-mattress',
    name: 'Alpha Air Mattress with Pump',
    category: 'Patient Comfort',
    shortDescription:
      'Alternating pressure ripple mattress engineered to prevent and alleviate bedsores for bedridden individuals.',
    detailedDescription:
      'Connected to an ultra-quiet electric air pump that inflates and deflates alternating air cells continuously, promoting blood circulation and relieving localized pressure.',
    image: '/images/products/alpha-mattress.jpeg',
    availabilityLabel: 'Rental & Purchase Available',
    purchaseOrRental: 'both',
    optionalPrice: null,
    featured: true,
  },
  {
    id: 'cpap-bipap-machine',
    slug: 'cpap-bipap-machine',
    name: 'CPAP and BiPAP Machine',
    category: 'Respiratory Equipment',
    shortDescription:
      'Positive airway pressure devices for obstructive sleep apnea, COPD, and nocturnal breathing support.',
    detailedDescription:
      'High-performance respiratory therapy devices featuring humidifiers, comfortable mask options, and pressure tracking. Available on verified prescription with equipment orientation.',
    image: '/images/products/cpap-bipap.jpeg',
    availabilityLabel: 'Rental & Purchase Available',
    purchaseOrRental: 'both',
    optionalPrice: null,
    featured: true,
  },
  {
    id: 'electric-manual-suction',
    slug: 'electric-manual-suction',
    name: 'Suction Machine (Electric & Manual)',
    category: 'Respiratory Equipment',
    shortDescription:
      'Reliable phlegm and secretion aspiration unit for tracheostomy and respiratory congestion care.',
    detailedDescription:
      'Features an oil-free lubrication pump, overflow protection jar, and adjustable negative pressure gauge. Both motorized electric units and portable manual emergency units available.',
    image: '/images/products/suction-machine.jpeg',
    availabilityLabel: 'Rental & Purchase Available',
    purchaseOrRental: 'both',
    optionalPrice: null,
  },
  {
    id: 'iv-stand',
    slug: 'iv-stand',
    name: 'Adjustable IV Stand',
    category: 'Hospital Furniture',
    shortDescription:
      'Height-adjustable stainless steel intravenous pole with four hooks and a smooth rolling castor base.',
    detailedDescription:
      'Constructed with corrosion-resistant stainless steel, stable 5-leg base with locking wheels, and dual or quadruple suspension hooks for infusions and nutrition bags.',
    image: '/images/products/iv-stand.jpeg',
    availabilityLabel: 'Rental & Purchase Available',
    purchaseOrRental: 'both',
    optionalPrice: null,
  },
  {
    id: 'wheelchair-and-walker',
    slug: 'wheelchair-and-walker',
    name: 'Wheelchair and Walker',
    category: 'Mobility Aids',
    shortDescription:
      'Standard folding wheelchairs, commode chairs, and lightweight adjustable aluminium walking frames.',
    detailedDescription:
      'Durable chrome-plated steel frame wheelchairs with padded seating, calf support, and parking brakes. Complementary reciprocal and fixed aluminium folding walkers for gait recovery.',
    image: '/images/products/wheelchair-walker.jpeg',
    availabilityLabel: 'Rental & Purchase Available',
    purchaseOrRental: 'both',
    optionalPrice: null,
    featured: true,
  },
  {
    id: 'nebulizer-kit',
    slug: 'nebulizer-kit',
    name: 'Compressor Nebulizer Kit',
    category: 'Respiratory Equipment',
    shortDescription:
      'Aerosol medication delivery system with adult and pediatric masks for asthma and respiratory relief.',
    detailedDescription:
      'Efficient aerosolization of prescribed inhalable medications into fine droplets for deep lung penetration. Quiet piston-compressor suitable for patients of all age groups.',
    image: '/images/products/nebulizer.jpeg',
    availabilityLabel: 'Available for Purchase',
    purchaseOrRental: 'purchase',
    optionalPrice: null,
  },
  {
    id: 'new-pillow',
    slug: 'new-pillow',
    name: 'Cervical & Orthopaedic Comfort Pillow',
    category: 'Patient Comfort',
    shortDescription:
      'Ergonomically contoured head, neck, and leg elevation pillows designed for bedridden patient comfort.',
    detailedDescription:
      'Hypoallergenic, breathable memory foam support helping maintain spinal alignment and ease pressure while resting during extended periods in bed.',
    image: '/images/products/pillow.jpeg',
    availabilityLabel: 'Available for Purchase',
    purchaseOrRental: 'purchase',
    optionalPrice: null,
  },
  {
    id: 'underpads-and-diapers',
    slug: 'underpads-and-diapers',
    name: 'Underpads and Adult Diapers (All Sizes)',
    category: 'Hygiene & Consumables',
    shortDescription:
      'Super-absorbent disposable adult tape & pant diapers (M, L, XL, XXL) and waterproof bed underpads.',
    detailedDescription:
      'Features high-capacity SAP gel cores with leak guards, wetness indicators, and breathable textile backings to keep skin dry and prevent moisture lesions.',
    image: '/images/products/underpads-diapers.jpeg',
    availabilityLabel: 'Available for Purchase',
    purchaseOrRental: 'purchase',
    optionalPrice: null,
  },
  {
    id: 'disposable-wipes',
    slug: 'disposable-wipes',
    name: 'Disposable Patient Wipes (Wet & Dry)',
    category: 'Hygiene & Consumables',
    shortDescription:
      'Extra-large dermatologically tested antimicrobial moist cleansing wipes and soft dry washcloths.',
    detailedDescription:
      'Alcohol-free, pH balanced wipes enriched with aloe vera and vitamin E. Ideal for full-body bed bathing, quick cleanups, and fragile elderly skin care.',
    image: '/images/products/disposable-wipes.jpeg',
    availabilityLabel: 'Available for Purchase',
    purchaseOrRental: 'purchase',
    optionalPrice: null,
  },
  {
    id: 'bp-apparatus',
    slug: 'bp-apparatus',
    name: 'BP Apparatus (Digital & Aneroid)',
    category: 'Diagnostic Instruments',
    shortDescription:
      'Accurate upper-arm digital blood pressure monitor with hypertension indicator and large display.',
    detailedDescription:
      'Clinically validated oscillometric measurement with irregular heartbeat detection and multi-memory storage for tracking historical daily readings.',
    image: '/images/products/bp-apparatus.jpeg',
    availabilityLabel: 'Available for Purchase',
    purchaseOrRental: 'purchase',
    optionalPrice: null,
    featured: true,
  },
  {
    id: 'digital-thermometer',
    slug: 'digital-thermometer',
    name: 'Digital Thermometer',
    category: 'Diagnostic Instruments',
    shortDescription:
      'Fast 30-second oral, axillary, and rectal fever monitoring thermometer with fever beeper alarm.',
    detailedDescription:
      'Waterproof, flexible probe with dual Celsius/Fahrenheit scale and automatic power-off. Crucial for routine infection and post-operative monitoring at home.',
    image: '/images/products/digital-thermometer.jpeg',
    availabilityLabel: 'Available for Purchase',
    purchaseOrRental: 'purchase',
    optionalPrice: null,
  },
  {
    id: 'pulse-oximeter',
    slug: 'pulse-oximeter',
    name: 'Fingertip Pulse Oximeter',
    category: 'Diagnostic Instruments',
    shortDescription:
      'Instant non-invasive measurement of blood oxygen saturation (SpO₂) and pulse rate with OLED display.',
    detailedDescription:
      'Dual-color display with plethysmograph waveform, perfusion index (PI%), and low battery indicator. Compact and essential for respiratory monitoring.',
    image: '/images/products/pulse-oximeter.jpeg',
    availabilityLabel: 'Available for Purchase',
    purchaseOrRental: 'purchase',
    optionalPrice: null,
    featured: true,
  },
  {
    id: 'stethoscope',
    slug: 'stethoscope',
    name: 'Clinical Dual-Head Stethoscope',
    category: 'Diagnostic Instruments',
    shortDescription:
      'Acoustic stethoscope with diaphragm and bell chest-piece for pulmonary and cardiovascular assessment.',
    detailedDescription:
      'Precision machined stainless steel chest piece with soft-sealing eartips, non-chill rim, and flexible tubing for clear acoustic auscultation.',
    image: '/images/products/stethoscope.jpeg',
    availabilityLabel: 'Available for Purchase',
    purchaseOrRental: 'purchase',
    optionalPrice: null,
  },
  {
    id: 'glucometer-and-strips',
    slug: 'glucometer-and-strips',
    name: 'Glucometer Kit and Test Strips',
    category: 'Diagnostic Instruments',
    shortDescription:
      'Rapid 5-second blood glucose testing meter with lancing device, sterile lancets, and test strips.',
    detailedDescription:
      'Requires tiny 0.5 µL blood sample with no coding required. Stores up to 500 tests with meal markers to help manage diabetes effectively.',
    image: '/images/products/glucometer.jpeg',
    availabilityLabel: 'Available for Purchase',
    purchaseOrRental: 'purchase',
    optionalPrice: null,
  },
  {
    id: 'sterile-clean-gloves',
    slug: 'sterile-clean-gloves',
    name: 'Gloves (Sterile Surgical & Clean Exam)',
    category: 'Hygiene & Consumables',
    shortDescription:
      'High-tensile powder-free nitrile and latex disposable gloves for patient handling and aseptic procedures.',
    detailedDescription:
      'Individually packaged sterile pairs for wound dressing and catheter handling, as well as bulk boxes of clean ambidextrous examination gloves.',
    image: '/images/products/gloves.jpeg',
    availabilityLabel: 'Available for Purchase',
    purchaseOrRental: 'purchase',
    optionalPrice: null,
  },
  {
    id: 'hand-rub',
    slug: 'hand-rub',
    name: 'Antiseptic Hand Rub (Alcohol-Based)',
    category: 'Hygiene & Consumables',
    shortDescription:
      'Hospital-grade broad-spectrum surgical spirit and isopropyl alcohol hand disinfectant rub with emollient.',
    detailedDescription:
      '70%+ alcohol formulation effective against bacteria, viruses, and fungi with built-in skin moisturizers to prevent dryness during frequent hand sanitization.',
    image: '/images/products/hand-rub.jpeg',
    availabilityLabel: 'Available for Purchase',
    purchaseOrRental: 'purchase',
    optionalPrice: null,
  },
];
