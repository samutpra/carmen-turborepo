import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight, Plus, Trash2 } from 'lucide-react';
import React from 'react';

interface ItemGroup {
    id: string;
    name: string;
}

interface Subcategory {
    id: string;
    name: string;
    itemGroups: ItemGroup[];
}

interface Props {
    selectedSubcategory: string | null;
    newItemGroupName: string;
    setNewItemGroupName: React.Dispatch<React.SetStateAction<string>>;
    handleAddItemGroup: () => void;
    handleDeleteItemGroup: (categoryId: string, subcategoryId: string, itemGroupId: string) => void;
    categories: { id: string; name: string; subcategories: Subcategory[] }[];
    selectedCategory: string | null;
}

const ItemGroupSection: React.FC<Props> = ({
    selectedSubcategory,
    newItemGroupName,
    setNewItemGroupName,
    handleAddItemGroup,
    categories,
    selectedCategory,
    handleDeleteItemGroup
}) => {
    const selectedCategoryData = categories.find(c => c.id === selectedCategory);
    const selectedSubcategoryData = selectedCategoryData?.subcategories.find(s => s.id === selectedSubcategory);

    return (
        <div className="border rounded-lg p-4">
            <div className="font-medium mb-4">กลุ่มสินค้า</div>
            <div className="space-y-2">
                {selectedSubcategory ? (
                    <>
                        <div className="flex gap-2">
                            <Input
                                placeholder="ชื่อกลุ่มสินค้าใหม่"
                                value={newItemGroupName}
                                onChange={(e) => setNewItemGroupName(e.target.value)}
                            />
                            <Button onClick={handleAddItemGroup}>
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="space-y-1 mt-4">
                            {selectedSubcategoryData?.itemGroups.map(itemGroup => (
                                <div
                                    key={itemGroup.id}
                                    className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                    <span className="flex-1">{itemGroup.name}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDeleteItemGroup(selectedCategory!, selectedSubcategory!, itemGroup.id)}
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-gray-500 text-center">กรุณาเลือกหมวดหมู่ย่อย</div>
                )}
            </div>
        </div>
    );
};

export default ItemGroupSection;
