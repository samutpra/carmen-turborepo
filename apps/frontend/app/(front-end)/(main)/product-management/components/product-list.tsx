'use client';

import { Link, useRouter } from '@/lib/i18n';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IProduct } from '@/types/Product';
import { Input } from '@/components/ui/input';
import ListPageTemplate from '@/components/templates/ListPageTemplate';

export default function ProductList(): JSX.Element {
	const router = useRouter();
	const [products, setProducts] = useState<IProduct[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const pageSize = 10;

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		setCurrentPage(1); // Reset to first page when search query changes
	};

	const handleAddProduct = () => {
		router.push('/product-management/products/new');
	};

	const handleBulkUpdate = () => {
		router.push('/product-management/products/bulk-update');
	};

	const handleGenerateReport = () => {
		router.push('/product-management/reports/products');
	};

	useEffect(() => {
		async function fetchProducts() {
			try {
				const response = await fetch(`/api/v1/products?page=${currentPage}&pageSize=${pageSize}&search=${searchQuery}`);
				if (!response.ok) {
					throw new Error('Failed to fetch products');
				}
				const data = await response.json();

				// const data = mock_productList;

				setProducts(data.data);
				setTotalPages(Math.ceil(data.total / pageSize));
			} catch (err) {
				setError('Error fetching products');
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		}

		fetchProducts();
	}, [currentPage, searchQuery]);

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	const actionButtons = (
		<>
			<Button onClick={handleAddProduct}>Add Product</Button>
			<Button variant='secondary' onClick={handleBulkUpdate}>
				Bulk Update
			</Button>
			<Button variant='outline' onClick={handleGenerateReport}>
				Generate Report
			</Button>
		</>
	);

	const content = (
		<>
			<div className='mb-4'>
				<Input type='text' placeholder='Search products...' value={searchQuery} onChange={handleSearchChange} />
			</div>
			{products.length > 0 ? (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Code</TableHead>
							<TableHead>Category</TableHead>
							<TableHead>Subcategory</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Currency</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{products.map((product) => (
							<TableRow key={product.id}>
								<TableCell>{product.name}</TableCell>
								<TableCell>{product.productCode}</TableCell>
								<TableCell>{product.categoryId}</TableCell>
								<TableCell>{product.subCategoryId}</TableCell>
								<TableCell>{product.basePrice.toFixed(2)}</TableCell>
								<TableCell>{product.currency}</TableCell>
								<TableCell>
									<Badge variant={product.isActive ? 'default' : 'destructive'}>
										{product.isActive ? 'Active' : 'Inactive'}
									</Badge>
								</TableCell>
								<TableCell>
									<Button variant='link' asChild>
										<Link href={`/product-management/products/${product.id}`}>View</Link>
									</Button>
									<Button variant='link' asChild>
										<Link href={`/product-management/products/${product.id}/edit`}>Edit</Link>
									</Button>
									<Button
										variant='link'
										onClick={() => alert(`Delete functionality will be implemented in the detail page`)}>
										Delete
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			) : (
				<div className='text-center py-10'>
					<p className='text-xl mb-4'>No products found</p>
					<Button onClick={handleAddProduct}>Add Your First Product</Button>
				</div>
			)}
			{products.length > 0 && (
				<div className='mt-4 flex justify-end items-center'>
					<div className='space-x-2'>
						{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
							<Button
								key={page}
								variant={currentPage === page ? 'default' : 'outline'}
								onClick={() => handlePageChange(page)}>
								{page}
							</Button>
						))}
					</div>
				</div>
			)}
		</>
	);

	return <ListPageTemplate title='Product List' actionButtons={actionButtons} content={content} />;
}
