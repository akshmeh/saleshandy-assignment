import { create } from 'zustand';
import { Product } from '../types';

interface WishlistState {
  wishlistItems: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const loadWishlistState = (): Product[] => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem('client_wishlist_items');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

const saveWishlistState = (items: Product[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('client_wishlist_items', JSON.stringify(items));
  }
};

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlistItems: loadWishlistState(),

  toggleWishlist: (product) => {
    set((state) => {
      const exists = state.wishlistItems.some(item => item.id === product.id);
      let updated: Product[];
      
      if (exists) {
        updated = state.wishlistItems.filter(item => item.id !== product.id);
      } else {
        updated = [...state.wishlistItems, product];
      }
      
      saveWishlistState(updated);
      return { wishlistItems: updated };
    });
  },

  isInWishlist: (productId) => {
    return get().wishlistItems.some(item => item.id === productId);
  },

  clearWishlist: () => {
    set({ wishlistItems: [] });
    saveWishlistState([]);
  }
}));
