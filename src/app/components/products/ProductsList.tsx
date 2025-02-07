// components/products/product-list.tsx
'use client'

import { Button } from '@/components/ui/button'

interface Product{
  id: string;
  title: string;
  slug: string;
  thumbnailImage: string;
  originalPrice: number;
  discountedPrice: number;
};

export function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-4">
      {products.map(product => (
        <div 
          key={product.id}
          className="bg-white rounded-xl cursor-pointer shadow-md hover:shadow-xl transition-shadow p-4"
        >
          <div className="flex gap-4">
            {/* Image */}
            <div className="w-1/3 relative">
              <img
                src={'/images/test.jpg'}
                alt={product.title}
                className="aspect-square rounded-lg object-cover"
              />
              <span className="absolute bottom-2 left-2 bg-[#FFD700] text-[#2A5C8F] px-2 py-1 rounded-md text-xs font-bold">
                {product.discountedPrice}
              </span>
            </div>

            {/* Content */}
            <div className="w-2/3 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-[#2A5C8F] line-clamp-2 mb-2">
                  {product.title}
                </h3>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="space-y-1">
                  <div className="text-lg font-bold text-[#FF6B6B]">
                    ${product.discountedPrice}
                  </div>
                  {product.originalPrice > product.discountedPrice && (
                    <div className="text-xs line-through text-gray-400">
                      ${product.originalPrice}
                    </div>
                  )}
                </div>
                <Button className="bg-[#FFD700] hover:bg-[#FFB700] text-[#2A5C8F] px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                  BUY NOW
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}