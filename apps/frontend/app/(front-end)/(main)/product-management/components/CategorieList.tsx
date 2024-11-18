"use client";
import { Button } from '@/components/ui-custom/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronRight, Plus, Trash2 } from 'lucide-react';
import React, { useCallback, useRef, useState } from 'react'
import { nanoid } from "nanoid";

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

interface ValidationError {
    message: string;
    field: string;
}

const CategorieList = () => {

    const [categories, setCategories] = useState<Category[]>([
        {
            id: nanoid(),
            name: "อิเล็กทรอนิกส์",
            subcategories: [
                {
                    id: nanoid(),
                    name: "สมาร์ทโฟน",
                    itemGroups: [
                        { id: nanoid(), name: "แอนดรอยด์" },
                        { id: nanoid(), name: "ไอโฟน" },
                    ],
                },
            ],
        },
    ]);


    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newSubcategoryName, setNewSubcategoryName] = useState("");
    const [newItemGroupName, setNewItemGroupName] = useState("");
    const [error, setError] = useState<ValidationError | null>(null);

    const initialCategories = useRef(categories);


    const validateName = (name: string, type: string): boolean => {
        if (!name.trim()) {
            setError({ message: `กรุณากรอกชื่อ${type}`, field: type });
            return false;
        }
        setError(null);
        return true;
    };

    const handleAddCategory = () => {
        if (!validateName(newCategoryName, "หมวดหมู่")) return;

        const newCategory: Category = {
            id: nanoid(),
            name: newCategoryName,
            subcategories: [],
        };
        setCategories(prev => [...prev, newCategory]);
        setNewCategoryName("");
    };


    const handleAddSubcategory = (categoryId: string) => {
        if (!validateName(newSubcategoryName, "หมวดหมู่ย่อย")) return;

        setCategories(prev =>
            prev.map((cat) =>
                cat.id === categoryId
                    ? {
                        ...cat,
                        subcategories: [
                            ...cat.subcategories,
                            { id: nanoid(), name: newSubcategoryName, itemGroups: [] },
                        ],
                    }
                    : cat
            )
        );
        setNewSubcategoryName("");
    };

    const handleAddItemGroup = () => {
        if (!validateName(newItemGroupName, "กลุ่มสินค้า")) return;
        if (!selectedCategory || !selectedSubcategory) {
            setError({ message: "กรุณาเลือกหมวดหมู่และหมวดหมู่ย่อย", field: "selection" });
            return;
        }

        setCategories(prev =>
            prev.map((cat) =>
                cat.id === selectedCategory
                    ? {
                        ...cat,
                        subcategories: cat.subcategories.map((sub) =>
                            sub.id === selectedSubcategory
                                ? {
                                    ...sub,
                                    itemGroups: [
                                        ...sub.itemGroups,
                                        { id: nanoid(), name: newItemGroupName },
                                    ],
                                }
                                : sub
                        ),
                    }
                    : cat
            )
        );
        setNewItemGroupName("");
    };

    const handleDeleteCategory = (categoryId: string) => {
        if (window.confirm('ต้องการลบหมวดหมู่นี้ใช่หรือไม่?')) {
            setCategories(prev => prev.filter((cat) => cat.id !== categoryId));
            if (selectedCategory === categoryId) {
                setSelectedCategory(null);
                setSelectedSubcategory(null);
            }
        }
    };

    const handleDeleteSubcategory = (categoryId: string, subcategoryId: string) => {
        if (window.confirm('ต้องการลบหมวดหมู่ย่อยนี้ใช่หรือไม่?')) {
            setCategories(prev =>
                prev.map((cat) =>
                    cat.id === categoryId
                        ? {
                            ...cat,
                            subcategories: cat.subcategories.filter(
                                (sub) => sub.id !== subcategoryId
                            ),
                        }
                        : cat
                )
            );
            if (selectedSubcategory === subcategoryId) {
                setSelectedSubcategory(null);
            }
        }
    };

    const handleDeleteItemGroup = (
        categoryId: string,
        subcategoryId: string,
        itemGroupId: string
    ) => {
        if (window.confirm('ต้องการลบกลุ่มสินค้านี้ใช่หรือไม่?')) {
            setCategories(prev =>
                prev.map((cat) =>
                    cat.id === categoryId
                        ? {
                            ...cat,
                            subcategories: cat.subcategories.map((sub) =>
                                sub.id === subcategoryId
                                    ? {
                                        ...sub,
                                        itemGroups: sub.itemGroups.filter(
                                            (item) => item.id !== itemGroupId
                                        ),
                                    }
                                    : sub
                            ),
                        }
                        : cat
                )
            );
        }
    };

    const submit = useCallback(() => {
        try {
            const changes: any[] = [];
            const previous = initialCategories.current;

            // Track deletions
            previous.forEach((prevCat) => {
                if (!categories.find((cat) => cat.id === prevCat.id)) {
                    changes.push({ type: "deleted", category: prevCat });
                }
            });

            // Track additions and updates
            categories.forEach((currentCategory) => {
                const previousCategory = previous.find((cat) => cat.id === currentCategory.id);

                if (!previousCategory) {
                    changes.push({ type: "added", category: currentCategory });
                    return;
                }

                if (previousCategory.name !== currentCategory.name) {
                    changes.push({
                        type: "updated",
                        category: currentCategory.id,
                        field: "name",
                        oldValue: previousCategory.name,
                        newValue: currentCategory.name,
                    });
                }

                // Track subcategory changes
                currentCategory.subcategories.forEach((currentSub) => {
                    const previousSub = previousCategory.subcategories.find(
                        (sub) => sub.id === currentSub.id
                    );

                    if (!previousSub) {
                        changes.push({
                            type: "added",
                            subcategory: currentSub,
                            parentCategory: currentCategory.id,
                        });
                        return;
                    }

                    if (previousSub.name !== currentSub.name) {
                        changes.push({
                            type: "updated",
                            subcategory: currentSub.id,
                            field: "name",
                            oldValue: previousSub.name,
                            newValue: currentSub.name,
                        });
                    }

                    // Track item group changes
                    currentSub.itemGroups.forEach((currentItem) => {
                        const previousItem = previousSub.itemGroups.find(
                            (item) => item.id === currentItem.id
                        );

                        if (!previousItem) {
                            changes.push({
                                type: "added",
                                itemGroup: currentItem,
                                parentSubcategory: currentSub.id,
                            });
                            return;
                        }

                        if (previousItem.name !== currentItem.name) {
                            changes.push({
                                type: "updated",
                                itemGroup: currentItem.id,
                                field: "name",
                                oldValue: previousItem.name,
                                newValue: currentItem.name,
                            });
                        }
                    });
                });
            });

            console.log("Changes:", changes);
            initialCategories.current = JSON.parse(JSON.stringify(categories));
            alert('บันทึกการเปลี่ยนแปลงเรียบร้อย');
        } catch (error) {
            console.error('Error saving changes:', error);
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
    }, [categories]);


    const CategoryItem = ({ category }: { category: Category }) => (
        <div
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
    );

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
            <button onClick={submit}>บันทึกการเปลี่ยนแปลง</button>
        </div>
    )
}

export default CategorieList