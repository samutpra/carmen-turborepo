'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { categorySchema, CategoryType } from '@carmensoftware/shared-types/dist/productCategorySchema';
import { formType } from '@/types/form_type';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { LoaderButton } from '@/components/ui-custom/button/LoaderButton';

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (data: CategoryType) => Promise<void>;
	initialData?: CategoryType;
	mode: formType;
}

const CategoryDialog: React.FC<Props> = ({
	open,
	onOpenChange,
	onSubmit,
	initialData,
	mode,
}) => {
	const [isLoading, setIsLoading] = useState(false);

	const defaultValues: CategoryType = {
		name: '',
		description: '',
		is_active: true,
	};

	const form = useForm<CategoryType>({
		resolver: zodResolver(categorySchema),
		defaultValues: mode === formType.EDIT && initialData ? initialData : defaultValues,
	});

	useEffect(() => {
		if (mode === formType.EDIT && initialData) {
			form.reset(initialData);
		} else {
			form.reset(defaultValues);
		}
	}, [initialData, mode, form]);

	const handleSubmit = async (data: CategoryType) => {
		setIsLoading(true);
		try {
			await onSubmit(data);
			onOpenChange(false);
		} catch (error) {
			console.error('Error submitting form:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{mode === formType.ADD ? 'Add New Category' : 'Edit Category'}
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Category name" {...field} />
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
										<Textarea placeholder="Category description" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="is_active"
							render={({ field }) => (
								<FormItem className="flex items-center space-x-2">
									<FormControl>
										<Switch checked={field.value} onCheckedChange={field.onChange} />
									</FormControl>
									<FormLabel>Active</FormLabel>
								</FormItem>
							)}
						/>
						<div className="flex justify-end space-x-2">
							<Button variant="outline" onClick={() => onOpenChange(false)}>
								Cancel
							</Button>
							<LoaderButton type="submit" disabled={isLoading}>
								{isLoading
									? 'Processing...'
									: mode === formType.ADD
										? 'Add Category'
										: 'Save Changes'}
							</LoaderButton>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default CategoryDialog;
