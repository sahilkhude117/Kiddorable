import { ContentSection } from "@/components/policy/ContentSection";
import { LegalHeroBanner } from "@/components/policy/LegalHeroBanner";


export default function TermsPage() {
  return (
    <main>
      <LegalHeroBanner title="Terms of Service" />
      
      <ContentSection>
        <h2 className="text-[#2A5C8F] font-bold text-2xl mb-4">Usage Terms</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-[#2A5C8F] mb-2">1. Acceptance of Terms</h3>
            <p className="text-gray-600">By accessing our services, you agree to comply with...</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#2A5C8F] mb-2">2. User Responsibilities</h3>
            <p className="text-gray-600">You agree not to misuse the services...</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li className="text-gray-600">Respect intellectual property rights</li>
              <li className="text-gray-600">Maintain account security</li>
              <li className="text-gray-600">Follow community guidelines</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#FFD700]/10 to-[#FF6B6B]/10 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-[#2A5C8F] mb-2">3. Termination</h3>
            <p className="text-gray-600">We reserve the right to terminate access...</p>
          </div>
        </div>
      </ContentSection>
    </main>
  );
}