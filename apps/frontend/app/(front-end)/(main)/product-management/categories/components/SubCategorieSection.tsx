import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight, Plus, Trash2 } from 'lucide-react';
import React from 'react'

interface Props {
    categories: { id: string; name: string; subcategories: { id: string; name: string }[] }[];
    selectedCategory: string | null;
    newSubcategoryName: string;
    setNewSubcategoryName: React.Dispatch<React.SetStateAction<string>>;
    handleAddSubcategory: () => void;
    setSelectedSubcategory: React.Dispatch<React.SetStateAction<string | null>>;
    handleDeleteSubcategory: (categoryId: string, subcategoryId: string) => void;
    selectedSubcategory: string | null;

}

const SubCategorieSection: React.FC<Props> = ({
    selectedCategory,
    newSubcategoryName,
    setNewSubcategoryName,
    handleAddSubcategory,
    categories,
    setSelectedSubcategory,
    handleDeleteSubcategory,
    selectedSubcategory
}) => {
    return (
        <div className="border rounded-lg p-4">
            <div className="font-medium mb-4">หมวดหมู่ย่อย</div>
            <div className="space-y-2">
                {selectedCategory ? (
                    <>
                        <div className="flex gap-2">
                            <Input
                                placeholder="ชื่อหมวดหมู่ย่อยใหม่"
                                value={newSubcategoryName}
                                onChange={(e) => setNewSubcategoryName(e.target.value)}
                            />
                            <Button onClick={handleAddSubcategory}>
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="space-y-1 mt-4">
                            {categories
                                .find(c => c.id === selectedCategory)
                                ?.subcategories.map(subcategory => (
                                    <div
                                        key={subcategory.id}
                                        className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedSubcategory === subcategory.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                                            }`}
                                        onClick={() => setSelectedSubcategory(subcategory.id)}
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                        <span className="flex-1">{subcategory.name}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteSubcategory(selectedCategory, subcategory.id);
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                ))}
                        </div>
                    </>
                ) : (
                    <div className="text-gray-500 text-center">กรุณาเลือกหมวดหมู่หลัก</div>
                )}
            </div>
        </div>
    )
}

export default SubCategorieSection