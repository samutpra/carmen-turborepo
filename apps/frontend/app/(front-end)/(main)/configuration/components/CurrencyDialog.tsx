'use client';

import React, { useEffect, useState } from 'react';
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
import { submitCurrency } from '../actions/currency';
import { formType } from '@/types/form_type';

export interface CurrencyDialogProps {
	mode: formType;
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

	const defaultCurrencyValues: CurrencyType = {
		code: '',
		name: '',
		symbol: '',
		description: '',
		rate: '',
		is_active: true,
	};

	const form = useForm<CurrencyType>({
		resolver: zodResolver(CurrencySchema),
		defaultValues: mode === formType.EDIT && defaultValues
			? { ...defaultValues }
			: defaultCurrencyValues,
	});

	useEffect(() => {
		if (mode === formType.EDIT && defaultValues) {
			form.reset({ ...defaultValues });
		} else {
			form.reset({ ...defaultCurrencyValues })
		}
	}, [mode, defaultValues, form])

	const onSubmit = async (data: CurrencyType) => {
		setIsLoading(true);
		try {
			const result = await submitCurrency(data, mode, token, tenantId, defaultValues);

			const values: CurrencyType = {
				id: mode === formType.ADD ? result.id : defaultValues?.id || result.id,
				...data,
			};
			onSuccess(values);
			setOpen(false);
			form.reset();

			toastSuccess({ message: `Currency ${mode === formType.ADD ? 'created' : 'updated'} successfully` });
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
				<Button
					variant={mode === formType.ADD ? 'outline' : 'ghost'}
					size={'sm'}
				>
					{mode === formType.ADD ? (
						<>
							<PlusIcon className="h-4 w-4" />
							Add Currency
						</>
					) : (
						<PencilIcon className="w-4 h-4" />
					)}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{mode === formType.ADD ? 'Create New Currency' : 'Edit Currency'}
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
							<div className="flex-end gap-2">
								<Button
									type="button"
									variant={'outline'}
									onClick={handleClose}
									size={'sm'}
								>
									Cancel
								</Button>
								<LoaderButton
									type="submit"
									disabled={isLoading}
									isLoading={isLoading}
									size={'sm'}
								>
									{isLoading
										? 'Saving...'
										: mode === formType.EDIT
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
