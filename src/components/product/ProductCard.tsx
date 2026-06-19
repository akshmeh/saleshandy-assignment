import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { Product } from '../../types';
import { Star, Heart, ArrowUpRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  key?: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { setCartOpen } = useUIStore();
  const { addToCart } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const isLiked = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultColor = product.variants.colors?.[0];
    const defaultSize = product.variants.sizes?.[0];
    addToCart(product, 1, defaultColor, defaultSize);
    
    setCartOpen(true);
  };

  return (
    <article 
    
      className="group cursor-pointer flex flex-col h-full bg-white border border-brand-border rounded-primary overflow-hidden hover:border-text-fg/20 hover:shadow-sm transition-all duration-300"
    >
      
      <div className="relative aspect-square w-full bg-brand-muted-bg overflow-hidden flex items-center justify-center">
        
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-white border border-text-fg/15 text-text-fg font-matter text-[8px] font-extrabold tracking-widest uppercase px-2 py-1 rounded-sm shadow-sm">
              NEW
            </span>
          )}
          {product.isTrending && (
            <span className="bg-text-fg text-white font-matter text-[8px] font-extrabold tracking-widest uppercase px-2 py-1 rounded-sm">
              TRENDING
            </span>
          )}
        </div>

        <button
          id={`wishlist-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-sm bg-white border border-brand-border text-text-muted hover:text-text-fg active:scale-95 transition"
          title={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-text-fg text-text-fg' : ''}`} />
        </button>
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
        />
        
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
          />
        )}
      
        <div className="absolute bottom-3 right-3 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            id={`quick-add-btn-${product.id}`}
            onClick={handleQuickAdd}
            className="px-3 py-1.5 rounded-sm bg-text-fg hover:bg-text-fg/90 text-white shadow-sm flex items-center justify-center cursor-pointer active:scale-95 transition font-matter text-[9px] font-bold tracking-widest uppercase"
            title="Add to Cart"
          >
            + ADD TO CART
          </button>
        </div>

      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[9px] font-extrabold font-matter tracking-widest text-[#64748b] uppercase">
              {product.brand}
            </span>
            <span className="text-[9px] text-[#64748b] font-bold uppercase tracking-wider">
              {product.category.replace('-', ' ')}
            </span>
          </div>

          <h3 className="font-matter font-semibold text-text-fg leading-snug group-hover:text-text-fg transition mb-1 text-sm md:text-[14px] line-clamp-1">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center text-text-fg">
              <Star className="w-3 h-3 fill-current" />
            </div>
            <span className="text-[10px] font-matter font-bold text-text-fg">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[10px] text-text-muted font-matter">
              ({product.reviewsCount})
            </span>
          </div>

        </div>

        <div className="flex items-center justify-between pt-2 border-t border-brand-border/40">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs md:text-sm font-bold font-matter text-text-fg">
            ₹{product.price}
            </span>
            {product.compareAtPrice && (
              <span className="text-[11px] font-matter text-text-muted line-through">
                ₹{product.compareAtPrice}
              </span>
            )}
          </div>
        <Link href={`/products/${product.slug}`}>
          
          <span className="text-[10px] text-text-fg font-bold uppercase tracking-widest flex items-center group-hover:translate-x-0.5 transition-transform duration-200">
            Details
            <ArrowUpRight className="w-3 h-3 ml-0.5" />
          </span>
          </Link>
        </div>

      </div>
    </article>
  );
}
