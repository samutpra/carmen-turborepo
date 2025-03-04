"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FolderTree,
  Users,
  FileText,
  HelpCircle,
  Settings,
  CreditCard,
  ChevronDown,
} from "lucide-react"
import { useState } from "react"

interface SidebarItem {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  matchPath?: string
  children?: {
    title: string
    href: string
  }[]
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Clusters",
    href: "/admin/clusters",
    icon: FolderTree,
    matchPath: "/admin/clusters",
    children: [
      {
        title: "All Clusters",
        href: "/admin/clusters",
      },
      {
        title: "Templates",
        href: "/admin/clusters/templates",
      },
      {
        title: "Members",
        href: "/admin/clusters/members",
      }
    ]
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
    matchPath: "/admin/users",
    children: [
      {
        title: "Platform Users",
        href: "/admin/users/platform",
      },
      {
        title: "Cluster Users",
        href: "/admin/users/clusters",
      },
      {
        title: "Hotel Staff",
        href: "/admin/users/hotels",
      },
      {
        title: "Roles",
        href: "/admin/users/roles",
      },
      {
        title: "Access Control",
        href: "/admin/users/access",
      }
    ]
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: FileText,
  },
  {
    title: "Subscriptions",
    href: "/admin/subscriptions",
    icon: CreditCard,
    matchPath: "/admin/subscriptions",
    children: [
      {
        title: "Plans",
        href: "/admin/subscriptions/plans",
      },
      {
        title: "Modules",
        href: "/admin/subscriptions/modules",
      },
      {
        title: "Usage",
        href: "/admin/subscriptions/usage",
      },
      {
        title: "Billing",
        href: "/admin/subscriptions/billing",
      }
    ]
  },
  {
    title: "Support",
    href: "/admin/support",
    icon: HelpCircle,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
    children: [
      {
        title: "General",
        href: "/admin/settings",
      },
      {
        title: "Profile",
        href: "/admin/settings/profile",
      },
      {
        title: "Security",
        href: "/admin/settings/security",
      }
    ],
  },
]

function SidebarLink({ item, isChild = false }: { item: SidebarItem, isChild?: boolean }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(
    item.children?.some(child => pathname === child.href || pathname.startsWith(child.href + '/'))
  )

  const isActive = item.matchPath 
    ? pathname.startsWith(item.matchPath)
    : pathname === item.href || pathname.startsWith(item.href + '/')

  if (!item.children || isChild) {
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
          isActive && "bg-muted text-foreground",
          isChild && "pl-9"
        )}
      >
        {item.icon && <item.icon className="h-4 w-4" />}
        {item.title}
      </Link>
    )
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
          isActive && "text-foreground"
        )}
      >
        <div className="flex items-center gap-3">
          {item.icon && <item.icon className="h-4 w-4" />}
          {item.title}
        </div>
        <ChevronDown 
          className={cn(
            "h-4 w-4 transition-transform",
            isOpen && "rotate-180"
          )} 
        />
      </button>
      {isOpen && (
        <div className="space-y-1 pt-1">
          {item.children.map((child, index) => (
            <SidebarLink key={index} item={child} isChild />
          ))}
        </div>
      )}
    </div>
  )
}

export function Sidebar() {
  return (
    <div className="flex h-full w-56 flex-col border-r bg-muted/10">
      <div className="flex h-14 items-center border-b px-4">
        <span className="font-semibold">Carmen Platform</span>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start gap-1 px-2 text-sm">
          {sidebarItems.map((item, index) => (
            <SidebarLink key={index} item={item} />
          ))}
        </nav>
      </div>
    </div>
  )
}
