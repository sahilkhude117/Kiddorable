import React from "react";
import { Footer } from "../../components/navigation/Footer";
import  Navbar  from "../../components/navigation/Navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="home-layout">
      <Navbar/>
      {children}
      <Footer/>
    </div>
  )
}