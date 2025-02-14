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
import Inventory from './components/tab/Inventory';
import OrderUnit from './components/tab/OrderUnit';
import IngredientUnit from './components/tab/IngredientUnit';
import Location from './components/tab/Location';
import { fetchData } from '@/app/(front-end)/services/client';
import { AttributesDTO, PriceDTO, ProductModel } from '@/dtos/product.dto';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import ProductAttributes from './components/tab/ProductAttributes';
import PricingInformation from './components/tab/PricingInformation';
import { LocationChanges, LocationData } from '@/dtos/location.dto';
import { getLocations } from '../../actions/product';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateNestedObject = (obj: any, path: string, value: any): any => {
	const keys = path.split('.');
	let current = obj;

	for (let i = 0; i < keys.length - 1; i++) {
		const key = keys[i];
		if (!current[key]) current[key] = {};
		current = current[key];
	}

	current[keys[keys.length - 1]] = value;
	return obj;
};

const ProductDetail = ({ params }: { params: { id: string } }) => {
	const router = useRouter();
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [product, setProduct] = useState<ProductModel | null>(null);
	const [productLoading, setProductLoading] = useState(true);
	const [locationsLoading, setLocationsLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const [locations, setLocations] = useState<LocationChanges>({
		add: [],
		edit: [],
		delete: []
	});
	const [originalLocations, setOriginalLocations] = useState<LocationData[]>([]);

	console.log('form location', locations);

	useEffect(() => {
		const API_URL = `/api/product-management/products/${params.id}`;
		const loadProduct = async () => {
			setProductLoading(true); // Changed to setProductLoading
			try {
				const data = await fetchData(API_URL, token, tenantId);
				setProduct(data.data);
			} catch (err: unknown) {
				console.log('error: ', err);
				toastError({ message: 'Failed to fetch product data' });
				router.push('/product-management/products');
			} finally {
				setProductLoading(false); // Changed to setProductLoading
			}
		};

		loadProduct();
	}, [params.id, token]);

	useEffect(() => {
		const fetchLocations = async () => {
			if (!params.id || !token) {
				setLocationsLoading(false);
				return;
			}
			setLocationsLoading(true); // Added loading state management
			try {
				await getLocations(
					params.id,
					token,
					tenantId,
					(data) => setOriginalLocations(data),
				);
			} catch (err: unknown) {
				console.error("Failed to fetch locations:", err);
			} finally {
				setLocationsLoading(false);
			}
		};
		fetchLocations();
	}, [params.id, token, tenantId]);



	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleCancel = () => {
		setIsEditing(false);
	};

	const handleChange = (path: string, value: string | number) => {
		if (!product) return;

		const updatedProduct = { ...product };
		if (path.includes('attribute')) {
			const match = path.match(/attribute\[(\d+)\]\.(\w+)/);
			if (match) {
				const [, index, field] = match;
				const attributes = [
					...(updatedProduct.data.tb_product_info?.info?.attribute || []),
				];

				if (!updatedProduct.data.tb_product_info) {
					updatedProduct.data.tb_product_info = {
						id: '',
						product_id: '',
						product_item_group_id: '',
						is_ingredients: false,
						price: '',
						tax_type: '',
						tax_rate: '',
						price_deviation_limit: '',
						created_at: new Date().toISOString(),
						created_by_id: '',
						updated_at: new Date().toISOString(),
						updated_by_id: '',
						info: {
							attribute: [],
							something: [],
						},
					};
				}

				attributes[Number(index)] = {
					...attributes[Number(index)],
					[field]: value,
				};

				updatedProduct.data.tb_product_info.info.attribute = attributes;
				setProduct(updatedProduct);
			}
		} else {
			const updated = updateNestedObject({ ...product }, path, value);
			setProduct(updated);
		}

		console.log('Updated path:', path, 'New value:', value);
	};

	const handleSave = () => {
		console.log('Saving product data:', product);
		console.log('locations', locations);
		setIsEditing(false);
	};

	if (productLoading || locationsLoading) {
		return (
			<div className="m-4 space-y-4">
				<Card>
					<Skeleton className="h-[125px] w-full rounded-xl" />
				</Card>
				<div className="flex w-full gap-4">
					<Card className="w-1/2">
						<Skeleton className="h-[500px] rounded-xl" />
					</Card>
					<Card className="w-1/2">
						<Skeleton className="h-[500px] rounded-xl" />
					</Card>
				</div>
			</div>
		);
	}

	const priceDetail: PriceDTO = {
		price: product?.data.tb_product_info?.price || '',
		tax_type: product?.data.tb_product_info?.tax_type || '',
		tax_rate: product?.data.tb_product_info?.tax_rate || '',
		price_deviation_limit:
			product?.data.tb_product_info?.price_deviation_limit || '',
	};

	const dataAttributes: AttributesDTO = {
		info: {
			attribute: product?.data.tb_product_info?.info?.attribute?.map(
				(item) => ({
					label: item?.label || 'No Label',
					value: item?.value || 'No Value',
				})
			) || [
					{
						label: 'No Label',
						value: 'No Value',
					},
				],
		},
	};

	const content = (
		<>
			<Tabs defaultValue="basic">
				<TabsList>
					<TabsTrigger className="text-xs" value="basic">
						Basic Info
					</TabsTrigger>
					<TabsTrigger className="text-xs" value="location">
						Location
					</TabsTrigger>
					<TabsTrigger className="text-xs" value="orderUnit">
						Order Unit
					</TabsTrigger>
					<TabsTrigger className="text-xs" value="ingredientUnit">
						Ingredient Unit
					</TabsTrigger>
					<TabsTrigger className="text-xs" value="inventory">
						Inventory
					</TabsTrigger>
				</TabsList>
				<TabsContent value="basic">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<div className="space-y-4">
							<ProductAttributes
								info={dataAttributes}
								isEditing={isEditing}
								handleChange={handleChange}
							/>
							<PricingInformation
								data={priceDetail}
								isEditing={isEditing}
								handleChange={handleChange}
							/>
						</div>
					</div>
				</TabsContent>
				<TabsContent value="location">
					<Location
						token={token}
						tenantId={tenantId}
						setLocations={setLocations}
						isEdit={isEditing}
						originalLocations={originalLocations}
						setOriginalLocations={setOriginalLocations}
						loading={locationsLoading}
					/>
				</TabsContent>
				<TabsContent value="orderUnit">
					<OrderUnit />
				</TabsContent>
				<TabsContent value="inventory">
					<Inventory />
				</TabsContent>
				<TabsContent value="ingredientUnit">
					<IngredientUnit />
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
									<div className="flex flex-col gap-2">
										<div className="flex items-center gap-2">
											{isEditing ? (
												<Input
													className="text-xl font-bold w-64"
													value={product?.data.name || ''}
													onChange={(e) =>
														handleChange('data.name', e.target.value)
													}
												/>
											) : (
												<div className="text-xl font-bold">
													{product?.data.name}
												</div>
											)}
											<Badge>{product?.data.product_status_type}</Badge>
										</div>
										<p className="text-muted-foreground text-xs">
											{product?.data.code}
										</p>
									</div>
									<div className="flex items-center gap-2">
										{isEditing ? (
											<>
												<Button onClick={handleSave} size="sm" variant="ghost">
													<Save className="h-4 w-4" />
												</Button>
												<Button
													onClick={handleCancel}
													variant="outline"
													size="sm"
												>
													Cancel
												</Button>
											</>
										) : (
											<>
												<Button onClick={handleEdit} size="sm" variant="ghost">
													<Pencil className="h-4 w-4" />
												</Button>
												<Button size="sm" variant="ghost">
													<Trash className="h-4 w-4" />
												</Button>
											</>
										)}
									</div>
								</div>
								<div className="border-t grid grid-cols-3 gap-4 py-4 text-xs">
									<div>
										<p className="text-muted-foreground">Description</p>
										{isEditing ? (
											<Textarea
												className="min-h-[60px] text-xs"
												value={product?.data.description || ''}
												onChange={(e) =>
													handleChange('data.description', e.target.value)
												}
											/>
										) : (
											<p>{product?.data.description}</p>
										)}
									</div>
									<div>
										<p className="text-muted-foreground">Category</p>
										{isEditing ? (
											<Input
												className="text-xs"
												value={product?.category_name || ''}
												onChange={(e) =>
													handleChange('category_name', e.target.value)
												}
											/>
										) : (
											<p>{product?.category_name}</p>
										)}
									</div>
									<div>
										<p className="text-muted-foreground">Subcategory</p>
										{isEditing ? (
											<Input
												className="text-xs"
												value={product?.sub_category_name || ''}
												onChange={(e) =>
													handleChange('sub_category_name', e.target.value)
												}
											/>
										) : (
											<p>{product?.sub_category_name}</p>
										)}
									</div>
									<div>
										<p className="text-muted-foreground">Item Group</p>
										{isEditing ? (
											<Input
												className="text-xs"
												value={product?.item_group_name || ''}
												onChange={(e) =>
													handleChange('item_group_name', e.target.value)
												}
											/>
										) : (
											<p>{product?.item_group_name}</p>
										)}
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
