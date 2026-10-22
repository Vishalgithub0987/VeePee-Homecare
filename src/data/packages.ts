import { CarePackage } from '@/types';

export const CARE_PACKAGES_DATA: CarePackage[] = [
  {
    id: 'basic-care',
    title: 'Basic Care Support',
    duration: '2–4 Hours',
    description:
      'Short-duration personal support ideal for morning hygiene routines, quick clinical vitals review, or dedicated caregiver respite.',
    highlights: [
      'Bathing, personal grooming, and linen change assistance',
      'Clinical vital signs check (BP, SpO₂, Pulse, Temp)',
      'Medication prompt and oral administration support',
      'Gentle mobility assistance and companionship',
    ],
    suitableFor: 'Patients needing targeted assistance for daily morning or evening routines.',
    quoteLabel: 'Request a Quote',
  },
  {
    id: 'half-day-care',
    title: 'Half-Day Care',
    duration: '6–8 Hours',
    description:
      'Structured daytime assistance providing dedicated nursing or caregiver presence throughout morning and afternoon hours.',
    highlights: [
      'Comprehensive personal hygiene and dietary assistance',
      'Timed medication schedules and vitals monitoring',
      'Wound dressing, catheter care, or prescribed exercises',
      'Relief and rest for primary family caregivers',
    ],
    suitableFor: 'Elderly individuals or post-operative patients recovering at home during working hours.',
    quoteLabel: 'Request a Quote',
  },
  {
    id: 'full-day-care',
    title: 'Full-Day Home Care',
    duration: '10–12 Hours',
    description:
      'Comprehensive daytime coverage providing continuous observation, attentive bedside support, and therapeutic continuity.',
    highlights: [
      'Full personal care, meal assistance, and hydration tracking',
      'Continuous clinical observation and medical journal maintenance',
      'Assisted repositioning, transfer support, and walking routines',
      'Emergency readiness and immediate family communication',
    ],
    suitableFor: 'High-dependency patients or seniors requiring watchful daytime presence.',
    quoteLabel: 'Request a Quote',
  },
  {
    id: 'night-care',
    title: 'Night Care Support',
    duration: 'Overnight (8–10 Hours)',
    description:
      'Dedicated overnight nursing or attendant care to assist during nocturnal awakenings, maintain safety, and provide uninterrupted sleep for family.',
    highlights: [
      'Night-time vital monitoring and medication adherence',
      'Assistance with nocturnal toileting, diapering, and repositioning',
      'Fall prevention and soothing assistance for dementia/disorientation',
      'Detailed morning shift summary for family members',
    ],
    suitableFor: 'Patients prone to night restlessness, catheter/oxygen dependency, or fall risks.',
    quoteLabel: 'Request a Quote',
  },
  {
    id: '24-hour-care',
    title: '24-Hour Continuous Care',
    duration: 'Round-the-Clock (Shift-Based)',
    description:
      'Seamless 24-hour coverage staffed by rotating qualified caregivers or nurses with structured handovers and adequate rest protocols.',
    highlights: [
      'Uninterrupted 24-hour patient observation and assistance',
      'Professional shift handover protocols maintaining care continuity',
      'Bedridden patient management, wound care, and feeding',
      'Complete peace of mind for families managing complex care at home',
    ],
    suitableFor: 'Bedbound, palliative, post-ICU, or high-acuity home convalescent patients.',
    quoteLabel: 'Request a Quote',
  },
  {
    id: 'equipment-rental-plan',
    title: 'Medical Equipment Rental',
    duration: 'Daily, Weekly or Monthly',
    description:
      'Flexible, budget-friendly rental options for essential medical equipment with doorstep delivery, assembly, and user orientation in Vellore.',
    highlights: [
      'Hospital beds, alternating air mattresses, and suction pumps',
      'Oxygen concentrators, CPAP, and BiPAP respiratory devices',
      'Wheelchairs, commode chairs, and walking mobility aids',
      'Sanitized, tested equipment with prompt maintenance support',
    ],
    suitableFor: 'Patients requiring temporary medical equipment during rehabilitation or palliative recovery.',
    quoteLabel: 'Enquire for Terms',
  },
];
