import { ReactNode } from "react"
import { Sidebar } from "@/components/layouts/Sidebar"
import Header from "@/components/layouts/Header"

interface Props {
  children: ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Header />
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
} 