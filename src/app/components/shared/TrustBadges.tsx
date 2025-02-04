import { ShieldCheck, HeartHandshake, Rocket } from 'lucide-react'

export function TrustBadges() {
  return (
    <section className="py-12 px-4 bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 justify-center">
        {/* Security */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="p-3 bg-white rounded-full border-2 border-[#2A5C8F]">
            <ShieldCheck className="w-6 h-6 text-[#2A5C8F]" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-semibold text-[#2A5C8F]">Secure Payments</h3>
            <p className="text-sm text-[#6B7280] mt-1">256-bit SSL encryption</p>
          </div>
        </div>

        {/* Satisfaction */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="p-3 bg-white rounded-full border-2 border-[#34C759]">
            <HeartHandshake className="w-6 h-6 text-[#34C759]" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-semibold text-[#2A5C8F]">Satisfaction Guaranteed</h3>
            <p className="text-sm text-[#6B7280] mt-1">30-day money back</p>
          </div>
        </div>

        {/* Delivery */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="p-3 bg-white rounded-full border-2 border-[#FFD700]">
            <Rocket className="w-6 h-6 text-[#FFD700]" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-semibold text-[#2A5C8F]">Instant Access</h3>
            <p className="text-sm text-[#6B7280] mt-1">Immediate downloads</p>
          </div>
        </div>
      </div>
    </section>
  )
}