"use client";
import React, { useState } from 'react';
import { useProductStore } from '../store/productStore';
import ProductCard from '../components/product/ProductCard';
import { 
  Sparkles, ArrowRight,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function App() {
  const { categories, products } = useProductStore();
  const redirect = useRouter();

  // const handleFeaturedCategory = (slug: string) => {
  //   useProductStore.getState().setSelectedCategory(slug);
  //   redirect.push("products")
  // };

  return (
   <>
          <div className="fade-in">
            
            <section className="relative px-6 md:px-12 py-20 md:py-28 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
              <span className="bg-brand-purple/10 text-brand-blue border border-brand-purple/80 font-matter text-[9px] font-extrabold tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-sm mb-6 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> CURATED WORKSPACE DROPS AVAILABLE
              </span>
              
              <h1 className="font-matter font-bold text-brand-blue tracking-tight leading-[1.08] max-w-4xl mb-6 text-4xl sm:text-5xl md:text-[60px]">
                Aesthetic space. <br />
                <span className="relative inline-block mt-1">
                  Calibrated for <span className="underline decoration-1 underline-offset-8 decoration-brand-blue/40 px-1 font-caveat font-medium italic text-brand-yellow">deep focus</span>
                </span>
              </h1>
              
              <p className="text-xs sm:text-sm text-text-muted max-w-xl leading-relaxed mb-10">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, placeat reprehenderit? Iure, amet? Repudiandae quae totam et, adipisci voluptas natus. Doloremque, velit vel. Odit consequatur assumenda necessitatibus ab aspernatur quae.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <Link
                  id="hero-explore-btn"
                  href="/products"
                  className="w-full sm:w-auto px-8 py-3.5 bg-brand-blue hover:bg-brand-blue/90 text-white text-[10px] font-extrabold tracking-widest rounded-sm transition flex items-center justify-center gap-2 cursor-pointer uppercase border border-brand-blue"
                >
                  Explore Products
                  <ArrowRight className="w-4 h-4" />
                </Link>
              
              </div>
            </section>

            <section className="px-6 md:px-12 max-w-7xl mx-auto py-12">
              <h2 className="font-matter font-bold text-sm uppercase tracking-widest mb-8">
                Curated <span>Collections</span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products/?category=${cat.slug}`}
                    className="group relative h-80 rounded-sm overflow-hidden cursor-pointer border border-brand-border flex items-end p-6 transition-all duration-300"
                  >
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-102" 
                      style={{ filter: 'grayscale(15%)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity" />
                    
                    <div className="relative z-10 text-white w-full">
                      <span className="font-matter text-[8px] font-bold text-slate-300 tracking-widest uppercase">
                        COLLECTION
                      </span>
                      <h3 className="font-matter font-bold text-[15px] leading-normal mt-0.5 tracking-wider uppercase text-white">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-slate-300/80 line-clamp-2 mt-1 leading-normal font-medium">
                        {cat.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="px-6 md:px-12 max-w-7xl mx-auto py-16">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <span className="font-matter text-[9px] font-extrabold tracking-widest text-[#64748b] uppercase">
                    SPOTLIGHT FOCUS
                  </span>
                  <h2 className="font-matter font-bold text-sm uppercase tracking-widest mt-1">
                    Trending <span>Artifacts</span>
                  </h2>
                </div>
                <Link
                  id="trending-all-btn"
                  href="/products"
                  className="text-[10px] font-extrabold text-[#0f172a] uppercase tracking-widest hover:underline flex items-center gap-1 cursor-pointer"
                >
                  View All Products
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0, 4).map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </section>

            <section className="px-6 md:px-12 max-w-7xl mx-auto py-12">
              <div className="relative bg-brand-blue rounded-sm p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-text-fg/10">
                
                <div className="relative z-10 max-w-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-brand-yellow text-text-fg font-matter text-[8px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-sm border border-brand-blue/80">
                      Everyday New
                    </span>
                  </div>
                  <h3 className="font-matter font-bold text-white tracking-widest uppercase text-lg md:text-xl leading-snug mb-3">
                    About Us
                  </h3>
                  <p className="text-xs text-white leading-relaxed max-w-lg">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id nobis nam dignissimos alias eius deleniti veritatis voluptate beatae numquam, voluptates ad. Totam, quaerat! Repellat corrupti natus fuga dolor sit dolores?
                  </p>
                </div>

              </div>
            </section>

          </div>

      </>
     
  );
}
