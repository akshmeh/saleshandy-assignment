import { create } from 'zustand';
import { Product, Category } from '../types';
import { PRODUCTS, CATEGORIES } from '../mock/data';

interface ProductState {
  products: Product[];
  categories: Category[];
  selectedCategory: string | null;
  selectedBrand: string | null;
  priceRange: [number, number];
  sortOption: 'featured' | 'price-low' | 'price-high' | 'rating';
  isFilterSidebarOpen: boolean;
  
  setSelectedCategory: (category: string | null) => void;
  setSelectedBrand: (brand: string | null) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortOption: (option: 'featured' | 'price-low' | 'price-high' | 'rating') => void;
  setFilterSidebarOpen: (isOpen: boolean) => void;
  resetFilters: () => void;
  
  getFilteredProducts: (searchQuery: string) => Product[];
  getBrandsList: () => string[];
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: PRODUCTS,
  categories: CATEGORIES,
  selectedCategory: null,
  selectedBrand: null,
  priceRange: [0, 400],
  sortOption: 'featured',
  isFilterSidebarOpen: false,

  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedBrand: (brand) => set({ selectedBrand: brand }),
  setPriceRange: (range) => set({ priceRange: range }),
  setSortOption: (option) => set({ sortOption: option }),
  setFilterSidebarOpen: (isOpen) => set({ isFilterSidebarOpen: isOpen }),
  resetFilters: () => set({
    selectedCategory: null,
    selectedBrand: null,
    priceRange: [0, 400],
    sortOption: 'featured'
  }),

  getFilteredProducts: (searchQuery) => {
    const { products, selectedCategory, selectedBrand, priceRange, sortOption } = get();
    
    let result = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) || 
             p.category.toLowerCase().includes(q) ||
             p.brand.toLowerCase().includes(q) ||
             p.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedBrand) {
      result = result.filter(p => p.brand === selectedBrand);
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (sortOption === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  },

  getBrandsList: () => {
    const { products } = get();
    const brands = products.map(p => p.brand);
    return Array.from(new Set(brands));
  }
}));
