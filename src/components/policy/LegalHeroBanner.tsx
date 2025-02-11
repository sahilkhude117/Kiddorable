// components/legal/hero-banner.tsx
export function LegalHeroBanner({ title }: { title: string }) {
    return (
      <div className="relative px-4 py-12 md:py-16 bg-gradient-to-b from-[#2A5C8F]/5 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2A5C8F] mb-4 leading-tight">
            {title}
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-[#FF6B6B] to-[#FFD700] mx-auto rounded-full" />
        </div>
      </div>
    );
  }