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
import { toastError } from '@/components/ui-custom/Toast';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from '@/lib/i18n';

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
			'x-tenant-id': 'DUMMY',
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

		return data.data; // Return the fetched data

	} catch (err: unknown) {
		console.log('err >>>', err);
		return err as string; // Return the error message
	}
};

const ProductDetail = ({ params }: { params: { id: string } }) => {
	const { accessToken } = useAuth();
	const token = accessToken || '';

	console.log('token front end >>>', token);


	const [product, setProduct] = useState<ProductInfo | null>(null); // Use the defined type
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const loadProduct = async () => {
			setLoading(true); // Set loading to true before fetching
			try {
				const data = await fetchProduct(params.id, token); // Fetch product data

				console.log('data >>>', data);
				setProduct(data); // Set product state with fetched data
			} catch (err: unknown) {
				setError(err as string); // Set error state if fetching fails
				toastError({ message: 'Failed to fetch product data' });
				router.push('/product-management/products');
			} finally {
				setLoading(false); // Set loading to false after fetching

			}
		};

		loadProduct();
	}, [params.id, token]);

	console.log('product >>>', product);


	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleCancel = () => {
		setIsEditing(false);
	};

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
			<h1>{product?.data.name}</h1>
			<p>Code: {product?.data.code}</p>
			<p>Description: {product?.data.description}</p>
			<p>Price: ${product?.data.tb_product_info?.price}</p>
			<p>Item Group: {product?.item_group_name}</p>
			<p>Subcategory: {product?.sub_category_name}</p>
			<p>Category: {product?.category_name}</p>
			<p>Brand: {product?.data.tb_product_info?.info.brand}</p>
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
