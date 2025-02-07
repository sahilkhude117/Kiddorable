import React from "react";
import { Footer } from "../components/navigation/Footer";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="home-layout">
      {children}
      <Footer/>
    </div>
  )
}