import { create } from 'zustand';


interface UIState {
  selectedProductSlug: string | null;
  selectedOrderNumber: string | null;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  searchQuery: string;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  // activeView: 'home',
  selectedProductSlug: null,
  selectedOrderNumber: null,
  isCartOpen: false,
  isSearchOpen: false,
  searchQuery: '',
  setCartOpen: (open) => set({ isCartOpen: open }),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setSearchQuery: (query) => set({ searchQuery: query })
}));
