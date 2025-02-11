// components/products/product-card.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

interface Product {
  title: string;
  thumbnail: string;
  description: string;
  slug: string;
  originalPrice: number;
  price: number;
}

export const ProductCard = ({
  title,
  thumbnail,
  description,
  slug,
  originalPrice,
  price,
}: Product) => {
  const router = useRouter();
  const discountPercentage = Math.round(((originalPrice - price) / originalPrice) * 100);

  return (
    <div onClick={() => {
      router.push(`/products/${slug}`)
    }} className="rounded-lg shadow-md p-4 lg:p-10 pb-8 transition-shadow hover:shadow-lg cursor-pointer">
      {/* Card Content */}
      <div className="flex items-start">
        {/* Thumbnail */}
        <div>
        <Badge className="absolute bg-[#FF6B6B]/10 text-[#FF6B6B] hover:bg-[#FF6B6B]/20 text-xs">
                  {discountPercentage}% OFF
        </Badge>
        <img
          src={thumbnail}
          alt={title}
          className="w-24 h-24 rounded-lg object-cover mr-4"
        />
        </div>
        
        {/* Details */}
        <div className="flex-1">
          {/* Title */}
          <h3 className="text-base font-semibold text-[#2A5C8F] mb-1 line-clamp-2">{title}</h3>
          {/* Description */}
          <p className="text-gray-400 text-sm mb-2 line-clamp-3">{description}</p>
          {/* Pricing */}
          <div className="flex items-center space-x-2 mb-2">
            <div className="text-lg font-bold text-[#FF6B6B]">₹{price.toFixed(2)}</div>
            {originalPrice > price && (
              <>
                <div className="text-xs line-through text-gray-400">₹{originalPrice.toFixed(2)}</div>
                
              </>
            )}
          </div>
          
          {/* Action Button */}
          <button
            onClick={() => router.push(`/products/${slug}`)}
            className="w-full lg:w-[200px] bg-gradient-to-r from-[#FFD700] to-[#FFB700] hover:from-[#FFB700] hover:to-[#FF9500] text-[#2A5C8F] font-bold py-2 text-sm rounded-md"
          >
            Buy Now
          </button>
        </div>
        
      </div>
    </div>
  );
};