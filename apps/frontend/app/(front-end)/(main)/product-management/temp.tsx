import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, ChevronRight, Trash2 } from 'lucide-react';

const ProductCategoryUI = () => {
    const [categories, setCategories] = useState([
        {
            id: 1,
            name: 'อิเล็กทรอนิกส์',
            subcategories: [
                {
                    id: 1,
                    name: 'สมาร์ทโฟน',
                    itemGroups: [
                        { id: 1, name: 'แอนดรอยด์' },
                        { id: 2, name: 'ไอโฟน' }
                    ]
                },
                {
                    id: 2,
                    name: 'แล็ปท็อป',
                    itemGroups: [
                        { id: 3, name: 'โน้ตบุ๊กเกมมิ่ง' },
                        { id: 4, name: 'โน้ตบุ๊กทั่วไป' }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: 'เสื้อผ้า',
            subcategories: []
        }
    ]);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newSubcategoryName, setNewSubcategoryName] = useState('');
    const [newItemGroupName, setNewItemGroupName] = useState('');

    const handleAddCategory = () => {
        if (newCategoryName.trim()) {
            setCategories([...categories, {
                id: Date.now(),
                name: newCategoryName,
                subcategories: []
            }]);
            setNewCategoryName('');
        }
    };

    const handleAddSubcategory = () => {
        if (selectedCategory && newSubcategoryName.trim()) {
            const updatedCategories = categories.map(cat => {
                if (cat.id === selectedCategory) {
                    return {
                        ...cat,
                        subcategories: [...cat.subcategories, {
                            id: Date.now(),
                            name: newSubcategoryName,
                            itemGroups: []
                        }]
                    };
                }
                return cat;
            });
            setCategories(updatedCategories);
            setNewSubcategoryName('');
        }
    };

    const handleAddItemGroup = () => {
        if (selectedCategory && selectedSubcategory && newItemGroupName.trim()) {
            const updatedCategories = categories.map(cat => {
                if (cat.id === selectedCategory) {
                    return {
                        ...cat,
                        subcategories: cat.subcategories.map(sub => {
                            if (sub.id === selectedSubcategory) {
                                return {
                                    ...sub,
                                    itemGroups: [...sub.itemGroups || [], {
                                        id: Date.now(),
                                        name: newItemGroupName
                                    }]
                                };
                            }
                            return sub;
                        })
                    };
                }
                return cat;
            });
            setCategories(updatedCategories);
            setNewItemGroupName('');
        }
    };

    const handleDeleteCategory = (categoryId) => {
        setCategories(categories.filter(cat => cat.id !== categoryId));
        if (selectedCategory === categoryId) {
            setSelectedCategory(null);
            setSelectedSubcategory(null);
        }
    };

    const handleDeleteSubcategory = (categoryId, subcategoryId) => {
        const updatedCategories = categories.map(cat => {
            if (cat.id === categoryId) {
                return {
                    ...cat,
                    subcategories: cat.subcategories.filter(sub => sub.id !== subcategoryId)
                };
            }
            return cat;
        });
        setCategories(updatedCategories);
        if (selectedSubcategory === subcategoryId) {
            setSelectedSubcategory(null);
        }
    };

    const handleDeleteItemGroup = (categoryId, subcategoryId, itemGroupId) => {
        const updatedCategories = categories.map(cat => {
            if (cat.id === categoryId) {
                return {
                    ...cat,
                    subcategories: cat.subcategories.map(sub => {
                        if (sub.id === subcategoryId) {
                            return {
                                ...sub,
                                itemGroups: sub.itemGroups.filter(item => item.id !== itemGroupId)
                            };
                        }
                        return sub;
                    })
                };
            }
            return cat;
        });
        setCategories(updatedCategories);
    };

    return (
        <div className="p-4">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>จัดการหมวดหมู่สินค้า</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                        {/* Categories Column */}
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
                                    {categories.map(category => (
                                        <div
                                            key={category.id}
                                            className={`flex items-center gap-2 p-2 rounded cursor-pointer ${selectedCategory === category.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                                                }`}
                                            onClick={() => setSelectedCategory(category.id)}
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                            <span className="flex-1">{category.name}</span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteCategory(category.id);
                                                }}
                                            >
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Subcategories Column */}
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

                        {/* Item Groups Column */}
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
                                            {categories
                                                .find(c => c.id === selectedCategory)
                                                ?.subcategories
                                                .find(s => s.id === selectedSubcategory)
                                                ?.itemGroups?.map(itemGroup => (
                                                    <div
                                                        key={itemGroup.id}
                                                        className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
                                                    >
                                                        <ChevronRight className="w-4 h-4" />
                                                        <span className="flex-1">{itemGroup.name}</span>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleDeleteItemGroup(selectedCategory, selectedSubcategory, itemGroup.id)}
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
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProductCategoryUI;