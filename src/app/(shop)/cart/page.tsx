'use client';
import Link from 'next/link';
import { Download, Clock, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useSWR from 'swr';
import axios from 'axios';

// Interface for the Product object
interface Product {
  id: string;
  title: string;
  thumbnailImage: string;
  driveLink: string | null; // Can be null
}

// Interface for each item in the myProducts array
interface MyProduct {
  purchasedAt: string; // ISO date string (e.g., "2025-02-09T08:44:38.739Z")
  product: Product;
}

// Interface for the entire response
interface MyProductsResponse {
  myProducts: MyProduct[];
}

// Fetcher function for SWR
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function PurchasesPage() {
  // Use SWR to fetch purchased products
  const { data, error, isLoading } = useSWR<MyProductsResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/my`,
    fetcher
  );

  const myProducts = data?.myProducts || [];

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading your library...</p>
      </div>
    );
  }

  // Handle error state
  if (error || !data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Failed to load your purchases.</p>
      </div>
    );
  }

  // Handle no purchases
  if (!myProducts || myProducts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">No purchased products yet.</p>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="bg-[#F8F9FA] px-4 py-6" aria-labelledby="library-header">
        <div className="max-w-4xl mx-auto">
          <h1 id="library-header" className="text-2xl font-bold text-[#2A5C8F]">
            Your Learning Library
          </h1>
          <p className="text-[#6B7280] mt-2">
            Accessed {myProducts.length} resources
          </p>
        </div>
      </header>

      {/* Quick Access */}
      <section className="px-4 mt-6">
        <div className="flex gap-3 mb-6">
          <Button variant="outline" className="border-[#34C759] text-[#34C759]">
            All Resources
          </Button>
        </div>

        {/* Purchased Products List */}
        <div className="grid gap-4">
          {myProducts.map((item) => (
            <div key={item.product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4">
              <div className="flex gap-4">
                {/* Image */}
                <div className="w-1/3 relative">
                  <img
                    src={'/images/test.jpg'} // Fallback image
                    alt={item.product.title}
                    className="aspect-square rounded-lg object-cover"
                  />
                </div>

                {/* Content */}
                <div className="w-2/3 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-black line-clamp-2 mb-2">
                      {item.product.title}
                    </h3>
                    <div className="flex items-center text-sm text-[#6B7280] mt-2">
                      <Clock className="w-4 h-4" />
                      <div className="ml-2">
                        Bought at {new Date(item.purchasedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button
                      className="bg-[#34C759] hover:bg-[#2EB34D] text-white flex-1"
                      size="sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#2A5C8F] text-[#2A5C8F]"
                      size="sm"
                    >
                      View Online
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky Download All */}
      <footer className="fixed bottom-2 left-0 right-0 bg-white border-t border-[#2A5C8F]/10 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="text-[#2A5C8F]">
            <span className="font-semibold">{myProducts.length} items</span> in your library
          </div>
          <Button className="bg-gradient-to-r from-[#FFD700] to-[#FFB700] hover:from-[#FFB700] hover:to-[#FF9500] text-[#2A5C8F] font-bold">
            Download All as ZIP
          </Button>
        </div>
      </footer>
    </div>
  );
}