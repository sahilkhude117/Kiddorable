// components/testimonials/auto-scroll-cards.tsx
'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Parent of 2",
    text: "My kids went from hating math to asking for extra worksheets!",
    avatar: "/avatars/sarah-johnson.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Elementary Teacher",
    text: "These materials save me hours of prep time every week.",
    avatar: "/avatars/michael-chen.jpg"
  },
  // Add 3-5 more testimonials
]

export function TestimonialCard() {
  const [scrollWidth, setScrollWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (wrapperRef.current && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth
      const wrapperWidth = wrapperRef.current.scrollWidth
      setScrollWidth(wrapperWidth - containerWidth)
    }
  }, [])

  return (
    <section className="py-12 px-4 bg-[#F8F9FA]">
    {/* Centered Title Section */}
    <div className="max-w-4xl mx-auto text-center mb-12">
    <h2 className="text-2xl font-bold text-[#2A5C8F] mb-4">
      Trusted by Parents
    </h2>
    <p className="text-[#6B7280]">
      Join thousands who've transformed learning with our resources
    </p>
    </div>
    <div 
      className="overflow-x-hidden py-8 relative"
      ref={containerRef}
    >
      <motion.div
        ref={wrapperRef}
        className="flex gap-6 w-max"
        animate={{ x: [-scrollWidth, 0] }}
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        onHoverStart={(e) => e.stopPropagation()}
      >
        {/* Double the testimonials for seamless loop */}
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <motion.div
            key={`${testimonial.id}-${index}`}
            className="w-[300px] shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="h-full p-6 bg-[#F8F9FA] border-[#2A5C8F]/20">
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="w-12 h-12 border-2 border-[#FFD700]">
                  <AvatarImage src={testimonial.avatar} />
                  <AvatarFallback className="bg-[#FFD700] text-[#2A5C8F]">
                    {testimonial.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-[#2A5C8F]">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-[#34C759]">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic">
                "{testimonial.text}"
              </p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F8F9FA] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#F8F9FA] to-transparent" />
    </div>
    </section>
  )
}