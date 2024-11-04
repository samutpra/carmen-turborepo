import { Checkbox } from '@/components/ui/checkbox';
import React from 'react'


interface Props {
    subCategories: { id: string; subCategoryName: string }[];
    selectedIds: string[];
    onSelect: (id: string) => void;
}
const SubCategorySelect: React.FC<Props> = ({ subCategories, selectedIds, onSelect }) => {
    return (
        <div>
            <label className="text-sm font-medium mb-1 block">Sub Category</label>
            <div className="space-y-2">
                {subCategories.map((item) => (
                    <div key={item.id} className="flex items-center">
                        <Checkbox
                            checked={selectedIds.includes(item.id)}
                            onCheckedChange={() => onSelect(item.id)}
                        />
                        <span className="ml-2">{item.subCategoryName}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SubCategorySelect