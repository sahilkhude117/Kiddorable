// app/privacy/page.tsx

import { ContentSection } from "@/components/policy/ContentSection";
import { LegalHeroBanner } from "@/components/policy/LegalHeroBanner";

export default function PrivacyPage() {
  return (
    <main>
      <LegalHeroBanner title="Privacy Policy" />
      
      <ContentSection>
        <h2 className="text-[#2A5C8F] font-bold text-2xl mb-4">Your Privacy Matters</h2>
        
        <p className="mb-6">We are committed to protecting your personal information...</p>

        <div className="space-y-6">
          <div className="border-l-4 border-[#FFD700] pl-4">
            <h3 className="text-lg font-semibold text-[#2A5C8F]">Information Collection</h3>
            <p className="text-gray-600">We collect information to provide better services...</p>
          </div>

          <div className="border-l-4 border-[#FF6B6B] pl-4">
            <h3 className="text-lg font-semibold text-[#2A5C8F]">Data Security</h3>
            <p className="text-gray-600">We implement security measures to protect your data...</p>
          </div>

          <div className="bg-[#2A5C8F]/5 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-[#2A5C8F] mb-3">Changes to Policy</h3>
            <p className="text-gray-600">We may update this policy periodically...</p>
          </div>
        </div>
      </ContentSection>
    </main>
  );
}