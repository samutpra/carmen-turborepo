'use client';

import { useAuth } from '@/app/context/AuthContext';
import React, { useEffect, useState } from 'react';
import {
	fetchCategoryList,
	fetchItemGroup,
	fetchSubProduct,
} from '../actions/actions';
import {
	CategoryFormData,
	CategoryType,
	ProductItemGroupType,
	SubCategoryType,
} from '@carmensoftware/shared-types';
import SummaryCard from './SummaryCard';
import { Folder, Tag, LayoutGrid } from 'lucide-react';
import { toast } from 'sonner';
import CategoryDialog from './CategoryDialog';
import CategoryItemList from './CategoryItemList';
import SubCategoryList from './SubCategoryList';
import SubCatDialog from './SubCatDialog';
import ItemGroupList from './ItemGroupList';
import ItemGroupDialog from './ItemGroupDialog';

type CategorySummary = {
	totalCategories: number;
	totalSubCategories: number;
	totalItemGroups: number;
};

const CategorieList = () => {
	const { accessToken } = useAuth();
	const [categorys, setCategorys] = useState<CategoryType[]>([]);
	const [subCategorys, setSubCategorys] = useState<SubCategoryType[]>([]);
	const [itemGroups, setItemGroups] = useState<ProductItemGroupType[]>([]);

	const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
		null
	);

	const [selectedSubCategory, setSelectedSubCategory] =
		useState<SubCategoryType | null>(null);

	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
	const [isAddSubCategoryOpen, setIsAddSubCategoryOpen] = useState(false);
	const [isAddItemGroupOpen, setIsAddItemGroupOpen] = useState(false);

	const token = accessToken || '';
	const tenantId = 'DUMMY';

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const [productResponse, subProductResponse, itemGroupResponse] =
					await Promise.all([
						fetchCategoryList(token, tenantId),
						fetchSubProduct(token, tenantId),
						fetchItemGroup(token, tenantId),
					]);

				setCategorys(
					Array.isArray(productResponse.data.data)
						? productResponse.data.data
						: ([productResponse.data.data] as CategoryType[])
				);
				setSubCategorys(subProductResponse.data.data as SubCategoryType[]);
				setItemGroups(itemGroupResponse.data.data as ProductItemGroupType[]);
			} catch (err) {
				console.error(err);
				setError('An error occurred while fetching data');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [token, tenantId]);

	const filteredItemGroups = selectedSubCategory
		? itemGroups.filter(
				(group) => group.product_subcategory_id === selectedSubCategory.id
			)
		: [];

	const filteredSubCategories = selectedCategory
		? subCategorys.filter(
				(subCategory) => subCategory.product_category_id === selectedCategory.id
			)
		: [];

	const handleDeleteProduct = async (productId: string) => {
		try {
			const response = await fetch(
				`/api/product-management/category/products/${productId}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				setCategorys((prevProducts) =>
					prevProducts.filter((product) => product.id !== productId)
				);
				if (selectedCategory?.id === productId) {
					setSelectedCategory(null);
					setSelectedSubCategory(null);
				}
				toast.success('Category deleted successfully');
			} else {
				throw new Error('Failed to delete category');
			}
		} catch (error) {
			console.error('Error deleting category:', error);
			toast.error(
				error instanceof Error ? error.message : 'Failed to delete category',
				{
					className: 'bg-red-500 text-white border-none',
					duration: 3000,
				}
			);
		}
	};

	const handleAddCategory = async (formData: CategoryFormData) => {
		console.log('formData', formData);
		try {
			const response = await fetch(
				'/api/product-management/category/category-list',
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				}
			);

			if (response.ok) {
				const result = await response.json();
				const newCategory: CategoryType = {
					id: result.id,
					name: formData.name,
					description: formData.description,
					is_active: formData.is_active,
				};
				setCategorys((prev) => [...prev, newCategory]);
				toast.success('Category added successfully');
				setIsAddCategoryOpen(false);
			} else {
				toast.error('Failed to add category', {
					className: 'bg-red-500 text-white border-none',
					duration: 3000,
				});
			}
		} catch (error) {
			console.error('Error adding category:', error);
			toast.error(
				error instanceof Error ? error.message : 'Internal Server Error',
				{
					className: 'bg-red-500 text-white border-none',
					duration: 3000,
				}
			);
		}
	};

	const handleEditCategory = async (id: string, formData: CategoryFormData) => {
		try {
			const response = await fetch(
				`/api/product-management/category/category-list/${id}`,
				{
					method: 'PATCH',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				}
			);

			if (!response.ok) {
				throw new Error('Failed to update product');
			}

			const result = await response.json();
			if (result.id) {
				toast.success('Product updated successfully');
				setCategorys((prevProducts) =>
					prevProducts.map((product) =>
						product.id === id ? { ...product, ...formData } : product
					)
				);
			}
		} catch (error) {
			console.error('Error updating product:', error);
			toast.error(
				error instanceof Error ? error.message : 'Failed to update product',
				{
					className: 'bg-red-500 text-white border-none',
					duration: 3000,
				}
			);
		}
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	const summary: CategorySummary = {
		totalCategories: categorys.length,
		totalSubCategories: subCategorys.length,
		totalItemGroups: itemGroups.length,
	};

	const onAddCategory = () => {
		setIsAddCategoryOpen(true);
	};

	const onAddSubCategory = () => {
		if (!selectedCategory) {
			toast.error('Please select a category first');
			return;
		}
		setIsAddSubCategoryOpen(true);
	};

	const onAddItemGroup = () => {
		setIsAddItemGroupOpen(true);
	};

	return (
		<div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
			<CategoryDialog
				open={isAddCategoryOpen}
				onOpenChange={setIsAddCategoryOpen}
				onSubmit={handleAddCategory}
				mode="add"
			/>
			<div className="flex flex-col space-y-4">
				<SummaryCard
					title="Categories"
					count={summary.totalCategories}
					icon={<Folder className="w-6 h-6" />}
					onAddData={onAddCategory}
				/>
				<CategoryItemList
					products={categorys}
					selectedProduct={selectedCategory}
					onSelectCategory={(product) => {
						setSelectedCategory(product);
						setSelectedSubCategory(null);
					}}
					onDeleteCategory={handleDeleteProduct}
					onEditCategory={handleEditCategory}
				/>
			</div>
			<SubCatDialog
				open={isAddSubCategoryOpen}
				onOpenChange={setIsAddSubCategoryOpen}
				mode="add"
				product_category_id={selectedCategory?.id || ''}
				product_category_name={selectedCategory?.name}
				setSubProducts={setSubCategorys}
			/>

			<div className="flex flex-col space-y-4">
				<SummaryCard
					title="Sub Categories"
					count={filteredSubCategories.length}
					icon={<Tag className="w-6 h-6" />}
					onAddData={onAddSubCategory}
					disabled={!selectedCategory}
				/>
				<SubCategoryList
					data={filteredSubCategories}
					setData={setSubCategorys}
					categoryId={selectedCategory?.id || ''}
					categoryName={selectedCategory?.name || ''}
					onSelectSubCategory={setSelectedSubCategory}
				/>
			</div>
			<ItemGroupDialog
				open={isAddItemGroupOpen}
				onOpenChange={setIsAddItemGroupOpen}
				mode="add"
				subcategory_id={selectedSubCategory?.id || ''}
				subcategory_name={selectedSubCategory?.name || ''}
				setItemGroup={setItemGroups}
			/>

			<div className="flex flex-col space-y-4">
				<SummaryCard
					title="Item Groups"
					count={filteredItemGroups.length}
					icon={<LayoutGrid className="w-6 h-6" />}
					onAddData={onAddItemGroup}
					disabled={!selectedSubCategory}
				/>
				<ItemGroupList
					data={filteredItemGroups}
					setData={setItemGroups}
					subCategoryId={selectedSubCategory?.id || ''}
					subCategoryName={selectedSubCategory?.name || ''}
				/>
			</div>
		</div>
	);
};

export default CategorieList;
