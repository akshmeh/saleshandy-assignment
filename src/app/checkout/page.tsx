"use client";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";
import { useOrderStore } from "@/store/orderStore";

export default function CheckoutPage(){
  const { cartItems, getTotals, clearCart } = useCartStore();
  const { user } = useUserStore();
  const { placeOrder } = useOrderStore();

  const [checkoutStepSuccess, setCheckoutStepSuccess] = useState<boolean>(false);
  const [newOrderNumber, setNewOrderNumber] = useState<string>('');
  const [shippingAddressIdx, setShippingAddressIdx] = useState<number>(0);
  const [billingSameAsShipping, setBillingSameAsShipping] = useState<boolean>(true);
  const [paymentChoice, setPaymentChoice] = useState<string>('card');


  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const shippingAddress = user.addresses[shippingAddressIdx] || user.addresses[0];
    const billingAddress = billingSameAsShipping ? shippingAddress : user.addresses[0];
    const paymentMethodText = paymentChoice === 'card' 
      ? `Visa ending in ${user.paymentMethods[0]?.last4 || '4242'}`
      : 'PayPal';

    const { subtotal, discount, shipping, total } = getTotals();

    const placed = placeOrder(
      cartItems,
      shippingAddress,
      billingAddress,
      paymentMethodText,
      subtotal,
      shipping,
      discount,
      total
    );

    setNewOrderNumber(placed.orderNumber);
    clearCart();
    setCheckoutStepSuccess(true);
  };

    return(
        <div className="fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            {checkoutStepSuccess ? (
              <div className="max-w-md mx-auto text-center py-16 px-6 bg-white border border-brand-border rounded-primary shadow-xl">
                <div className="w-16 h-16 rounded-full bg-brand-green/15 text-brand-green flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h1 className="font-caveat font-semibold text-xl md:text-2xl text-text-fg tracking-tight mb-2">
                  Order Successfully Placed!
                </h1>
                <p className="text-xs text-text-muted leading-relaxed mb-6">
                  Thank you for shopping at Saleshandy. Your order has been captures securely. Details and logistics transit parameters sent.
                </p>
                
                <div className="p-4 bg-brand-muted-bg rounded-card border border-brand-border/60 text-left mb-8 font-matter">
                  <div className="flex justify-between text-xs pb-2 border-b border-brand-border">
                    <span className="text-text-muted">Order code:</span>
                    <strong className="text-text-fg font-semibold">{newOrderNumber}</strong>
                  </div>
                  <div className="flex justify-between text-xs pt-2">
                    <span className="text-text-muted">Est Delivery:</span>
                    <span className="text-text-fg font-semibold">2 - 3 Logistics Days</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link
                    id="post-checkout-track-btn"
                    href="/orders"
                    className="flex-1 py-3 bg-brand-blue hover:bg-brand-blue/95 text-white font-semibold text-xs rounded-input transition cursor-pointer"
                  >
                    Track Shipment
                  </Link>
                  <Link
                    id="post-checkout-home-btn"
                    href="/"
                    onClick={() => {setCheckoutStepSuccess(false); }}
                    className="flex-1 py-3 bg-brand-muted-bg hover:bg-brand-border/65 text-text-fg font-semibold text-xs rounded-input transition cursor-pointer"
                  >
                    Go Back Home
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="font-caveat font-semibold text-2xl md:text-[40px] text-text-fg tracking-tight mb-8">Secure Checkout</h1>
                
                {cartItems.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-sm text-text-muted mb-4">No items chosen yet.</p>
                    <Link 
                      id="empty-checkout-browse"
                      href="/products"
                      className="px-4 py-2.5 bg-brand-blue text-white text-xs font-bold rounded-input cursor-pointer"
                    >
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    
                    <div className="lg:col-span-7 space-y-8">
                      
                      <div className="p-6 bg-white border border-brand-border rounded-primary">
                        <h3 className="text-sm font-semibold text-text-fg uppercase tracking-wide mb-4">
                          1. Logistics Delivery Address
                        </h3>
                        
                        <div className="space-y-3">
                          {user.addresses.map((addr, idx) => (
                            <div 
                              key={addr.id}
                              onClick={() => setShippingAddressIdx(idx)}
                              className={`p-4 rounded-card border cursor-pointer transition ${
                                shippingAddressIdx === idx 
                                  ? 'border-brand-blue bg-brand-blue/5' 
                                  : 'border-brand-border hover:border-text-fg/20'
                              }`}
                            >
                              <div className="flex items-center justify-between font-semibold text-xs text-text-fg mb-1">
                                <span>{addr.name}</span>
                                {shippingAddressIdx === idx && (
                                  <span className="text-brand-blue text-[10px] font-matter tracking-wider font-bold">
                                    ● DELIVER HERE
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-text-muted leading-relaxed">
                                {addr.street}, {addr.city}, {addr.state} {addr.postalCode}, {addr.country}
                              </p>
                              <p className="text-xs text-text-muted mt-1">Phone: {addr.phone}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 bg-white border border-brand-border rounded-primary">
                        <h3 className="text-sm font-semibold text-text-fg uppercase tracking-wide mb-4">
                          2. Safe, Secured Payment
                        </h3>
                        
                        <div className="space-y-4">
                          
                          <label className={`flex items-start gap-3 p-4 rounded-card border cursor-pointer transition ${
                            paymentChoice === 'card' ? 'border-brand-blue bg-brand-blue/5' : 'border-brand-border hover:border-text-fg/10'
                          }`}>
                            <input 
                              type="radio" 
                              name="paymentChoice"
                              value="card"
                              checked={paymentChoice === 'card'}
                              onChange={() => setPaymentChoice('card')}
                              className="mt-1 text-brand-blue"
                            />
                            <div className="flex-1">
                              <span className="text-xs font-semibold text-text-fg block mb-1">Credit / Debit Card (Stripe Verified)</span>
                              <p className="text-xs text-text-muted leading-normal">
                                Visa ending in **** {user.paymentMethods[0]?.last4 || '4242'} (Exp {user.paymentMethods[0]?.expiry || '12/28'})
                              </p>
                            </div>
                          </label>

                          <label className={`flex items-start gap-3 p-4 rounded-card border cursor-pointer transition ${
                            paymentChoice === 'paypal' ? 'border-brand-blue bg-brand-blue/5' : 'border-brand-border hover:border-text-fg/10'
                          }`}>
                            <input 
                              type="radio" 
                              name="paymentChoice"
                              value="paypal"
                              checked={paymentChoice === 'paypal'}
                              onChange={() => setPaymentChoice('paypal')}
                              className="mt-1 text-brand-blue"
                            />
                            <div className="flex-1">
                              <span className="text-xs font-semibold text-text-fg block mb-1">PayPal Account Connection</span>
                              <p className="text-xs text-text-muted leading-normal">
                                Secure direct redirect to authenticate purchase via *{user.paymentMethods[1]?.email || 'PayPal'}*
                              </p>
                            </div>
                          </label>

                        </div>
                      </div>

                    </div>

                    <div className="lg:col-span-5">
                      <div className="p-6 bg-brand-muted-bg border border-brand-border rounded-primary sticky top-24">
                        <h3 className="text-sm font-semibold text-text-fg uppercase tracking-wide mb-6">
                          Order Summary
                        </h3>

                        <ul className="divide-y divide-brand-border/60 max-h-48 overflow-y-auto mb-6 pr-2 custom-scrollbar">
                          {cartItems.map((item) => (
                            <li key={item.id} className="py-3 flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded bg-white shadow-sm overflow-hidden inline-block shrink-0 border border-brand-border">
                                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                                </span>
                                <div>
                                  <span className="text-xs font-semibold text-text-fg block line-clamp-1">{item.product.name}</span>
                                  <span className="text-[10px] text-text-muted block font-matter">Qty: {item.quantity}</span>
                                </div>
                              </div>
                              <span className="text-xs font-matter font-bold text-text-fg">₹{item.product.price * item.quantity}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="space-y-2.5 pb-6 border-b border-brand-border text-xs text-text-muted">
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-matter">₹{getTotals().subtotal}</span>
                          </div>
                          {getTotals().discount > 0 && (
                            <div className="flex justify-between text-brand-green font-semibold">
                              <span>Code (discount)</span>
                              <span className="font-matter">- ₹{getTotals().discount}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span>Shipping costs</span>
                            <span className="font-matter">
                              {getTotals().shipping === 0 ? 'FREE' : `₹${getTotals().shipping}`}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-baseline pt-4 mb-6">
                          <span className="text-sm font-bold text-text-fg uppercase">Guaranteed Total</span>
                          <span className="text-xl font-matter font-bold text-text-fg">₹{getTotals().total}</span>
                        </div>

                        <button
                          id="place-order-submit-btn"
                          type="submit"
                          className="w-full py-4 bg-brand-blue hover:bg-brand-blue/95 text-white text-xs font-semibold uppercase tracking-wider rounded-primary shadow transition flex items-center justify-center gap-2 cursor-pointer"
                        >
                          Complete Order & Dispatch
                        </button>

                        <p className="text-[10px] text-text-muted text-center mt-3 leading-normal font-medium max-w-xs mx-auto">
                          Standard secure transit lines. Certified organic GOTS knitwear tags and volcanic block containers.
                        </p>

                      </div>
                    </div>

                  </form>
                )}

              </div>
            )}

          </div>
    )
}