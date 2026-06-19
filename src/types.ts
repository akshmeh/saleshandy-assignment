export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  brand: string;
  rating: number;
  reviewsCount: number;
  stock: number;
  variants: {
    colors?: { name: string; hex: string }[];
    sizes?: string[];
  };
  specifications: { [key: string]: string };
  isNew?: boolean;
  isTrending?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize?: string;
  selectedColor?: { name: string; hex: string };
  quantity: number;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minSpend?: number;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'apple-pay';
  last4?: string;
  expiry?: string;
  email?: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  avatar: string;
}

export interface OrderTimelineItem {
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  title: string;
  description: string;
  timestamp: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  trackingNumber?: string;
  timeline: OrderTimelineItem[];
}
