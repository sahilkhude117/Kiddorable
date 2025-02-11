import React from "react";
import { Footer } from "../../components/navigation/Footer";
import { Navbar } from "../../components/navigation/Navbar";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="shop-layout">
      <Navbar/>
      {children}
    </div>
  )
}