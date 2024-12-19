'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui-custom/FormCustom';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
	deliveryPointSchema,
	DeliveryPointType,
} from '@carmensoftware/shared-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { PencilIcon, PlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/app/context/AuthContext';
import { toast } from 'sonner';
import { CustomButton } from '@/components/ui-custom/CustomButton';

export type DialogMode = 'create' | 'edit';

export interface DeliveryPointDialogProps {
	mode: DialogMode;
	defaultValues?: DeliveryPointType;
	onSuccess: (point: DeliveryPointType) => void;
}

export const DeliveryPointDialog = ({
	mode,
	defaultValues,
	onSuccess,
}: DeliveryPointDialogProps) => {
	const [open, setOpen] = useState(false);
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';

	const form = useForm<DeliveryPointType>({
		resolver: zodResolver(deliveryPointSchema),
		defaultValues: {
			name: defaultValues?.name || '',
			is_active: defaultValues?.is_active ?? true,
		},
	});

	const handleSubmit = async (data: DeliveryPointType) => {
		try {
			const url =
				mode === 'create'
					? '/api/configuration/delivery-point'
					: `/api/configuration/delivery-point/${defaultValues?.id}`;

			const method = mode === 'create' ? 'POST' : 'PATCH';

			const response = await fetch(url, {
				method,
				headers: {
					Authorization: `Bearer ${token}`,
					'x-tenant-id': tenantId,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error(`Failed to ${mode} delivery point`);
			}

			const result = await response.json();
			const updatedPoint: DeliveryPointType = {
				id: mode === 'create' ? result.id : defaultValues?.id || result.id,
				...data,
			};

			onSuccess(updatedPoint);
			setOpen(false);
			form.reset();

			toast.success(`Delivery point ${mode} successfully`);
		} catch (err) {
			console.error(`Error ${mode}ing delivery point:`, err);
			toast.error(`Failed to ${mode} delivery point`, {
				description: err instanceof Error ? err.message : 'An error occurred',
			});
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{mode === 'create' ? (
					<Button className="gap-2">
						<PlusIcon className="w-4 h-4" />
						Create Delivery Point
					</Button>
				) : (
					<CustomButton variant="ghost" size="sm">
						<PencilIcon className="w-4 h-4" />
					</CustomButton>
				)}
			</DialogTrigger>
			<DialogContent className="w-full md:w-[500px] rounded-lg">
				<DialogHeader>
					<DialogTitle>
						{mode === 'create'
							? 'Create New Delivery Point'
							: 'Edit Delivery Point'}
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Enter delivery point name" {...field} />
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
								<FormItem className="flex items-center justify-between">
									<FormLabel>Active Status</FormLabel>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<div className="flex justify-end gap-2">
							<Button
								type="button"
								variant="outline"
								onClick={() => {
									setOpen(false);
									form.reset();
								}}
							>
								Cancel
							</Button>
							<Button type="submit">
								{mode === 'create' ? 'Create' : 'Save Changes'}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
