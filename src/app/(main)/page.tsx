// src/app/page.tsx

import { CTAButton } from '../components/home/CTAButton';
import  HeroSection  from '../components/home/HeroSection';
import { HowItWorks } from '../components/home/HowItWorks';
import Popular from '../components/home/Popular';
import TestimonialCard from '../components/home/TestimonialCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Leaf, Rocket, Smile, Users } from 'lucide-react';
import Link from 'next/link';
import { Mission } from '../components/shared/Mission';
import { CTASection } from '../components/shared/CTASection';

interface Product {
  id: string;
  title: string;
  slug: string;
  thumbnailImage: string;
  originalPrice: number;
  discountedPrice: number;
}

interface Testimonial {
  name: string;
  profession: string;
  content: string;
}

export default async function Home() {
  try {
    // Fetch recent testimonials with ISR
    const testimonialsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/testimonials`, {
      next: { revalidate: 60 * 30 }, // Revalidate every 30 minutes
    });
    const {testimonials} = await testimonialsResponse.json();

          // Fetch total users with ISR
    const totalUsersResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stats/total-users`, {
      next: { revalidate: 60 * 10 }, // Revalidate every 10 minutes
    });
    const {totalUsers} = await totalUsersResponse.json();

    return (
      <main className="relative min-h-screen">
        {/* Hero Section */}
        <HeroSection totalUsers={totalUsers}/>

        {/* Popular Products Section */}
        <section className="px-4 mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#2A5C8F]">Popular</h2>
            <Button
              variant="link"
              className="text-[#FF6B6B] hover:text-[#FF6B6B]/90 p-0 group"
              asChild
            >
              <Link href="/products">
                Show All
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          <Popular/>
        </section>

        {/* Testimonials Section */}
        <section className="px-4 mt-12">
          <div className="space-y-6">
            <TestimonialCard testimonials={testimonials} />
          </div>
        </section>

        {/* How It Works Section */}
        <HowItWorks />
        <Mission/>
        <CTASection/>
        
      </main>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading page. Please try again later.</div>;
  }
}