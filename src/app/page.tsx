'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductWithStatus } from "@/models/product";
import { getTrendingProducts } from "@/services/product.service";
import { Search, ChevronRight, Star, ShieldCheck, Truck, Clock, Gift, Timer, CheckCircle2, Sparkles, Award, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Demo featured categories with images
const FEATURED_CATEGORIES = [
  {
    name: 'iPhone Cases',
    image: 'https://images.unsplash.com/photo-1600541519467-937869997011?q=80&w=1000',
    description: 'Premium protection for your iPhone',
    discount: '20% OFF'
  },
  {
    name: 'Samsung Cases',
    image: 'https://images.unsplash.com/photo-1613688270362-8b26189c0782?q=80&w=1000',
    description: 'Stylish cases for Samsung devices',
    discount: 'Up to 30% OFF'
  },
  {
    name: 'Designer Collection',
    image: 'https://images.unsplash.com/photo-1586105449897-20b5efeb3233?q=80&w=1000',
    description: 'Exclusive designer patterns',
    badge: 'NEW'
  },
  {
    name: 'Limited Edition',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=1000',
    description: 'Unique limited-time designs',
    badge: 'EXCLUSIVE'
  },
];

// Demo testimonials
const TESTIMONIALS = [
  {
    name: "Sarah M.",
    rating: 5,
    comment: "The quality is amazing! My phone looks stunning with this case.",
    image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    name: "John D.",
    rating: 5,
    comment: "Best phone case I've ever bought. Great protection and looks fantastic!",
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    name: "Emily R.",
    rating: 5,
    comment: "Received so many compliments on my new case. Absolutely love it!",
    image: "https://randomuser.me/api/portraits/women/2.jpg"
  }
];

// Demo brands
const FEATURED_BRANDS = [
  { name: 'Apple', logo: '/brand-logos/apple.png' },
  { name: 'Samsung', logo: '/brand-logos/samsung.png' },
  { name: 'OnePlus', logo: '/brand-logos/oneplus.png' },
  { name: 'Google', logo: '/brand-logos/google.png' },
  { name: 'Xiaomi', logo: '/brand-logos/xiaomi.png' },
  { name: 'Nothing', logo: '/brand-logos/nothing.png' },
];

// Demo benefits
const BENEFITS = [
  {
    title: 'Premium Materials',
    description: 'High-quality materials ensure lasting protection and style',
    icon: Shield
  },
  {
    title: 'Perfect Fit',
    description: 'Precisely engineered for each device model',
    icon: CheckCircle2
  },
  {
    title: 'Unique Designs',
    description: 'Stand out with exclusive patterns and styles',
    icon: Sparkles
  },
  {
    title: 'Award Winning',
    description: 'Recognized for excellence in design and protection',
    icon: Award
  }
];

export default function Home() {
  const [products, setProducts] = useState<ProductWithStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 48,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    async function loadProducts() {
      try {
        const trendingProducts = await getTrendingProducts(8);
        setProducts(trendingProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        if (totalSeconds <= 0) {
          clearInterval(timer);
          return prev;
        }
        return {
          hours: Math.floor(totalSeconds / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (productId: string) => {
    console.log('Adding to cart:', productId);
    // Will implement actual cart functionality later
  };

  const handleToggleWishlist = (productId: string) => {
    console.log('Toggling wishlist:', productId);
    // Will implement actual wishlist functionality later
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1609692814858-f7cd2f0afa4f?q=80&w=1000"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Elevate Your Device's Style
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Premium cases that combine protection with stunning design
            </p>
            <div className="flex gap-4">
              <Button
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-full"
              >
                Shop Now
              </Button>
              <Button
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-full"
              >
                View Collection
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Flash Sale Banner */}
      <div className="bg-red-600 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4">
            <Timer className="w-5 h-5 animate-pulse" />
            <p className="font-semibold">Flash Sale Ends In:</p>
            <div className="flex items-center gap-2">
              <span className="bg-white text-red-600 px-2 py-1 rounded font-mono">{timeLeft.hours.toString().padStart(2, '0')}</span>
              <span>:</span>
              <span className="bg-white text-red-600 px-2 py-1 rounded font-mono">{timeLeft.minutes.toString().padStart(2, '0')}</span>
              <span>:</span>
              <span className="bg-white text-red-600 px-2 py-1 rounded font-mono">{timeLeft.seconds.toString().padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-blue-50">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold">Premium Quality</p>
                <p className="text-sm text-gray-600">100% Authentic</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-green-50">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold">Fast Delivery</p>
                <p className="text-sm text-gray-600">2-3 Business Days</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-purple-50">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold">Easy Returns</p>
                <p className="text-sm text-gray-600">30-Day Policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-red-50">
                <Gift className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="font-semibold">Special Offers</p>
                <p className="text-sm text-gray-600">On All Orders</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Cases?</h2>
            <p className="text-gray-600">Experience the perfect blend of style and protection</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Collections</h2>
            <p className="text-gray-600">Discover our most popular categories</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_CATEGORIES.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  {category.discount && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {category.discount}
                    </div>
                  )}
                  {category.badge && (
                    <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {category.badge}
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <p className="text-gray-200 text-sm">{category.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Brands</h2>
            <p className="text-gray-600">We offer premium cases for all major brands</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {FEATURED_BRANDS.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={100}
                  height={40}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            // Loading Skeleton
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-gray-200 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onToggleWishlist={() => handleToggleWishlist(product.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Follow Us on Instagram</h2>
            <p className="text-gray-600">@skinoofficial • Join our community of 50K+ followers</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-square group cursor-pointer"
              >
                <Image
                  src={`https://picsum.photos/400/400?random=${index}`}
                  alt="Instagram post"
                  fill
                  className="object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                  <p className="text-white font-medium">View Post</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600">Join thousands of satisfied customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-2xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                  <ShieldCheck className="w-12 h-12 text-green-600" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">Our Satisfaction Guarantee</h3>
                <p className="text-gray-600 mb-4">
                  We're confident you'll love our products. If you're not completely satisfied, 
                  we offer a hassle-free 30-day return policy with full refund.
                </p>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Get 10% Off Your First Order</h2>
            <p className="text-gray-200 mb-8">
              Subscribe to our newsletter and stay updated with the latest products and special offers
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 rounded-full">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* App Download */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Download Our App</h2>
              <p className="text-gray-300 mb-6">
                Get exclusive app-only offers, easy ordering, and real-time order tracking
              </p>
              <div className="flex gap-4">
                <Image
                  src="/app-store.png"
                  alt="Download on App Store"
                  width={140}
                  height={42}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
                <Image
                  src="/play-store.png"
                  alt="Get it on Google Play"
                  width={140}
                  height={42}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
              </div>
            </div>
            <div className="md:w-1/2 relative h-[400px]">
              <Image
                src="/app-preview.png"
                alt="App Preview"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
