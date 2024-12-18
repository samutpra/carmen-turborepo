'use client';

import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { useAuth } from '@/app/context/AuthContext';
import {
	subCategorySchema,
	SubCategoryType,
} from '@carmensoftware/shared-types';

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	mode: 'add' | 'edit';
	product_category_id: string;
	product_category_name?: string;
	setSubProducts: React.Dispatch<React.SetStateAction<SubCategoryType[]>>;
	subCategory?: SubCategoryType | null;
}

const SubCatDialog: React.FC<Props> = ({
	open,
	product_category_id,
	product_category_name,
	mode,
	onOpenChange,
	setSubProducts,
	subCategory,
}) => {
	const { accessToken } = useAuth();
	const token = accessToken || '';

	const form = useForm<SubCategoryType>({
		resolver: zodResolver(subCategorySchema),
		defaultValues: {
			id: '',
			name: '',
			description: '',
			is_active: true,
			product_category_id: product_category_id,
		},
	});

	useEffect(() => {
		if (open && mode === 'edit' && subCategory) {
			form.reset({
				id: subCategory.id,
				name: subCategory.name,
				description: subCategory.description,
				is_active: subCategory.is_active,
				product_category_id: product_category_id,
			});
		} else {
			form.reset({
				id: '',
				name: '',
				description: '',
				is_active: true,
				product_category_id: product_category_id,
			});
		}
	}, [open, mode, subCategory, product_category_id]);

	const handleSubmit = async (values: SubCategoryType) => {
		const payload = {
			...values,
			product_category_id: product_category_id,
		};
		try {
			const method = mode === 'add' ? 'POST' : 'PATCH';
			const url =
				mode === 'add'
					? '/api/product-management/category/product-sub-category'
					: `/api/product-management/category/product-sub-category/${values.id}`;

			const response = await fetch(url, {
				method,
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				toast.error(`Failed to ${mode} sub-category`);
			}

			const result = await response.json();

			console.log('result', result);

			if (mode === 'add') {
				const newSubCategory = {
					...payload,
					id: result.id,
				};
				setSubProducts((prev: SubCategoryType[]) => [...prev, newSubCategory]);
				toast.success('Sub-category added successfully');
			} else {
				setSubProducts((prev) =>
					prev.map((subProduct) =>
						subProduct.id === values.id
							? { ...payload, id: subProduct.id }
							: subProduct
					)
				);
				toast.success('Sub-category updated successfully');
			}

			handleClose();
		} catch (error) {
			console.error(`Error ${mode}ing sub-category:`, error);
			toast.error(
				error instanceof Error ? error.message : 'Internal Server Error',
				{
					className: 'bg-red-500 text-white border-none',
					duration: 3000,
				}
			);
		}
	};

	const handleClose = () => {
		form.reset();
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{mode === 'add' ? 'Add New Sub Category' : 'Edit Sub Category'}
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-4"
					>
						<Input
							placeholder="Enter name"
							defaultValue={product_category_name}
							disabled
						/>

						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Enter name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Enter description"
											className="resize-none"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="is_active"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
									<div className="space-y-0.5">
										<FormLabel>Active Status</FormLabel>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button
								type="button"
								variant="outline"
								onClick={handleClose}
								className="mr-2"
							>
								Cancel
							</Button>
							<Button type="submit">
								{mode === 'add' ? 'Create' : 'Update'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default SubCatDialog;
