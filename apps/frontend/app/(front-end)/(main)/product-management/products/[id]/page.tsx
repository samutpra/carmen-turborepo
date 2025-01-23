'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toastError } from '@/components/ui-custom/Toast';
import { useRouter } from '@/lib/i18n';
import { Badge } from '@/components/ui/badge';
import { Save, Pencil, Trash } from 'lucide-react';
import BasicInfo from './components/tab/BasicInfo';
import Inventory from './components/tab/Inventory';
import OrderUnit from './components/tab/OrderUnit';
import IngredientUnit from './components/tab/IngredientUnit';
import StockCountUnit from './components/tab/StockCountUnit';
import EnvironmentImpact from './components/tab/EnvironmentImpact';

interface ProductInfo {
	data: {
		id: string;
		code: string;
		name: string;
		description: string;
		tb_product_info?: {
			price: string;
			info: {
				brand: string;
			};
		};
		product_status_type: string;
	};
	item_group_name: string;
	sub_category_name: string;
	category_name: string;
}

const fetchProduct = async (id: string, token: string, tenantId: string) => {
	const URL = `/api/product-management/products/${id}`;

	const options = {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
			'x-tenant-id': tenantId,
			'Content-Type': 'application/json',
		},
	};

	try {
		const response = await fetch(URL, options);
		if (!response.ok) {
			throw new Error('Failed to fetch product data');
		}

		const data = await response.json();

		console.log('data >>>', data);

		return data.data;
	} catch (err: unknown) {
		console.log('err >>>', err);
		return err as string;
	}
};

const ProductDetail = ({ params }: { params: { id: string } }) => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [product, setProduct] = useState<ProductInfo | null>(null);
	const [loading, setLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const loadProduct = async () => {
			setLoading(true);
			try {
				const data = await fetchProduct(params.id, token, tenantId);

				console.log('data >>>', data);
				setProduct(data);
			} catch (err: unknown) {
				console.log('error: ', err);
				toastError({ message: 'Failed to fetch product data' });
				router.push('/product-management/products');
			} finally {
				setLoading(false);
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

	if (loading) {
		return <div>Loading...</div>;
	}

	const content = (
		<>
			<Tabs defaultValue="basic">
				<TabsList className="text-xs">
					<TabsTrigger value="basic">Basic Info</TabsTrigger>
					<TabsTrigger value="inventory">Inventory</TabsTrigger>
					<TabsTrigger value="orderUnit">Order Unit</TabsTrigger>
					<TabsTrigger value="ingredientUnit">Ingredient Unit</TabsTrigger>
					<TabsTrigger value="stockCount">Stock Count</TabsTrigger>
					<TabsTrigger value="environment">Environmental Impact</TabsTrigger>
				</TabsList>
				<TabsContent value="basic">
					<BasicInfo />
				</TabsContent>
				<TabsContent value="inventory">
					<Inventory />
				</TabsContent>
				<TabsContent value="orderUnit">
					<OrderUnit />
				</TabsContent>
				<TabsContent value="ingredientUnit">
					<IngredientUnit />
				</TabsContent>
				<TabsContent value="stockCount">
					<StockCountUnit />
				</TabsContent>
				<TabsContent value="environment">
					<EnvironmentImpact />
				</TabsContent>
			</Tabs>
		</>
	);

	return (
		<div className="container mx-auto py-4">
			<div className="flex flex-col gap-6">
				<div className="px-6">
					<Card>
						<CardContent className="">
							<div className="flex flex-col gap-6">
								<div className="flex items-center justify-between">
									<div className="flex flex-col gap-1">
										<div className="flex items-center gap-3">
											<div className="text-xl font-bold">
												{product?.data.name}
											</div>
											<Badge>{product?.data.product_status_type}</Badge>
										</div>
										<p className="text-muted-foreground text-xs">
											{product?.data.code}
										</p>
									</div>
									<div className="flex items-center">
										{isEditing ? (
											<>
												<Button size={'sm'} variant={'ghost'}>
													<Save />
												</Button>
												<Button
													onClick={handleCancel}
													variant="outline"
													size={'sm'}
												>
													Cancel
												</Button>
											</>
										) : (
											<>
												<Button
													onClick={handleEdit}
													size={'sm'}
													variant={'ghost'}
												>
													<Pencil />
												</Button>
												<Button size={'sm'} variant={'ghost'}>
													<Trash />
												</Button>
											</>
										)}
									</div>
								</div>
								<div className="border-t grid grid-cols-3 gap-4 py-6 text-xs">
									<div>
										<p className="text-muted-foreground">Description</p>
										<p>{product?.data.description}</p>
									</div>
									<div>
										<p className="text-muted-foreground">Category</p>
										<p>{product?.category_name}</p>
									</div>
									<div>
										<p className="text-muted-foreground">Subcategory</p>
										<p>{product?.sub_category_name}</p>
									</div>
									<div>
										<p className="text-muted-foreground">Item Group</p>
										<p>{product?.item_group_name}</p>
									</div>
									<div>
										<p className="text-muted-foreground">Brand</p>
										<p>{product?.data.tb_product_info?.info.brand}</p>
									</div>
									<div>
										<p className="text-muted-foreground">Brand</p>
										<p>{product?.data.tb_product_info?.info.brand}</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
			<div className="p-6">{content}</div>
		</div>
	);
};

export default ProductDetail;
