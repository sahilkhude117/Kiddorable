// components/footer/main-footer.tsx
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react'

export function Footer() {
  return (
    <div className="bg-[#2A5C8F] text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#FFD700]">Kiddorable</h3>
            <p className="text-sm text-[#F8F9FA]">
              Making learning fun and engaging for kids through creative resources.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-[#34C759] font-semibold mb-2">Explore</h4>
            <ul className="space-y-2">
              <FooterLink href="/products" label="All Products" />
              <FooterLink href="/blog" label="Learning Resources" />
              <FooterLink href="/about" label="About Us" />
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="text-[#34C759] font-semibold mb-2">Legal</h4>
            <ul className="space-y-2">
              <FooterLink href="/privacy" label="Privacy Policy" />
              <FooterLink href="/terms" label="Terms of Service" />
              <FooterLink href="/refunds" label="Refund Policy" />
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-[#34C759] font-semibold mb-2">Connect</h4>
            <div className="flex space-x-4">
              <SocialIcon href="#" icon={<Facebook className="w-5 h-5" />} />
              <SocialIcon href="#" icon={<Instagram className="w-5 h-5" />} />
              <SocialIcon href="#" icon={<Twitter className="w-5 h-5" />} />
              <SocialIcon href="#" icon={<Mail className="w-5 h-5" />} />
            </div>
            <p className="text-sm text-[#F8F9FA]">
              Subscribe to our newsletter for updates
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#34C759]/20 mt-12 pt-8">
          <p className="text-center text-sm text-[#F8F9FA]/80">
            © {new Date().getFullYear()} Kiddorable. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <li>
    <Link
      href={href}
      className="text-sm text-[#F8F9FA] hover:text-[#FFD700] transition-colors"
    >
      {label}
    </Link>
  </li>
)

const SocialIcon = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <Link
    href={href}
    className="p-2 bg-[#2A5C8F]/90 hover:bg-[#34C759] rounded-full transition-colors"
  >
    {icon}
  </Link>
)