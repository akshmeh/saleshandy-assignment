import { useProductStore } from '../../store/productStore';
import { X, Check } from 'lucide-react';

export default function FilterSidebar() {
  const { 
    categories, 
    selectedCategory, 
    setSelectedCategory, 
    selectedBrand, 
    setSelectedBrand, 
    priceRange, 
    setPriceRange, 
    resetFilters,
    getBrandsList,
    isFilterSidebarOpen,
    setFilterSidebarOpen
  } = useProductStore();

  const brands = getBrandsList();

  const handlePricePreset = (min: number, max: number) => {
    setPriceRange([min, max]);
  };

  const isPresetActive = (min: number, max: number) => {
    return priceRange[0] === min && priceRange[1] === max;
  };

  return (
    <aside className={`
      fixed inset-0 z-40 md:relative md:z-0 md:inset-auto md:w-64 md:block shrink-0
      ${isFilterSidebarOpen ? 'block' : 'hidden md:block'}
    `}>
      <div 
        onClick={() => setFilterSidebarOpen(false)}
        className="fixed inset-0 bg-text-fg/40 backdrop-blur-xs md:hidden" 
      />

      <div className="
        relative z-50 w-80 md:w-full bg-white md:bg-transparent h-full md:h-auto px-6 py-6 border-r md:border-r-0 border-brand-border overflow-y-auto
      ">
        <div className="flex items-center justify-between md:hidden mb-6">
          <h3 className="font-caveat font-semibold text-sm uppercase tracking-wide text-text-fg">Filters</h3>
          <button 
            id="mobile-filters-close"
            onClick={() => setFilterSidebarOpen(false)}
            className="p-1.5 rounded-full border border-brand-border text-text-muted hover:text-text-fg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-8">
          <h3 className="font-matter text-[10px] font-bold tracking-widest text-text-muted uppercase mb-3">
            Category
          </h3>
          <div className="space-y-2">
            <button 
              id="cat-filter-all"
              onClick={() => setSelectedCategory(null)}
              className={`w-full text-left px-3 py-2 rounded text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                selectedCategory === null 
                  ? 'bg-brand-blue/5 text-brand-blue border border-brand-blue/20' 
                  : 'text-text-muted hover:text-text-fg hover:bg-brand-muted-bg border border-transparent'
              }`}
            >
              <span>All Curations</span>
              {selectedCategory === null && <Check className="w-3.5 h-3.5" />}
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                id={`cat-filter-${cat.slug}`}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`w-full text-left px-3 py-2 rounded text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                  selectedCategory === cat.slug 
                    ? 'bg-brand-blue/5 text-brand-blue border border-brand-blue/20' 
                    : 'text-text-muted hover:text-text-fg hover:bg-brand-muted-bg border border-transparent'
                }`}
              >
                <span>{cat.name}</span>
                {selectedCategory === cat.slug && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-matter text-[10px] font-bold tracking-widest text-text-muted uppercase mb-3">
            Origins / Brand
          </h3>
          <div className="space-y-2">
            <button 
              id="brand-filter-all"
              onClick={() => setSelectedBrand(null)}
              className={`w-full text-left px-3 py-2 rounded text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                selectedBrand === null 
                  ? 'bg-brand-blue/5 text-brand-blue border border-brand-blue/20' 
                  : 'text-text-muted hover:text-text-fg hover:bg-brand-muted-bg border border-transparent'
              }`}
            >
              <span>All Brands</span>
              {selectedBrand === null && <Check className="w-3.5 h-3.5" />}
            </button>
            {brands.map(b => (
              <button
                key={b}
                id={`brand-filter-${b}`}
                onClick={() => setSelectedBrand(b)}
                className={`w-full text-left px-3 py-2 rounded text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                  selectedBrand === b 
                    ? 'bg-brand-blue/5 text-brand-blue border border-brand-blue/20' 
                    : 'text-text-muted hover:text-text-fg hover:bg-brand-muted-bg border border-transparent'
                }`}
              >
                <span>{b}</span>
                {selectedBrand === b && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-matter text-[10px] font-bold tracking-widest text-text-muted uppercase mb-4">
            Price range list
          </h3>
          <div className="space-y-2">
            <button
              id="price-range-all"
              onClick={() => handlePricePreset(0, 400)}
              className={`w-full text-left px-3 py-2 rounded text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                isPresetActive(0, 400)
                  ? 'bg-brand-blue/5 text-brand-blue border border-brand-blue/20'
                  : 'text-text-muted hover:text-text-fg hover:bg-brand-muted-bg border border-transparent'
              }`}
            >
              <span>All Prices</span>
              {isPresetActive(0, 400) && <Check className="w-3.5 h-3.5" />}
            </button>
            <button
              id="price-range-under100"
              onClick={() => handlePricePreset(0, 100)}
              className={`w-full text-left px-3 py-2 rounded text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                isPresetActive(0, 100)
                  ? 'bg-brand-blue/5 text-brand-blue border border-brand-blue/20'
                  : 'text-text-muted hover:text-text-fg hover:bg-brand-muted-bg border border-transparent'
              }`}
            >
              <span>Under ₹100</span>
              {isPresetActive(0, 100) && <Check className="w-3.5 h-3.5" />}
            </button>
            <button
              id="price-range-mid"
              onClick={() => handlePricePreset(100, 250)}
              className={`w-full text-left px-3 py-2 rounded text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                isPresetActive(100, 250)
                  ? 'bg-brand-blue/5 text-brand-blue border border-brand-blue/20'
                  : 'text-text-muted hover:text-text-fg hover:bg-brand-muted-bg border border-transparent'
              }`}
            >
              <span>₹100 — ₹250</span>
              {isPresetActive(100, 250) && <Check className="w-3.5 h-3.5" />}
            </button>
            <button
              id="price-range-high"
              onClick={() => handlePricePreset(250, 400)}
              className={`w-full text-left px-3 py-2 rounded text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                isPresetActive(250, 400)
                  ? 'bg-brand-blue/5 text-brand-blue border border-brand-blue/20'
                  : 'text-text-muted hover:text-text-fg hover:bg-brand-muted-bg border border-transparent'
              }`}
            >
              <span>Over ₹250</span>
              {isPresetActive(250, 400) && <Check className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1">
              <span className="text-[10px] text-text-muted block">Min</span>
              <input 
                type="number"
                value={priceRange[0]}
                min={0}
                max={400}
                onChange={(e) => setPriceRange([Math.max(0, parseInt(e.target.value) || 0), priceRange[1]])}
                className="w-full bg-brand-muted-bg border border-brand-border rounded px-2 py-1 font-matter text-xs text-text-fg outline-none"
              />
            </div>
            <div className="flex-1">
              <span className="text-[10px] text-text-muted block">Max</span>
              <input 
                type="number"
                value={priceRange[1]}
                min={0}
                max={400}
                onChange={(e) => setPriceRange([priceRange[0], Math.max(0, parseInt(e.target.value) || 400)])}
                className="w-full bg-brand-muted-bg border border-brand-border rounded px-2 py-1 font-matter text-xs text-text-fg outline-none"
              />
            </div>
          </div>
        </div>

        <button
          id="filter-reset-btn"
          onClick={resetFilters}
          className="w-full py-2.5 bg-brand-muted-bg hover:bg-brand-border/60 text-text-fg border border-brand-border rounded-input text-xs font-semibold cursor-pointer transition"
        >
          Reset All Filters
        </button>

      </div>
    </aside>
  );
}
