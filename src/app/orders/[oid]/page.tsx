"use client";
import { useOrderStore } from "@/store/orderStore";
import { Package } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SingleOrderPage(){
    const { oid } = useParams<{ oid: string }>();

    const {orders} = useOrderStore()
 
    const matchOrder = orders.find(o => o.id === oid);

    if (!matchOrder) return <p className="px-5 text-xs text-brand-red font-semibold py-4">No code matched: {oid}</p>;
    return(
        <div className="bg-white border border-brand-border rounded-primary p-6 md:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-brand-border gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-matter font-bold tracking-wider text-brand-blue bg-brand-blue/10 px-2.5 py-1 rounded">
                {matchOrder.orderNumber}
              </span>
              <span className={`text-[10px] font-matter tracking-widest uppercase px-2 py-0.5 rounded font-bold ${
                matchOrder.status === 'delivered' ? 'bg-brand-green text-white' : 'bg-brand-yellow text-text-fg animate-pulse-subtle'
              }`}>
                {matchOrder.status}
              </span>
            </div>
            <p className="text-xs text-text-muted mt-2">
              Purchased on: {new Date(matchOrder.date).toLocaleString()}
            </p>
          </div>
          <Link
            id="untrack-order-btn"
            href="/orders"
            className="text-xs font-matter text-text-muted hover:text-brand-blue underline"
          >
            Search other code
          </Link>
        </div>

        <div className="py-8">
          <h3 className="font-caveat font-semibold text-xs text-text-fg tracking-wider uppercase mb-6 flex items-center gap-2">
            <Package className="w-4 h-4 text-brand-blue" />
            Package Progress History
          </h3>

          <div className="relative border-l border-brand-border pl-6 space-y-8 ml-3">
            {matchOrder.timeline.map((log, lIdx) => (
              <div key={lIdx} className="relative">
                
                <span className={`absolute -left-9 top-0.5 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center shadow-xs ${
                  lIdx === matchOrder.timeline.length - 1 ? 'bg-brand-blue' : 'bg-brand-border'
                }`} />

                <div>
                  <span className="font-caveat font-semibold text-xs md:text-sm text-text-fg leading-none flex items-center gap-2">
                    {log.title}
                    {lIdx === matchOrder.timeline.length - 1 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-ping" />
                    )}
                  </span>
                  <p className="text-xs text-text-muted leading-relaxed mt-1">{log.description}</p>
                  <span className="text-[10px] font-matter font-bold text-text-muted/65 mt-1 block">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>

              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-brand-border">
          <h4 className="font-caveat font-semibold text-xs tracking-wider uppercase text-text-fg mb-4">Parcel Specs</h4>
          <div className="space-y-4">
            {matchOrder.items.map((i, idx) => (
              <div key={idx} className="flex gap-4 items-center">
                <span className="w-10 h-10 rounded bg-brand-muted-bg overflow-hidden inline-block border border-brand-border">
                  <img src={i.product.images[0]} alt={i.product.name} className="w-full h-full object-cover" />
                </span>
                <div>
                  <span className="text-xs font-semibold text-text-fg block leading-snug">{i.product.name}</span>
                  <span className="text-[10px] text-text-muted block font-matter">Size Option: {i.selectedSize || 'Standard'} • x{i.quantity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    )
}