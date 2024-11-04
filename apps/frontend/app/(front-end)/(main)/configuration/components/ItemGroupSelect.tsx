import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';

interface Props {
    itemsGroup: { id: string; itemGroup: string }[];
    selectedIds: string[];
    onSelect: (id: string) => void;
}

const ItemGroupSelect: React.FC<Props> = ({ itemsGroup, selectedIds, onSelect }) => {
    return (
        <div>
            <label className="text-sm font-medium mb-1 block">Item Group</label>
            <div className="space-y-2">
                {itemsGroup.map((item) => (
                    <div key={item.id} className="flex items-center">
                        <Checkbox
                            checked={selectedIds.includes(item.id)}
                            onCheckedChange={() => onSelect(item.id)}
                        />
                        <span className="ml-2">{item.itemGroup}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemGroupSelect;

