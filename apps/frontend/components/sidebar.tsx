"use client";

import React, { useState, useEffect } from "react";
import { Link } from "@/lib/i18n";
import { usePathname } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as LucideIcons from "lucide-react";
import { useRouter } from "@/lib/i18n";

const menuItems = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: "LayoutDashboard",
        visible: true,
        enabled: true,
        subItems: [],
    },
    {
        title: "Procurement",
        path: "/procurement",
        icon: "ShoppingCart",
        visible: true,
        enabled: true,
        subItems: [
            {
                name: "My Approvals",
                path: "/procurement/my-approvals",
                visible: true,
                enabled: true,
            },
            {
                name: "Purchase Requests",
                path: "/procurement/purchase-requests",
                visible: true,
                enabled: true,
            },
            {
                name: "Purchase Orders",
                path: "/procurement/purchase-orders",
                visible: true,
                enabled: true,
            },
            {
                name: "Goods Received Note",
                path: "/procurement/goods-received-note",
                visible: true,
                enabled: true,
            },
            {
                name: "Credit Notes",
                path: "/procurement/credit-note",
                visible: true,
                enabled: true,
            },
            {
                name: "Purchase Request Templates",
                path: "/procurement/purchase-request-templates",
                visible: true,
                enabled: true,
            },
        ],
    },
    {
        title: "Product Management",
        path: "/product-management",
        icon: "Package",
        visible: true,
        enabled: true,
        subItems: [
            {
                name: "Products",
                path: "/product-management/products",
                visible: true,
                enabled: true,
            },
            {
                name: "Categories",
                path: "/product-management/categories",
                visible: true,
                enabled: true,
            },
            {
                name: "Reports",
                path: "/product-management/reports",
                visible: true,
                enabled: true,
            },
            {
                name: "Unit",
                path: "/product-management/unit",
                visible: true,
                enabled: true,
            },
        ],
    },
    {
        title: "Vendor Management",
        path: "/vendor-management",
        icon: "Users",
        visible: true,
        enabled: true,
        subItems: [
            {
                name: "Manage Vendors",
                path: "/vendor-management/manage-vendors",
                visible: true,
                enabled: true,
            },
            {
                name: "Price Lists",
                path: "/vendor-management/price-lists",
                visible: true,
                enabled: true,
            },
            {
                name: "Price Comparisons",
                path: "/vendor-management/price-comparisons",
                visible: true,
                enabled: true,
            },
        ],
    },
    {
        title: "Configuration",
        path: "/configuration",
        icon: "MonitorCog",
        visible: true,
        enabled: true,
        subItems: [
            {
                name: "Currency",
                path: "/configuration/currency",
                visible: true,
                enabled: true,
            },
            {
                name: "	Delivery Point",
                path: "/configuration/delivery-point",
                visible: true,
                enabled: true,
            },
            {
                name: "Category",
                path: "/configuration/category",
                visible: true,
                enabled: true,
            },
            {
                name: "Store/Location",
                path: "/configuration/store-location",
                visible: true,
                enabled: true,
            },
        ],
    },
    {
        title: "Store Operations",
        path: "/store-operations",
        icon: "Store",
        visible: true,
        enabled: true,
        subItems: [
            {
                name: "Store Requisitions",
                path: "/store-operations/store-requisitions",
                visible: true,
                enabled: true,
            },
            {
                name: "Issues Management",
                path: "/store-operations/issues-management",
                visible: true,
                enabled: true,
            },
            {
                name: "Stock Replenishment",
                path: "/store-operations/stock-replenishment",
                visible: true,
                enabled: true,
            },
            {
                name: "Wastage Reporting",
                path: "/store-operations/wastage-reporting",
                visible: true,
                enabled: true,
            },
        ],
    },
    {
        title: "Inventory Management",
        path: "/inventory-management",
        icon: "Package",
        visible: true,
        enabled: true,
        subItems: [
            {
                name: "Stock Overview",
                path: "/inventory-management/stock-overview",
                visible: true,
                enabled: true,
            },
            {
                name: "Stock In",
                path: "/inventory-management/stock-in",
                visible: true,
                enabled: true,
            },
            {
                name: "Stock Out",
                path: "/inventory-management/stock-out",
                visible: true,
                enabled: true,
            },
            {
                name: "Transfer Between Locations",
                path: "/inventory-management/transfer-between-locations",
                visible: true,
                enabled: true,
            },
            {
                name: "Physical Count",
                path: "/inventory-management/physical-count",
                visible: true,
                enabled: true,
            },
            {
                name: "Stock Take",
                path: "/inventory-management/stock-take",
                visible: true,
                enabled: true,
            },
            {
                name: "Inventory Valuation",
                path: "/inventory-management/inventory-valuation",
                visible: true,
                enabled: true,
            },
        ],
    },
    {
        title: "Operational Planning",
        path: "/operational-planning",
        icon: "CalendarClock",
        visible: true,
        enabled: true,
        subItems: [
            {
                name: "Recipes Management",
                path: "/operational-planning/recipes-management",
                visible: true,
                enabled: true,
            },
            {
                name: "Menu Engineering",
                path: "/operational-planning/menu-engineering",
                visible: true,
                enabled: true,
            },
            {
                name: "Demand Forecasting",
                path: "/operational-planning/demand-forecasting",
                visible: true,
                enabled: true,
            },
            {
                name: "Inventory Planning",
                path: "/operational-planning/inventory-planning",
                visible: true,
                enabled: true,
            },
        ],
    },
    {
        title: "Production",
        path: "/production",
        icon: "Factory",
        visible: true,
        enabled: true,
        subItems: [
            {
                name: "Recipe Execution",
                path: "/production/recipe-execution",
                visible: true,
                enabled: true,
            },
            {
                name: "Batch Production",
                path: "/production/batch-production",
                visible: true,
                enabled: true,
            },
            {
                name: "Wastage Tracking",
                path: "/production/wastage-tracking",
                visible: true,
                enabled: true,
            },
            {
                name: "Quality Control",
                path: "/production/quality-control",
                visible: true,
                enabled: true,
            },
        ],
    },
    {
        title: "Reporting & Analytics",
        path: "/reporting-analytics",
        icon: "BarChart2",
        visible: true,
        enabled: true,
        subItems: [
            {
                name: "Operational Reports",
                path: "/reporting-analytics/operational-reports",
                visible: true,
                enabled: true,
            },
            {
                name: "Financial Reports",
                path: "/reporting-analytics/financial-reports",
                visible: true,
                enabled: true,
            },
            {
                name: "Inventory Reports",
                path: "/reporting-analytics/inventory-reports",
                visible: true,
                enabled: true,
            },
            {
                name: "Vendor Performance",
                path: "/reporting-analytics/vendor-performance",
                visible: true,
                enabled: true,
            },
            {
                name: "Cost Analysis",
                path: "/reporting-analytics/cost-analysis",
                visible: true,
                enabled: true,
            },
            {
                name: "Sales Analysis",
                path: "/reporting-analytics/sales-analysis",
                visible: true,
                enabled: true,
            },
        ],
    },
    {
        title: "Finance",
        path: "/finance",
        icon: "DollarSign",
        visible: true,
        enabled: true,
        subItems: [
            {
                name: "Account Code Mapping",
                path: "/finance/account-code-mapping",
                visible: true,
                enabled: true,
            },
            {
                name: "Currency Management",
                path: "/finance/currency-management",
                visible: true,
                enabled: true,
            },
            {
                name: "Exchange Rates",
                path: "/finance/exchange-rates",
                visible: true,
                enabled: true,
            },
            {
                name: "Department and Cost Center",
                path: "/finance/department-list",
                visible: true,
                enabled: true,
            },
            {
                name: "Budget Planning and Control",
                path: "/finance/budget-planning-and-control",
                visible: true,
                enabled: true,
            },
        ],
    },
    {
        title: "System Administration",
        path: "/system-administration",
        icon: "Settings",
        visible: true,
        enabled: true,
        subItems: [
            {
                name: "User Management",
                path: "/system-administration/user-management",
                visible: true,
                enabled: true,
            },
            {
                name: "Location Management",
                path: "/system-administration/location-management",
                visible: true,
                enabled: true,
            },
            {
                name: "Workflow Management",
                path: "/system-administration/workflow-management",
                visible: true,
                enabled: true,
            },
            {
                name: "General Settings",
                path: "/system-administration/general-settings",
                visible: true,
                enabled: true,
            },
            {
                name: "Notification Preferences",
                path: "/system-administration/notification-preferences",
                visible: true,
                enabled: true,
            },
            {
                name: "License Management",
                path: "/system-administration/license-management",
                visible: true,
                enabled: true,
            },
            {
                name: "Security Settings",
                path: "/system-administration/security-settings",
                visible: true,
                enabled: true,
            },
            {
                name: "Data Backup and Recovery",
                path: "/system-administration/data-backup-and-recovery",
                visible: true,
                enabled: true,
            },
            {
                name: "System Integrations",
                path: "/system-administration/system-integrations",
                visible: true,
                enabled: true,
            },
        ],
    },
    {
        title: "Help & Support",
        path: "/help-support",
        icon: "HelpCircle",
        visible: true,
        enabled: true,
        subItems: [
            {
                name: "User Manuals",
                path: "/help-support/user-manuals",
                visible: true,
                enabled: true,
            },
            {
                name: "Video Tutorials",
                path: "/help-support/video-tutorials",
                visible: true,
                enabled: true,
            },
            {
                name: "FAQs",
                path: "/help-support/faqs",
                visible: true,
                enabled: true,
            },
            {
                name: "Support Ticket System",
                path: "/help-support/support-ticket-system",
                visible: true,
                enabled: true,
            },
            {
                name: "System Updates and Release Notes",
                path: "/help-support/system-updates-and-release-notes",
                visible: true,
                enabled: true,
            },
        ],
    },
];

export interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPinned, setIsPinned] = useState(false);


    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);


    const toggleExpand = (title: string, path?: string) => {
        const menuItem = menuItems.find((item) => item.title === title);
        if (!menuItem?.subItems || menuItem.subItems.length === 0) {
            router.push(path || "/");
        } else {
            setExpandedItems((prev) =>
                prev.includes(title)
                    ? prev.filter((item) => item !== title)
                    : [...prev, title]
            );
        }
    };

    const handleMouseEnter = () => {
        if (!isPinned) {
            setIsExpanded(true);
        }
    };

    const handleMouseLeave = () => {
        if (!isPinned) {
            setIsExpanded(false);
        }
    };

    const togglePin = () => {
        setIsPinned(!isPinned);
        setIsExpanded(!isPinned);
    };


    return (
        <>
            <div className="z-50 flex-col gap-4 relative">
                {isOpen && !isLargeScreen && (
                    <div
                        className="fixed md:sticky inset-0 z-40"
                        onClick={onClose}
                    />
                )}

                <aside
                    className={cn(
                        "fixed top-0 left-0 z-50 h-full bg-[var(--cm-sidebar)]  border-r border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300 ease-in-out",
                        isOpen || isLargeScreen
                            ? "translate-x-0 md:sticky"
                            : "-translate-x-full",
                        isExpanded ? "w-[280px]" : "w-[64px]"
                    )}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="px-5 pt-6 w-full flex items-center justify-between">
                        <Link
                            href="/"
                            className="flex items-center justify-center"
                        >
                            <div className="bg-blue-900 h-8 w-8 rounded-full flex items-center justify-center">
                                {isExpanded && (
                                    <span className="text-xl font-bold"></span>
                                )}
                            </div>
                            {isExpanded && (
                                <span className="ml-2 text-2xl font-bold">Carmen</span>
                            )}
                        </Link>
                        {isExpanded && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={togglePin}
                            >
                                <LucideIcons.Pin className={cn("h-5 w-5", isPinned && "text-blue-500")} />
                            </Button>
                        )}
                    </div>

                    <ScrollArea className="h-full">
                        <div className="space-y-1 py-4">
                            {menuItems.map((item) => {
                                const IconComponent =
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    (LucideIcons as any)[item.icon] || LucideIcons.Circle;
                                return (
                                    <div key={item.title} className="px-2 py-1">
                                        <Button
                                            variant="ghost"
                                            className={cn(
                                                "w-full flex justify-between font-bold text-base",
                                            )}
                                            onClick={() => toggleExpand(item.title, item.path)}
                                        >
                                            <span className="flex items-center justify-between">
                                                <IconComponent className="h-5 w-5" />
                                                {isExpanded && <span className="ml-2 text-xs">{item.title}</span>}
                                            </span>
                                            {isExpanded && item.subItems && item.subItems.length > 0 && (
                                                expandedItems.includes(item.title) ? (
                                                    <LucideIcons.ChevronDown className="h-4 w-4" />
                                                ) : (
                                                    <LucideIcons.ChevronRight className="h-4 w-4" />
                                                )
                                            )}
                                        </Button>

                                        {isExpanded && item.subItems &&
                                            item.subItems.length > 0 &&
                                            expandedItems.includes(item.title) && (
                                                <div className="mx-4 mt-2">
                                                    {item.subItems.map((subItem) => (
                                                        <Button
                                                            key={subItem.name}
                                                            variant="ghost"
                                                            asChild
                                                            className={cn(
                                                                "w-full justify-start font-thin",
                                                                pathname === subItem.path
                                                                    ? "bg-primary text-white "
                                                                    : ""
                                                            )}
                                                            // className={cn("w-full justify-start font-thin")}
                                                            onClick={() => !isLargeScreen && onClose()}
                                                        >
                                                            <Link href={subItem.path} className="text-blue-950 dark:text-gray-200 no-underline text-xs">
                                                                {subItem.name}
                                                            </Link>
                                                        </Button>
                                                    ))}
                                                </div>
                                            )}
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollArea>
                </aside>
            </div>
        </>
    );
}

export default Sidebar;
