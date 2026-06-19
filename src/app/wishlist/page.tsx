"use client";
import ProductCard from "@/components/product/ProductCard";
import { useWishlistStore } from "@/store/wishlistStore";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function WishListPage(){
  const { wishlistItems } = useWishlistStore();

    return (
        <div className="fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="font-caveat font-semibold text-2xl md:text-[40px] text-text-fg tracking-tight mb-2">Saved Wishlist</h1>
            <p className="text-xs md:text-sm text-text-muted mb-8 leading-normal font-medium">
              Your preserved items drops waiting for workstation calibration.
            </p>

            {wishlistItems.length === 0 ? (
              <div className="py-24 text-center border border-dashed border-brand-border rounded-primary bg-brand-muted-bg/50">
                <Heart className="w-12 h-12 text-text-muted mx-auto mb-4 stroke-[1.5]" />
                <h3 className="font-caveat font-medium text-text-fg text-sm mb-1">Your wishlist is empty</h3>
                <p className="text-xs text-text-muted max-w-sm mx-auto mb-6">
                  Browse products list, click small top heart icon togglers in product cards, and preserve favorites here.
                </p>
                <Link
                  id="wishlist-browse"
                  href="/products"
                  className="px-5 py-2.5 bg-brand-blue text-white font-semibold text-xs rounded-input hover:bg-brand-blue/95 transition cursor-pointer"
                >
                  Explore Products
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistItems.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </div>
    )
}