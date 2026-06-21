import { useUIStore } from '../../store/uiStore';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { Search, ShoppingBag, Heart, User, Sparkles, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { asset } from '@/lib/assets';

interface HeaderProps {
  onMobileMenuToggle: () => void;
}

export default function Header({ onMobileMenuToggle }: HeaderProps) {
  const {setCartOpen, setSearchOpen } = useUIStore();
  const { cartItems } = useCartStore();
  const { wishlistItems } = useWishlistStore();
  const pathname = usePathname();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const activeCss = "text-brand-blue border-b-2 border-brand-yellow pb-0.5"
  const notActiveCss = "text-text-muted hover:text-text-fg"

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <button 
            id="mobile-menu-btn"
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 rounded-md text-text-muted hover:text-text-fg hover:bg-brand-muted-bg transition"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1 md:flex-none flex justify-center md:justify-start">
            <Link
              id="header-logo-btn"
             href="/"
              className="group flex items-center gap-1 text-xl font-bold tracking-[0.2em] uppercase text-text-fg cursor-pointer"
            >
              <img src={asset("/logo.svg")} alt="saleshandy" />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8 uppercase tracking-widest text-[11px] font-semibold">
            <Link 
              id="nav-home-btn"
              href="/"
              className={`transition ${
                pathname === '/' 
                  ? activeCss
                  : notActiveCss
              }`}
            >
              Home
            </Link>
            <Link 
              id="nav-catalog-btn"
             href="/products"
              className={`transition ${
                pathname.includes('products')
                  ? activeCss
                  : notActiveCss
              }`}
            >
              Products
            </Link>
            <Link 
              id="nav-orders-btn"
              href="/orders"
              className={`transition ${
                pathname.includes('orders') 
                  ? activeCss 
                  : notActiveCss
              }`}
            >
              Track Order
            </Link>
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            
            <button
              id="search-trigger-btn"
              onClick={() => setSearchOpen(true)}
              className="p-2 text-text-muted hover:text-text-fg hover:bg-brand-muted-bg rounded-full transition"
              title="Search Product"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              id="wishlist-trigger-btn"
              href="/wishlist"
              className="relative p-2 text-text-muted hover:text-text-fg hover:bg-brand-muted-bg rounded-full transition"
              title="View Wishlist"
            >
              <Heart className={`w-5 h-5 ${pathname.includes('wishlist') ? 'fill-text-fg text-text-fg' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-brand-blue text-[9px] font-bold text-white flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              id="minicart-trigger-btn"
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-text-muted hover:text-text-fg hover:bg-brand-muted-bg rounded-full transition"
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-brand-blue text-[9px] font-bold text-white flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              id="profile-trigger-btn"
              href="/profile"
              className={`p-1 border rounded-full transition ${
                pathname.includes('profile') ? 'border-text-fg ring-2 ring-text-fg/5' : 'border-brand-border hover:border-text-fg'
              }`}
              title="User Account"
            >
              <div className="w-7 h-7 rounded-full bg-brand-muted-bg overflow-hidden flex items-center justify-center">
                <User className="w-4 h-4 text-text-muted" />
              </div>
            </Link>

          </div>

        </div>
      </div>
    </header>
  );
}
