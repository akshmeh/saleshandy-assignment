import React, { useState, useEffect, useRef } from 'react';
import { useUIStore } from '../../store/uiStore';
import { useProductStore } from '../../store/productStore';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const { isSearchOpen, setSearchOpen } = useUIStore();
  const { products } = useProductStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const handleSuggestClick = (keyword: string) => {
    setQuery(keyword);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleResultClick = (slug: string) => {
    setSearchOpen(false);
    setQuery('');
    router.push(`/products/${slug}`);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setSearchOpen(false);
      router.push('/products');
    }
  };

  const filtered = query.trim() 
    ? products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const suggestedKeywords = ['Aether', 'Keyboard', 'Merino wool', 'Marble', 'Selvedge Denim', 'Atomizer'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="flex items-start justify-center min-h-screen pt-12 md:pt-24 px-4 pb-4 text-center">
        
        {/* <div 
          onClick={() => setSearchOpen(false)}
          className="fixed inset-0 bg-text-fg/40 backdrop-blur-sm transition-opacity" 
        /> */}

        <div className="inline-block w-full max-w-2xl bg-white rounded-primary text-left overflow-hidden shadow-2xl transform transition-all align-middle">
          
          <div className="p-6">
            
            <div className="relative flex items-center border border-brand-border rounded-input bg-brand-muted-bg focus-within:border-brand-blue focus-within:bg-white focus-within:ring-1 focus-within:ring-brand-blue/15 transition-all">
              <Search className="w-5 h-5 text-text-muted ml-4 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery( e.target.value)}
                onKeyDown={handleSearchKeyPress}
                placeholder="Search studio product, categories, or ergonomics..."
                className="w-full bg-transparent border-0 px-4 py-4 text-sm text-text-fg placeholder:text-text-muted/65 outline-none font-matter"
              />
              {query && (
                <button
                  id="search-clear-btn"
                  onClick={() => setQuery('')}
                  className="p-1.5 mr-2 rounded-full text-text-muted hover:text-text-fg hover:bg-brand-border transition"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="mt-6">
              <h4 className="font-matter text-[10px] font-bold tracking-widest text-text-muted uppercase mb-2">
                Suggested Curations
              </h4>
              <div className="flex flex-wrap gap-2">
                {suggestedKeywords.map(word => (
                  <button
                    key={word}
                    id={`suggest-${word}`}
                    onClick={() => handleSuggestClick(word)}
                    type="button"
                    className="px-3 py-1.5 bg-brand-muted-bg hover:bg-brand-blue/10 hover:text-brand-blue border border-brand-border/40 text-xs font-semibold text-text-fg rounded-chip transition cursor-pointer"
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>

            {query.trim() && (
              <div className="mt-8 border-t border-brand-border pt-6">
                <h4 className="font-matter text-[10px] font-bold tracking-widest text-text-muted uppercase mb-4">
                  Match Candidates ({filtered.length})
                </h4>
                
                {filtered.length === 0 ? (
                  <p className="text-xs text-text-muted py-2 font-medium">
                    No physical matches in current drop. Browse our standard models.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {filtered.map(p => (
                      <div
                        key={p.id}
                        id={`result-item-${p.id}`}
                        onClick={() => handleResultClick(p.slug)}
                        className="flex items-center gap-4 p-2 rounded-card border border-transparent hover:border-brand-border hover:bg-brand-muted-bg/50 cursor-pointer transition"
                      >
                        <div className="w-12 h-12 rounded bg-brand-muted-bg overflow-hidden shrink-0">
                          <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-caveat font-medium text-xs md:text-sm text-text-fg">
                            {p.name}
                          </h5>
                          <span className="font-matter text-[10px] text-text-muted font-bold uppercase">
                            {p.brand} • ₹{p.price}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-brand-blue flex items-center gap-1 group">
                          View
                          <ArrowRight className="w-3.5 h-3.5 transition group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="mt-8 pt-4 border-t border-brand-border/40 flex items-center justify-between text-[11px] text-text-muted font-matter font-medium">
              <span>Press <kbd className="bg-brand-muted-bg px-1 rounded">Enter</kbd> to view product view</span>
              
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
