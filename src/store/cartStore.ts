import { create } from 'zustand';
import { CartItem, Product, Coupon } from '../types';
import { COUPONS } from '../mock/data';

interface CartState {
  cartItems: CartItem[];
  appliedCoupon: Coupon | null;
  addToCart: (product: Product, quantity: number, color?: { name: string; hex: string }, size?: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  clearCart: () => void;
  getTotals: () => { subtotal: number; discount: number; shipping: number; total: number };
}

const loadCartState = () => {
  if (typeof window === 'undefined') return { items: [], coupon: null };
  try {
    const items = localStorage.getItem('client_cart_items');
    const coupon = localStorage.getItem('client_applied_coupon');
    return {
      items: items ? JSON.parse(items) : [],
      coupon: coupon ? JSON.parse(coupon) : null
    };
  } catch (e) {
    console.error('Error reading localStorage for cart', e);
    return { items: [], coupon: null };
  }
};

const saveCartItems = (items: CartItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('client_cart_items', JSON.stringify(items));
  }
};

const saveCoupon = (coupon: Coupon | null) => {
  if (typeof window !== 'undefined') {
    if (coupon) {
      localStorage.setItem('client_applied_coupon', JSON.stringify(coupon));
    } else {
      localStorage.removeItem('client_applied_coupon');
    }
  }
};

const initialData = loadCartState();

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: initialData.items,
  appliedCoupon: initialData.coupon,

  addToCart: (product, quantity, color, size) => {
    set((state) => {
      const colorPart = color ? color.name : 'default';
      const sizePart = size || 'default';
      const itemId = `${product.id}_${sizePart}_${colorPart}`;
      
      const existingItemIndex = state.cartItems.findIndex((item) => item.id === itemId);
      
      let updatedItems: CartItem[];
      
      if (existingItemIndex > -1) {
        updatedItems = [...state.cartItems];
        updatedItems[existingItemIndex].quantity += quantity;
      } else {
        updatedItems = [
          ...state.cartItems,
          {
            id: itemId,
            product,
            selectedColor: color,
            selectedSize: size,
            quantity
          }
        ];
      }
      
      saveCartItems(updatedItems);
      return { cartItems: updatedItems };
    });
  },

  removeFromCart: (id) => {
    set((state) => {
      const updatedItems = state.cartItems.filter((item) => item.id !== id);
      saveCartItems(updatedItems);
      return { cartItems: updatedItems };
    });
  },

  updateQuantity: (id, quantity) => {
    set((state) => {
      if (quantity <= 0) {
        const updatedItems = state.cartItems.filter((item) => item.id !== id);
        saveCartItems(updatedItems);
        return { cartItems: updatedItems };
      }
      const updatedItems = state.cartItems.map((item) => 
        item.id === id ? { ...item, quantity } : item
      );
      saveCartItems(updatedItems);
      return { cartItems: updatedItems };
    });
  },

  applyCoupon: (code) => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = COUPONS.find(c => c.code === cleanCode);
    
    if (!coupon) {
      return { success: false, message: 'Invalid coupon code.' };
    }

    const { subtotal } = get().getTotals();
    
    if (coupon.minSpend && subtotal < coupon.minSpend) {
      return { 
        success: false, 
        message: `Min spend of ₹${coupon.minSpend} required. Your subtotal is ₹${subtotal}.` 
      };
    }

    set({ appliedCoupon: coupon });
    saveCoupon(coupon);
    
    return { success: true, message: `Coupon '${coupon.code}' applied successfully.` };
  },

  removeCoupon: () => {
    set({ appliedCoupon: null });
    saveCoupon(null);
  },

  clearCart: () => {
    set({ cartItems: [], appliedCoupon: null });
    saveCartItems([]);
    saveCoupon(null);
  },

  getTotals: () => {
    const { cartItems, appliedCoupon } = get();
    
    const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    
    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.discountType === 'percentage') {
        discount = subtotal * (appliedCoupon.value / 100);
      } else {
        discount = Math.min(appliedCoupon.value, subtotal);
      }
    }

    const shipping = subtotal > 150 || subtotal === 0 ? 0 : 8;
    const total = Math.max(0, subtotal - discount + shipping);

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      discount: Math.round(discount * 100) / 100,
      shipping,
      total: Math.round(total * 100) / 100
    };
  }
}));
