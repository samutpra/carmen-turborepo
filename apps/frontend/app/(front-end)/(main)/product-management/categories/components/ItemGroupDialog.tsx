import { useAuth } from '@/app/context/AuthContext';
import {
	ProductItemGroupType,
	productItemGroupSchema,
} from '@carmensoftware/shared-types';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { formType } from '@/types/form_type';
import { submitItemGroup } from '../actions/item_group';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { LoaderButton } from '@/components/ui-custom/button/LoaderButton';

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	mode: formType;
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
	const [isLoading, setIsLoading] = useState(false);
	const defaultValues: ProductItemGroupType = {
		id: '',
		code: '',
		name: '',
		description: '',
		is_active: true,
		product_subcategory_id: subcategory_id,
	};

	const form = useForm<ProductItemGroupType>({
		resolver: zodResolver(productItemGroupSchema),
		defaultValues: mode === formType.EDIT && itemGroup ? { ...itemGroup } : defaultValues,
	});

	useEffect(() => {
		if (mode === formType.EDIT && itemGroup) {
			form.reset(itemGroup);
		} else {
			form.reset(defaultValues);
		}
	}, [itemGroup, mode, form]);

	const handleSubmit = async (values: ProductItemGroupType) => {
		setIsLoading(true);
		const payload = {
			...values,
			product_subcategory_id: subcategory_id,
		};

		try {
			const response = await submitItemGroup(token, payload, mode, values.id);
			if (!response) {
				toastError({ message: `Failed to ${mode} item group` });
			}

			if (mode === formType.ADD) {
				const newItemGroup = {
					...payload,
					id: response.id,
				};
				setItemGroup((prev: ProductItemGroupType[]) => [...prev, newItemGroup]);
				toastSuccess({ message: 'Item group added successfully' });
			} else {
				setItemGroup((prev) =>
					prev.map((itemGroup) =>
						itemGroup.id === values.id
							? { ...payload, id: itemGroup.id }
							: itemGroup
					)
				);
				toastSuccess({ message: 'Item group updated successfully' });
			}
			handleClose();
		} catch (error) {
			console.error('Error submitting form:', error);
			toastError({ message: 'Failed to submit form' });
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
							<LoaderButton type="submit" disabled={isLoading}>
								{isLoading
									? 'Processing...'
									: mode === formType.ADD
										? 'Add Category'
										: 'Save Changes'}
							</LoaderButton>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default ItemGroupDialog;
