"use client";

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import STLComponent from '../../components/template/STLComponent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { categoryData, itemCategory, itemGroup, subCategoryData } from '../../data/store';
import CategorySelect from '../../components/CategorySelect';
import SubCategorySelect from '../../components/SubCategorySelect';
import ItemGroupSelect from '../../components/ItemGroupSelect';
import TableCategory from '../../components/TableCategory';

interface Item {
    id: string;
    itemName: string;
    sku: string;
}

interface FilteredData {
    items: Item[];
}

const StoreLocationDetailPage: React.FC = () => {
    const params = useParams();
    const id = params?.id as string;

    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
    const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState<string[]>([]);
    const [selectedItemGroupIds, setSelectedItemGroupIds] = useState<string[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    // Assuming filteredData is derived from category, subcategory, and group selections
    const filteredData: FilteredData = useMemo(() => {
        // Replace with the actual filtering logic based on selections
        return {
            items: [], // Filter and populate this based on selected categories and subcategories
        };
    }, [selectedCategoryIds, selectedSubCategoryIds, selectedItemGroupIds]);

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategoryIds(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleSubCategoryChange = (subCategoryId: string) => {
        setSelectedSubCategoryIds(prev =>
            prev.includes(subCategoryId)
                ? prev.filter(id => id !== subCategoryId)
                : [...prev, subCategoryId]
        );
    };

    const handleItemGroupChange = (groupId: string) => {
        setSelectedItemGroupIds(prev =>
            prev.includes(groupId)
                ? prev.filter(id => id !== groupId)
                : [...prev, groupId]
        );
    };

    const handleItemSelect = (itemId: string) => {
        setSelectedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const handleSelectAll = () => {
        setSelectedItems(prev =>
            prev.length === filteredData.items.length
                ? []
                : filteredData.items.map(item => item.id)
        );
    };

    const details = (
        <div className="p-4">
            Detail
        </div>
    );

    const content = (
        <>
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">Selected Items ({selectedItems.length})</h2>
            </div>
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Product Categories</CardTitle>
                    <div className="space-y-4 mt-4">
                        {/* Category Selection */}
                        <CategorySelect
                            categories={categoryData}
                            selectedIds={selectedCategoryIds}
                            onSelect={handleCategoryChange}
                        />

                        {/* SubCategory Selection */}
                        <SubCategorySelect
                            subCategories={subCategoryData}
                            selectedIds={selectedSubCategoryIds}
                            onSelect={handleSubCategoryChange}
                        />

                        {/* Item Group Selection */}
                        <ItemGroupSelect
                            itemsGroup={itemGroup}
                            selectedIds={selectedItemGroupIds}
                            onSelect={handleItemGroupChange}
                        />
                    </div>
                </CardHeader>

                <CardContent>
                    <TableCategory
                        items={filteredData.items}
                        selectedItems={selectedItems}
                        onItemSelect={handleItemSelect}
                        onSelectAll={handleSelectAll}
                    />
                </CardContent>
            </Card>
        </>
    );

    return (
        <STLComponent
            detail={details}
            content={content}
        />
    );
};

export default StoreLocationDetailPage;
