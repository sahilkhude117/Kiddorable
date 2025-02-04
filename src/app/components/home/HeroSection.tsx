// components/home/hero-section.tsx
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative px-4 py-16 md:py-24 bg-gradient-to-b from-[#2A5C8F]/5 to-white">
      {/* Animated background elements */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 right-4 md:right-20"
        >
          <img 
            src="/images/spaceman.png"
            alt="Learning character"
            className="w-20 md:w-48 h-auto animate-float"
          />
        </motion.div>
      </div> */}

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <Sparkles className="w-8 h-8 text-[#FFD700] animate-pulse" />
        </motion.div> */}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-6xl font-bold text-[#2A5C8F] mb-6 leading-tight"
        >
          Turn Screen Time into<br />
          <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FFD700] bg-clip-text text-transparent">
            Learning Time
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          3000+ Printable Kits Trusted by Parents Worldwide
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-row gap-4 justify-center mb-8"
        >
          <Button
            className="relative overflow-hidden group px-8 py-6 text-lg
                     bg-gradient-to-r from-[#FFD700] to-[#FFB700] hover:from-[#FFB700] hover:to-[#FF9500]
                     text-[#2A5C8F] shadow-lg hover:shadow-xl transition-all"
            size="lg"
          >
            <span className="relative z-10">Start Learning Now</span>
            <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all" />
          </Button>

          {/* <Button
            variant="outline"
            className="px-8 py-6 text-lg border-2 border-[#2A5C8F] hover:border-[#34C759]
                     text-[#2A5C8F] hover:text-[#34C759] bg-white/90 hover:bg-white
                     shadow-lg hover:shadow-xl transition-all"
            size="lg"
          >
            View Demo
          </Button> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-4"
        >
          <p className="text-sm text-gray-500">
            Trusted by <span className="font-semibold text-[#34C759]">8,921+</span> parents Worldwide
          </p>
        </motion.div>
      </div>
    </section>
  )
}