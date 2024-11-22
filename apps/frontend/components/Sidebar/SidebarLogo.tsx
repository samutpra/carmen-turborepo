import React from 'react'
import { Link } from '@/lib/i18n';
import { Button } from "@/components/ui/button";
import { Pin } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
    isExpanded: boolean;
    isPinned: boolean;
    togglePin: () => void;
}

const SidebarLogo: React.FC<Props> = ({
    isExpanded,
    isPinned,
    togglePin
}) => {
    return (
        <div className="px-4 pt-4 w-full flex items-center justify-between">
            <Link href="/" className="flex items-center justify-center">
                {isExpanded ? (
                    <div className="ml-2">
                        <span className="text-2xl font-bold block tracking-wide">CARMEN</span>
                        <span className="text-sm block text-gray-500 dark:text-gray-200 tracking-wide">
                            Hospitality Supply Chain
                        </span>
                    </div>
                ) : (
                    <div className="bg-blue-900 h-8 w-8 rounded-full flex items-center justify-center">
                        {isExpanded && <span className="text-xl font-bold"></span>}
                    </div>
                )}
            </Link>
            {isExpanded && (
                <Button variant="ghost" size="icon" onClick={togglePin}>
                    <Pin className={cn("h-5 w-5", isPinned && "text-blue-500")} />
                </Button>
            )}
        </div>
    )
}

export default SidebarLogo