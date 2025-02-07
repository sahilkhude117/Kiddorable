// src/app/products/[productSlug]/page.tsx
import Link from 'next/link';
import { ArrowLeft, Download, Star, ShieldCheck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Popular from '@/app/components/home/Popular';
import { TrustBadges } from '@/app/components/shared/TrustBadges';

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
    // Fetch product details with ISR
    const productResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${params.productSlug}`, {
      next: { revalidate: 60 * 10 }, // Revalidate every 10 minutes
    });
    if (!productResponse.ok) {
      throw new Error('Product not found');
    }
    const product: Product = await productResponse.json();

    // Fetch popular products with ISR
    const popularProductsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/popular`, {
      next: { revalidate: 60 * 10 }, // Revalidate every 10 minutes
    });
    const popularProducts: PopularProduct[] = await popularProductsResponse.json();

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
            src={product.thumbnailImage}
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
                <div className="flex items-center gap-1 text-[#FFD700]">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-medium">{product.rating}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#FF6B6B]">${product.discountedPrice}</div>
              <div className="text-sm line-through text-gray-400">${product.originalPrice}</div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-[#F8F9FA] rounded-lg">
              <div className="flex items-center justify-center gap-1 text-[#FFD700]">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-xl font-bold text-[#2A5C8F]">{product.rating}</span>
              </div>
            </div>
            <div className="text-center p-3 bg-[#F8F9FA] rounded-lg">
              <div className="flex items-center justify-center gap-1 text-[#34C759]">
                <Download className="w-5 h-5" />
                <span className="text-xl font-bold text-[#2A5C8F]">{product.downloadCount}+</span>
              </div>
            </div>
            <div className="text-center p-3 bg-[#F8F9FA] rounded-lg">
              <div className="flex items-center justify-center gap-1 text-[#2A5C8F]">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xl font-bold text-[#2A5C8F]">100%</span>
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
              {product.previewPages.map((img, index) => (
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
            <Popular products={popularProducts} />
          </div>

          <TrustBadges />
        </div>

        {/* Sticky Buy Footer */}
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-[#2A5C8F]/10 py-4 px-6">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-[#FF6B6B]">${product.discountedPrice}</span>
                <span className="text-sm line-through text-gray-400">${product.originalPrice}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-4 h-4 text-[#34C759]" />
                <span className="text-sm text-[#2A5C8F]">Instant PDF Download</span>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-[#FFD700] to-[#FFB700] hover:from-[#FFB700] hover:to-[#FF9500] text-[#2A5C8F] font-bold py-4 px-8">
              Buy Now
            </Button>
          </div>
        </div>
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