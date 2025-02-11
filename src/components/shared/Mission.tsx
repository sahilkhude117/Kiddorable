import { Button } from "@/components/ui/button"
import { BookOpen, Leaf, Rocket, Users } from "lucide-react"
import Link from "next/link"

export const Mission = () => {
    return <>
    {/* Mission Section */}
    <div className="px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div 
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#2A5C8F] mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-[#6B7280]">
                To create engaging educational resources that transform screen time 
                into <span className="text-[#34C759] font-medium">productive learning moments</span>, 
                helping children aged 6-14 develop essential skills through play.
              </p>
              <Link href={'/about#us'} className="bg-[#FFD700] hover:bg-[#FFB700] text-[#2A5C8F] px-1 py-2 rounded-md text-xs font-bold mt-2">
                Meet Our Team
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Rocket className="w-8 h-8" />, title: "Innovative Methods" },
                { icon: <BookOpen className="w-8 h-8" />, title: "500+ Resources" },
                { icon: <Users className="w-8 h-8" />, title: "10k+ Families" },
                { icon: <Leaf className="w-8 h-8" />, title: "Eco-Friendly" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-xl shadow-md text-center"
                >
                  <div className="text-[#34C759] mb-3">{item.icon}</div>
                  <h3 className="font-medium text-[#2A5C8F]">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
}