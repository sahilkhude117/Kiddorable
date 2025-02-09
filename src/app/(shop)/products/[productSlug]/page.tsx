// src/app/products/[productSlug]/page.tsx
import Link from 'next/link';
import { ArrowLeft, Download, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Popular from '@/app/components/home/Popular';
import { TrustBadges } from '@/app/components/shared/TrustBadges';
import { PurchaseCard } from '@/app/components/products/PurchaseCard';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

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

export default async function ProductPage({ params }: { params: { productSlug: string } }) {
  try {
    const { productSlug } = await params;

    // Fetch product details with ISR
    const productResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${productSlug}`, {
      next: { revalidate: 60 * 10 }, // Revalidate every 10 minutes
    });

    const { product } = await productResponse.json();

    const discountPercentage = Math.round(
      ((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100
    );

    return (
      <div className="pb-40">
        {/* Main Content Container */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Image Header */}
          <div className="relative rounded-lg shadow-md overflow-hidden max-w-2xl mx-auto">
            <Link href="/products" className="absolute top-4 left-4 z-10">
              <Button variant="ghost" className="bg-white/80 backdrop-blur-sm p-2 rounded-full">
                <ArrowLeft className="w-5 h-5 text-[#2A5C8F]" />
              </Button>
            </Link>
            <Link href={'/'} className='absolute top-4 right-4 z-10'>
              <Badge className="bg-[#FF6B6B]/10 text-[#FF6B6B] hover:bg-[#FF6B6B]/20 text-xs">
                {discountPercentage}% OFF
              </Badge>
            </Link>
            
            <img
              src={'/images/test.jpg'}
              alt={product.title}
              className="w-full lg:w-[60vw] h-auto object-cover aspect-video"
            />
          </div>

          {/* Product Details */}
          <div className="mt-6 max-w-2xl mx-auto">
            {/* Title and Metadata */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-[#2A5C8F] lg:text-3xl">{product.title}</h1>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <div className="flex items-center gap-1 text-[#FFD700]">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Download className="w-4 h-4" />
                    <span className="text-sm font-medium">{product.downloadCount}+ Downloads</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-[#2A5C8F] mb-3 lg:text-xl">What's Inside</h2>
              <p className="text-gray-600 leading-relaxed lg:text-lg">{product.description}</p>
            </div>

            {/* Preview Section */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-[#2A5C8F] mb-4 lg:text-xl">Preview Pages</h2>
              <ScrollArea>
                <div className="flex gap-4 pb-4">
                  {product.previewPages.map((img: string, index: number) => (
                    <img
                      key={index}
                      src={'/images/test.jpg'}
                      alt={`Preview ${index + 1}`}
                      className="rounded-lg border border-[#2A5C8F]/20 aspect-square object-cover w-48 lg:w-56"
                    />
                  ))}
                </div>
                <ScrollBar orientation='horizontal'/>
              </ScrollArea>
            </div>

            {/* Frequently Bought Together */}
            <div className="mt-12">
              <h2 className="text-xl font-bold text-[#2A5C8F] mb-6 lg:text-2xl">Frequently Bought Together</h2>
              <div className="max-w-4xl mx-auto">
                <Popular />
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Buy Footer */}
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 z-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <PurchaseCard
              price={product.discountedPrice}
              originalPrice={product.originalPrice}
              discountPercentage={discountPercentage}
              productId={product.id}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching product details:', error);
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-2xl font-bold text-[#2A5C8F] mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The requested resource could not be found.</p>
          <Button asChild className="bg-[#FFD700] hover:bg-[#FFB700] text-[#2A5C8F]">
            <Link href="/products">Browse All Products</Link>
          </Button>
        </div>
      </div>
    );
  }
}

export async function generateStaticParams() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/all`);
  const products = await response.json();
  return products.allProducts.map((product: Product) => ({
    productSlug: product.slug,
  }));
}