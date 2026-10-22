export type PurchaseOrRentalType = 'purchase' | 'rental' | 'both';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  detailedDescription?: string;
  image: string;
  availabilityLabel: string;
  purchaseOrRental: PurchaseOrRentalType;
  optionalPrice: number | null; // null represents "Price on request"
  featured?: boolean;
  unit?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  category: 'Nursing' | 'Caregiver' | 'Specialized' | 'Coordination' | 'Equipment';
  shortDescription: string;
  inclusions: string[];
  iconName: string;
  image: string;
  isClinical?: boolean;
  disclaimer?: string;
}

export interface CarePackage {
  id: string;
  title: string;
  duration: string;
  description: string;
  highlights: string[];
  suitableFor: string;
  quoteLabel: string;
}

export interface CartItem {
  id: string; // product id + mode
  productId: string;
  name: string;
  image: string;
  purchaseOrRental: 'purchase' | 'rental';
  price: number | null;
  quantity: number;
}

export interface ServiceEnquiryFormData {
  customerName: string;
  contactPhone: string;
  preferredDate?: string;
  preferredTime?: string;
  serviceLocation: string;
  selectedService: string;
  careDuration?: string;
  optionalNotes?: string;
}

export interface ProductEnquiryFormData {
  customerName: string;
  contactPhone: string;
  deliveryLocation: string;
  preferredDate?: string;
  preferredTime?: string;
  optionalNotes?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}
