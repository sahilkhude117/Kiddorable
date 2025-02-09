import { Smile } from "lucide-react"
import { CTAButton } from "../home/CTAButton"

export const CTASection = () => {
    return <>
    {/* CTA Section */}
        <section
        className="px-4 py-16 bg-[#FFD700]/10 text-center"
        >
        <div className="max-w-4xl mx-auto">
        <Smile className="w-16 h-16 text-[#34C759] mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-[#2A5C8F] mb-4">
            Join 10,000+ Happy Families
        </h2>
        <p className="text-lg text-[#6B7280] mb-8 max-w-2xl mx-auto">
            Start your child's learning adventure today with our curated resources
        </p>
        <CTAButton/>
        </div>
        </section>
    </>
}