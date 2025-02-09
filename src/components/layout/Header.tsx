'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, Search, Heart, User2 } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useSelector((state: RootState) => state.cart);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white">
        {/* Top Bar */}
        <div className="bg-[#47126B] text-white py-2">
          <div className="container mx-auto px-4">
            <p className="text-sm text-center">Free Shipping on Orders Above ₹499 | Shop Now!</p>
          </div>
        </div>

        {/* Main Header */}
        <div className="border-b shadow-sm">
          <div className="container mx-auto px-4">
            {/* Upper Section */}
            <div className="flex items-center justify-between py-4">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <Image 
                  src="/logo.png" 
                  alt="Skino Logo" 
                  width={120} 
                  height={40} 
                  className="h-10 w-auto"
                  priority
                />
              </Link>

              {/* Search Bar - Desktop */}
              <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                <div className="relative w-full">
                  <Input
                    type="search"
                    placeholder="Search for products..."
                    className="w-full pl-10 pr-4 py-2 rounded-full border-gray-200 focus:border-[#47126B] focus:ring-[#47126B]"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              {/* Right Icons */}
              <div className="flex items-center gap-2">
                <button className="hidden md:flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-[#47126B] transition-colors">
                  <User2 className="w-5 h-5" />
                  <span className="text-sm">Account</span>
                </button>
                <button className="hidden md:flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-[#47126B] transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">Wishlist</span>
                </button>
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-[#47126B] transition-colors relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="hidden md:inline text-sm">Cart</span>
                  {items.length > 0 && (
                    <span className="absolute -top-1 -right-1 md:right-2 w-5 h-5 flex items-center justify-center bg-[#47126B] text-white text-xs rounded-full">
                      {items.length}
                    </span>
                  )}
                </button>
                <button
                  className="md:hidden text-gray-700"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Search Bar - Mobile */}
            <div className="md:hidden py-3">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border-gray-200"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:block py-3">
              <ul className="flex items-center gap-8">
                <li>
                  <Link href="/" className="text-gray-700 hover:text-[#47126B] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-gray-700 hover:text-[#47126B] transition-colors">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-700 hover:text-[#47126B] transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-700 hover:text-[#47126B] transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <nav className="container mx-auto px-4 py-4">
              <ul className="space-y-4">
                <li>
                  <Link 
                    href="/" 
                    className="flex items-center gap-2 text-gray-700 hover:text-[#47126B] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/products" 
                    className="flex items-center gap-2 text-gray-700 hover:text-[#47126B] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about" 
                    className="flex items-center gap-2 text-gray-700 hover:text-[#47126B] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact" 
                    className="flex items-center gap-2 text-gray-700 hover:text-[#47126B] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <hr className="my-2" />
                </li>
                <li>
                  <Link 
                    href="/account" 
                    className="flex items-center gap-2 text-gray-700 hover:text-[#47126B] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User2 className="w-5 h-5" />
                    Account
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/wishlist" 
                    className="flex items-center gap-2 text-gray-700 hover:text-[#47126B] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart className="w-5 h-5" />
                    Wishlist
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};

export default Header; 