// app/(shop)/purchases/page.tsx

import Link from 'next/link';
import { Download, Clock, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface MyProduct {
  id: string;
  title: string;
  thumbnailImage: string;
  driveLink: string;
  purchasedAt: Date;
}

export default function PurchasesPage() {
  const [myProducts, setMyProducts] = useState<MyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/my`);
        setMyProducts(response.data.myProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading your library...</p>
      </div>
    );
  }

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
          <Button variant="outline" className="border-[#2A5C8F] text-[#2A5C8F]">
            Recent
          </Button>
        </div>

        {/* Purchased Products List */}
        <div className="grid gap-4">
          {myProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4">
              <div className="flex gap-4">
                {/* Image */}
                <div className="w-1/3 relative">
                  <img
                    src={product.thumbnailImage}
                    alt={product.title}
                    className="aspect-square rounded-lg object-cover"
                  />
                </div>
                {/* Content */}
                <div className="w-2/3 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-[#2A5C8F] line-clamp-2 mb-2">
                      {product.title}
                    </h3>
                    <div className="flex items-center text-sm text-[#6B7280] mt-2">
                      <Clock className="w-4 h-4" />
                      <div className="ml-2">
                        Bought at {new Date(product.purchasedAt).toLocaleDateString()}
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

        {/* Recommendations */}
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-[#FF6B6B]" />
            <h2 className="text-xl font-bold text-[#2A5C8F]">
              Frequently Purchased Together
            </h2>
          </div>
          {/* Uncomment if needed */}
          {/* <Popular /> */}
        </div>
      </section>

      {/* Sticky Download All */}
      <footer className="sticky bottom-0 left-0 right-0 bg-white border-t border-[#2A5C8F]/10 py-4 px-6">
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