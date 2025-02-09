'use client';

import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductWithStatus } from "@/models/product";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProductCardProps extends ProductWithStatus {
  onToggleWishlist?: () => void;
}

export function ProductCard({
  id,
  name,
  price,
  discount_price,
  images,
  status,
  discount,
  onToggleWishlist
}: ProductCardProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  
  const imageUrl = Array.isArray(images) && images.length > 0 
    ? images[0] 
    : 'https://via.placeholder.com/400';

  const discountPercentage = discount_price 
    ? Math.round(((price - discount_price) / price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    dispatch(addToCart({
      id,
      name,
      price: discount_price || price,
      quantity: 1,
      image: imageUrl
    }));
    
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist?.();
  };

  const handleCardClick = () => {
    router.push(`/product/${id}`);
  };

  return (
    <div 
      className="bg-white cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Featured Tag */}
      <div className="mb-2">
        <span className="text-[#008ECC] text-xs font-medium bg-[#008ECC]/10 px-2 py-1 rounded">
          FEATURED
        </span>
      </div>

      {/* Image Container */}
      <div className="relative aspect-square mb-3">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-contain"
        />
        <button 
          className="absolute top-0 right-0"
          onClick={handleWishlistClick}
        >
          <Heart className="w-5 h-5 text-gray-400 hover:text-gray-600" />
        </button>
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500">(512)</span>
        </div>

        {/* Title */}
        <h3 className="text-sm text-gray-700 line-clamp-2">
          {name}
        </h3>
        
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400 line-through">
            ₹{price.toFixed(2)}
          </span>
          <span className="text-sm font-medium">
            ₹{(discount_price || price).toFixed(2)}
          </span>
          {discountPercentage > 0 && (
            <span className="text-xs text-green-600 font-medium">
              {discountPercentage}% Off
            </span>
          )}
        </div>

        {/* Get it for price */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-xs text-green-600">Get it for</span>
            <span className="text-xs text-green-600 font-medium">₹706</span>
          </div>
        </div>

        {/* Add to Bag Button */}
        <Button 
          className="w-full mt-2 bg-[#FF3F6C] hover:bg-[#FF3F6C]/90 text-white text-sm py-2 h-8"
          onClick={handleAddToCart}
          disabled={isAdding || status === "Out of Stock"}
        >
          {status === "Out of Stock" 
            ? "Out of Stock" 
            : isAdding 
              ? "Added!" 
              : "Add to Bag"}
        </Button>
      </div>
    </div>
  );
} 