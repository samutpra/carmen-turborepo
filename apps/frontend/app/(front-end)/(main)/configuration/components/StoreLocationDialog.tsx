'use client';

import React from 'react';
import { LocationType } from '@carmensoftware/shared-types';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useAuth } from '@/app/context/AuthContext';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { PlusCircle, Settings2 } from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	location_type: z.enum(['inventory', 'direct']),
	description: z.string().min(1, 'Description is required'),
	is_active: z.boolean().default(true),
	delivery_point_id: z.string().optional().nullable(),
});

interface StoreLocationDialogProps {
	mode: 'create' | 'edit';
	defaultValues?: LocationType;
	onSuccess: (values: LocationType) => void;
}

export const StoreLocationDialog = ({
	mode,
	defaultValues,
	onSuccess,
}: StoreLocationDialogProps) => {
	const [open, setOpen] = React.useState(false);
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: defaultValues?.name || '',
			location_type: defaultValues?.location_type || 'inventory',
			description: defaultValues?.description || '',
			is_active: defaultValues?.is_active ?? true,
			delivery_point_id: defaultValues?.delivery_point_id || null,
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const url = defaultValues?.id
				? `/api/configuration/store-location/${defaultValues.id}`
				: '/api/configuration/store-location';

			const response = await fetch(url, {
				method: defaultValues?.id ? 'PUT' : 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					'x-tenant-id': tenantId,
				},
				body: JSON.stringify(values),
			});

			if (!response.ok) {
				throw new Error('Failed to save store location');
			}

			const result = await response.json();
			onSuccess(result.data);
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
		}
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
							<PlusCircle className="mr-2 h-4 w-4" />
							Add Store Location
						</>
					) : (
						<Settings2 className="h-4 w-4" />
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
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
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
										<SelectTrigger>
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
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="is_active"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
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
							<Button type="submit">
								{mode === 'create' ? 'Create' : 'Update'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
