"use client"
import React, { useEffect } from "react";
import Sidebar from "@/components/Sidebar"
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "@/lib/i18n";
import Navbar from "@/components/Navbar/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) {
      router.push("/");
    }
  }, [accessToken, router]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto pt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
