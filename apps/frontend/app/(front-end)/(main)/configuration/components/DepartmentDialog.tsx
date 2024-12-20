'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import {
	DepartmentSchema,
	DepartmentType,
} from '@carmensoftware/shared-types/src/department';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui-custom/FormCustom';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PencilIcon, PlusIcon } from 'lucide-react';
import { InputCustom } from '@/components/ui-custom/InputCustom';
import { Switch } from '@/components/ui/switch';
import { LoaderButton } from '@/components/ui-custom/button/LoaderButton';
import { Textarea } from '@/components/ui/textarea';
export type DepartmentDialogMode = 'create' | 'edit';

export interface DepartmentDialogProps {
	mode: DepartmentDialogMode;
	defaultValues?: DepartmentType;
	onSuccess: (department: DepartmentType) => void;
}

const DepartmentDialog: React.FC<DepartmentDialogProps> = ({
	mode,
	defaultValues,
	onSuccess,
}) => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<DepartmentType>({
		resolver: zodResolver(DepartmentSchema),
		defaultValues: {
			name: defaultValues?.name || '',
			description: defaultValues?.description || '',
			is_active: defaultValues?.is_active ?? true,
		},
	});

	const onSubmit = async (data: DepartmentType) => {
		setIsLoading(true);
		try {
			const url =
				mode === 'create'
					? '/api/configuration/department'
					: `/api/configuration/department/${defaultValues?.id}`;
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
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.message || `Failed to ${mode} Department`);
			}

			const result = await response.json();
			const values: DepartmentType = {
				id: mode === 'create' ? result.id : defaultValues?.id || result.id,
				...data,
			};
			onSuccess(values);
			setOpen(false);
			form.reset();
			toast.success(
				`Department ${mode === 'create' ? 'created' : 'updated'} successfully`
			);
		} catch (error) {
			console.error('Error submitting department:', error);
			toast.error(`Failed to ${mode} Department`, {
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
							Add Department
						</>
					) : (
						<PencilIcon className="w-4 h-4" />
					)}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{mode === 'create' ? 'Create' : 'Edit'} Department
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
										<Textarea placeholder="Enter description"
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

export default DepartmentDialog;
