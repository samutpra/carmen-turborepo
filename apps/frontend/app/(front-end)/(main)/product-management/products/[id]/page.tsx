'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProductInfo {
	data: {
		id: string;
		code: string;
		name: string;
		description: string;
		tb_product_info: {
			price: string;
			info: {
				brand: string;
			};
		};
	};
	item_group_name: string;
	sub_category_name: string;
	category_name: string;
}

// Fetch product function
const fetchProduct = async (id: string, token: string) => {
	const URL = `/api/product-management/products/${id}`;
	const options = {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	};

	try {
		const response = await fetch(URL, options);
		if (!response.ok) {
			throw new Error('Failed to fetch product data');
		}

		const data = await response.json();

		console.log('data', data);

		return data.data; // Return the fetched data
	} catch (err: unknown) {
		throw new Error(err as string); // Throw error to be caught in the calling function
	}
};

const ProductDetail = ({ params }: { params: { id: string } }) => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const [product, setProduct] = useState<ProductInfo | null>(null); // Use the defined type
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		const loadProduct = async () => {
			setLoading(true); // Set loading to true before fetching
			try {
				const data = await fetchProduct(params.id, token); // Fetch product data
				setProduct(data); // Set product state with fetched data
			} catch (err: unknown) {
				setError(err as string); // Set error state if fetching fails
			} finally {
				setLoading(false); // Set loading to false after fetching
			}
		};

		loadProduct();
	}, [params.id, token]);

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleCancel = () => {
		setIsEditing(false);
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	const actionButtons = (
		<>
			{isEditing ? (
				<>
					<Button variant="default" size={'sm'}>
						Save
					</Button>
					<Button onClick={handleCancel} variant="outline" size={'sm'}>
						Cancel
					</Button>
				</>
			) : (
				<>
					<Button onClick={handleEdit} size={'sm'}>
						Edit
					</Button>
					<Button variant="destructive" size={'sm'}>
						Delete
					</Button>
				</>
			)}
		</>
	);

	const content = (
		<>
			<Tabs defaultValue="basic">
				<TabsTrigger value="basic" className="text-xs">
					Basic Info
				</TabsTrigger>
				<TabsTrigger value="inventory" className="text-xs">
					Inventory
				</TabsTrigger>
				<TabsTrigger value="orderUnit" className="text-xs">
					Order Unit
				</TabsTrigger>
				<TabsTrigger value="ingredientUnit" className="text-xs">
					Ingredient Unit
				</TabsTrigger>
				<TabsTrigger value="stockCount" className="text-xs">
					Stock Count
				</TabsTrigger>
				<TabsTrigger value="environment" className="text-xs">
					Environmental Impact
				</TabsTrigger>
			</Tabs>
			<TabsContent value="basic">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Product Attributes</CardTitle>
							</CardHeader>
							<CardContent className="grid gap-4">
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="text-sm font-medium text-muted-foreground">
											Size
										</label>
										<p className="text-sm mt-1">1</p>
									</div>
									<div>
										<label className="text-sm font-medium text-muted-foreground">
											Color
										</label>
										<p className="text-sm mt-1">White</p>
									</div>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="text-sm font-medium text-muted-foreground">
											Weight
										</label>
										<p className="text-sm mt-1">2</p>
									</div>
									<div>
										<label className="text-sm font-medium text-muted-foreground">
											Shelf Life
										</label>
										<p className="text-sm mt-1">365 days</p>
									</div>
								</div>
								<div>
									<label className="text-sm font-medium text-muted-foreground">
										Dimensions (L × W × H)
									</label>
									<p className="text-sm mt-1">10 × 15 × 20 cm</p>
								</div>
								<div>
									<label className="text-sm font-medium text-muted-foreground">
										Storage Instructions
									</label>
									<p className="text-sm mt-1">
										Store in a cool, dry place away from direct sunlight
									</p>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Pricing Information</CardTitle>
							</CardHeader>
							<CardContent className="grid gap-4">
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="text-sm font-medium text-muted-foreground">
											Base Price
										</label>
										<p className="text-sm mt-1">35.5 THB</p>
									</div>
									<div>
										<label className="text-sm font-medium text-muted-foreground">
											Standard Cost
										</label>
										<p className="text-sm mt-1">28.4 THB</p>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="text-sm font-medium text-muted-foreground">
											Tax Type
										</label>
										<p className="text-sm mt-1">VAT</p>
									</div>
									<div>
										<label className="text-sm font-medium text-muted-foreground">
											Tax Rate
										</label>
										<p className="text-sm mt-1">10 %</p>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="text-sm font-medium text-muted-foreground">
											Price Deviation Limit
										</label>
										<p className="text-sm mt-1">10 %</p>
									</div>
									<div>
										<label className="text-sm font-medium text-muted-foreground">
											Last Cost
										</label>
										<p className="text-sm mt-1">29.75 THB</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</TabsContent>
			<h1>{product?.data.name}</h1>
			<p>Code: {product?.data.code}</p>
			<p>Description: {product?.data.description}</p>
			<p>Price: ${product?.data.tb_product_info.price}</p>
			<p>Item Group: {product?.item_group_name}</p>
			<p>Subcategory: {product?.sub_category_name}</p>
			<p>Category: {product?.category_name}</p>
			<p>Brand: {product?.data.tb_product_info.info.brand}</p>
		</>
	);

	return (
		<div className="container mx-auto py-10">
			<div className="flex flex-col gap-6">
				<div className="px-6">
					<Card>
						<CardContent className="p-6">
							<div className="flex flex-col gap-6">
								<div className="flex items-center justify-between">
									<div className="flex flex-col gap-1">
										<div className="flex items-center gap-3">
											<div className="text-2xl font-bold">
												{product?.data.name}
											</div>
											{product?.data.code}
										</div>
									</div>
									<div className="flex items-center gap-2">{actionButtons}</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
			<div className="p-6 -mt-6">{content}</div>
		</div>
	);
};

export default ProductDetail;
