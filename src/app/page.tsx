import { ProductCard } from './components/products/ProductCard'
import { Key } from 'react'
import { trendingProducts } from './lib/constants'
import { HeroSection } from './components/home/HeroSection'
import { AgeCarousel } from './components/home/AgeCarousel'
import { TestimonialCard } from './components/home/TestimonialCard'
import { TrustBadges } from './components/shared/TrustBadges'
import { MobileBottomNav } from './components/navigation/MobileBottomNav'
import { HowItWorks } from './components/home/HowItWorks'
import { Popular } from './components/home/Popular'

export default function Home() {
  return (
    <main className="relative pb-20 min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Age Group Carousels */}
      {/* <AgeCarousel ageGroup="6-8" />
      <AgeCarousel ageGroup="9-11" />
      <AgeCarousel ageGroup="12-14" /> */}

      {/* Trending Section */}
      {/* <section className="px-4 mt-12">
        <h2 className="text-2xl font-bold text-[#2A5C8F] mb-6">
          Most Loved Worksheets
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {trendingProducts.map((product: { id: Key | null | undefined }) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section> */}
      <Popular/>

      {/* Testimonials */}
      <section className="px-4 mt-12">
        <div className="space-y-6">
          <TestimonialCard/>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Trust Badges */}
      {/* <TrustBadges /> */}

    </main>
  )
}