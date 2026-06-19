import React, { useState } from 'react';
import { useUIStore } from '../../store/uiStore';
import { useProductStore } from '../../store/productStore';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { asset } from '@/lib/assets';

export default function Footer() {
  const { setSelectedCategory } = useProductStore();
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSuccess(true);
      setEmail('');
      setTimeout(() => setSuccess(false), 4000);
    }
  };

  const handleCategoryClick = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    router.push('products')
  };

  return (
    <footer className="bg-brand-muted-bg border-t border-brand-border mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-xl font-bold tracking-[0.2em] uppercase text-text-fg mb-4">
             <img src={asset("/logo.svg")} alt='saleshandy' />
              </div>
              <p className="text-sm text-text-muted leading-relaxed max-w-sm mb-6">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et aliquam perspiciatis maxime, distinctio molestias, vitae ullam delectus dolores consequuntur repudiandae iure debitis atque quidem, provident iste fuga labore. Error, dignissimos.
              </p>
            </div>
            
            <p className="hidden md:block font-matter text-[11px] text-text-muted">
              © {new Date().getFullYear()} Saleshandy
            </p>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-matter font-bold text-[10px] tracking-widest text-[#0b0b0b] uppercase mb-4">Shop Collections</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  id="foot-audio-btn"
                  onClick={() => handleCategoryClick('smart-audio')}
                  className="text-xs font-semibold text-text-muted hover:text-text-fg cursor-pointer transition text-left uppercase tracking-wider"
                >
                  Premium Audio
                </button>
              </li>
              <li>
                <button 
                  id="foot-tech-btn"
                  onClick={() => handleCategoryClick('aesthetic-tech')}
                  className="text-xs font-semibold text-text-muted hover:text-text-fg cursor-pointer transition text-left uppercase tracking-wider"
                >
                  Aesthetic Peripherals
                </button>
              </li>
              <li>
                <button 
                  id="foot-apparel-btn"
                  onClick={() => handleCategoryClick('minimalist-apparel')}
                  className="text-xs font-semibold text-text-muted hover:text-text-fg cursor-pointer transition text-left uppercase tracking-wider"
                >
                  Organic Apparel
                </button>
              </li>
              <li>
                <button 
                  id="foot-wellness-btn"
                  onClick={() => handleCategoryClick('curated-wellness')}
                  className="text-xs font-semibold text-text-muted hover:text-text-fg cursor-pointer transition text-left uppercase tracking-wider"
                >
                  Curated Wellness
                </button>
              </li>
            </ul>
          </div>

          {/* Customer support column */}
          <div className="md:col-span-2">
            <h4 className="font-matter font-bold text-[10px] tracking-widest text-[#0b0b0b] uppercase mb-4">Account & Help</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/profile" className="text-xs font-semibold text-text-muted hover:text-text-fg transition uppercase tracking-wider">
                  Personal Profile
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-xs font-semibold text-text-muted hover:text-text-fg transition uppercase tracking-wider">
                  Track Delivery
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-xs font-semibold text-text-muted hover:text-text-fg transition uppercase tracking-wider">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <a href="#shipping" className="text-xs font-semibold text-text-muted hover:text-text-fg transition uppercase tracking-wider">
                  Logistics FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-matter font-bold text-[10px] tracking-widest text-[#0b0b0b] uppercase mb-4">Subscribe to part of Family</h4>
            <p className="text-xs text-text-muted leading-relaxed mb-4">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae, suscipit.
            </p>
            
            {success ? (
              <div className="flex items-center gap-2 p-3 bg-text-fg/5 border border-text-fg/10 rounded-default text-text-fg text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-text-fg" />
                <span>Calibrated. Welcome to Aura circles.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your focus email..."
                  value={email}
                  onChange={(e) => setEmail( e.target.value)}
                  className="flex-1 w-full bg-white border border-brand-border rounded-input px-3 py-2 text-xs text-text-fg placeholder:text-text-muted/65 outline-none focus:border-text-fg transition"
                  required
                />
                <button
                  type="submit"
                  className="p-2.5 bg-brand-blue hover:bg-text-fg/90 active:scale-95 text-white rounded-input transition flex items-center justify-center shrink-0 cursor-pointer"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-brand-border flex md:hidden items-center justify-between">
          <p className="font-matter text-[10px] text-text-muted">
            © {new Date().getFullYear()} Saleshandy
          </p>
          <span className="font-matter text-[10px] text-text-muted uppercase">
            CALIBRATED US
          </span>
        </div>

      </div>
    </footer>
  );
}
