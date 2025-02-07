// components/worksheets/popular-section.tsx
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductCard } from '../products/ProductCard';

interface Product {
  id: string;
  title: string;
  slug: string;
  thumbnailImage: string;
  originalPrice: number;
  discountedPrice: number;
}

interface Props {
  products: Product[];
}

export default function Popular({ products }: Props) {
  return (
    <section aria-labelledby="popular-section">
      {/* Scrollable Product List */}
      <ScrollArea className="w-full pb-4">
        <div className="flex gap-4 pb-4 px-4">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                slug={product.slug}
                thumbnailImage={product.thumbnailImage}
                originalPrice={product.originalPrice}
                discountedPrice={product.discountedPrice}
              />
            ))
          ) : (
            <div className="text-gray-500">No popular products available.</div>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}