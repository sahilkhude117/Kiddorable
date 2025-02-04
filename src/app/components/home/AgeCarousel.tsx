'use client'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Key } from 'react'
import { ProductCard } from '../products/ProductCard'
import { Product } from '@/app/lib/types'
import { trendingProducts } from '@/app/lib/constants'


export function AgeCarousel({ ageGroup }: { ageGroup: string }) {
  const ageProducts = trendingProducts.filter(
    (p) => p.ageGroup === ageGroup
  )

  return (
    <section className="px-4 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#2A5C8F]">
          For Ages {ageGroup}
        </h2>
        <button className="text-[#34C759] text-sm font-medium">
          See All
        </button>
      </div>

      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-4 pb-4">
          {ageProducts.map((product) => (
            <div 
              key={product.id}
              className="w-[45vw] min-w-[45vw]" // Mobile-first width
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  )
}