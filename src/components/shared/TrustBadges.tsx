'use client'
import { ShieldCheck, HeartHandshake, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

export function TrustBadges() {
  return (
    <div className="py-10 px-4 bg-gradient-to-b from-[#F8F9FA] to-[#E9EBED]">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold text-[#2A5C8F] mb-8 text-center"
      >
        Why Choose Us?
      </motion.h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        {/* Security */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center text-center gap-4 p-6 rounded-lg hover:shadow-lg transition-shadow"
        >
          <div className="p-4 bg-[#E1F5FE] rounded-full border-2 border-[#2A5C8F]">
            <ShieldCheck className="w-8 h-8 text-[#2A5C8F]" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-semibold text-[#2A5C8F]">Secure Payments</h3>
            <p className="text-sm text-[#6B7280] mt-1">256-bit SSL encryption</p>
          </div>
        </motion.div>

        {/* Satisfaction */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center text-center gap-4 p-6 rounded-lg hover:shadow-lg transition-shadow"
        >
          <div className="p-4 bg-[#E8FCE3] rounded-full border-2 border-[#34C759]">
            <HeartHandshake className="w-8 h-8 text-[#34C759]" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-semibold text-[#2A5C8F]">Satisfaction Guaranteed</h3>
            <p className="text-sm text-[#6B7280] mt-1">14000+ worksheets</p>
          </div>
        </motion.div>

        {/* Delivery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col items-center text-center gap-4 p-6 rounded-lg hover:shadow-lg transition-shadow"
        >
          <div className="p-4 bg-[#FFF8E1] rounded-full border-2 border-[#FFD700]">
            <Rocket className="w-8 h-8 text-[#FFD700]" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-semibold text-[#2A5C8F]">Instant Access</h3>
            <p className="text-sm text-[#6B7280] mt-1">Immediate downloads</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}