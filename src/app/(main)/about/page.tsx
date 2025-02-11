
import { Mission } from '@/components/shared/Mission'
import { CTASection } from '@/components/shared/CTASection'

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <Mission/>

      {/* Timeline Section */}
      <div className="px-4 py-16 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#2A5C8F] mb-12 text-center">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 w-1 bg-[#2A5C8F]/20 h-full -translate-x-1/2" />
            {[
              { year: "2020", title: "Founded by Educators", content: "Started with 10 printable worksheets" },
              { year: "2021", title: "1k Families Reached", content: "Launched mobile-first platform" },
              { year: "2022", title: "Award Winning Content", content: "Received STEM Education Award" },
              { year: "2023", title: "Global Community", content: "Serving families in 15+ countries" },
            ].map((item, index) => (
              <div
                key={index}
                className={`relative mb-12 w-full ${index % 2 === 0 ? 'pr-8 md:pr-0 md:pl-24' : 'pl-8 md:pl-0 md:pr-24'}`}
              >
                <div className={`relative md:w-1/2 ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                  <div className="absolute top-4 -translate-x-6 md:translate-x-6 w-4 h-4 bg-[#34C759] rounded-full" />
                  <div className="p-6 bg-white rounded-xl shadow-md">
                    <div className="text-[#FF6B6B] font-bold mb-2">{item.year}</div>
                    <h3 className="text-xl font-semibold text-[#2A5C8F] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#6B7280]">{item.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div id='us' className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#2A5C8F] mb-12 text-center">
            Meet the Minds
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Johnson", role: "Founder & CEO", img: "/team1.jpg" },
              { name: "Michael Chen", role: "Lead Educator", img: "/team2.jpg" },
              { name: "Emma Wilson", role: "Product Designer", img: "/team3.jpg" },
            ].map((member, index) => (
              <div
                key={index}
                className="group text-center"
              >
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img
                    src={'/images/test.jpg'}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A5C8F]/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-left">
                    <h3 className="text-white text-xl font-bold">{member.name}</h3>
                    <p className="text-[#FFD700]">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <CTASection/>
    </div>
  )
}