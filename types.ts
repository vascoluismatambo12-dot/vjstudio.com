
export interface ServiceSubItem {
  id: string;
  name: string;
  description?: string;
  price?: number; // Base price if applicable
  category: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  services: ServiceSubItem[];
}

export interface PricingRule {
  type: 'fixed' | 'per_unit' | 'package' | 'duration';
  basePrice: number;
  unitName?: string;
  minUnits?: number;
  options?: { label: string; price: number; value: string | number }[];
}

export interface BookingFormState {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  serviceId: string;
  date: string;
  location: string;
  paymentMethod: string;
  
  // Dynamic fields for pricing
  photoCount?: number;
  videoDuration?: number; // in minutes
  droneService?: boolean;
  weddingPackage?: 'simple' | 'medium' | 'premium';
  photoPackage?: 'lite' | 'medium' | 'premium' | 'max';
  
  // Generic Item Selection
  selectedItemName?: string;
  itemQuantity?: number;
}

export interface PricingTableItem {
  name: string;
  price: number;
  displayPrice?: string;
  unit?: string;
}

export interface PricingTableCategory {
  category: string;
  items: PricingTableItem[];
}

export const PAYMENT_METHODS = [
  "M-Pesa / e-Mola",
  "Transferência Bancária"
];
