import React from 'react'
import { Button } from "@/components/ui/button";
import * as LucideIcons from "lucide-react";
import SidebarSubItems from './SidebarSubItems';
import { MenuItem } from '@/lib/types';

interface Props {
    item: MenuItem;
    isExpanded: boolean;
    expandedItems: string[];
    pathname: string;
    onToggleExpand: (title: string, path?: string) => void;
    onToggleSubItem: (path: string) => void;
    onClose: () => void;
    isLargeScreen: boolean;
}

const SidebarMenuItem: React.FC<Props> = ({
    item,
    isExpanded,
    expandedItems,
    pathname,
    onToggleExpand,
    onToggleSubItem,
    onClose,
    isLargeScreen
}) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (LucideIcons as any)[item.icon] || LucideIcons.Circle;
    const isItemExpanded = expandedItems.includes(item.title);
    return (
        <div className="px-2">
            <Button
                variant="ghost"
                className="w-full flex justify-between font-semibold text-gray-700text-xs"
                onClick={() => onToggleExpand(item.title, item.path)}
            >
                <span className="flex items-center justify-between">
                    <IconComponent className="h-5 w-5" />
                    {isExpanded && <span className="ml-2">{item.title}</span>}
                </span>
                {isExpanded && item.subItems && item.subItems.length > 0 && (
                    isItemExpanded ? (
                        <LucideIcons.ChevronDown className="h-4 w-4" />
                    ) : (
                        <LucideIcons.ChevronRight className="h-4 w-4" />
                    )
                )}
            </Button>

            {isExpanded && item.subItems && item.subItems.length > 0 && isItemExpanded && (
                <SidebarSubItems
                    subItems={item.subItems}
                    pathname={pathname}
                    onClose={onClose}
                    isLargeScreen={isLargeScreen}
                    expandedItems={expandedItems}
                    onToggleExpand={onToggleSubItem}
                />
            )}
        </div>
    )
}

export default SidebarMenuItem