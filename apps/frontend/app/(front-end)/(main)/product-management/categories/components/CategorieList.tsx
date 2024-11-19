"use client"
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { nanoid } from 'nanoid';
import AddSection from './AddSection';
import ListSection from './ListSection';

// Types
interface Category {
    id: string;
    name: string;
}

interface SubCategory {
    id: string;
    name: string;
    categoriesID: string;
}

interface ItemGroup {
    id: string;
    name: string;
    subCategoriesId: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logPayload = (action: string, payload: any) => {
    console.group('📦 Payload Log');
    console.log('Action:', action);
    console.log('Timestamp:', new Date().toISOString());
    console.log('Payload:', payload);
    console.groupEnd();
};


const CategorieList: React.FC = () => {
    // Initial state with type safety
    const [categories, setCategories] = useState<Category[]>([
        { id: "1", name: "อิเล็กทรอนิกส์" },
        { id: "2", name: "เสื้อผ้า" },
    ]);

    const [subCategories, setSubCategories] = useState<SubCategory[]>([
        { id: "1", name: "สมาร์ทโฟน", categoriesID: "1" },
        { id: "2", name: "แล็ปท็อป", categoriesID: "1" },
    ]);

    const [itemGroups, setItemGroups] = useState<ItemGroup[]>([
        { id: "3", name: "โน้ตบุ๊กเกมมิ่ง", subCategoriesId: "1" },
        { id: "4", name: "โน้ตบุ๊กทั่วไป", subCategoriesId: "1" },
    ]);

    // Selection states
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
    const [selectedItemGroup, setSelectedItemGroup] = useState<string | null>(null);

    // Input states
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newSubcategoryName, setNewSubcategoryName] = useState("");
    const [newItemGroupName, setNewItemGroupName] = useState("");

    const handleSubmit = () => {
        console.log('Selected Values:');
        console.log('Category:', categories);
        console.log('Subcategory:', subCategories);
        console.log('Item Group:', itemGroups);
    };

    // Memoized handlers
    const handleAddCategory = useCallback(() => {
        if (!newCategoryName.trim()) return;

        const payload = {
            type: 'ADD_CATEGORY',
            data: {
                id: nanoid(),
                name: newCategoryName.trim()
            }
        };

        logPayload('ADD_CATEGORY', payload);

        setCategories(prev => [...prev, {
            id: nanoid(),
            name: newCategoryName.trim()
        }]);
        setNewCategoryName("");
    }, [newCategoryName]);

    const handleAddSubcategory = useCallback(() => {
        if (!newSubcategoryName.trim() || !selectedCategory) return;

        const payload = {
            type: 'ADD_SUBCATEGORY',
            data: {
                id: nanoid(),
                name: newSubcategoryName.trim(),
                categoriesID: selectedCategory,
                parentCategory: categories.find(c => c.id === selectedCategory)?.name
            }
        };
        logPayload('ADD_SUBCATEGORY', payload);

        setSubCategories(prev => [...prev, {
            id: nanoid(),
            name: newSubcategoryName.trim(),
            categoriesID: selectedCategory
        }]);
        setNewSubcategoryName("");
    }, [newSubcategoryName, selectedCategory]);

    const handleAddItemGroup = useCallback(() => {
        if (!newItemGroupName.trim() || !selectedSubcategory) return;

        const payload = {
            type: 'ADD_ITEM_GROUP',
            data: {
                id: nanoid(),
                name: newItemGroupName.trim(),
                subCategoriesId: selectedSubcategory,
                parentSubcategory: subCategories.find(s => s.id === selectedSubcategory)?.name,
                parentCategory: categories.find(
                    c => c.id === subCategories.find(s => s.id === selectedSubcategory)?.categoriesID
                )?.name
            }
        };

        logPayload('ADD_ITEM_GROUP', payload);

        setItemGroups(prev => [...prev, {
            id: nanoid(),
            name: newItemGroupName.trim(),
            subCategoriesId: selectedSubcategory
        }]);
        setNewItemGroupName("");
    }, [newItemGroupName, selectedSubcategory]);

    const handleDelete = useCallback((level: 'category' | 'subcategory' | 'itemgroup', id: string) => {
        switch (level) {
            case 'category': {
                const categoryToDelete = categories.find(cat => cat.id === id);
                const affectedSubcategories = subCategories.filter(sub => sub.categoriesID === id);
                const affectedItemGroups = itemGroups.filter(item =>
                    affectedSubcategories.some(sub => sub.id === item.subCategoriesId)
                );

                const payload = {
                    type: 'DELETE_CATEGORY',
                    data: {
                        categoryId: id,
                        categoryName: categoryToDelete?.name,
                        affectedItems: {
                            subcategories: affectedSubcategories,
                            itemGroups: affectedItemGroups
                        }
                    }
                };

                logPayload('DELETE_CATEGORY', payload);

                setCategories(prev => prev.filter(cat => cat.id !== id));
                setSubCategories(prev => prev.filter(sub => sub.categoriesID !== id));
                setItemGroups(prev =>
                    prev.filter(item =>
                        !affectedSubcategories.some(sub => sub.id === item.subCategoriesId)
                    )
                );

                if (selectedCategory === id) {
                    setSelectedCategory(null);
                    setSelectedSubcategory(null);
                }
                break;
            }

            case 'subcategory': {
                const subcategoryToDelete = subCategories.find(sub => sub.id === id);
                const affectedItemGroups = itemGroups.filter(item => item.subCategoriesId === id);

                const payload = {
                    type: 'DELETE_SUBCATEGORY',
                    data: {
                        subcategoryId: id,
                        subcategoryName: subcategoryToDelete?.name,
                        parentCategory: categories.find(
                            c => c.id === subcategoryToDelete?.categoriesID
                        )?.name,
                        affectedItemGroups
                    }
                };

                logPayload('DELETE_SUBCATEGORY', payload);

                setSubCategories(prev => prev.filter(sub => sub.id !== id));
                setItemGroups(prev => prev.filter(item => item.subCategoriesId !== id));

                if (selectedSubcategory === id) {
                    setSelectedSubcategory(null);
                }
                break;
            }

            case 'itemgroup': {
                const itemGroupToDelete = itemGroups.find(item => item.id === id);
                const parentSubcategory = subCategories.find(
                    sub => sub.id === itemGroupToDelete?.subCategoriesId
                );

                const payload = {
                    type: 'DELETE_ITEM_GROUP',
                    data: {
                        itemGroupId: id,
                        itemGroupName: itemGroupToDelete?.name,
                        parentSubcategory: parentSubcategory?.name,
                        parentCategory: categories.find(
                            c => c.id === parentSubcategory?.categoriesID
                        )?.name
                    }
                };

                logPayload('DELETE_ITEM_GROUP', payload);
                setItemGroups(prev => prev.filter(item => item.id !== id));
                break;
            }
        }
    }, [selectedCategory, selectedSubcategory, categories, subCategories, itemGroups]);

    return (
        <div className="p-4">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>จัดการหมวดหมู่สินค้า</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Categories Column */}
                        <div>
                            <AddSection
                                value={newCategoryName}
                                onChange={setNewCategoryName}
                                onAdd={handleAddCategory}
                                placeholder="เพิ่มหมวดหมู่"
                            />
                            <h3 className="text-lg font-semibold mb-4">หมวดหมู่</h3>
                            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                                {categories.map(category => (
                                    <ListSection
                                        key={category.id}
                                        name={category.name}
                                        isSelected={selectedCategory === category.id}
                                        onSelect={() => setSelectedCategory(category.id)}
                                        onDelete={() => handleDelete('category', category.id)}
                                    />
                                ))}
                            </ScrollArea>

                        </div>

                        {/* Subcategories Column */}
                        <div>
                            <AddSection
                                value={newSubcategoryName}
                                onChange={setNewSubcategoryName}
                                onAdd={handleAddSubcategory}
                                placeholder="เพิ่มหมวดหมู่ย่อย"
                                disabled={!selectedCategory}
                            />
                            <h3 className="text-lg font-semibold mb-4">หมวดหมู่ย่อย</h3>
                            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                                {subCategories
                                    .filter(sub => sub.categoriesID === selectedCategory)
                                    .map(subcategory => (
                                        <ListSection
                                            key={subcategory.id}
                                            name={subcategory.name}
                                            isSelected={selectedSubcategory === subcategory.id}
                                            onSelect={() => setSelectedSubcategory(subcategory.id)}
                                            onDelete={() => handleDelete('subcategory', subcategory.id)}
                                        />
                                    ))}
                            </ScrollArea>
                        </div>

                        {/* Item Groups Column */}
                        <div>
                            <AddSection
                                value={newItemGroupName}
                                onChange={setNewItemGroupName}
                                onAdd={handleAddItemGroup}
                                placeholder="เพิ่มกลุ่มสินค้า"
                                disabled={!selectedSubcategory}
                            />
                            <h3 className="text-lg font-semibold mb-4">กลุ่มสินค้า</h3>
                            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                                {itemGroups
                                    .filter(item => item.subCategoriesId === selectedSubcategory)
                                    .map(itemGroup => (
                                        <ListSection
                                            key={itemGroup.id}
                                            name={itemGroup.name}
                                            isSelected={selectedItemGroup === itemGroup.id}
                                            onSelect={() => setSelectedItemGroup(itemGroup.id)}
                                            onDelete={() => handleDelete('itemgroup', itemGroup.id)}
                                        />
                                    ))}
                            </ScrollArea>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </CardContent>

            </Card>
        </div>
    );
};

export default CategorieList;