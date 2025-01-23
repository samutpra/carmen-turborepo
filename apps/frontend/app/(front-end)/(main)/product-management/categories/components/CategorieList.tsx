'use client';

import { useAuth } from '@/app/context/AuthContext';
import React, { useEffect, useState } from 'react';
import { fetchItemGroup } from '../actions/item_group';
import SummaryCard from './SummaryCard';
import { Folder, Tag, LayoutGrid } from 'lucide-react';
import CategoryDialog from './CategoryDialog';
import CategoryItemList from './CategoryItemList';
import SubCategoryList from './SubCategoryList';
import SubCatDialog from './SubCatDialog';
import ItemGroupList from './ItemGroupList';
import ItemGroupDialog from './ItemGroupDialog';
import SkeltonCategory from '@/components/ui-custom/Loading/SkeltonCategory';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { formType } from '@/types/form_type';
import {
	deleteCategory,
	fetchCategoryList,
	submitCategory,
} from '../actions/category';
import { fetchSubProduct } from '../actions/sub_category';
import * as m from '@/paraglide/messages.js';
import { ProductCategoryCreateModel } from '@/dtos/product-category.dto';
import { ProductSubCategoryCreateModel } from '@/dtos/product-sub-category.dto';
import { ProductItemGroupCreateModel } from '@/dtos/product-item-group.dto';

type CategorySummary = {
	totalCategories: number;
	totalSubCategories: number;
	totalItemGroups: number;
};

const CategorieList = () => {
	const { accessToken } = useAuth();
	const [categorys, setCategorys] = useState<ProductCategoryCreateModel[]>([]);
	const [subCategorys, setSubCategorys] = useState<
		ProductSubCategoryCreateModel[]
	>([]);
	const [itemGroups, setItemGroups] = useState<ProductItemGroupCreateModel[]>(
		[]
	);

	const [selectedCategory, setSelectedCategory] =
		useState<ProductCategoryCreateModel | null>(null);
	const [selectedSubCategory, setSelectedSubCategory] =
		useState<ProductSubCategoryCreateModel | null>(null);

	const [selectedItemGroup, setSelectedItemGroup] =
		useState<ProductItemGroupCreateModel | null>(null);

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
						: ([productResponse.data.data] as ProductCategoryCreateModel[])
				);
				setSubCategorys(
					subProductResponse.data.data as ProductSubCategoryCreateModel[]
				);
				setItemGroups(
					itemGroupResponse.data.data as ProductItemGroupCreateModel[]
				);
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
			const response = await deleteCategory(productId, token);
			if (response.ok) {
				setCategorys((prev) =>
					prev.filter((product) => product.id !== productId)
				);
				if (selectedCategory?.id === productId) {
					setSelectedCategory(null);
					setSelectedSubCategory(null);
				}
				toastSuccess({ message: 'Product deleted successfully' });
			} else {
				throw new Error('Failed to delete category');
			}
		} catch (error) {
			console.error('Error deleting category:', error);
			toastError({ message: 'Failed to delete category' });
		}
	};

	const handleAddCategory = async (formData: ProductCategoryCreateModel) => {
		try {
			const response = await submitCategory(formData, token, formType.ADD, '');
			if (response) {
				const newCategory: ProductCategoryCreateModel = {
					id: response.id,
					code: formData.code,
					name: formData.name,
					description: formData.description,
					is_active: formData.is_active,
				};
				setCategorys((prev) => [...prev, newCategory]);
				toastSuccess({ message: 'Category added successfully' });
				setIsAddCategoryOpen(false);
			} else {
				toastError({ message: response.statusText });
			}
		} catch (error) {
			console.log(error);
			toastError({ message: 'Failed to add category' });
		}
	};

	const handleEditCategory = async (
		id: string,
		formData: ProductCategoryCreateModel
	) => {
		try {
			const response = await submitCategory(formData, token, formType.EDIT, id);
			if (response) {
				setCategorys((prev) =>
					prev.map((product) =>
						product.id === id ? { ...product, ...formData } : product
					)
				);
				toastSuccess({ message: 'Category updated successfully' });
				setIsAddCategoryOpen(false);
			}
		} catch (error) {
			console.error('Error updating product:', error);
			toastError({ message: 'Failed to update category' });
		}
	};

	if (loading) return <SkeltonCategory />;

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
			toastError({ message: 'Please select a category first' });
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
				mode={formType.ADD}
			/>
			<div className="flex flex-col space-y-4">
				<SummaryCard
					title={m.categories()}
					count={summary.totalCategories}
					icon={<Folder className="w-6 h-6" />}
					onAddData={onAddCategory}
					nameSelect={selectedCategory?.name}
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
				mode={formType.ADD}
				product_category_id={selectedCategory?.id || ''}
				product_category_name={selectedCategory?.name}
				setSubProducts={setSubCategorys}
			/>

			<div className="flex flex-col space-y-4">
				<SummaryCard
					title={m.sub_cattegory()}
					count={filteredSubCategories.length}
					icon={<Tag className="w-6 h-6" />}
					onAddData={onAddSubCategory}
					disabled={!selectedCategory}
					nameSelect={selectedSubCategory?.name}
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
				mode={formType.ADD}
				subcategory_id={selectedSubCategory?.id || ''}
				subcategory_name={selectedSubCategory?.name || ''}
				setItemGroup={setItemGroups}
			/>

			<div className="flex flex-col space-y-4">
				<SummaryCard
					title={m.item_group()}
					count={filteredItemGroups.length}
					icon={<LayoutGrid className="w-6 h-6" />}
					onAddData={onAddItemGroup}
					disabled={!selectedSubCategory}
					nameSelect={selectedItemGroup?.name}
				/>
				<ItemGroupList
					data={filteredItemGroups}
					setData={setItemGroups}
					subCategoryId={selectedSubCategory?.id || ''}
					subCategoryName={selectedSubCategory?.name || ''}
					onSelectItemGroup={setSelectedItemGroup}
				/>
			</div>
		</div>
	);
};

export default CategorieList;
