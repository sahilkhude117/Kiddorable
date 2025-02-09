// src/app/products/[productSlug]/page.tsx
import Link from 'next/link';
import { ArrowLeft, Download, Star, ShieldCheck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Popular from '@/app/components/home/Popular';
import { TrustBadges } from '@/app/components/shared/TrustBadges';
import { Key } from 'react';
import { PurchaseCard } from '@/app/components/products/PurchaseCard';

interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnailImage: string;
  previewPages: string[];
  originalPrice: number;
  discountedPrice: number;
  rating: number;
  downloadCount: number;
}

interface PopularProduct {
  id: string;
  title: string;
  slug: string;
  thumbnailImage: string;
  originalPrice: number;
  discountedPrice: number;
}

export default async function ProductPage({ params }: { params: { productSlug: string } }) {
  try {
    const {productSlug} = await params;

    // Fetch product details with ISR
    const productResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${productSlug}`, {
      next: { revalidate: 60 * 10 }, // Revalidate every 10 minutes
    });

    const {product} = await productResponse.json();

    const discountPecentage = Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100);

    return (
      <div className="pb-24">
        {/* Image Header */}
        <div className="relative rounded-full shadow-md">
          <Link href="/products" className="absolute top-4 left-4 z-10">
            <Button variant="ghost" className="bg-white/90 backdrop-blur-sm">
              <ArrowLeft className="w-5 h-5 text-[#2A5C8F]" />
            </Button>
          </Link>
          <img
            src={'/images/test.jpg'}
            alt={product.title}
            className="w-full h-auto object-cover rounded-xl m-1"
          />
        </div>

        {/* Product Details */}
        <div className="px-4 mt-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-[#2A5C8F]">{product.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <div className='text-[#FFD700]'><Star className="w-4 h-4 fill-current" /></div>
                  <span className="text-medium font-bold mr-2">{product.rating}</span>
                  <Download className="w-4 h-4" />
                  <span className="text-medium font-bold">{product.downloadCount}+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-[#2A5C8F] mb-3">What's Inside</h2>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Preview Section */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-[#2A5C8F] mb-4">Preview Pages</h2>
            <div className="grid grid-cols-2 gap-3">
              {product.previewPages.map((img: string , index: number) => (
                <img
                  key={index}
                  src={img}
                  alt={`Preview ${index + 1}`}
                  className="rounded-lg border border-[#2A5C8F]/20"
                />
              ))}
            </div>
          </div>

          {/* Frequently Bought Together */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-[#2A5C8F] mb-6">Frequently Bought Together</h2>
            <Popular />
          </div>
          <TrustBadges />
        </div>

        {/* Sticky Buy Footer */}
        <PurchaseCard
          price = {product.discountedPrice}
          originalPrice = {product.originalPrice}
          discountPercentage = {discountPecentage}
          productId = {product.id}
        />
      </div>
    );
  } catch (error) {
    console.error('Error fetching product details:', error);
    return <div className="flex justify-center items-center">Product Not Found!</div>;
  }
}

// Pre-render static paths at build time
export async function generateStaticParams() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/all`);
  const products = await response.json();
  return products.allProducts.map((product: Product) => ({
    productSlug: product.slug,
  }));
}