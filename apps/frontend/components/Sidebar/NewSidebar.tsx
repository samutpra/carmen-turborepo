import React, { useEffect, useMemo, useState } from 'react';
import { useSidebar } from './useSidebar';
import { menuItems } from '@/lib/util/menuItems';
import SidebarLogo from './SidebarLogo';
import { cn } from '@/lib/utils';
import useResponsive from '@/hooks/useResponsive';
import * as LucideIcons from 'lucide-react';
import { Link } from '@/lib/i18n';
import { Button } from '../ui/button';
import { Pin, Star } from 'lucide-react';
import { Separator } from '../ui/separator';
import { FavMenuItem } from '@/dtos/favorite-menu.dto';

export type LucideIconName = keyof typeof LucideIcons;
interface DynamicIconProps {
    iconName: LucideIconName;
}
interface SubItem {
    path: string;
    name: string;
}

interface MenuItem {
    path: string;
    title: string;
    icon: LucideIconName;
    subItems?: SubItem[];
}

const NewSidebar = () => {
    const {
        isSidebarOpen,
        setIsSidebarOpen,
        isExpanded,
        setIsExpanded,
        isPinned,
        setIsPinned,
        pathname,
    } = useSidebar();

    const { isDesktop } = useResponsive();
    const [favoriteMenu, setFavoriteMenu] = useState<FavMenuItem[]>([]);
    useEffect(() => {
        const fetchFavoriteMenu = async () => {
            try {
                const res = await fetch("/api/favorite-menu");
                const data = await res.json();
                setFavoriteMenu(data.data);
            } catch (error) {
                console.error("Failed to fetch favorite menu:", error);
            }
        };

        fetchFavoriteMenu();
    }, []);

    console.log('faveriteMenu', favoriteMenu);


    const activeMenuItem = useMemo(() => {
        return menuItems.find(item =>
            pathname.startsWith(item.path) ||
            item.subItems?.some(subItem => pathname.startsWith(subItem.path))
        );
    }, [pathname]);

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

    const DynamicIcon: React.FC<DynamicIconProps> = ({ iconName }) => {
        const IconComponent = LucideIcons[iconName as LucideIconName] as React.ElementType;
        return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
    };

    const renderSubItems = (item: MenuItem) => {
        return item.subItems?.map((subItem: SubItem) => {
            const isActive = pathname === subItem.path;
            return (

                <div
                    className={cn(
                        'text-xs rounded-lg whitespace-nowrap flex justify-between items-center overflow-hidden'
                    )}
                    key={subItem.path}
                >
                    <Link
                        className={cn(
                            'w-full p-2 rounded-lg',
                            isActive
                                ? 'font-medium bg-primary text-background'
                                : 'hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary-foreground))]'
                        )}
                        href={subItem.path}
                    >

                        {subItem.name}

                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        data-id="menu-item-pin-button"
                        onClick={() => {
                            alert(subItem.path)
                        }}
                    >
                        <Pin
                            data-id="pin-menu-item-icon"
                        />
                    </Button>

                </div>

            );
        });
    };

    return (
        <div
            className="top-1 z-50 flex-col gap-4 relative bg-background"
            data-id="sidebar-container"
        >
            {isSidebarOpen && !isDesktop && (
                <div
                    className="fixed md:sticky inset-0 z-40"
                    onClick={onClose}
                    data-id="sidebar-overlay"
                />
            )}

            <aside
                className={cn(
                    'fixed left-0 h-full z-50 bg-[var(--cm-sidebar)] border-r transition-all duration-700 ease-in-out',
                    isSidebarOpen || isDesktop ? 'translate-x-0 md:sticky' : '-translate-x-full',
                    isExpanded ? 'w-[280px]' : 'w-[70px]'
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                data-id="sidebar-container"
            >
                <SidebarLogo
                    isExpanded={isExpanded}
                    isPinned={isPinned}
                    togglePin={togglePin}
                    data-id="sidebar-logo"
                />

                <Separator className='mt-1' />

                <div className="p-2 mt-2">
                    <div
                        className={cn(
                            'flex items-center',
                            isExpanded ? 'justify-start' : 'justify-center'
                        )}

                    >
                        <Star />
                        {isExpanded && <span className="ml-3 font-medium">Active Menu</span>}
                    </div>
                    {favoriteMenu.length > 0 && (
                        <div className="text-xs rounded-lg whitespace-nowrap flex flex-col">
                            {favoriteMenu && favoriteMenu.map((item: FavMenuItem, index: number) => (
                                <Link href={item.path} key={index} className="p-2 hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary-foreground))] rounded-lg">
                                    {isExpanded && <span className="ml-3">{item.title}</span>}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <Separator />
                {
                    activeMenuItem && (
                        <div className="py-2 overflow-hidden whitespace-nowrap">
                            <div
                                className={cn(
                                    'flex items-center p-2',
                                    isExpanded ? 'justify-start' : 'justify-center'
                                )}
                            >
                                <DynamicIcon iconName={activeMenuItem.icon} />
                                {isExpanded && (
                                    <div className="ml-3 font-medium">
                                        {activeMenuItem.title}
                                    </div>
                                )}
                            </div>
                            <div className='p-2 mx-2'>
                                {isExpanded && renderSubItems(activeMenuItem)}
                            </div>

                        </div>
                    )
                }
            </aside >
        </div >
    );
}

export default NewSidebar;