"use client";
import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { nanoid } from 'nanoid';
import CategorieSection from './CategorieSection';
import SubCategorieSection from './SubCategorieSection';
import ItemGroupSection from './ItemGroupSection';

interface ItemGroup {
    id: string;
    name: string;
}

interface Subcategory {
    id: string;
    name: string;
    itemGroups: ItemGroup[];
}

interface Category {
    id: string;
    name: string;
    subcategories: Subcategory[];
}


const ProductCategoryUI = () => {
    const [categories, setCategories] = useState<Category[]>([
        {
            id: "1",
            name: 'อิเล็กทรอนิกส์',
            subcategories: [
                {
                    id: "1",
                    name: 'สมาร์ทโฟน',
                    itemGroups: [
                        { id: "1", name: 'แอนดรอยด์' },
                        { id: "2", name: 'ไอโฟน' }
                    ]
                },
                {
                    id: "2",
                    name: 'แล็ปท็อป',
                    itemGroups: [
                        { id: "3", name: 'โน้ตบุ๊กเกมมิ่ง' },
                        { id: "4", name: 'โน้ตบุ๊กทั่วไป' }
                    ]
                }
            ]
        },
        {
            id: "2",
            name: 'เสื้อผ้า',
            subcategories: []
        }
    ]);

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newSubcategoryName, setNewSubcategoryName] = useState('');
    const [newItemGroupName, setNewItemGroupName] = useState('');

    const handleAddCategory = () => {
        if (newCategoryName.trim()) {
            setCategories([...categories, {
                id: nanoid(),
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
                            id: nanoid(),
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
                                        id: nanoid(),
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

    const handleDeleteCategory = (categoryId: string) => {
        setCategories(categories.filter(cat => cat.id !== categoryId));
        if (selectedCategory === categoryId) {
            setSelectedCategory(null);
            setSelectedSubcategory(null);
        }
    };

    const handleDeleteSubcategory = (categoryId: string, subcategoryId: string) => {
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

    const handleDeleteItemGroup = (categoryId: string, subcategoryId: string, itemGroupId: string) => {
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
                        <CategorieSection
                            categories={categories}
                            newCategoryName={newCategoryName}
                            setNewCategoryName={setNewCategoryName}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            handleAddCategory={handleAddCategory}
                            handleDeleteCategory={handleDeleteCategory}
                        />

                        {/* Subcategories Column */}

                        <SubCategorieSection
                            categories={categories}
                            selectedCategory={selectedCategory}
                            newSubcategoryName={newSubcategoryName}
                            setNewSubcategoryName={setNewSubcategoryName}
                            handleAddSubcategory={handleAddSubcategory}
                            setSelectedSubcategory={setSelectedSubcategory}
                            handleDeleteSubcategory={handleDeleteSubcategory}
                            selectedSubcategory={selectedSubcategory}
                        />

                        {/* Item Groups Column */}
                        <ItemGroupSection
                            selectedSubcategory={selectedSubcategory}
                            newItemGroupName={newItemGroupName}
                            setNewItemGroupName={setNewItemGroupName}
                            handleAddItemGroup={handleAddItemGroup}
                            handleDeleteItemGroup={handleDeleteItemGroup}  // Pass the delete handler
                            categories={categories}
                            selectedCategory={selectedCategory}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProductCategoryUI;