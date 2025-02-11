// components/worksheets/popular-section.tsx
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ProductCard } from '../products/ProductCard';

interface Product {
  id: string;
  title: string;
  slug: string;
  thumbnailImage: string;
  originalPrice: number;
  discountedPrice: number;
}


export default async function Popular() {

      // Fetch popular products with ISR
  const popularProductsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/popular`, {
    next: { revalidate: 60 * 10 }, // Revalidate every 10 minutes
  });
  const {popularProducts} = await popularProductsResponse.json();

  return (
    <div aria-labelledby="popular-section">
      {/* Scrollable Product List */}
      <ScrollArea className="w-full pb-4">
        <div className="flex gap-4 pb-4 px-4">
          {popularProducts.length > 0 ? (
            popularProducts.map((product: Product) => (
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
    </div>
  );
}