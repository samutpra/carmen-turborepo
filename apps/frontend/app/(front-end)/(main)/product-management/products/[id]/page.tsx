"use client";

import { Input } from '@/components/ui/input';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { inventoryData, inventoryUnits, productList, ProductType } from '../data';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ImageIcon, Package, UploadIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import StatusBadge from '@/components/ui-custom/custom-status-badge';
import Link from 'next/link';
import OrderUnit from './components/tab/OrderUnit';
import IngredientUnit from './components/tab/IngredientUnit';
import StockCountUnit from './components/tab/StockCountUnit';
import EnvironmentImpact from './components/tab/EnvironmentImpact';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ProductIdPage = () => {
	const { id } = useParams() as { id: string }
	const [product, setProduct] = useState<ProductType | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [editedProduct, setEditedProduct] = useState<ProductType | null>(null);

	const fetchProduct = async () => {
		try {
			setIsLoading(true);
			const data = productList[0];
			setProduct(data as ProductType);
		} catch (error) {
			setError('Error fetching product');
			console.error('Error fetching product:', error);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchProduct();
	}, [id]);

	useEffect(() => {
		if (product && !editedProduct) {
			setEditedProduct(product);
		}
	}, [product]);

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditedProduct(product);
	};

	const handleSave = async () => {
		if (!editedProduct) return;
		try {

			setProduct(editedProduct);
			setIsEditing(false);
			toastSuccess({ message: 'Product updated successfully' });
		} catch (error) {
			console.error('Error updating product:', error);
			toastError({ message: 'Failed to update product' });
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleInputChange = (field: keyof ProductType, value: any) => {
		if (!editedProduct) return;
		setEditedProduct({ ...editedProduct, [field]: value });
	};

	const handleDelete = async () => {
		if (window.confirm('Are you sure you want to delete this product?')) {
			alert("delete success");
		}
	};

	const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
			const formData = new FormData();
			formData.append('image', file);

			try {
				const response = await fetch(`/api/products/${id}/image`, {
					method: 'POST',
					body: formData,
				});

				if (!response.ok) throw new Error('Failed to upload image');

				const updatedProduct = await response.json();
				setProduct(updatedProduct);
			} catch (error) {
				console.error('Error uploading image:', error);
			}
		}
	};

	const saveConversions = async () => {
		if (!product) {
			console.error('Product is null')
			toastError({ message: 'Product is null' })
			return
		}

		try {

			toastSuccess({ message: 'Conversions saved successfully' })
		} catch (error) {
			console.error('Error saving conversions:', error)
			toastError({ message: 'Failed to save conversions' })
		}
	}

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;
	if (!product) return <div>Product not found</div>;

	const actionButtons = (
		<>
			{isEditing ? (
				<>
					<Button onClick={handleSave} variant="default">Save</Button>
					<Button onClick={handleCancel} variant="outline">Cancel</Button>
				</>
			) : (
				<>
					<Button onClick={handleEdit}>Edit</Button>
					<Button variant="destructive" onClick={handleDelete}>Delete</Button>
				</>
			)}
		</>
	);

	const content = (
		<>
			<Tabs defaultValue="basic">
				<TabsList>
					<TabsTrigger value="basic">Basic Info</TabsTrigger>
					<TabsTrigger value="inventory">Inventory</TabsTrigger>
					<TabsTrigger value="orderUnit">Order Unit</TabsTrigger>
					<TabsTrigger value="ingredientUnit">Ingredient Unit</TabsTrigger>
					<TabsTrigger value="stockCount">Stock Count</TabsTrigger>
					<TabsTrigger value="environment">Environmental Impact</TabsTrigger>
				</TabsList>
				<TabsContent value="basic">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{/* Left Column - Now starts with Product Attributes */}
						<div className="space-y-6">
							<Card>
								<CardHeader>
									<CardTitle>Product Attributes</CardTitle>
								</CardHeader>
								<CardContent className="grid gap-4">
									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="text-sm font-medium text-muted-foreground">Size</label>
											<p className="text-sm mt-1">{product.size}</p>
										</div>
										<div>
											<label className="text-sm font-medium text-muted-foreground">Color</label>
											<p className="text-sm mt-1">{product.color}</p>
										</div>
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="text-sm font-medium text-muted-foreground">Weight</label>
											<p className="text-sm mt-1">{product.weight} kg</p>
										</div>
										<div>
											<label className="text-sm font-medium text-muted-foreground">Shelf Life</label>
											<p className="text-sm mt-1">{product.shelfLife} days</p>
										</div>
									</div>
									<div>
										<label className="text-sm font-medium text-muted-foreground">Dimensions (L × W × H)</label>
										<p className="text-sm mt-1">
											{product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} cm
										</p>
									</div>
									<div>
										<label className="text-sm font-medium text-muted-foreground">Storage Instructions</label>
										<p className="text-sm mt-1">{product.storageInstructions}</p>
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
											<label className="text-sm font-medium text-muted-foreground">Base Price</label>
											<p className="text-sm mt-1">{product.basePrice} {product.currency}</p>
										</div>
										<div>
											<label className="text-sm font-medium text-muted-foreground">Standard Cost</label>
											<p className="text-sm mt-1">{product.standardCost} {product.currency}</p>
										</div>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="text-sm font-medium text-muted-foreground">Tax Type</label>
											<p className="text-sm mt-1">{product.taxType}</p>
										</div>
										<div>
											<label className="text-sm font-medium text-muted-foreground">Tax Rate</label>
											<p className="text-sm mt-1">{product.taxRate}%</p>
										</div>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="text-sm font-medium text-muted-foreground">Price Deviation Limit</label>
											<p className="text-sm mt-1">{product.priceDeviationLimit}%</p>
										</div>
										<div>
											<label className="text-sm font-medium text-muted-foreground">Last Cost</label>
											<p className="text-sm mt-1">{product.lastCost} {product.currency}</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Right Column - Product Image */}
						<div className="space-y-6">
							<Card>
								<CardHeader>
									<CardTitle>Product Image</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="relative aspect-square rounded-lg overflow-hidden border bg-muted">
										{product.imagesUrl ? (
											<>
												<Image
													src={product.imagesUrl}
													alt={product.name}
													fill
													className="object-cover"
													sizes="(max-width: 768px) 100vw, 50vw"
												/>
												<Button
													type="button"
													variant="secondary"
													size="icon"
													className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
													onClick={handleDelete}
												>
													<XIcon className="h-4 w-4" />
												</Button>
											</>
										) : (
											<div className="absolute inset-0 flex items-center justify-center">
												<div className="text-center">
													<ImageIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
													<p className="mt-2 text-sm text-muted-foreground">No image available</p>
												</div>
											</div>
										)}
									</div>
									<div className="mt-4">
										<div className="flex items-center justify-center w-full">
											<label htmlFor="image-upload" className="w-full">
												<div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
													<div className="flex flex-col items-center justify-center pt-5 pb-6">
														<UploadIcon className="w-8 h-8 mb-2 text-muted-foreground" />
														<p className="text-sm text-muted-foreground">
															<span className="font-semibold">Click to upload</span> or drag and drop
														</p>
														<p className="text-xs text-muted-foreground/70">PNG, JPG, GIF up to 10MB</p>
													</div>
													<Input
														id="image-upload"
														type="file"
														accept="image/*"
														onChange={handleImageUpload}
														className="hidden"
													/>
												</div>
											</label>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</TabsContent>
				<TabsContent value="inventory">
					<div className="space-y-6">
						{/* Total Stock Summary */}
						<Card>
							<CardContent className="p-4">
								<div className="flex items-center space-x-2 mb-4 border-b pb-4">
									<Package className="w-5 h-5 text-muted-foreground" />
									<h2 className="text-sm font-medium">Total Stock Position</h2>
								</div>
								<div className="grid grid-cols-2 gap-6">
									<div>
										<label className="text-xs text-muted-foreground block text-right">On Hand</label>
										<div className="mt-1 text-2xl font-semibold tabular-nums text-right">
											{inventoryData.totalStock.onHand.toLocaleString()}
										</div>
									</div>
									<div>
										<label className="text-xs text-muted-foreground block text-right">On Order</label>
										<div className="mt-1 text-2xl font-semibold tabular-nums text-right">
											{inventoryData.totalStock.onOrder.toLocaleString()}
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Location Details */}
						<Card>
							<CardHeader>
								<CardTitle>Stock by Location</CardTitle>
							</CardHeader>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Location</TableHead>
											<TableHead className="text-right">On Hand</TableHead>
											<TableHead className="text-right">On Order</TableHead>
											<TableHead className="text-right">Minimum</TableHead>
											<TableHead className="text-right">Maximum</TableHead>
											<TableHead className="text-right">Reorder</TableHead>
											<TableHead className="text-right">PAR</TableHead>
											<TableHead className="text-center">Status</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{inventoryData.locations.map((location) => {
											const isLow = location.onHand < location.minimum;
											const isHigh = location.onHand > location.maximum;
											const needsReorder = location.onHand < location.reorderPoint;

											return (
												<TableRow key={location.code}>
													<TableCell>
														<div>
															<div className="font-medium">{location.name}</div>
															<div className="text-xs text-muted-foreground">{location.code}</div>
														</div>
													</TableCell>
													<TableCell className="text-right tabular-nums">
														{location.onHand.toLocaleString()}
													</TableCell>
													<TableCell className="text-right tabular-nums">
														{location.onOrder.toLocaleString()}
													</TableCell>
													<TableCell className="text-right tabular-nums">
														{location.minimum.toLocaleString()}
													</TableCell>
													<TableCell className="text-right tabular-nums">
														{location.maximum.toLocaleString()}
													</TableCell>
													<TableCell className="text-right tabular-nums">
														{location.reorderPoint.toLocaleString()}
													</TableCell>
													<TableCell className="text-right tabular-nums">
														{location.parLevel.toLocaleString()}
													</TableCell>
													<TableCell className="text-center">
														<StatusBadge status={isLow ? 'below-min' : needsReorder ? 'reorder' : isHigh ? 'over-max' : 'normal'} />
													</TableCell>
												</TableRow>
											)
										})}
										{/* Totals Row */}
										<TableRow className="font-medium bg-muted/50">
											<TableCell>Total All Locations</TableCell>
											<TableCell className="text-right tabular-nums">
												{inventoryData.totalStock.onHand.toLocaleString()}
											</TableCell>
											<TableCell className="text-right tabular-nums">
												{inventoryData.totalStock.onOrder.toLocaleString()}
											</TableCell>
											<TableCell className="text-right tabular-nums">
												{inventoryData.aggregateSettings.minimum.toLocaleString()}
											</TableCell>
											<TableCell className="text-right tabular-nums">
												{inventoryData.aggregateSettings.maximum.toLocaleString()}
											</TableCell>
											<TableCell className="text-right tabular-nums">
												{inventoryData.aggregateSettings.reorderPoint.toLocaleString()}
											</TableCell>
											<TableCell className="text-right tabular-nums">
												{inventoryData.aggregateSettings.parLevel.toLocaleString()}
											</TableCell>
											<TableCell />
										</TableRow>
									</TableBody>
								</Table>
							</CardContent>
						</Card>

						{/* Legend */}
						<Card>
							<CardContent className="p-4">
								<div className="flex items-start space-x-2">
									<AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
									<div>
										<h4 className="font-medium">Status Indicators</h4>
										<div className="mt-2 grid grid-cols-2 gap-4">
											<div className="flex items-center text-sm">
												<div className="w-2 h-2 bg-destructive rounded-full mr-2" />
												<span className="text-muted-foreground">Below Minimum Level</span>
											</div>
											<div className="flex items-center text-sm">
												<div className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
												<span className="text-muted-foreground">Reorder Point Reached</span>
											</div>
											<div className="flex items-center text-sm">
												<div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
												<span className="text-muted-foreground">Exceeds Maximum Level</span>
											</div>
											<div className="flex items-center text-sm">
												<div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
												<span className="text-muted-foreground">Normal Stock Level</span>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
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
			<div className="mt-4 space-x-2">
				<Button onClick={saveConversions}>Save Conversions</Button>
				<Button variant="secondary" asChild>
					<Link href="/product-management/products">Back to Product List</Link>
				</Button>
			</div>
		</>
	);

	const details = (
		<>
			<div>
				<label className="text-muted-foreground">Description</label>
				<p className="mt-1">{product?.description}</p>
			</div>
			<div>
				<label className="text-muted-foreground">Local Description</label>
				<p className="mt-1">{product?.localDescription}</p>
			</div>
			<div>
				<label className="text-muted-foreground">Category</label>
				<p className="mt-1">{product?.categoryName} / {product?.subCategoryName}</p>
			</div>
			<div>
				<label className="text-muted-foreground">Item Group</label>
				<p className="mt-1">{product?.itemGroupName}</p>
			</div>
			<div>
				<label className="text-muted-foreground">Primary Inventory Unit</label>
				<span className="text-sm font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded mt-1 inline-block">
					{inventoryUnits.find(unit => unit.id === product?.primaryInventoryUnitId)?.code || product?.primaryInventoryUnitId}
				</span>
			</div>
			<div className="flex items-center space-x-2">
				<label className="text-muted-foreground">Use for Ingredients</label>
				<Checkbox checked={product?.isIngredient} disabled />
			</div>
		</>
	);


	const editableDetails = editedProduct && (
		<>
			<div>
				<label className="text-muted-foreground">Description</label>
				<Textarea
					className="mt-1"
					value={editedProduct.description}
					onChange={(e) => handleInputChange('description', e.target.value)}
				/>
			</div>
			<div>
				<label className="text-muted-foreground">Local Description</label>
				<Textarea
					className="mt-1"
					value={editedProduct.localDescription}
					onChange={(e) => handleInputChange('localDescription', e.target.value)}
				/>
			</div>
			<div>
				<label className="text-muted-foreground">Category</label>
				<div className="grid grid-cols-2 gap-2 mt-1">
					<Input
						value={editedProduct.categoryName}
						onChange={(e) => handleInputChange('categoryName', e.target.value)}
					/>
					<Input
						value={editedProduct.subCategoryName}
						onChange={(e) => handleInputChange('subCategoryName', e.target.value)}
					/>
				</div>
			</div>
			<div>
				<label className="text-muted-foreground">Item Group</label>
				<Input
					className="mt-1"
					value={editedProduct.itemGroupName}
					onChange={(e) => handleInputChange('itemGroupName', e.target.value)}
				/>
			</div>
			<div>
				<label className="text-muted-foreground">Primary Inventory Unit</label>
				<Select
					value={editedProduct.primaryInventoryUnitId}
					onValueChange={(value) => handleInputChange('primaryInventoryUnitId', value)}
				>
					<SelectTrigger className="mt-1">
						<SelectValue placeholder="Select unit">
							{inventoryUnits.find(unit => unit.id === editedProduct.primaryInventoryUnitId)?.code}
						</SelectValue>
					</SelectTrigger>
					<SelectContent>
						{inventoryUnits.map((unit) => (
							<SelectItem key={unit.id} value={unit.id}>
								{unit.name} ({unit.code})
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="flex items-center space-x-2">
				<label className="text-muted-foreground">Use for Ingredients</label>
				<Checkbox
					checked={editedProduct.isIngredient}
					onCheckedChange={(checked) => handleInputChange('isIngredient', checked)}
				/>
			</div>
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
												ข้าวหอมะลิอินทรีย์
											</div>
											{status}
										</div>

									</div>
									<div className="flex items-center gap-2">
										{actionButtons}
									</div>
								</div>
								{isEditing ? editableDetails : details && (
									<div className="grid grid-cols-3 gap-4 text-sm border-t pt-6">
										{details}
									</div>
								)}
							</div>
						</CardContent>
					</Card>
				</div>
				<div className="p-6 -mt-6">
					{content}
				</div>
			</div>
		</div>
	)
}

export default ProductIdPage