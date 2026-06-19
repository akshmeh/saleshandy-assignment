"use client";
import { useEffect, useState } from "react";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import { useProductStore } from "@/store/productStore";
import { useUIStore } from "@/store/uiStore";
import { ArrowLeft, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import ProductSpecifications from "@/components/product/ProductSpecifications";
import { Product } from "@/types";
import { useParams } from "next/navigation";

export default function SingleProductPage() {
  const { pid } = useParams<{ pid: string }>();

  const products = useProductStore((state) => state.products);

  const [selectedColor, setSelectedColor] = useState<{
    name: string;
    hex: string;
  } | null>(null);

  const [selectedSize, setSelectedSize] = useState("");
  const [purchaseQty, setPurchaseQty] = useState(1);

  const activeProduct = products.find(
    (product) => product.slug === pid
  ) as Product | undefined;

  useEffect(() => {
    if (!activeProduct) return;

    if (
      activeProduct.variants.colors?.length &&
      !selectedColor
    ) {
      setSelectedColor(activeProduct.variants.colors[0]);
    }

    if (
      activeProduct.variants.sizes?.length &&
      !selectedSize
    ) {
      setSelectedSize(activeProduct.variants.sizes[0]);
    }
  }, [activeProduct]);

  if (!activeProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-semibold">
          Product not found
        </h2>

        <Link
          href="/products"
          className="mt-4 inline-flex items-center text-brand-blue"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const handleProductViewInit = (product: typeof activeProduct) => {
    if (product) {
      if (product.variants.colors && product.variants.colors.length > 0 && !selectedColor) {
        setSelectedColor(product.variants.colors[0]);
      }
      if (product.variants.sizes && product.variants.sizes.length > 0 && !selectedSize) {
        setSelectedSize(product.variants.sizes[0]);
      }
    }
  };

  if (activeProduct) {
    handleProductViewInit(activeProduct);
  }

    return(
        <div className="fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
        <Link
          id="back-to-catalog-btn"
          href="/products"
          className="group inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-brand-blue transition mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition group-hover:-translate-x-0.5" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          <div className="lg:col-span-7">
            <ProductImageGallery images={activeProduct.images} name={activeProduct.name} />
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="font-matter text-[11px] font-bold tracking-widest text-text-muted uppercase">
                  {activeProduct.brand}
                </span>
                <span className="text-xs bg-brand-muted-bg border border-brand-border px-2.5 py-0.5 rounded-chip font-semibold text-text-muted">
                  {activeProduct.category.replace('-', ' ')}
                </span>
              </div>

              <h1 className="font-caveat font-semibold text-text-fg leading-tight mb-3 text-2xl md:text-3xl">
                {activeProduct.name}
              </h1>

              <div className="flex items-center gap-2 mb-6 text-sm">
                <div className="flex items-center text-brand-yellow">
                  <Star className="w-4 h-4 fill-current text-brand-yellow" />
                  <span className="font-matter font-bold ml-1 text-text-fg text-xs">{activeProduct.rating.toFixed(2)}</span>
                </div>
                <span className="text-text-muted text-xs">•</span>
                <span className="text-text-muted font-medium text-xs">
                  {activeProduct.reviewsCount} customer reviews
                </span>
                <span className="text-brand-green font-semibold text-xs ml-auto">
                  ● In Stock ({activeProduct.stock} left)
                </span>
              </div>

              <div className="bg-brand-muted-bg/60 border border-brand-border rounded-primary p-4 mb-8 flex items-baseline gap-2">
                <span className="text-2xl font-matter font-bold text-text-fg">₹{activeProduct.price}</span>
                {activeProduct.compareAtPrice && (
                  <span className="text-sm font-matter text-text-muted line-through">
                    ₹{activeProduct.compareAtPrice}
                  </span>
                )}
                <span className="text-[10px] text-text-muted font-matter ml-auto">Free dispatch on orders above ₹150</span>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                  {activeProduct.description}
                </p>
              </div>

              {activeProduct.variants.colors && activeProduct.variants.colors.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-matter text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-2.5">
                    Color Selection: <span className="text-text-fg font-semibold font-matter normal-case">{selectedColor?.name}</span>
                  </h4>
                  <div className="flex items-center gap-3">
                    {activeProduct.variants.colors.map((c) => (
                      <button
                        key={c.name}
                        id={`color-opt-${c.name}`}
                        onClick={() => setSelectedColor(c)}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                          selectedColor?.name === c.name 
                            ? 'border-brand-blue ring-2 ring-brand-blue/10 scale-95' 
                            : 'border-brand-border hover:border-text-fg/20'
                        }`}
                        title={c.name}
                      >
                        <span 
                          className="w-6 h-6 rounded-full inline-block border border-black/5" 
                          style={{ backgroundColor: c.hex }} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeProduct.variants.sizes && activeProduct.variants.sizes.length > 0 && (
                <div className="mb-8">
                  <h4 className="font-matter text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-2.5">
                    Selected Option: <span className="text-text-fg font-semibold font-matter normal-case">{selectedSize}</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProduct.variants.sizes.map((s) => (
                      <button
                        key={s}
                        id={`size-opt-${s}`}
                        onClick={() => setSelectedSize(s)}
                        className={`px-4 py-2 rounded-card text-xs font-semibold border transition-all cursor-pointer ${
                          selectedSize === s 
                            ? 'border-brand-blue text-brand-blue bg-brand-blue/5' 
                            : 'border-brand-border text-text-muted hover:border-text-fg'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4 mb-4">
                
                <div className="flex items-center border border-brand-border rounded-primary bg-brand-muted-bg px-2 shrink-0">
                  <button
                    id="detail-qty-minus"
                    onClick={() => setPurchaseQty(Math.max(1, purchaseQty - 1))}
                    className="p-1 text-text-muted hover:text-text-fg transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 font-matter font-bold text-sm text-text-fg text-center min-w-8">
                    {purchaseQty}
                  </span>
                  <button
                    id="detail-qty-plus"
                    onClick={() => setPurchaseQty(purchaseQty + 1)}
                    className="p-1 text-text-muted hover:text-text-fg transition"
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>

                <button
                  id="detail-add-cart-btn"
                  onClick={() => {
                    useCartStore.getState().addToCart(activeProduct, purchaseQty, selectedColor || undefined, selectedSize || undefined);
                    useUIStore.getState().setCartOpen(true);
                    setPurchaseQty(1);
                  }}
                  className="flex-1 py-4 bg-brand-blue hover:bg-brand-blue/95 text-white font-semibold text-xs tracking-wider rounded-primary transition flex items-center justify-center gap-2 cursor-pointer shadow-sm uppercase"
                >
                  Add Selection to purchase
                </button>

              </div>


            </div>

            <ProductSpecifications specifications={activeProduct.specifications} />

          </div>

        </div>

      </div>
    )
}