'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { CurrencySchema, CurrencyType } from '@carmensoftware/shared-types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { CustomButton } from '@/components/ui-custom/CustomButton';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui-custom/FormCustom';
import { Switch } from '@/components/ui/switch';
import { LoaderButton } from '@/components/ui-custom/button/LoaderButton';
import { InputCustom } from '@/components/ui-custom/InputCustom';
import { Textarea } from '@/components/ui/textarea';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { submitCurrency } from '../api/currency';

export type CurrencyDialogMode = 'create' | 'update';

export interface CurrencyDialogProps {
	mode: CurrencyDialogMode;
	defaultValues?: CurrencyType;
	onSuccess: (currency: CurrencyType) => void;
}

const CurrencyDialog: React.FC<CurrencyDialogProps> = ({
	mode,
	defaultValues,
	onSuccess,
}) => {
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';

	const form = useForm<CurrencyType>({
		resolver: zodResolver(CurrencySchema),
		defaultValues: {
			code: defaultValues?.code || '',
			name: defaultValues?.name || '',
			symbol: defaultValues?.symbol || '',
			description: defaultValues?.description || '',
			rate: defaultValues?.rate || '',
			is_active: defaultValues?.is_active ?? true,
		},
		mode: 'onChange',
	});

	// const onSubmit = async (data: CurrencyType) => {
	// 	setIsLoading(true);
	// 	try {
	// 		const url =
	// 			mode === 'create'
	// 				? '/api/configuration/currency'
	// 				: `/api/configuration/currency/${defaultValues?.id}`;

	// 		const method = mode === 'create' ? 'POST' : 'PATCH';
	// 		const response = await fetch(url, {
	// 			method,
	// 			headers: {
	// 				Authorization: `Bearer ${token}`,
	// 				'x-tenant-id': tenantId,
	// 				'Content-Type': 'application/json',
	// 			},
	// 			body: JSON.stringify(data),
	// 		});

	// 		if (!response.ok) {
	// 			const errorData = await response.json().catch(() => ({}));
	// 			throw new Error(errorData.message || `Failed to ${mode} Currency`);
	// 		}

	// 		const result = await response.json();
	// 		const values: CurrencyType = {
	// 			id: mode === 'create' ? result.id : defaultValues?.id || result.id,
	// 			...data,
	// 		};
	// 		onSuccess(values);
	// 		setOpen(false);
	// 		form.reset();

	// 		toastSuccess({ message: `Currency ${mode === 'create' ? 'created' : 'updated'} successfully` });
	// 	} catch (err) {
	// 		console.error(`Error ${mode}ing Currency:`, err);
	// 		toastError({ message: `Failed to ${mode} Currency` });
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// };

	const onSubmit = async (data: CurrencyType) => {
		setIsLoading(true);
		try {
			const result = await submitCurrency(data, mode, token, tenantId, defaultValues);

			const values: CurrencyType = {
				id: mode === 'create' ? result.id : defaultValues?.id || result.id,
				...data,
			};
			onSuccess(values);
			setOpen(false);
			form.reset();

			toastSuccess({ message: `Currency ${mode === 'create' ? 'created' : 'updated'} successfully` });
		} catch (err) {
			console.error(`Error ${mode}ing Currency:`, err);
			toastError({ message: `Failed to ${mode} Currency` });
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
				{mode === 'create' ? (
					<Button className="gap-2">
						<PlusIcon className="w-4 h-4" />
						Create Currency
					</Button>
				) : (
					<CustomButton variant="ghost" size="sm">
						<PencilIcon className="w-4 h-4" />
					</CustomButton>
				)}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{mode === 'create' ? 'Create New Currency' : 'Edit Currency'}
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="code"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Code</FormLabel>
										<FormControl>
											<InputCustom
												placeholder="Enter Code name"
												error={!!form.formState.errors.code}
												{...field}
												maxLength={3}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
								required
							/>

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
						</div>

						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="symbol"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Symbol</FormLabel>
										<FormControl>
											<InputCustom
												placeholder="Enter Symbol"
												error={!!form.formState.errors.symbol}
												{...field}
												maxLength={3}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
								required
							/>

							<FormField
								control={form.control}
								name="rate"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Rate</FormLabel>
										<FormControl>
											<InputCustom
												placeholder="Enter Rate"
												error={!!form.formState.errors.rate}
												{...field}
												value={String(field.value) || ''}
												onChange={(e) => {
													field.onChange(e.target.value);
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
								required
							/>
						</div>

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
										: mode === 'update'
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

export default CurrencyDialog;
