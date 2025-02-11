// app/refund/page.tsx

import { ContentSection } from "@/components/policy/ContentSection";
import { LegalHeroBanner } from "@/components/policy/LegalHeroBanner";

export default function RefundPage() {
  return (
    <main>
      <LegalHeroBanner title="Refund Policy" />
      
      <ContentSection>
        <h2 className="text-[#2A5C8F] font-bold text-2xl mb-4">Our Refund Promise</h2>

        <div className="space-y-8">
        

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-[#FF6B6B]/10 rounded-full flex items-center justify-center">
              <span className="text-[#FF6B6B] text-2xl">!</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#2A5C8F] mb-2">We dont offer refund</h3>
              <p className="text-gray-600">Customized products may not be eligible...</p>
            </div>
          </div>

          <div className="bg-[#FFD700]/10 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-[#2A5C8F] mb-2">Processing Refunds</h3>
            <p className="text-gray-600">Refunds are typically processed within 5-7 business days...</p>
          </div>
        </div>
      </ContentSection>
    </main>
  );
}