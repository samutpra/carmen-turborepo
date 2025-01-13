'use client';

import React, { useEffect, useState } from 'react';
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
import { useAuth } from '@/app/context/AuthContext';
import {
	subCategorySchema,
	SubCategoryType,
} from '@carmensoftware/shared-types';
import { formType } from '@/types/form_type';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { submitSubCategory } from '../actions/sub_category';
import { LoaderButton } from '@/components/ui-custom/button/LoaderButton';

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	mode: formType;
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
	const [isLoading, setIsLoading] = useState(false);

	const formValues: SubCategoryType = {
		id: '',
		name: '',
		description: '',
		is_active: true,
		product_category_id: product_category_id,
	};

	const form = useForm<SubCategoryType>({
		resolver: zodResolver(subCategorySchema),
		defaultValues: mode === formType.EDIT && subCategory ? { ...subCategory } : formValues,
	});

	useEffect(() => {
		if (mode === formType.EDIT && subCategory) {
			form.reset({ ...subCategory });
		} else {
			form.reset({ ...formValues });
		}
	}, [subCategory, mode]);

	const handleSubmit = async (values: SubCategoryType) => {
		setIsLoading(true);
		const payload = {
			...values,
			product_category_id: product_category_id,
		};

		try {
			const response = await submitSubCategory(payload, token, mode, subCategory?.id || '');

			if (!response) {
				toastError({ message: `Failed to ${mode} sub-category` });
			}

			if (mode === formType.ADD) {
				const newSubCategory = {
					...payload,
					id: response.id,
				};
				setSubProducts((prev: SubCategoryType[]) => [...prev, newSubCategory]);
				toastSuccess({ message: 'Sub-category added successfully' });
			} else {
				setSubProducts((prev) =>
					prev.map((subProduct) =>
						subProduct.id === values.id
							? { ...payload, id: subProduct.id }
							: subProduct
					)
				);
				toastSuccess({ message: 'Sub-category updated successfully' });
			}

			handleClose();
		} catch (error) {
			console.error(`Error ${mode}ing sub-category:`, error);
			toastError({ message: `Failed to ${mode} sub-category` });
		} finally {
			setIsLoading(false);
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
							<LoaderButton
								type="submit"
								disabled={isLoading}
								isLoading={isLoading}
							>
								{isLoading
									? 'Saving...'
									: mode === formType.EDIT
										? 'Save Changes'
										: 'Add'}
							</LoaderButton>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default SubCatDialog;
