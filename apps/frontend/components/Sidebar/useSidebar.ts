import { useState, useEffect } from 'react';
import { usePathname } from '@/lib/i18n';

export const useSidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleResize = () => {
            const largeScreen = window.innerWidth >= 1024;
            setIsLargeScreen(largeScreen);
            setIsSidebarOpen(largeScreen);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!isLargeScreen) {
            setIsSidebarOpen(false);
        }
    }, [pathname, isLargeScreen]);

    const toggleExpand = (title: string) => {
        setExpandedItems((prev) =>
            prev.includes(title)
                ? prev.filter((item) => item !== title)
                : [...prev, title]
        );
    };

    const toggleSubItem = (path: string) => {
        setExpandedItems((prev) =>
            prev.includes(path)
                ? prev.filter((item) => item !== path)
                : [...prev, path]
        );
    };

    return {
        isSidebarOpen,
        setIsSidebarOpen,
        isLargeScreen,
        expandedItems,
        setExpandedItems,
        isExpanded,
        setIsExpanded,
        isPinned,
        setIsPinned,
        pathname,
        toggleExpand,
        toggleSubItem
    };
};