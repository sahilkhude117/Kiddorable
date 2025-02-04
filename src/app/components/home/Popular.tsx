// components/worksheets/popular-section.tsx
'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { trendingProducts } from '@/app/lib/constants'
import { ProductCard } from '../products/ProductCard'


export function Popular() {
  return (
    <section className="px-4 mt-16">
      <div className="flex justify-between items-center mb-10">
     
        <h2 className="text-2xl font-bold text-[#2A5C8F]">
            Popular
        </h2>
     
        <Button
          variant="link"
          className="text-[#FF6B6B] hover:text-[#FF6B6B]/90 p-0 group"
          asChild
        >
          <Link href="/products">
            Show All
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>

    <ScrollArea className="w-full pb-4">
        <div className="flex gap-4 pb-4">
            {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
        <ScrollBar orientation="horizontal" />
    </ScrollArea>
    </section>
  )
}