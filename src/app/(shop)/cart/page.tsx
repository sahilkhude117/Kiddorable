'use client';
import Link from 'next/link';
import { Download, Clock, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useSWR from 'swr';
import axios from 'axios';
import { useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  title: string;
  thumbnailImage: string;
  driveLink: string | null;
}

interface MyProduct {
  purchasedAt: string;
  product: Product;
}

interface MyProductsResponse {
  myProducts: MyProduct[];
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function PurchasesPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const { data, error, isLoading } = useSWR<MyProductsResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/my`,
    fetcher
  );

  const myProducts = data?.myProducts || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading your library...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Failed to load your purchases.</p>
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

  const handleDownload = () => {
    setLoading(true);
    
    try {
      const link = document.createElement('a');
      link.href = `${process.env.NEXT_PUBLIC_API_URL}/files/test.pdf`;
      link.setAttribute('download', `test.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch(e) {
      alert('error occured downloading file')
    } finally {
      setLoading(false);
    }
   }

  return (
    <div className="pb-24">
      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="bg-[#F8F9FA] py-6" aria-labelledby="library-header">
          <div className="max-w-4xl mx-auto">
            <h1 id="library-header" className="text-2xl lg:text-3xl font-bold text-[#2A5C8F]">
              Your Learning Library
            </h1>
            <p className="text-[#6B7280] mt-2 lg:text-lg">
              Accessed {myProducts.length} resources
            </p>
          </div>
        </header>

        {/* Purchased Products List */}
        <section className="mt-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-4 lg:gap-6">
              {myProducts.map((item) => (
                <div 
                  key={item.product.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 lg:p-6"
                >
                  <div className="flex gap-4 lg:gap-6">
                    {/* Image */}
                    <div className="w-1/3 lg:w-1/4 relative">
                      <img
                        src={'/images/test.jpg'}
                        alt={item.product.title}
                        className="aspect-square rounded-lg object-cover lg:rounded-xl"
                      />
                    </div>

                    {/* Content */}
                    <div className="w-2/3 lg:w-3/4 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-[#2A5C8F] line-clamp-2 mb-2 lg:text-lg">
                          {item.product.title}
                        </h3>
                        <div className="flex items-center text-sm text-[#6B7280] mt-2 lg:text-base">
                          <Clock className="w-4 h-4 lg:w-5 lg:h-5" />
                          <div className="ml-2">
                            Purchased {new Date(item.purchasedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-4 lg:mt-6">
                        <Button
                          onClick={handleDownload}
                          disabled={loading}
                          className="bg-[#34C759] hover:bg-[#2EB34D] text-white flex-1 lg:py-5 lg:text-base"
                          size="sm"
                        >
                          <Download className="w-4 h-4 mr-2 lg:w-5 lg:h-5" />
                          {loading ? <PulseLoader color="#fff" size={12} /> : 'Download'}
                        </Button>
                       
                        <Button
                          variant="outline"
                          className="border-[#2A5C8F] text-[#2A5C8F] lg:py-5 lg:text-base"
                          size="sm"
                          onClick={() => router.push('https://drive.google.com/drive/folders/1d_QHhuuw0KNVuFHl9vVeGSY0XdEzhFLP')}
                        >
                          View Online
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Sticky Download All */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#2A5C8F]/10 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 lg:gap-6">
            <div className="text-[#2A5C8F] lg:text-lg">
              <span className="font-semibold">{myProducts.length} items</span> in your library
            </div>
            <Button 
              className="bg-gradient-to-r from-[#FFD700] to-[#FFB700] hover:from-[#FFB700] hover:to-[#FF9500] text-[#2A5C8F] font-bold lg:px-8 lg:py-5 lg:text-base"
            >
              Download All as ZIP
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}