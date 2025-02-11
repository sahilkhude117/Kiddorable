
// components/products/product-list.tsx
import React from 'react';
import { ProductCard } from './product-card';

interface Product {
  id: string;
  title: string;
  thumbnailImage: string;
  description: string;
  slug: string;
  originalPrice: number;
  discountedPrice: number;
}

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 ">
      <div className="gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            thumbnail={'/images/test.jpg'}
            description={product.description}
            slug={product.slug}
            originalPrice={product.originalPrice}
            price={product.discountedPrice}
          />
        ))}
      </div>
    </div>
  );
};