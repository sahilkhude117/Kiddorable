// components/navbar.tsx
'use client'
import Link from 'next/link';
import { LogOut, Menu, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useSession, signIn, signOut } from 'next-auth/react';
import { DialogTitle } from '@radix-ui/react-dialog';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import React from 'react';
import { useUser } from '@/contexts/userContext';
import Image from 'next/image';


interface UserInfo {
  purchases: {
    id: string;
  }[];
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data.userInfo);

export function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userInfo, loading } = useUser();
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#2A5C8F]/10">
      <div className="px-2 md:px-6 h-16 flex items-center justify-between">
        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center ">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="text-[#2A5C8F] hover:bg-[#FFD700]/10 h-10 w-10"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px]">
              <VisuallyHidden asChild>
                <DialogTitle>Mobile Navigation Menu</DialogTitle>
              </VisuallyHidden>
              <div className="mt-6 space-y-4">
                <Link
                  href="/"
                  className={cn(
                    "block px-4 py-3 text-lg font-semibold text-[#2A5C8F] rounded-lg transition-colors",
                    pathname === "/" && "bg-[#FFD700]/10 hover:bg-[#FFD700]/20"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className={cn(
                    "block px-4 py-3 text-lg font-semibold text-[#2A5C8F] rounded-lg transition-colors",
                    pathname === "/products" && "bg-[#FFD700]/10 hover:bg-[#FFD700]/20"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link
                  href="/about"
                  className={cn(
                    "block px-4 py-3 text-lg font-semibold text-[#2A5C8F] rounded-lg transition-colors",
                    pathname === "/about" && "bg-[#FFD700]/10 hover:bg-[#FFD700]/20"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <Button 
                  variant="destructive" 
                  className="absolute bottom-10 left-4 p-6 pl-20 pr-20"
                  onClick={() => {
                    if(window.confirm('Are you sure you want to logout?')) {
                      signOut();
                      router.push('/');
                    }
                  }}
                >
                <LogOut className="h-5 w-5 mr-2" />
                    Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className='flex justify-center'>
          <Image
            src={'/app/favicon.ico'}
            alt='sdk'
            width={50}
            height={50}
          />
          <div className="text-base mt-3 font-bold bg-gradient-to-r from-[#FF6B6B] to-[#FFD700] bg-clip-text text-transparent">
            FunLearningHub
          </div>
          </Link>
        </div>

        {/* Desktop Logo */}
        <Link href="/" className="hidden md:flex items-center">
          <Image
            src={'/app/favicon.ico'}
            alt='sdk'
            width={50}
            height={50}
          />
          <div className="text-xl font-bold bg-gradient-to-r from-[#FF6B6B] to-[#FFD700] bg-clip-text text-transparent">
            FunLearningHub
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-6">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                  className={cn(
                    navLinkStyle,
                    pathname === "/" && "bg-[#FFD700]/20 text-[#FF6B6B]"
                  )}
                >Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/products" legacyBehavior passHref>
              <NavigationMenuLink
                  className={cn(
                    navLinkStyle,
                    pathname?.startsWith("/products") && "bg-[#FFD700]/20 text-[#FF6B6B]"
                  )}
                >Products</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink
                  className={cn(
                    navLinkStyle,
                    pathname === "/about" && "bg-[#FFD700]/20 text-[#FF6B6B]"
                  )}
                >About Us</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Section (Cart & Profile or Login Buttons) */}
        <div className="flex items-center gap-2">
          {session ? (
            <>
              {/* Cart Icon */}
              <Button
                variant="ghost"
                size="icon"
                className="relative h-12 w-12 text-[#2A5C8F] hover:bg-[#FFD700]/10"
                asChild
              >
                <Link href="/cart">
                  <ShoppingCart className="h-7 w-7" />
                  <Badge className="absolute -right-1 -top-1 bg-[#FF6B6B] text-white px-2 py-1">
                     {userInfo?.purchases?.length || 0}
                  </Badge>
                </Link>
              </Button>
              <Button 
                  variant="ghost" 
                  size='icon'
                  className="relative h-12 w-12 text-[#2A5C8F] hover:bg-[#FFD700]/10"
                  onClick={() => {
                    if(window.confirm('Are you sure you want to logout?')) {
                      signOut();
                      router.push('/');
                    }
                  }}
                >
                <LogOut className="h-5 w-5 mr-2" />
                </Button>
            </>
          ) : (
            <>
              {/* Get Started Button */}
              {/* <Button
                variant="outline"
                className="text-[#2A5C8F] hover:bg-[#FFD700]/20 border-[#FFD700] h-8 px-2 rounded-full"
                onClick={() => router.push('/auth/signin')}
              >
                Get Started
              </Button> */}

              {/* Login Button */}
              <Button
                variant="default"
                className="bg-gradient-to-r from-[#FF6B6B] to-[#FFD700] text-white hover:bg-gradient-to-l h-8 px-4 mr-2 rounded-full"
                onClick={() => router.push('/auth/login')}
              >
                Login
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const navLinkStyle = cn(
  'text-[#2A5C8F] hover:text-[#FF6B6B] font-medium',
  'px-3 py-2 rounded-lg transition-colors',
  'hover:bg-[#FFD700]/10',
  'data-[active]:bg-[#FFD700]/20 data-[active]:text-[#FF6B6B]'
);

export default React.memo(Navbar);