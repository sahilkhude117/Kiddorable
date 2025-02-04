// components/navigation/main-nav.tsx
'use client'

import Link from 'next/link'
import { Menu, ShoppingCart, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { DialogTitle } from '@radix-ui/react-dialog'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'

export function Navbar() {
  const cartItems = 3 // Temp count

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#2A5C8F]/10">
      <nav className="px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="text-[#2A5C8F] hover:bg-[#FFD700]/10 h-10 w-10"
              >
                <Menu size={40} className="h-10 w-10" />
                {/* Mobile Logo */}
              </Button>
              
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px]">
                <VisuallyHidden asChild>
                    <DialogTitle>Mobile Navigation Menu</DialogTitle>
                </VisuallyHidden>
              <div className="mt-6 space-y-4">
                <Link
                  href="/"
                  className="block px-4 py-3 text-lg font-semibold text-[#2A5C8F] hover:bg-[#FFD700]/10 rounded-lg transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="block px-4 py-3 text-lg font-semibold text-[#2A5C8F] hover:bg-[#FFD700]/10 rounded-lg transition-colors"
                >
                  All Products
                </Link>
                <Link
                  href="/blog"
                  className="block px-4 py-3 text-lg font-semibold text-[#2A5C8F] hover:bg-[#FFD700]/10 rounded-lg transition-colors"
                >
                  Learning Hub
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="md:hidden">
                <span className=" text-xl font-bold bg-gradient-to-r from-[#FF6B6B] to-[#FFD700] bg-clip-text text-transparent">
                Kiddorable
                </span>
            </Link>
        </div>

        {/* Desktop Logo */}
        <Link href="/" className="hidden md:block">
          <span className="text-2xl font-bold bg-gradient-to-r from-[#FF6B6B] to-[#FFD700] bg-clip-text text-transparent">
            Kiddorable
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem>
              <Link href="/products" legacyBehavior passHref>
                <NavigationMenuLink className={navLinkStyle}>
                  Products
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/age-groups" legacyBehavior passHref>
                <NavigationMenuLink className={navLinkStyle}>
                  Age Groups
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/blog" legacyBehavior passHref>
                <NavigationMenuLink className={navLinkStyle}>
                  Resources
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Section (Logo on mobile + Icons) */}
        <div className="flex items-center gap-4">

          <Button 
            variant="ghost" 
            size="icon"
            className="relative h-12 w-12 text-[#2A5C8F] hover:bg-[#FFD700]/10"
            asChild
          >
            <Link href="/cart">
              <ShoppingCart className="h-7 w-7" />
              <Badge 
                className="absolute -right-1 -top-1 bg-[#FF6B6B] text-white px-2 py-1"
              >
                {cartItems}
              </Badge>
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 text-[#2A5C8F] hover:bg-[#FFD700]/10"
            asChild
          >
            <Link href="/account">
              <Avatar className="h-8 w-8 border-2 border-[#FFD700]">
                <AvatarImage src="/user-avatar.jpg" />
                <AvatarFallback className="bg-[#FFD700] text-[#2A5C8F]">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}

const navLinkStyle = cn(
  "text-[#2A5C8F] hover:text-[#FF6B6B] font-medium",
  "px-3 py-2 rounded-lg transition-colors",
  "hover:bg-[#FFD700]/10",
  "data-[active]:bg-[#FFD700]/20 data-[active]:text-[#FF6B6B]"
)