import React from 'react'
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Link } from '@/lib/i18n';
import * as LucideIcons from "lucide-react";

type SubMenuItem = {
    name: string;
    path: string;
    icon?: string;
    description?: string;
    subItems?: SubMenuItem[];
    visible?: boolean;
    enabled?: boolean;
};

interface Props {
    subItems: SubMenuItem[];
    pathname: string;
    onClose: () => void;
    isLargeScreen: boolean;
    level?: number;
    expandedItems: string[];
    onToggleExpand: (path: string) => void;
}

const SidebarSubItems: React.FC<Props> = ({
    subItems,
    pathname,
    onClose,
    isLargeScreen,
    level = 0,
    expandedItems,
    onToggleExpand
}) => {
    const paddingLeft = `${(level + 1) * 1}rem`;

    return (
        <div className="mt-2">
            {subItems.map((subItem) => {
                const hasNestedItems = subItem.subItems && subItem.subItems.length > 0;
                const isExpanded = expandedItems.includes(subItem.path);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const IconComponent = subItem.icon ? (LucideIcons as any)[subItem.icon] : null;

                return (
                    <div key={subItem.path}>
                        <Button
                            variant="ghost"
                            asChild={!hasNestedItems}
                            className={cn(
                                "w-full justify-start text-sm text-foreground dark:text-gray-100 tracking-wide",
                                pathname === subItem.path ? "bg-primary text-white" : "",
                                hasNestedItems ? "flex justify-between" : ""
                            )}
                            onClick={() => {
                                if (hasNestedItems) {
                                    onToggleExpand(subItem.path);
                                } else if (!isLargeScreen) {
                                    onClose();
                                }
                            }}
                            style={{ paddingLeft }}
                        >
                            {hasNestedItems ? (
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-2">
                                        {IconComponent && <IconComponent className="h-4 w-4" />}
                                        <span className="text-blue-950 dark:text-gray-200 text-xs">
                                            {subItem.name}
                                        </span>
                                    </div>
                                    {isExpanded ? (
                                        <LucideIcons.ChevronDown className="h-4 w-4" />
                                    ) : (
                                        <LucideIcons.ChevronRight className="h-4 w-4" />
                                    )}
                                </div>
                            ) : (
                                <Link
                                    href={subItem.path}
                                    className="text-blue-950 dark:text-gray-200 no-underline text-xs flex items-center gap-2"
                                >
                                    {IconComponent && <IconComponent className="h-4 w-4" />}
                                    {subItem.name}
                                </Link>
                            )}
                        </Button>

                        {subItem.subItems && hasNestedItems && isExpanded && (
                            <SidebarSubItems
                                subItems={subItem.subItems}
                                pathname={pathname}
                                onClose={onClose}
                                isLargeScreen={isLargeScreen}
                                level={level + 1}
                                expandedItems={expandedItems}
                                onToggleExpand={onToggleExpand}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    )
}

export default SidebarSubItems