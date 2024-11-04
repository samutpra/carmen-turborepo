import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface Item {
    id: string;
    itemName: string;
    sku: string;
}

interface Props {
    items: Item[];
    selectedItems: string[];
    onItemSelect: (itemId: string) => void;
    onSelectAll: () => void;
}

const TableCategory: React.FC<Props> = ({ items, selectedItems, onItemSelect, onSelectAll }) => (
    <div className="border rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Items</h3>
            <Button
                variant="outline"
                size="sm"
                onClick={onSelectAll}
            >
                {selectedItems.length === items.length ? 'Unselect' : 'Select'} All
            </Button>
        </div>
        <table className="w-full">
            <thead>
                <tr>
                    <th className="w-8 p-2"></th>
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">SKU</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr key={item.id} className="border-t">
                        <td className="p-2">
                            <Checkbox
                                checked={selectedItems.includes(item.id)}
                                onCheckedChange={() => onItemSelect(item.id)}
                            />
                        </td>
                        <td className="p-2">{item.itemName}</td>
                        <td className="p-2">{item.sku}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default TableCategory;
