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
import Location from './components/tab/Location';
import { fetchData } from '@/app/(front-end)/services/client';
import { ProductInfoClient, ProductInfoDto } from '@/dtos/product.dto';
import { Skeleton } from '@/components/ui/skeleton';

const ProductDetail = ({ params }: { params: { id: string } }) => {
	const router = useRouter();
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [product, setProduct] = useState<ProductInfoClient | null>(null);
	const [loading, setLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const API_URL = `/api/product-management/products/${params.id}`;

	useEffect(() => {
		const loadProduct = async () => {
			setLoading(true);
			try {
				const data = await fetchData(API_URL, token, tenantId);
				setProduct(data.data);
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
		return (
			<div className='m-4 space-y-4'>
				<Card>
					<Skeleton className="h-[125px] w-full rounded-xl" />
				</Card>
				<div className='flex w-full gap-4'>
					<Card className='w-1/2'>
						<Skeleton className="h-[500px] rounded-xl" />
					</Card>
					<Card className='w-1/2'>
						<Skeleton className="h-[500px] rounded-xl" />
					</Card>
				</div>
			</div>
		)
	}

	const priceDetail: ProductInfoDto = {
		price: product?.data.tb_product_info?.price || '',
		tax_type: product?.data.tb_product_info?.tax_type || '',
		tax_rate: product?.data.tb_product_info?.tax_rate || '',
		price_deviation_limit: product?.data.tb_product_info?.price_deviation_limit || '',
		info: {
			attribute: product?.data.tb_product_info?.info?.attribute?.map(item => ({
				label: item?.label || 'No Label',
				value: item?.value || 'No Value',
			})) || [{
				label: 'No Label',
				value: 'No Value',
			}]
		}
	}

	const content = (
		<>
			<Tabs defaultValue="basic">
				<TabsList>
					<TabsTrigger className='text-xs' value="basic">Basic Info</TabsTrigger>
					<TabsTrigger className='text-xs' value="location">Location</TabsTrigger>
					<TabsTrigger className='text-xs' value="inventory">Inventory</TabsTrigger>
					<TabsTrigger className='text-xs' value="orderUnit">Order Unit</TabsTrigger>
					<TabsTrigger className='text-xs' value="ingredientUnit">Ingredient Unit</TabsTrigger>
					<TabsTrigger className='text-xs' value="stockCount">Stock Count</TabsTrigger>
					<TabsTrigger className='text-xs' value="environment">Environmental Impact</TabsTrigger>
				</TabsList>
				<TabsContent value="basic">
					<BasicInfo info={priceDetail} />
				</TabsContent>
				<TabsContent value="location">
					<Location />
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
			<div className="flex flex-col">
				<div className="px-6">
					<Card>
						<CardContent className="py-4">
							<div className="flex flex-col gap-4">
								<div className="flex items-center justify-between">
									<div className="flex flex-col">
										<div className="flex items-center gap-2">
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
								<div className="border-t grid grid-cols-3 gap-4 py-4 text-xs">
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
