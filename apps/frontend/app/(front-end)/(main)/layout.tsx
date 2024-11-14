"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import SidebarV2 from "@/components/SidebarV2";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarV2 />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto pt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
