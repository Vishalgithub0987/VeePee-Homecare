import { BUSINESS_CONFIG } from './business';
import { CartItem, ServiceEnquiryFormData } from '@/types';

/**
 * Builds the direct WhatsApp chat URL with encoded pre-filled text.
 */
export function buildWhatsAppUrl(message: string): string {
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodedText}`;
}

/**
 * Generates an enquiry message for a single product.
 */
export function buildSingleProductEnquiryMessage(
  productName: string,
  mode: 'purchase' | 'rental',
  quantity: number = 1,
  price: number | null = null,
  customerDetails?: {
    name?: string;
    phone?: string;
    location?: string;
    preferredDate?: string;
    preferredTime?: string;
    notes?: string;
  }
): string {
  const modeText = mode === 'rental' ? 'Rental Request' : 'Purchase Request';
  const priceText = price !== null ? `₹${price.toLocaleString('en-IN')}` : 'Price on request';

  const lines: string[] = [
    `Hello ${BUSINESS_CONFIG.name},`,
    `I would like to enquire about ordering the following product:`,
    '',
    `*PRODUCT ORDER DETAILS*`,
    `• Product: ${productName}`,
    `• Type: ${modeText}`,
    `• Quantity: ${quantity}`,
    `• Estimated Rate: ${priceText}`,
  ];

  if (
    customerDetails?.name ||
    customerDetails?.phone ||
    customerDetails?.location ||
    customerDetails?.preferredDate ||
    customerDetails?.preferredTime ||
    customerDetails?.notes
  ) {
    lines.push('', '*CUSTOMER & DELIVERY DETAILS*');
    if (customerDetails.name) lines.push(`• Name: ${customerDetails.name.trim()}`);
    if (customerDetails.phone) lines.push(`• Contact Phone: ${customerDetails.phone.trim()}`);
    if (customerDetails.location) lines.push(`• Delivery Address / Area: ${customerDetails.location.trim()}`);
    if (customerDetails.preferredDate) lines.push(`• Preferred Delivery Date: ${customerDetails.preferredDate.trim()}`);
    if (customerDetails.preferredTime) lines.push(`• Preferred Delivery Timing: ${customerDetails.preferredTime.trim()}`);
    if (customerDetails.notes) lines.push(`• Special Notes / Instructions: ${customerDetails.notes.trim()}`);
  }

  lines.push('', 'Please confirm product availability, pricing, and delivery in the Vellore region.', 'Thank you.');
  return lines.join('\n');
}

/**
 * Generates an enquiry message for cart items (multi-product or cart checkout).
 */
export function buildCartEnquiryMessage(
  items: CartItem[],
  customerDetails?: {
    name?: string;
    phone?: string;
    location?: string;
    preferredDate?: string;
    preferredTime?: string;
    notes?: string;
  }
): string {
  if (items.length === 0) {
    return `Hello ${BUSINESS_CONFIG.name}, I would like to enquire about your medical products and equipment availability.`;
  }

  const lines: string[] = [
    `Hello ${BUSINESS_CONFIG.name},`,
    `I would like to enquire about ordering the following medical equipment and supplies:`,
    '',
    '*ORDERED PRODUCTS & EQUIPMENT*',
  ];

  let allHavePrice = true;
  let totalPrice = 0;

  items.forEach((item, index) => {
    const modeLabel = item.purchaseOrRental === 'rental' ? 'Rental' : 'Purchase';
    let itemPriceStr = 'Price on request';
    if (item.price !== null && item.price !== undefined) {
      const lineSubtotal = item.price * item.quantity;
      totalPrice += lineSubtotal;
      itemPriceStr = `₹${lineSubtotal.toLocaleString('en-IN')} (₹${item.price} each)`;
    } else {
      allHavePrice = false;
    }
    lines.push(`${index + 1}. ${item.name} — Qty: ${item.quantity} — [${modeLabel}] — ${itemPriceStr}`);
  });

  lines.push('');
  if (allHavePrice && totalPrice > 0) {
    lines.push(`*Estimated Subtotal:* ₹${totalPrice.toLocaleString('en-IN')} (Final quote to be confirmed)`);
  } else {
    lines.push('*Pricing Note:* Some items are "Price on request". Final quote and availability to be confirmed by Vee Pee Home Care.');
  }

  if (
    customerDetails?.name ||
    customerDetails?.phone ||
    customerDetails?.location ||
    customerDetails?.preferredDate ||
    customerDetails?.preferredTime ||
    customerDetails?.notes
  ) {
    lines.push('', '*CUSTOMER & DELIVERY DETAILS*');
    if (customerDetails.name) lines.push(`• Name: ${customerDetails.name.trim()}`);
    if (customerDetails.phone) lines.push(`• Contact Phone: ${customerDetails.phone.trim()}`);
    if (customerDetails.location) lines.push(`• Delivery Address / Area: ${customerDetails.location.trim()}`);
    if (customerDetails.preferredDate) lines.push(`• Preferred Delivery Date: ${customerDetails.preferredDate.trim()}`);
    if (customerDetails.preferredTime) lines.push(`• Preferred Delivery Timing: ${customerDetails.preferredTime.trim()}`);
    if (customerDetails.notes) lines.push(`• Special Notes / Instructions: ${customerDetails.notes.trim()}`);
  }

  lines.push('', 'Please confirm availability, rental/purchase terms, and delivery to my location.', 'Thank you.');
  return lines.join('\n');
}

/**
 * Generates an enquiry message for healthcare service requests.
 */
export function buildServiceEnquiryMessage(data: ServiceEnquiryFormData): string {
  const lines: string[] = [
    `Hello ${BUSINESS_CONFIG.name},`,
    `I would like to request an enquiry for the following healthcare service:`,
    '',
    '*SERVICE REQUEST DETAILS*',
    `• Service: ${data.selectedService}`,
  ];

  if (data.careDuration) {
    lines.push(`• Care Duration / Shift: ${data.careDuration}`);
  }
  if (data.preferredDate) {
    lines.push(`• Preferred Date: ${data.preferredDate}`);
  }
  if (data.preferredTime) {
    lines.push(`• Preferred Time: ${data.preferredTime}`);
  }
  if (data.serviceLocation) {
    lines.push(`• Location / Area: ${data.serviceLocation}`);
  }

  lines.push('', '*CUSTOMER DETAILS*');
  lines.push(`• Name: ${data.customerName}`);
  lines.push(`• Contact Phone: ${data.contactPhone}`);

  if (data.optionalNotes && data.optionalNotes.trim().length > 0) {
    lines.push(`• General Notes: ${data.optionalNotes.trim()}`);
  }

  lines.push(
    '',
    'Note: This is a service enquiry. Please confirm staff availability, service terms, and quote.',
    'Thank you.'
  );

  return lines.join('\n');
}
