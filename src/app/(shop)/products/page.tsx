// src/app/products/page.tsx
import Popular from '../../../components/home/Popular';
import { TrustBadges } from '@/components/shared/TrustBadges';
import { ProductGrid } from '@/components/products/ProductGrid';

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
    next: { revalidate: 60 * 60 * 24 }, // Revalidate every 10 minutes
  });
  const {allProducts} = await response.json();

  return (
    <div>

      {/* Product Grid */}
      <ProductGrid allProducts={allProducts} />

      {/* Featured Collections */}
      <section className="mb-10 mt-10">
        <h2 className="px-4 text-xl font-bold text-[#2A5C8F]">Popular Worksheets</h2>
        <Popular/>
      </section>

      {/* Trust Badges */}
      <TrustBadges />
    </div>
  );
}
