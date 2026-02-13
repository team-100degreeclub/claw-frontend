"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import React from "react";

export function NavbarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname.includes("login") || pathname.includes("signup") || pathname.includes("hq");

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}