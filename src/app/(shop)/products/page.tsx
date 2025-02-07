// src/app/products/page.tsx
import { Input } from '@/components/ui/input';
import Popular from '../../components/home/Popular';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { TrustBadges } from '@/app/components/shared/TrustBadges';
import { ProductList } from '@/app/components/products/ProductsList';

interface Product {
  id: string;
  title: string;
  slug: string;
  thumbnailImage: string;
  originalPrice: number;
  discountedPrice: number;
}

export default async function ProductsPage() {
  // Fetch all products with ISR
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/all`, {
    next: { revalidate: 60 * 10 }, // Revalidate every 10 minutes
  });
  const allProducts = await response.json();

  // Fetch popular products with ISR
  const popularProductsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/popular`, {
    next: { revalidate: 60 * 10 }, // Revalidate every 10 minutes
  });
  const popularProducts = await popularProductsResponse.json();

  return (
    <div>
      {/* Search Section */}
      <SearchBar />

      {/* Featured Collections */}
      <FeaturedCollections popularProducts={popularProducts} />

      {/* Product Grid */}
      <ProductGrid allProducts={allProducts} />
      
      {/* Trust Badges */}
      <TrustBadges />
    </div>
  );
}

// Client Component for Search Bar
function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
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
  );
}

// Featured Collections Section
function FeaturedCollections({ popularProducts }: { popularProducts: Product[] }) {
  return (
    <section className="mb-10">
      <h2 className="px-4 text-xl font-bold text-[#2A5C8F]">Popular Categories</h2>
      <Popular products={popularProducts} />
    </section>
  );
}

// Product Grid Section
function ProductGrid({ allProducts }: { allProducts: Product[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  const getFilteredProducts = () => {
    return allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <section>
      {getFilteredProducts().length === 0 ? (
        <div className="text-center mt-8 mb-16">
          <p className="text-gray-500 mb-4">No courses found matching your search.</p>
          <p className="text-gray-400 text-sm">Check back later for new courses!</p>
        </div>
      ) : (
        <>
          <h2 className="px-4 text-xl font-bold text-[#2A5C8F] mb-2">All Worksheets</h2>
          <ProductList products={getFilteredProducts()} />
        </>
      )}
    </section>
  );
}