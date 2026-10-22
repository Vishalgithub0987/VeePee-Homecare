import fs from 'node:fs';
import path from 'node:path';

const servicesDir = path.resolve('public/images/services');
const productsDir = path.resolve('public/images/products');

fs.mkdirSync(servicesDir, { recursive: true });
fs.mkdirSync(productsDir, { recursive: true });

function createSvgWrapper(title, subtitle, iconSvg, accentColor = '#145C59') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCFBF7"/>
      <stop offset="100%" stop-color="#EAF5F1"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#237A73"/>
      <stop offset="100%" stop-color="#145C59"/>
    </linearGradient>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#145C59" flood-opacity="0.12"/>
    </filter>
  </defs>

  <!-- Card Frame -->
  <rect width="320" height="200" rx="16" fill="url(#bgGrad)" stroke="#E2EAE7" stroke-width="1.5"/>

  <!-- Decorative healthcare background circles -->
  <circle cx="270" cy="40" r="50" fill="#EAF5F1" opacity="0.6"/>
  <circle cx="40" cy="160" r="40" fill="#EAF5F1" opacity="0.4"/>

  <!-- Central Emblem with Glow -->
  <g filter="url(#softGlow)">
    <circle cx="160" cy="80" r="44" fill="#FFFFFF" stroke="#E2EAE7" stroke-width="2"/>
    <circle cx="160" cy="80" r="36" fill="#EAF5F1"/>
  </g>

  <!-- Vector Icon Content -->
  <g transform="translate(136, 56)">
    ${iconSvg}
  </g>

  <!-- Card Labels -->
  <text x="160" y="148" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#24343B" text-anchor="middle">${title}</text>
  <text x="160" y="168" font-family="Inter, sans-serif" font-size="11" font-weight="500" fill="#66777C" text-anchor="middle">${subtitle}</text>
</svg>`;
}

const services = [
  {
    name: 'home-nursing.svg',
    title: 'Home Nursing Care',
    subtitle: 'Vitals & Clinical Administration',
    icon: `<path d="M24 6 L24 42 M6 24 L42 24" stroke="#145C59" stroke-width="5" stroke-linecap="round"/><circle cx="24" cy="24" r="20" fill="none" stroke="#237A73" stroke-width="2" stroke-dasharray="4 3"/>`
  },
  {
    name: 'elderly-care.svg',
    title: 'Elderly Patient Care',
    subtitle: 'Dignified Daily Living Support',
    icon: `<path d="M12 28 C12 20 20 16 24 22 C28 16 36 20 36 28 C36 36 24 42 24 42 C24 42 12 36 12 28 Z" fill="#D6B46A" stroke="#145C59" stroke-width="2.5"/><circle cx="24" cy="12" r="5" fill="#145C59"/>`
  },
  {
    name: 'post-discharge.svg',
    title: 'Post-Discharge Recovery',
    subtitle: 'Surgical & Wound Observation',
    icon: `<rect x="8" y="12" width="32" height="28" rx="4" fill="none" stroke="#145C59" stroke-width="3"/><path d="M8 20 L40 20 M20 20 L20 40 M28 20 L28 40" stroke="#237A73" stroke-width="2"/><path d="M16 6 L32 6" stroke="#D6B46A" stroke-width="3" stroke-linecap="round"/>`
  },
  {
    name: 'bedridden-care.svg',
    title: 'Bedridden Patient Care',
    subtitle: 'Pressure Injury Prevention & Hygiene',
    icon: `<rect x="6" y="24" width="36" height="12" rx="3" fill="#237A73"/><circle cx="14" cy="18" r="6" fill="#D6B46A"/><line x1="6" y1="20" x2="6" y2="40" stroke="#145C59" stroke-width="3" stroke-linecap="round"/><line x1="42" y1="26" x2="42" y2="40" stroke="#145C59" stroke-width="3" stroke-linecap="round"/>`
  },
  {
    name: 'respiratory-care.svg',
    title: 'Respiratory Support',
    subtitle: 'Oxygen & Ventilation Assistance',
    icon: `<path d="M8 20 C14 20 16 14 22 14 C28 14 30 20 36 20 M6 28 C12 28 16 22 24 22 C32 22 36 28 42 28 M10 36 C16 36 20 32 26 32 C32 32 36 36 40 36" fill="none" stroke="#145C59" stroke-width="3.5" stroke-linecap="round"/>`
  },
  {
    name: 'rehabilitation.svg',
    title: 'Rehabilitation Support',
    subtitle: 'Mobility & Physical Therapy Help',
    icon: `<circle cx="24" cy="10" r="5" fill="#145C59"/><path d="M16 22 L24 16 L32 22 L24 30 L24 40 M18 42 L24 38 L30 42" fill="none" stroke="#237A73" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`
  },
  {
    name: 'equipment-rental.svg',
    title: 'Medical Equipment Rental',
    subtitle: 'Beds, Monitors & Therapy Units',
    icon: `<rect x="8" y="10" width="32" height="24" rx="4" fill="none" stroke="#145C59" stroke-width="3"/><circle cx="16" cy="38" r="3" fill="#237A73"/><circle cx="32" cy="38" r="3" fill="#237A73"/><line x1="24" y1="18" x2="24" y2="26" stroke="#D6B46A" stroke-width="3" stroke-linecap="round"/>`
  },
  {
    name: 'mother-baby.svg',
    title: 'Mother & Baby Support',
    subtitle: 'Postpartum & Newborn Care',
    icon: `<circle cx="20" cy="16" r="6" fill="#145C59"/><circle cx="32" cy="20" r="4" fill="#D6B46A"/><path d="M12 36 C12 26 28 26 28 36 Z" fill="#237A73"/><path d="M26 36 C26 30 36 30 36 36 Z" fill="#D6B46A"/>`
  },
  {
    name: 'palliative-care.svg',
    title: 'Palliative Care Support',
    subtitle: 'Compassion & Symptom Relief',
    icon: `<path d="M24 8 C16 16 10 24 10 32 C10 40 16 44 24 44 C32 44 38 40 38 32 C38 24 32 16 24 8 Z" fill="none" stroke="#145C59" stroke-width="3"/><path d="M24 20 L24 34 M18 26 L30 26" stroke="#D6B46A" stroke-width="2.5" stroke-linecap="round"/>`
  },
  {
    name: 'diabetes-care.svg',
    title: 'Diabetes Care Support',
    subtitle: 'Glucose Tracking & Education',
    icon: `<path d="M24 8 C18 18 14 26 14 32 C14 38 18 42 24 42 C30 42 34 38 34 32 C34 26 30 18 24 8 Z" fill="#EAF5F1" stroke="#145C59" stroke-width="2.5"/><circle cx="24" cy="30" r="4" fill="#B54747"/>`
  },
  {
    name: 'dementia-care.svg',
    title: 'Dementia Care Support',
    subtitle: 'Supervision & Calming Routines',
    icon: `<circle cx="24" cy="24" r="16" fill="none" stroke="#145C59" stroke-width="2.5"/><path d="M16 24 Q24 14 32 24 Q24 34 16 24" fill="none" stroke="#D6B46A" stroke-width="2.5"/><circle cx="24" cy="24" r="3" fill="#237A73"/>`
  },
  {
    name: 'night-nursing.svg',
    title: 'Night Nursing Care',
    subtitle: 'Overnight Monitoring & Assistance',
    icon: `<path d="M28 10 C18 10 14 18 14 28 C14 38 22 42 32 40 C24 36 22 24 26 16 C27 13 28 11 28 10 Z" fill="#145C59"/><circle cx="34" cy="14" r="2.5" fill="#D6B46A"/><circle cx="38" cy="22" r="1.5" fill="#D6B46A"/>`
  },
  {
    name: 'doctor-visit.svg',
    title: 'Doctor Visit Coordination',
    subtitle: 'Physician Home Consultations',
    icon: `<circle cx="24" cy="14" r="7" fill="#145C59"/><path d="M10 40 C10 28 20 26 24 26 C28 26 38 28 38 40 Z" fill="#237A73"/><circle cx="24" cy="32" r="2" fill="#D6B46A"/>`
  },
  {
    name: 'sample-collection.svg',
    title: 'Sample Collection',
    subtitle: 'Accredited Pathology Support',
    icon: `<rect x="18" y="10" width="12" height="26" rx="6" fill="none" stroke="#145C59" stroke-width="3"/><rect x="16" y="8" width="16" height="4" rx="1" fill="#D6B46A"/><path d="M20 24 L28 24 M20 28 L28 28 M20 32 L28 32" stroke="#237A73" stroke-width="2"/>`
  },
  {
    name: 'emergency-transport.svg',
    title: 'Ambulance Coordination',
    subtitle: 'Licensed Emergency Transit',
    icon: `<rect x="6" y="16" width="30" height="18" rx="3" fill="none" stroke="#145C59" stroke-width="3"/><path d="M36 22 L42 26 L42 34 L36 34 Z" fill="#237A73"/><circle cx="14" cy="36" r="4" fill="#24343B"/><circle cx="34" cy="36" r="4" fill="#24343B"/><path d="M18 25 L24 25 M21 22 L21 28" stroke="#B54747" stroke-width="2.5" stroke-linecap="round"/>`
  }
];

services.forEach(s => {
  const filePath = path.join(servicesDir, s.name);
  fs.writeFileSync(filePath, createSvgWrapper(s.title, s.subtitle, s.icon));
});

const products = [
  {
    name: 'oxygen-concentrator.svg',
    title: 'Oxygen Concentrator',
    subtitle: '5L & 10L High Purity Flow',
    icon: `<rect x="10" y="8" width="28" height="34" rx="4" fill="none" stroke="#145C59" stroke-width="3"/><circle cx="24" cy="20" r="5" fill="#237A73"/><rect x="16" y="30" width="16" height="4" rx="1" fill="#D6B46A"/><path d="M24 8 L24 4" stroke="#145C59" stroke-width="3"/>`
  },
  {
    name: 'manual-cot.svg',
    title: 'Manual Hospital Cot',
    subtitle: 'Mechanical Crank Adjustments',
    icon: `<path d="M4 28 L16 16 L38 28 L44 28" fill="none" stroke="#145C59" stroke-width="3.5" stroke-linecap="round"/><line x1="6" y1="20" x2="6" y2="40" stroke="#237A73" stroke-width="3"/><line x1="42" y1="20" x2="42" y2="40" stroke="#237A73" stroke-width="3"/><circle cx="36" cy="36" r="3" fill="#D6B46A"/>`
  },
  {
    name: 'electronic-cot.svg',
    title: 'Electronic Motorized Cot',
    subtitle: 'Handheld Remote Control',
    icon: `<rect x="6" y="22" width="36" height="10" rx="3" fill="#237A73"/><line x1="6" y1="16" x2="6" y2="38" stroke="#145C59" stroke-width="3"/><line x1="42" y1="16" x2="42" y2="38" stroke="#145C59" stroke-width="3"/><rect x="20" y="8" width="8" height="12" rx="2" fill="#D6B46A"/><circle cx="24" cy="12" r="1.5" fill="#145C59"/>`
  },
  {
    name: 'alpha-mattress.svg',
    title: 'Alpha Air Mattress',
    subtitle: 'Alternating Anti-Bedsore Pump',
    icon: `<path d="M6 24 C10 18 14 30 18 24 C22 18 26 30 30 24 C34 18 38 30 42 24" fill="none" stroke="#145C59" stroke-width="4" stroke-linecap="round"/><rect x="18" y="32" width="12" height="10" rx="2" fill="#237A73"/>`
  },
  {
    name: 'cpap-bipap.svg',
    title: 'CPAP / BiPAP Device',
    subtitle: 'Sleep & Nocturnal Airway Support',
    icon: `<rect x="8" y="12" width="32" height="24" rx="5" fill="none" stroke="#145C59" stroke-width="3"/><circle cx="20" cy="24" r="5" fill="#D6B46A"/><path d="M30 24 C34 24 38 28 38 32" stroke="#237A73" stroke-width="3" stroke-linecap="round"/>`
  },
  {
    name: 'suction-machine.svg',
    title: 'Suction Machine',
    subtitle: 'Electric & Manual Secretion Clearance',
    icon: `<rect x="8" y="14" width="22" height="26" rx="3" fill="none" stroke="#145C59" stroke-width="3"/><rect x="32" y="18" width="10" height="22" rx="2" fill="#237A73"/><path d="M19 14 C19 8 37 8 37 18" stroke="#D6B46A" stroke-width="2.5" fill="none"/>`
  },
  {
    name: 'iv-stand.svg',
    title: 'Adjustable IV Pole',
    subtitle: 'Stainless Steel 4-Hook Base',
    icon: `<line x1="24" y1="8" x2="24" y2="40" stroke="#145C59" stroke-width="3"/><path d="M16 14 C16 10 24 10 24 14 C24 10 32 10 32 14" fill="none" stroke="#D6B46A" stroke-width="2.5"/><line x1="14" y1="40" x2="34" y2="40" stroke="#237A73" stroke-width="3" stroke-linecap="round"/>`
  },
  {
    name: 'wheelchair-walker.svg',
    title: 'Wheelchair & Walker',
    subtitle: 'Folding Mobility Aids',
    icon: `<circle cx="20" cy="30" r="10" fill="none" stroke="#145C59" stroke-width="3"/><path d="M14 18 L24 18 L24 30 L32 30" stroke="#237A73" stroke-width="3" stroke-linecap="round"/><circle cx="24" cy="12" r="3.5" fill="#D6B46A"/>`
  },
  {
    name: 'nebulizer.svg',
    title: 'Compressor Nebulizer',
    subtitle: 'Adult & Child Inhalation Kits',
    icon: `<rect x="10" y="14" width="28" height="24" rx="4" fill="none" stroke="#145C59" stroke-width="3"/><circle cx="24" cy="26" r="4" fill="#237A73"/><path d="M24 14 L24 8 C24 6 30 6 30 8" stroke="#D6B46A" stroke-width="2.5" fill="none"/>`
  },
  {
    name: 'pillow.svg',
    title: 'Orthopaedic Comfort Pillow',
    subtitle: 'Cervical & Leg Elevation Support',
    icon: `<rect x="6" y="16" width="36" height="20" rx="8" fill="#EAF5F1" stroke="#145C59" stroke-width="3"/><path d="M12 26 Q24 20 36 26" stroke="#D6B46A" stroke-width="2" fill="none"/>`
  },
  {
    name: 'underpads-diapers.svg',
    title: 'Underpads & Diapers',
    subtitle: 'Super Absorbent Incontinence Care',
    icon: `<path d="M10 14 L38 14 L34 36 C34 38 28 40 24 40 C20 40 14 38 14 36 Z" fill="none" stroke="#145C59" stroke-width="3"/><path d="M10 20 L38 20" stroke="#D6B46A" stroke-width="2"/>`
  },
  {
    name: 'disposable-wipes.svg',
    title: 'Disposable Cleansing Wipes',
    subtitle: 'Antimicrobial Wet & Dry Packs',
    icon: `<rect x="8" y="16" width="32" height="20" rx="4" fill="none" stroke="#145C59" stroke-width="3"/><ellipse cx="24" cy="26" rx="8" ry="4" fill="#EAF5F1" stroke="#237A73" stroke-width="2"/><path d="M22 24 C22 20 26 20 26 24" stroke="#D6B46A" stroke-width="2" fill="none"/>`
  },
  {
    name: 'bp-apparatus.svg',
    title: 'Digital BP Monitor',
    subtitle: 'Upper-Arm Blood Pressure Display',
    icon: `<rect x="10" y="10" width="28" height="30" rx="4" fill="none" stroke="#145C59" stroke-width="3"/><rect x="16" y="16" width="16" height="12" rx="2" fill="#EAF5F1"/><text x="24" y="25" font-size="8" font-weight="700" text-anchor="middle" fill="#B54747">120/80</text><circle cx="24" cy="33" r="2.5" fill="#237A73"/>`
  },
  {
    name: 'digital-thermometer.svg',
    title: 'Digital Thermometer',
    subtitle: 'Rapid Fever Tracking Probe',
    icon: `<path d="M12 36 L30 18 L34 22 L16 40 Z" fill="#EAF5F1" stroke="#145C59" stroke-width="2.5"/><line x1="30" y1="18" x2="38" y2="10" stroke="#D6B46A" stroke-width="3" stroke-linecap="round"/><circle cx="14" cy="38" r="2" fill="#B54747"/>`
  },
  {
    name: 'pulse-oximeter.svg',
    title: 'Pulse Oximeter',
    subtitle: 'Fingertip SpO₂ & Heart Rate',
    icon: `<rect x="12" y="10" width="24" height="30" rx="6" fill="#145C59"/><rect x="16" y="16" width="16" height="14" rx="2" fill="#FCFBF7"/><text x="24" y="24" font-size="7" font-weight="700" text-anchor="middle" fill="#287D53">99%</text><text x="24" y="28" font-size="5" text-anchor="middle" fill="#66777C">PR 72</text>`
  },
  {
    name: 'stethoscope.svg',
    title: 'Acoustic Stethoscope',
    subtitle: 'Dual-Head Diagnostic Auscultation',
    icon: `<path d="M14 10 L14 24 C14 32 34 32 34 24 L34 10" fill="none" stroke="#145C59" stroke-width="3"/><circle cx="14" cy="10" r="2.5" fill="#D6B46A"/><circle cx="34" cy="10" r="2.5" fill="#D6B46A"/><circle cx="24" cy="38" r="5" fill="#237A73"/>`
  },
  {
    name: 'glucometer.svg',
    title: 'Glucometer Kit & Strips',
    subtitle: '5-Second Capillary Sugar Test',
    icon: `<rect x="14" y="10" width="20" height="30" rx="5" fill="none" stroke="#145C59" stroke-width="3"/><rect x="18" y="16" width="12" height="10" rx="1" fill="#EAF5F1"/><line x1="24" y1="40" x2="24" y2="44" stroke="#D6B46A" stroke-width="3"/>`
  },
  {
    name: 'gloves.svg',
    title: 'Medical Gloves',
    subtitle: 'Sterile Surgical & Clean Nitrile',
    icon: `<path d="M16 28 L16 18 C16 16 18 16 18 18 L18 26 M18 18 L20 14 C20 12 22 12 22 14 L22 26 M22 14 L24 12 C24 10 26 10 26 12 L26 26 M26 14 L28 16 C28 14 30 14 30 16 L30 28 C30 36 16 38 16 28 Z" fill="#EAF5F1" stroke="#145C59" stroke-width="2"/>`
  },
  {
    name: 'hand-rub.svg',
    title: 'Antiseptic Hand Rub',
    subtitle: '70%+ Hospital Grade Disinfectant',
    icon: `<rect x="14" y="18" width="20" height="24" rx="4" fill="none" stroke="#145C59" stroke-width="3"/><rect x="20" y="12" width="8" height="6" fill="#237A73"/><path d="M22 12 L22 8 L28 8" stroke="#D6B46A" stroke-width="2.5" stroke-linecap="round"/><path d="M24 26 L24 34 M20 30 L28 30" stroke="#145C59" stroke-width="2.5"/>`
  }
];

products.forEach(p => {
  const filePath = path.join(productsDir, p.name);
  fs.writeFileSync(filePath, createSvgWrapper(p.title, p.subtitle, p.icon));
});

console.log('Successfully generated all service and product SVG assets!');
