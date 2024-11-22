import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import React from 'react'

interface Props {
    name: string;
    isSelected: boolean;
    onSelect: () => void;
    onDelete: () => void;
}
const ListSection: React.FC<Props> = ({
    name,
    isSelected,
    onSelect,
    onDelete
}) => {
    return (
        <div
            className={`
            flex items-center justify-between rounded-lg transition-colors px-2
            ${isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-muted cursor-pointer'}
        `}
            onClick={onSelect}
        >
            <span className="flex-1">{name}</span>
            <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <Trash2 />
            </Button>
        </div>
    )
}

export default ListSection