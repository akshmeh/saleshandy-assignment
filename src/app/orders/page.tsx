"use client";
import { useOrderStore } from "@/store/orderStore";
import { Package } from "lucide-react";
import Link from "next/link";

export default function OrdersPage(){

    const { orders } = useOrderStore();


    return (
        <div className="fade-in max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-caveat font-semibold text-2xl md:text-[40px] text-text-fg tracking-tight mb-2">Transit Tracking</h1>
        <p className="text-xs md:text-sm text-text-muted mb-8 leading-normal font-semibold">
          Enter order numbers or review active status logs of past product purchases.
        </p>

          <div>
            <div className="p-6 bg-white border border-brand-border rounded-primary mb-8 shadow-xs">
              <h3 className="font-caveat font-semibold text-xs tracking-wider uppercase text-text-fg mb-4">Search Shipment Tracker</h3>
              
              <div className="flex gap-2">
                <input 
                  type="text"
                  id="search-order-inp"
                  placeholder="e.g., PROD-5982..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const val = (e.target as HTMLInputElement).value;
                      if (val.trim())  val.trim().toUpperCase();
                    }
                  }}
                  className="flex-1 px-4 py-3 border border-brand-border rounded-input text-xs uppercase placeholder:normal-case focus:border-brand-blue outline-none"
                />
                <button
                  id="track-submit-btn"
                  onClick={() => {
                    const val = (document.getElementById('search-order-inp') as HTMLInputElement)?.value;
                    if (val && val.trim()) val.trim().toUpperCase();
                  }}
                  className="px-6 py-3 bg-brand-blue text-white rounded-input text-xs font-bold transition hover:bg-brand-blue/95 cursor-pointer"
                >
                  Track Order
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-matter text-[10px] font-bold tracking-widest text-text-muted uppercase mb-4">
                Product Order History ({orders.length})
              </h3>

              <div className="space-y-4">
                {orders.map(o => (
                  <Link 
                    key={o.id}
                    href={`/orders/${o.id}`}
                    className="p-4 bg-white hover:bg-brand-muted-bg border border-brand-border rounded-primary cursor-pointer transition flex items-center justify-between"
                  >
                    <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-full bg-brand-muted-bg flex items-center justify-center text-text-muted">
                        <Package className="w-5 h-5 shrink-0" />
                      </div>
                      <div>
                        <span className="text-xs font-matter font-bold text-brand-blue block">
                          {o.orderNumber}
                        </span>
                        <span className="text-[10px] text-text-muted font-medium">Logistics Total: ₹{o.total}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-[9px] font-matter font-bold uppercase px-2 py-0.5 rounded inline-block mb-1 ${
                        o.status === 'delivered' ? 'bg-brand-green/10 text-brand-green' : 'bg-brand-yellow/10 text-text-fg'
                      }`}>
                        {o.status}
                      </span>
                      <span className="text-[10px] text-text-muted block">{new Date(o.date).toLocaleDateString()}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
    

      </div>
    )
}