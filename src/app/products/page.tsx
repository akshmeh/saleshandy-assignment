"use client"
import { useEffect, useState } from "react";
import FilterSidebar from "@/components/filter/FilterSidebar";
import ProductCard from "@/components/product/ProductCard";
import { useProductStore } from "@/store/productStore";
import { SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Category } from "@/types";

export default function ProductPage(){

  const { categories, products, getFilteredProducts,setSelectedCategory, setSelectedBrand, sortOption, setSortOption, setFilterSidebarOpen } = useProductStore();
  const searchParam = useSearchParams();

  const [catalogSearch, setCatalogSearch] = useState("")

  useEffect(()=>{
    const getCategoryId = searchParam.get("category");

    if(getCategoryId){
      setSelectedCategory(getCategoryId)
      setSelectedBrand(null)
    }
  },[searchParam])
  
  return (
    <div className="fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            
    <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-border pb-6 mb-8 gap-4">
      <div>
        <h1 className="font-caveat font-semibold text-2xl md:text-[40px] text-text-fg tracking-tight">Curated Studio Catalog</h1>
        <p className="text-xs md:text-sm text-text-muted mt-1 leading-normal font-medium">
          Browse physical equipment and apparel designed to enrich your space and posture.
        </p>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
        <button
          id="mobile-filters-trigger"
          onClick={() => setFilterSidebarOpen(true)}
          className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-muted-bg border border-brand-border rounded-input text-xs font-semibold text-text-fg"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filters
        </button>

        <div className="flex items-center gap-2 shrink-0 ml-auto md:ml-0">
          <span className="text-xs text-text-muted font-semibold hidden sm:inline">Sort options:</span>
          <select
            id="sort-select-dropdown"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as any)}
            className="bg-brand-muted-bg border border-brand-border rounded-input px-3 py-2 text-xs text-text-fg font-semibold outline-none focus:border-brand-blue cursor-pointer"
          >
            <option value="featured">Featured Drops</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Customer Ratings</option>
          </select>
        </div>
      </div>
    </div>

    <div className="flex gap-8">
      
      <FilterSidebar />

      <div className="flex-1">
        {getFilteredProducts(catalogSearch).length === 0 ? (
          <div className="py-24 text-center border border-dashed border-brand-border rounded-primary bg-brand-muted-bg/50">
            <h3 className="font-caveat font-medium text-text-fg text-sm mb-1">No items match selection</h3>
            <p className="text-slate-400 font-medium text-xs max-w-sm mx-auto mb-6">
              Try clearing price sliders or brand criteria filters to uncover physical catalog models.
            </p>
            <button
              onClick={() => useProductStore.getState().resetFilters()}
              className="px-4 py-2 text-xs font-bold text-white bg-brand-blue rounded-input hover:bg-brand-blue/95 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div>
            <span className="text-[11px] font-matter text-text-muted block mb-4">
              SHOWING {getFilteredProducts(catalogSearch).length} OF {products.length} Drop models
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredProducts(catalogSearch).map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

    </div>

  </div>
  )
}