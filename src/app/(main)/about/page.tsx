// app/(public)/about/page.tsx
'use client'
import { motion } from 'framer-motion'
import { Rocket, Users, BookOpen, Leaf, Award, Smile } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CTAButton } from '@/app/components/home/CTAButton'

export default function AboutPage() {
  return (
    <div className="pb-24">
      {/* Hero Section */}
      {/* Mission Section */}
      <section className="px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
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
              <Button className="bg-[#FFD700] hover:bg-[#FFB700] text-[#2A5C8F]">
                Meet Our Team
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Rocket className="w-8 h-8" />, title: "Innovative Methods" },
                { icon: <BookOpen className="w-8 h-8" />, title: "500+ Resources" },
                { icon: <Users className="w-8 h-8" />, title: "10k+ Families" },
                { icon: <Leaf className="w-8 h-8" />, title: "Eco-Friendly" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-white rounded-xl shadow-md text-center"
                >
                  <div className="text-[#34C759] mb-3">{item.icon}</div>
                  <h3 className="font-medium text-[#2A5C8F]">{item.title}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="px-4 py-16 bg-[#F8F9FA]">
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
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 py-16">
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ scale: 0.95 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
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
      </motion.section>
    </div>
  )
}