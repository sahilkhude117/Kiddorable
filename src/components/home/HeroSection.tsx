// components/home/hero-section.tsx
import { CTAButton } from './CTAButton';


export default async function HeroSection({totalUsers}:{totalUsers:string}) {

  return (
    <div
      className="relative px-4 py-12 md:py-20 bg-gradient-to-b from-[#2A5C8F]/5 to-white"
      aria-labelledby="hero-section"
    >

      {/* Main Content */}
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Heading */}
        <h1
          className="text-3xl md:text-5xl font-bold text-[#2A5C8F] mb-6 leading-tight opacity-0 animate-fade-in-up"
        >
          Turn Screen Time into<br />
          <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FFD700] bg-clip-text text-transparent">
            Learning Time
          </span>
        </h1>

        {/* Subheading */}
        <p
          className="text-base md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto opacity-0 animate-fade-in-up delay-200"
        >
          {`14000+ Printable Kits Trusted by Parents Worldwide`}
        </p>

        {/* Call-to-Action Buttons */}
        <CTAButton/>

        {/* Trust Badge */}
        <div
          className="flex items-center justify-center gap-4 opacity-0 animate-fade-in-up delay-600"
        >
          <p className="text-sm text-gray-500">
            Trusted by <span className="font-semibold text-[#34C759]">{totalUsers}+</span> parents worldwide
          </p>
        </div>
      </div>
    </div>
  );
}