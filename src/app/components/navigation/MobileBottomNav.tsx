import Link from 'next/link'
import { Home, Book, ShoppingCart, User } from 'lucide-react'

export function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 w-full bg-white border-t flex justify-around py-3">
      <Link href="/" className="flex flex-col items-center text-[#2A5C8F]">
        <Home className="h-6 w-6" />
        <span className="text-xs mt-1">Home</span>
      </Link>
      
      <Link href="#" className="flex flex-col items-center text-[#2A5C8F]">
        <Book className="h-6 w-6" />
        <span className="text-xs mt-1">Library</span>
      </Link>
      
      <Link href="/cart" className="flex flex-col items-center text-[#2A5C8F]">
        <ShoppingCart className="h-6 w-6" />
        <span className="text-xs mt-1">Cart</span>
      </Link>
      
      <Link href="/account" className="flex flex-col items-center text-[#2A5C8F]">
        <User className="h-6 w-6" />
        <span className="text-xs mt-1">Account</span>
      </Link>
    </nav>
  )
}