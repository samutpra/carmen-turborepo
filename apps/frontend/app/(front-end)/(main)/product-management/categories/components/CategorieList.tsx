'use client';

import { useAuth } from '@/app/context/AuthContext';
import React, { useEffect, useState } from 'react';
import {
	fetchItemGroup,
	fetchProduct,
	fetchSubProduct,
} from '../actions/actions';
import {
	CategoryFormData,
	ProductItemGroupType,
	ProductSubCategoryType,
	SubCategoryFormData,
} from '@carmensoftware/shared-types';
import SummaryCard from './SummaryCard';
import { Folder, Tag, LayoutGrid } from 'lucide-react';
import { ItemGroupList } from './ItemGroupList';
import ProductList from './ProductList';
import SubProductList from './SubProductList';
import { toast } from 'sonner';
import CategoryDialog from './CategoryDialog';
import SubCategoryDialog from './SubCategoryDialog';

interface ProductResponse {
	name: string;
	id: string;
	productSubCategories: ProductSubCategoryType[];
}

type CategorySummary = {
	totalCategories: number;
	totalSubCategories: number;
	totalItemGroups: number;
};

const CategorieList = () => {
	const { accessToken } = useAuth();
	const [products, setProducts] = useState<ProductResponse[]>([]);
	const [subProducts, setSubProducts] = useState<ProductSubCategoryType[]>([]);
	const [itemGroups, setItemGroups] = useState<ProductItemGroupType[]>([]);
	const [selectedProduct, setSelectedProduct] =
		useState<ProductResponse | null>(null);
	const [selectedSubProduct, setSelectedSubProduct] =
		useState<ProductSubCategoryType | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
	const [isAddSubCategoryOpen, setIsAddSubCategoryOpen] = useState(false);

	const token = accessToken || '';
	const tenantId = 'DUMMY';

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const [productResponse, subProductResponse, itemGroupResponse] =
					await Promise.all([
						fetchProduct(token, tenantId),
						fetchSubProduct(token, tenantId),
						fetchItemGroup(token, tenantId),
					]);

				setProducts(
					Array.isArray(productResponse.data.data)
						? productResponse.data.data
						: ([productResponse.data.data] as ProductResponse[])
				);
				setSubProducts(
					subProductResponse.data.data as ProductSubCategoryType[]
				);
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

	const filteredSubProducts = selectedProduct
		? subProducts.filter(
				(sub) => sub.product_category_id === selectedProduct.id
			)
		: [];

	const filteredItemGroups = selectedSubProduct
		? itemGroups.filter(
				(group) => group.product_subcategory_id === selectedSubProduct.id
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
				setProducts((prevProducts) =>
					prevProducts.filter((product) => product.id !== productId)
				);
				if (selectedProduct?.id === productId) {
					setSelectedProduct(null);
					setSelectedSubProduct(null);
				}
				toast.success('Category deleted successfully');
			} else {
				throw new Error('Failed to delete category');
			}
		} catch (error) {
			console.error('Error deleting category:', error);
			toast.error('Failed to delete category');
		}
	};

	const handleDeleteSubProduct = async (subProductId: string) => {
		try {
			const response = await fetch(
				`/api/product-management/category/sub-products/${subProductId}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				setSubProducts((prevSubProducts) =>
					prevSubProducts.filter((subProduct) => subProduct.id !== subProductId)
				);
				if (selectedSubProduct?.id === subProductId) {
					setSelectedSubProduct(null);
				}
				toast.success('Sub-category deleted successfully');
			} else {
				throw new Error('Failed to delete sub-category');
			}
		} catch (error) {
			console.error('Error deleting sub-category:', error);
			toast.error('Failed to delete sub-category');
		}
	};

	const handleDeleteItemGroup = async (itemGroupId: string) => {
		try {
			const response = await fetch(
				`/api/product-management/category/item-groups/${itemGroupId}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				setItemGroups((prevGroups) =>
					prevGroups.filter((group) => group.id !== itemGroupId)
				);
				toast.success('Item group deleted successfully');
			} else {
				throw new Error('Failed to delete item group');
			}
		} catch (error) {
			console.error('Error deleting item group:', error);
			toast.error('Failed to delete item group');
		}
	};

	const handleUpdateItemGroup = (itemGroupId: string, newName: string) => {
		setItemGroups((prevGroups) =>
			prevGroups.map((group) =>
				group.id === itemGroupId ? { ...group, name: newName } : group
			)
		);
	};

	const handleAddCategory = async (formData: CategoryFormData) => {
		try {
			const response = await fetch(
				'/api/product-management/category/products',
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
				const newCategory: ProductResponse = {
					id: result.data,
					name: formData.name,
					productSubCategories: [],
				};
				setProducts((prev) => [...prev, newCategory]);
				toast.success('Category added successfully');
				setIsAddCategoryOpen(false);
			} else {
				throw new Error('Failed to add category');
			}
		} catch (error) {
			console.error('Error adding category:', error);
			toast.error('Failed to add category');
		}
	};

	const handleAddSubCategory = async (formData: SubCategoryFormData) => {
		console.log(formData);

		// try {
		// 	const response = await fetch(
		// 		'/api/product-management/category/products',
		// 		{
		// 			method: 'POST',
		// 			headers: {
		// 				Authorization: `Bearer ${token}`,
		// 				'Content-Type': 'application/json',
		// 			},
		// 			body: JSON.stringify(formData),
		// 		}
		// 	);

		// 	if (response.ok) {
		// 		const result = await response.json();
		// 		const newCategory: ProductResponse = {
		// 			id: result.data,
		// 			name: formData.name,
		// 			productSubCategories: [],
		// 		};
		// 		setProducts((prev) => [...prev, newCategory]);
		// 		toast.success('Category added successfully');
		// 		setIsAddCategoryOpen(false);
		// 	} else {
		// 		throw new Error('Failed to add category');
		// 	}
		// } catch (error) {
		// 	console.error('Error adding category:', error);
		// 	toast.error('Failed to add category');
		// }
	};

	const handleEditProduct = async (
		productId: string,
		formData: CategoryFormData
	) => {
		try {
			const response = await fetch(
				`/api/product-management/category/products/${productId}`,
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
				setProducts((prevProducts) =>
					prevProducts.map((product) =>
						product.id === productId ? { ...product, ...formData } : product
					)
				);
			}
		} catch (error) {
			console.error('Error updating product:', error);
			toast.error('Failed to update product');
		}
	};

	const handleEditSubProduct = async (
		subProductId: string,
		formData: SubCategoryFormData
	) => {
		try {
			const response = await fetch(
				`/api/product-management/category/sub-products/${subProductId}`,
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
				throw new Error('Failed to update sub-category');
			}

			const result = await response.json();
			if (result.id) {
				toast.success('Sub-category updated successfully');
				setSubProducts((prevSubProducts) =>
					prevSubProducts.map((subProduct) =>
						subProduct.id === subProductId
							? { ...subProduct, ...formData }
							: subProduct
					)
				);
			}
		} catch (error) {
			console.error('Error updating sub-category:', error);
			toast.error('Failed to update sub-category');
		}
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	const summary: CategorySummary = {
		totalCategories: products.length,
		totalSubCategories: subProducts.length,
		totalItemGroups: itemGroups.length,
	};

	const onAddCategory = () => {
		setIsAddCategoryOpen(true);
	};

	const onAddSubCategory = () => {
		setIsAddSubCategoryOpen(true);
	};

	const onAddItemGroup = () => {
		console.log('Item Group Add');
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
				<ProductList
					products={products}
					selectedProduct={selectedProduct}
					onSelectProduct={(product) => {
						setSelectedProduct(product);
						setSelectedSubProduct(null);
					}}
					onDeleteProduct={handleDeleteProduct}
					onEditProduct={handleEditProduct}
				/>
			</div>
			<SubCategoryDialog
				open={isAddSubCategoryOpen}
				onOpenChange={setIsAddSubCategoryOpen}
				onSubmit={handleAddSubCategory}
				mode="add"
				categories={products.map(product => ({ id: product.id, name: product.name }))}
			/>
			<div className="flex flex-col space-y-4">
				<SummaryCard
					title="Sub Categories"
					count={summary.totalSubCategories}
					icon={<Tag className="w-6 h-6" />}
					onAddData={onAddSubCategory}
				/>
				<SubProductList
					subProducts={filteredSubProducts}
					selectedSubProduct={selectedSubProduct}
					onSelectSubProduct={setSelectedSubProduct}
					onDeleteSubProduct={handleDeleteSubProduct}
					onEditSubProduct={handleEditSubProduct}
				/>
			</div>

			<div className="flex flex-col space-y-4">
				<SummaryCard
					title="Item Groups"
					count={summary.totalItemGroups}
					icon={<LayoutGrid className="w-6 h-6" />}
					onAddData={onAddItemGroup}
				/>
				<ItemGroupList
					itemGroups={filteredItemGroups}
					categoryName={selectedProduct?.name || ''}
					subCategoryName={selectedSubProduct?.name || ''}
					onDeleteItemGroup={handleDeleteItemGroup}
					onUpdateItemGroup={handleUpdateItemGroup}
				/>
			</div>
		</div>
	);
};

export default CategorieList;
