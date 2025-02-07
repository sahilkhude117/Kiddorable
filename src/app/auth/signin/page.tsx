// app/(auth)/signup/page.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Apple, ArrowRight } from 'lucide-react'
import { TrustBadges } from '@/app/components/shared/TrustBadges'

export default function SignupPage() {
  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-md mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-[#2A5C8F] mb-4">
              Join Kiddorable
            </h1>
            <p className="text-[#6B7280]">
              Start your child's learning adventure today
            </p>
          </div>

          {/* Form Card */}
          <Card className="p-6 shadow-sm">
            <form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-[#2A5C8F]">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    className="mt-1 focus-visible:ring-[#34C759]"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#2A5C8F]">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    className="mt-1 focus-visible:ring-[#34C759]"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#2A5C8F]">
                    Password
                  </label>
                  <Input
                    type="password"
                    className="mt-1 focus-visible:ring-[#34C759]"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFB700] hover:from-[#FFB700] hover:to-[#FF9500] text-[#2A5C8F] py-5 font-bold"
                size="lg"
              >
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#2A5C8F]/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#6B7280]">
                  Or sign up with
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="w-full border-[#2A5C8F]/20 text-[#2A5C8F] hover:bg-[#F8F9FA]"
              >
                <Apple className="w-5 h-5 mr-2" />
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full border-[#2A5C8F]/20 text-[#2A5C8F] hover:bg-[#F8F9FA]"
              >
                <Apple className="w-5 h-5 mr-2" />
                Apple
              </Button>
            </div>
          </Card>

          <p className="mt-8 text-center text-[#6B7280]">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-[#34C759] font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>

          <p className="mt-4 text-center text-xs text-[#6B7280] max-w-xs mx-auto">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="text-[#34C759] hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-[#34C759] hover:underline">
              Privacy Policy
            </Link>
          </p>
        </motion.div>

        <TrustBadges />
      </div>
    </div>
  )
}