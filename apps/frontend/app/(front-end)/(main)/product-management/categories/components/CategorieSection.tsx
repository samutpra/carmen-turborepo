import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight, Plus, Trash2 } from 'lucide-react';
import React from 'react';

interface Props {
    categories: { id: string; name: string }[];
    newCategoryName: string;
    setNewCategoryName: React.Dispatch<React.SetStateAction<string>>;
    selectedCategory: string | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
    handleAddCategory: () => void;
    handleDeleteCategory: (categoryId: string) => void;
}

const CategorieSection: React.FC<Props> = ({
    categories,
    newCategoryName,
    setNewCategoryName,
    selectedCategory,
    setSelectedCategory,
    handleAddCategory,
    handleDeleteCategory,
}) => {
    return (
        <div className="border rounded-lg p-4">
            <div className="font-medium mb-4">หมวดหมู่หลัก</div>
            <div className="space-y-2">
                <div className="flex gap-2">
                    <Input
                        placeholder="ชื่อหมวดหมู่ใหม่"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                    <Button onClick={handleAddCategory}>
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>
                <div className="space-y-1 mt-4">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedCategory === category.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                            onClick={() => setSelectedCategory(category.id)}
                        >
                            <ChevronRight className="w-4 h-4" />
                            <span className="flex-1">{category.name}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                    e.stopPropagation();  // Prevent triggering category selection
                                    handleDeleteCategory(category.id);  // Call delete function for this category
                                }}
                            >
                                <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CategorieSection;
