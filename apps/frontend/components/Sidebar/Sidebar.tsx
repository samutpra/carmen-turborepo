import React from 'react'
import { useSidebar } from './useSidebar';
import { menuItems } from '@/lib/util/menuItems';
import SidebarLogo from './SidebarLogo';
import { ScrollArea } from '../ui/scroll-area';
import SidebarMenuItem from './SidebarMenuItem';
import { cn } from '@/lib/utils';

const Sidebar = () => {
    const {
        isSidebarOpen,
        setIsSidebarOpen,
        isLargeScreen,
        expandedItems,
        isExpanded,
        setIsExpanded,
        isPinned,
        setIsPinned,
        pathname,
        toggleExpand,
        toggleSubItem
    } = useSidebar();

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

    const onClose = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="top-1 z-50 flex-col gap-4 relative bg-background">
            {isSidebarOpen && !isLargeScreen && (
                <div className="fixed md:sticky inset-0 z-40" onClick={onClose} />
            )}

            <aside
                className={cn(
                    "fixed left-0 h-full z-50 bg-[var(--cm-sidebar)] border-r border-gray-200 shadow-lg transition-all duration-300 ease-in-out",
                    isSidebarOpen || isLargeScreen ? "translate-x-0 md:sticky" : "-translate-x-full",
                    isExpanded ? "w-[280px]" : "w-[64px]"
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <SidebarLogo
                    isExpanded={isExpanded}
                    isPinned={isPinned}
                    togglePin={togglePin}
                />

                <ScrollArea className="h-full">
                    <div className="space-y-1 py-4">
                        {menuItems.map((item) => (
                            <SidebarMenuItem
                                key={item.title}
                                item={item}
                                isExpanded={isExpanded}
                                expandedItems={expandedItems}
                                pathname={pathname}
                                onToggleExpand={toggleExpand}
                                onToggleSubItem={toggleSubItem}
                                onClose={onClose}
                                isLargeScreen={isLargeScreen}
                            />
                        ))}
                    </div>
                </ScrollArea>
            </aside>
        </div>
    )
}

export default Sidebar