import { useAuth } from '@/app/context/AuthContext';
import {
	ProductItemGroupType,
	productItemGroupSchema,
} from '@carmensoftware/shared-types';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
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
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	mode: 'add' | 'edit';
	subcategory_id: string;
	subcategory_name?: string;
	setItemGroup: React.Dispatch<React.SetStateAction<ProductItemGroupType[]>>;
	itemGroup?: ProductItemGroupType | null;
}
const ItemGroupDialog: React.FC<Props> = ({
	open,
	mode,
	subcategory_id,
	subcategory_name,
	setItemGroup,
	itemGroup,
	onOpenChange,
}) => {
	const { accessToken } = useAuth();
	const token = accessToken || '';

	const form = useForm<ProductItemGroupType>({
		resolver: zodResolver(productItemGroupSchema),
		defaultValues: {
			id: '',
			code: '',
			name: '',
			description: '',
			is_active: true,
			product_subcategory_id: subcategory_id,
		},
	});

	useEffect(() => {
		if (open && mode === 'edit' && itemGroup) {
			form.reset({
				id: itemGroup.id,
				code: itemGroup.code,
				name: itemGroup.name,
				description: itemGroup.description,
				is_active: itemGroup.is_active,
				product_subcategory_id: subcategory_id,
			});
		} else {
			form.reset({
				id: '',
				code: '',
				name: '',
				description: '',
				is_active: true,
				product_subcategory_id: subcategory_id,
			});
		}
	}, [open, mode, itemGroup, subcategory_id]);

	const handleSubmit = async (values: ProductItemGroupType) => {
		const payload = {
			...values,
			product_subcategory_id: subcategory_id,
		};

		try {
			const method = mode === 'add' ? 'POST' : 'PATCH';
			const url =
				mode === 'add'
					? '/api/product-management/category/product-item-group'
					: `/api/product-management/category/product-item-group/${values.id}`;

			const response = await fetch(url, {
				method,
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				toast.error(`Failed to ${mode} item group`, {
					className: 'bg-red-500 text-white border-none',
					duration: 3000,
				});
			}

			const result = await response.json();
			if (mode === 'add') {
				const newItemGroup = {
					...payload,
					id: result.id,
				};
				setItemGroup((prev: ProductItemGroupType[]) => [...prev, newItemGroup]);
				toast.success('Item group added successfully');
			} else {
				setItemGroup((prev) =>
					prev.map((itemGroup) =>
						itemGroup.id === values.id
							? { ...payload, id: itemGroup.id }
							: itemGroup
					)
				);
				toast.success('Item group updated successfully');
			}
			handleClose();
		} catch (error) {
			console.error('Error submitting form:', error);
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
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{mode === 'add' ? 'Add New Item Group' : 'Edit Item Group'}
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-4"
					>
						<Input
							placeholder="Enter name"
							defaultValue={subcategory_name}
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
							name="code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Code</FormLabel>
									<FormControl>
										<Input placeholder="Enter code" {...field} />
									</FormControl>
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
										<Textarea placeholder="Enter description" {...field} />
									</FormControl>
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

export default ItemGroupDialog;
