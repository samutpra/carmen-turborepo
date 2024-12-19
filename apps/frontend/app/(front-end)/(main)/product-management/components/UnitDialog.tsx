'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/app/context/AuthContext';
import { UnitSchema } from '@carmensoftware/shared-types';
import { UnitType } from '@carmensoftware/shared-types';
import { toast } from 'sonner';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui-custom/FormCustom';
import { Switch } from '@/components/ui/switch';
import { PencilIcon, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { InputCustom } from '@/components/ui-custom/InputCustom';
import { LoaderButton } from '@/components/ui-custom/button/LoaderButton';

interface UnitDialogProps {
	mode: 'create' | 'edit';
	defaultValues?: UnitType;
	onSuccess: (values: UnitType) => void;
}

const UnitDialog: React.FC<UnitDialogProps> = ({
	mode,
	defaultValues,
	onSuccess,
}) => {
	const [open, setOpen] = useState(false);
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<UnitType>({
		resolver: zodResolver(UnitSchema),
		defaultValues: {
			name: defaultValues?.name || '',
			description: defaultValues?.description || '',
			is_active: defaultValues?.is_active || true,
		},
	});

	const onSubmit = async (values: UnitType) => {
		setIsLoading(true);
		try {
			const url = defaultValues?.id
				? `/api/product-management/unit/${defaultValues.id}`
				: '/api/product-management/unit';

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
				throw new Error(`Failed to ${mode} unit`);
			}

			const result = await response.json();

			const data: UnitType = {
				id: mode === 'create' ? result.id : defaultValues?.id || result.id,
				...values,
			};
			onSuccess(data);
			setOpen(false);
			toast.success(
				`Unit ${defaultValues?.id ? 'updated' : 'created'} successfully`
			);
		} catch (error) {
			console.error('Error saving unit:', error);
			toast.error('Failed to save unit', {
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
							Add Unit
						</>
					) : (
						<PencilIcon className="w-4 h-4" />
					)}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{mode === 'create' ? 'Create' : 'Edit'} Unit
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
											placeholder="Enter Name"
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
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<InputCustom
											placeholder="Enter Description"
											error={!!form.formState.errors.description}
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
							name="is_active"
							render={({ field }) => (
								<FormItem className="flex items-center space-x-2">
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormLabel>Active</FormLabel>
									<FormMessage />
								</FormItem>
							)}
							required
						/>
						<DialogFooter>
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
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default UnitDialog;
