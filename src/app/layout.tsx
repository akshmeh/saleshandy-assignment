"use client";

import "@/app/globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import SearchBar from "../components/search/SearchBar";
import MiniCart from "../components/cart/MiniCart";
import { useState } from "react";
import Link from "next/link";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <html lang="en">
      <body className="min-h-screen bg-page-background font-matter text-foreground-text">
      <div className="min-h-screen bg-white text-text-fg flex flex-col justify-between selection:bg-brand-blue/15 selection:text-brand-blue">
      
      <Header onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-text-fg/40 backdrop-blur-xs">
          <div className="w-64 bg-white h-full p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-border">
                <span className="font-caveat font-bold text-base text-text-fg">NAVIGATE AURA</span>
                <button                  onClick={() => setMobileMenuOpen(false)}
                  className="font-matter text-xs text-text-muted border border-brand-border px-1.5 py-0.5 rounded"
                >
                  Close
                </button>
              </div>

              <nav className="flex flex-col space-y-4">
               <Link
                  href="/" 
                  onClick={() => { setMobileMenuOpen(false); }}
                  className="text-left text-sm font-semibold text-text-fg py-2 hover:text-brand-blue"
                >
                  Home
                </Link>
               <Link
                  href="/products" 
                  onClick={() => { setMobileMenuOpen(false); }}
                  className="text-left text-sm font-semibold text-text-fg py-2 hover:text-brand-blue"
                >
                  Products
                </Link>
               <Link
                  href="/orders" 
                  onClick={() => { setMobileMenuOpen(false); }}
                  className="text-left text-sm font-semibold text-text-fg py-2 hover:text-brand-blue"
                >
                  Logistics Tracking
                </Link>
               <Link
                  href="/wishlist" 
                  onClick={() => { setMobileMenuOpen(false); }}
                  className="text-left text-sm font-semibold text-text-fg py-2 hover:text-brand-blue"
                >
                  Saved Wishlist
                </Link>
              </nav>
            </div>

         
          </div>
        </div>
      )}

          <main className="flex-1 w-full">{children}</main>
          <Footer />
      <SearchBar />
      <MiniCart />

    </div>
      </body>
    </html>
  );
}