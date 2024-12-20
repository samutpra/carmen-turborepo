'use client';

import React, { useState } from 'react';
import { LocationType, LocationSchema } from '@carmensoftware/shared-types';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui-custom/FormCustom';
import { useAuth } from '@/app/context/AuthContext';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { PencilIcon, PlusIcon } from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { InputCustom } from '@/components/ui-custom/InputCustom';
import { LoaderButton } from '@/components/ui-custom/button/LoaderButton';

interface StoreLocationDialogProps {
	mode: 'create' | 'edit';
	defaultValues?: LocationType;
	onSuccess: (values: LocationType) => void;
}

const StoreLocationDialog: React.FC<StoreLocationDialogProps> = ({
	mode,
	defaultValues,
	onSuccess,
}) => {
	const [open, setOpen] = useState(false);
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [isLoading, setIsLoading] = useState(false);
	const form = useForm<LocationType>({
		resolver: zodResolver(LocationSchema),
		defaultValues: {
			name: defaultValues?.name || '',
			location_type: defaultValues?.location_type || 'inventory',
			description: defaultValues?.description || '',
			is_active: defaultValues?.is_active ?? true,
			delivery_point_id: defaultValues?.delivery_point_id || null,
		},
	});

	const onSubmit = async (values: LocationType) => {
		setIsLoading(true);
		try {
			const url = defaultValues?.id
				? `/api/configuration/locations/${defaultValues.id}`
				: '/api/configuration/locations';

			const method = mode === 'create' ? 'POST' : 'PATCH';

			const response = await fetch(url, {
				method,
				headers: {
					Authorization: `Bearer ${token}`,
					'x-tenant-id': tenantId,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});

			if (!response.ok) {
				throw new Error(`Failed to ${mode} Store location`);
			}

			const result = await response.json();

			const data: LocationType = {
				id: mode === 'create' ? result.id : defaultValues?.id || result.id,
				...values,
			};
			onSuccess(data);
			setOpen(false);
			toast.success(
				`Store location ${defaultValues?.id ? 'updated' : 'created'} successfully`
			);
		} catch (error) {
			console.error('Error saving store location:', error);
			toast.error('Failed to save store location', {
				description:
					error instanceof Error ? error.message : 'An error occurred',
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleClose = () => {
		setOpen(false);
		form.reset();
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant={mode === 'create' ? 'default' : 'ghost'}
					size={mode === 'create' ? 'default' : 'sm'}
				>
					{mode === 'create' ? (
						<>
							<PlusIcon className="mr-2 h-4 w-4" />
							Add Store Location
						</>
					) : (
						<PencilIcon className="w-4 h-4" />
					)}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{mode === 'create' ? 'Create' : 'Edit'} Store Location
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<InputCustom
											placeholder="Enter delivery point name"
											error={!!form.formState.errors.name}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
							required
						/>
						<FormField
							control={form.control}
							name="location_type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Type</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger className="h-8">
											<SelectValue placeholder="Select type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="inventory">Inventory</SelectItem>
											<SelectItem value="direct">Direct</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
							required
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
									<FormMessage />
								</FormItem>
							)}
							required
						/>
						<FormField
							control={form.control}
							name="is_active"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-2">
									<div className="space-y-0.5">
										<FormLabel className="text-base">Active</FormLabel>
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
							<div className="flex items-center justify-end gap-2">
								<Button type="button" variant="outline" onClick={handleClose}>
									Cancel
								</Button>
								<LoaderButton
									type="submit"
									disabled={isLoading}
									isLoading={isLoading}
								>
									{isLoading
										? 'Saving...'
										: mode === 'edit'
											? 'Save Changes'
											: 'Add'}
								</LoaderButton>
							</div>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default StoreLocationDialog;
