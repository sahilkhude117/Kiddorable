// components/products/product-card.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const ProductCard = ({
  title,
  slug,
  thumbnailImage,
  originalPrice,
  discountedPrice,
}:{
  title:string,
  slug: string;
  thumbnailImage: string;
  originalPrice: number;
  discountedPrice: number;
}) => {
  const hasDiscount = originalPrice > discountedPrice
  
  return (
    <motion.div
      className="group relative bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow w-[60vw] flex-shrink-0 sm:w-[60vw] md:w-[45vw] lg:w-[35vw]"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link href={`/product/${slug}`} className="block">
        {/* Image Section */}
        <div className="relative">
          <img
            src={'/images/test.jpg'}
            alt={title}
            className="object-cover w-full h-full rounded-t-xl transition-transform duration-300 group-hover:scale-105"
          />
          <Badge className="absolute top-2 left-2 bg-[#FFD700] text-[#2A5C8F] hover:bg-[#FFD700]/90">
            {originalPrice}% Off
          </Badge>
        </div>

        {/* Content Section */}
        <div className="p-3 space-y-2">
          <h3 className="font-semibold text-[#2A5C8F] line-clamp-2 leading-tight text-sm">
            {title}
          </h3>
          
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-[#FF6B6B]">
                ${discountedPrice}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-sm line-through text-gray-400">
                    ${originalPrice}
                  </span>
                  <Badge className="bg-[#FF6B6B]/10 text-[#FF6B6B] hover:bg-[#FF6B6B]/20 text-xs">
                    {discountedPrice}% OFF
                  </Badge>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Full Width Buy Button */}
      <div className="px-3 pb-3">
        <Button
          className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFB700] hover:from-[#FFB700] hover:to-[#FF9500] text-[#2A5C8F] font-bold py-3 text-sm"
        >
          BUY NOW
        </Button>
      </div>
    </motion.div>
  )
}