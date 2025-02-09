'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Truck, RotateCcw, Star, Heart, Share2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProductById } from '@/services/product.service';
import { ProductWithStatus } from '@/models/product';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';
import { toast } from 'react-hot-toast';

export default function ProductDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<ProductWithStatus | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        const productData = await getProductById(params.id as string);
        if (productData) {
          setProduct(productData);
          setSelectedImage(productData.images[0]);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    setIsAdding(true);
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.discount_price || product.price,
      quantity: 1,
      image: product.images[0]
    }));
    
    toast.success('Added to cart!');
    
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-gray-500">
          <span>Home</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span>Products</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <motion.div 
              className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`relative aspect-square rounded-lg overflow-hidden bg-gray-100 transition-all ${
                      selectedImage === image ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Product Title and Sharing */}
            <div className="flex justify-between items-start">
              <div>
                <motion.h1 
                  className="text-3xl font-bold text-gray-900"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {product.name}
                </motion.h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">(128 reviews)</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Heart className="w-6 h-6 text-gray-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Share2 className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{(product.discount_price || product.price).toFixed(2)}
                </span>
                {product.discount_price && (
                  <span className="text-lg text-gray-500 line-through">
                    ₹{product.price.toFixed(2)}
                  </span>
                )}
                {product.discount && (
                  <span className="px-2 py-1 text-xs font-semibold text-red-600 bg-red-50 rounded-full">
                    {product.discount}
                  </span>
                )}
              </div>
              {product.discount_price && (
                <p className="text-sm text-green-600">
                  You save: ₹{(product.price - product.discount_price).toFixed(2)}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-sm">
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 py-6 border-y">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-50">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Free Delivery</p>
                  <p className="text-sm text-gray-500">Orders over ₹499</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-50">
                  <RotateCcw className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Easy Returns</p>
                  <p className="text-sm text-gray-500">30-day returns</p>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className={`w-full py-6 text-lg font-semibold transition-all ${
                    isAdding
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                  onClick={handleAddToCart}
                  disabled={isAdding || product.stock === 0}
                >
                  {product.stock === 0 
                    ? 'Out of Stock' 
                    : isAdding 
                      ? 'Added to Cart!' 
                      : 'Add to Cart'}
                </Button>
              </motion.div>

              {/* Stock Status */}
              {product.stock > 0 && product.stock <= 5 && (
                <p className="text-sm text-orange-600 text-center">
                  Only {product.stock} units left in stock!
                </p>
              )}
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 p-4 bg-gray-50 rounded-lg">
              <Shield className="w-5 h-5 text-green-600" />
              <p className="text-sm text-gray-600">
                <span className="font-medium">100% Authentic</span> product | 
                <span className="font-medium"> Secure</span> payment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 