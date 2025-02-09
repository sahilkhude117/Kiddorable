// src/app/components/products/ProductGrid.tsx
'use client';
import { useState } from 'react';
import { ProductList } from './ProductsList';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Product {
  id: string;
  title: string;
  slug: string;
  thumbnailImage: string;
  originalPrice: number;
  discountedPrice: number;
}

interface Props {
  allProducts: Product[];
}

export function ProductGrid({ allProducts }: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on search query
  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section>
      <div className="px-4 py-6">
      <div className="relative max-w-xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="text-gray-400" size={20} />
        </div>
        <Input
          placeholder="Search worksheets, activities..."
          className="rounded-full py-6 px-10 text-base border-[#2A5C8F]/20 focus-visible:ring-[#34C759]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>

      {/* Product List */}
      {filteredProducts.length === 0 ? (
        <div className="text-center mt-8 mb-16">
          <p className="text-gray-500 mb-4">No courses found matching your search.</p>
          <p className="text-gray-400 text-sm">Check back later for new courses!</p>
        </div>
      ) : (
        <>
          <h2 className="px-4 text-xl font-bold text-[#2A5C8F] mb-2">All Worksheets</h2>
          <ProductList products={filteredProducts} />
        </>
      )}
    </section>
  );
}