import React, { useState } from 'react';
import { useUIStore } from '../../store/uiStore';
import { useCartStore } from '../../store/cartStore';
import { X, Plus, Minus, Trash2, ArrowRight, Tag, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MiniCart() {
  const { isCartOpen, setCartOpen } = useUIStore();
  const { cartItems, updateQuantity, removeFromCart, getTotals, applyCoupon, removeCoupon, appliedCoupon } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const router = useRouter();

  if (!isCartOpen) return null;

  const { subtotal, discount, shipping, total } = getTotals();

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    
    const res = applyCoupon(couponCode);
    setCouponFeedback({ success: res.success, message: res.message });
    if (res.success) {
      setCouponCode('');
    }
  };

  const handleCheckoutClick = () => {
    setCartOpen(false);
    router.push("/checkout")
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        
        <div 
          onClick={() => setCartOpen(false)}
          className="absolute inset-0 bg-text-fg/50 backdrop-blur-sm transition-opacity" 
        />

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto w-screen max-w-md bg-white shadow-2xl flex flex-col h-full">
            
            <div className="px-6 py-5 border-b border-brand-border flex items-center justify-between">
              <h2 className="text-base font-semibold text-text-fg flex items-center gap-2" id="slide-over-title">
                Your Selection
                <span className="text-xs font-matter bg-brand-blue/10 text-brand-blue px-2 py-0.5 rounded-chip font-bold">
                  {cartItems.reduce((sum, i) => sum + i.quantity, 0)} items
                </span>
              </h2>
              <button
                id="cart-drawer-close-btn"
                onClick={() => setCartOpen(false)}
                className="p-2 -mr-2 rounded-full text-text-muted hover:text-text-fg hover:bg-brand-muted-bg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-brand-muted-bg flex items-center justify-center text-text-muted mb-4">
                    <X className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h3 className="font-caveat font-medium text-text-fg text-sm mb-1">Your cart is empty</h3>
                  <p className="text-xs text-text-muted max-w-xs mb-6">
                    Configure your workplace ergonomics and style options by browsing our curated collection products.
                  </p>
                  <button
                    id="cart-browse-btn"
                    onClick={() => {
                      setCartOpen(false);
                    router.push('products');
                    }}
                    className="px-5 py-2.5 bg-brand-blue hover:bg-brand-blue/95 text-white font-semibold text-xs rounded-input transition cursor-pointer"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex gap-4 border-b border-brand-border/40 pb-5 last:border-0 last:pb-0">
                      
                      <div className="relative w-20 h-20 bg-brand-muted-bg rounded-card overflow-hidden shrink-0">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          
                          <div className="flex items-start justify-between">
                            <h4 className="font-caveat font-medium text-xs md:text-sm text-text-fg leading-snug line-clamp-1">
                              {item.product.name}
                            </h4>
                            <span className="font-matter text-xs md:text-sm font-semibold text-text-fg ml-4">
                            ₹{item.product.price * item.quantity}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-[11px] text-text-muted">
                            {item.selectedColor && (
                              <div className="flex items-center gap-1">
                                <span 
                                  className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block" 
                                  style={{ backgroundColor: item.selectedColor.hex }}
                                />
                                <span>{item.selectedColor.name}</span>
                              </div>
                            )}
                            {item.selectedSize && (
                              <div className="flex items-center">
                                <span>Size: {item.selectedSize}</span>
                              </div>
                            )}
                          </div>

                        </div>

                        <div className="flex items-center justify-between mt-2">
                          
                          <div className="flex items-center border border-brand-border rounded-input bg-brand-muted-bg px-1">
                            <button
                              id={`qty-minus-${item.id}`}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-text-muted hover:text-text-fg transition"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2.5 font-matter font-semibold text-xs text-text-fg min-w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              id={`qty-plus-${item.id}`}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-text-muted hover:text-text-fg transition"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            id={`qty-del-${item.id}`}
                            onClick={() => removeFromCart(item.id)}
                            className="p-1.5 text-text-muted hover:text-brand-red rounded-full hover:bg-brand-muted-bg transition"
                            title="Delete Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                        </div>

                      </div>

                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-brand-border px-6 py-6 bg-brand-muted-bg/50">
                
                <div className="mb-4">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2.5 bg-brand-blue/5 border border-brand-blue/20 rounded-default text-brand-blue text-xs font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Code &#39;{appliedCoupon.code}&#39; applied</span>
                      </div>
                      <button 
                        id="rem-coupon-btn"
                        onClick={removeCoupon}
                        className="text-text-muted hover:text-brand-red transition underline font-matter text-[10px]"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleCouponSubmit} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Coupon code (AIPURPLE, STUDIODEMO)..."
                        value={couponCode}
                        onChange={(e) => setCouponCode( e.target.value)}
                        className="flex-1 bg-white border border-brand-border rounded-input px-3 py-2 text-xs text-text-fg uppercase placeholder:normal-case outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20 transition"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-text-fg hover:bg-brand-blue text-white font-semibold text-xs rounded-input transition cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {couponFeedback && (
                    <div className={`mt-1.5 flex items-center gap-1 font-semibold text-[10px] ${couponFeedback.success ? 'text-brand-green' : 'text-brand-red'}`}>
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{couponFeedback.message}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2.5 font-matter mb-6">
                  
                  <div className="flex justify-between text-xs text-text-muted">
                    <span>Subtotal</span>
                    <span className="font-matter font-medium">₹{subtotal}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-xs text-brand-green font-semibold">
                      <span>Discount code</span>
                      <span className="font-matter">- ₹{discount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-xs text-text-muted">
                    <span>Shipping fee</span>
                    <span className="font-matter">
                      {shipping === 0 ? 'FREE (Above ₹150)' : `₹${shipping}`}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline pt-2.5 border-t border-brand-border/60">
                    <span className="text-sm font-semibold text-text-fg">Total amount</span>
                    <span className="text-lg font-matter font-bold text-text-fg">₹{total}</span>
                  </div>

                </div>

                <button
                  id="checkout-redirect-btn"
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 bg-brand-blue hover:bg-brand-blue/95 text-white font-semibold text-xs tracking-wider rounded-primary transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[10px] text-text-muted text-center mt-3 leading-normal">
                  Standard free shipping triggers automatically above ₹150 expenditure. Safe, GOTS-sealed containers.
                </p>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
