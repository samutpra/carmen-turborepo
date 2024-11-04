import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';


interface Props {
    categories: { id: string; categoryName: string }[];
    selectedIds: string[];
    onSelect: (id: string) => void;
}

const CategorySelect: React.FC<Props> = ({ categories, selectedIds, onSelect }) => {
    return (
        <div>
            {categories.map(category => (
                <Checkbox
                    key={category.id}
                    checked={selectedIds.includes(category.id)}
                    onCheckedChange={() => onSelect(category.id)}
                >
                    {category.categoryName}
                </Checkbox>
            ))}
        </div>
    );
};

export default CategorySelect;
