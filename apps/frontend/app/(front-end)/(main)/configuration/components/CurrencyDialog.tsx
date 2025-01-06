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
import * as m from '@/paraglide/messages.js';

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

			toastSuccess({ message: `${m.currency()} ${mode === formType.ADD ? `${m.create_txt()}` : `${m.edit_txt()}`} ${m.successfully()}` });
		} catch (err) {
			console.error(`Error submit Currency:`, err);
			toastError({ message: `${m.fail_to_text()} ${mode} ${m.currency()}` });
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
							{m.add_text()} {m.currency()}
						</>
					) : (
						<PencilIcon className="w-4 h-4" />
					)}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{mode === formType.ADD ? `${m.create_new_currency()}` : `${m.edit_currency()}`}
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
										<FormLabel>{m.code_label()}</FormLabel>
										<FormControl>
											<InputCustom
												placeholder={m.placeholder_enter_code_name()}
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
										<FormLabel>{m.currency_name()}</FormLabel>
										<FormControl>
											<InputCustom
												placeholder={m.placeholder_currency_name()}
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
										<FormLabel>{m.symbol_label()}</FormLabel>
										<FormControl>
											<InputCustom
												placeholder={m.placeholder_symbol()}
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
										<FormLabel>{m.rate_label()}</FormLabel>
										<FormControl>
											<InputCustom
												placeholder={m.placeholder_rate()}
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
									<FormLabel>{m.description()}</FormLabel>
									<FormControl>
										<Textarea placeholder={m.placeholder_enter()} {...field} />
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
								<FormItem className="flex-between rounded-lg border p-4">
									<div className="space-y-0.5">
										<FormLabel className="text-base">{m.status_active_text()}</FormLabel>
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
									{m.cancel_text()}
								</Button>
								<LoaderButton
									type="submit"
									disabled={isLoading}
									isLoading={isLoading}
									size={'sm'}
								>
									{isLoading
										? `${m.saving()}...`
										: mode === formType.EDIT
											? `${m.save_change_text()}`
											: `${m.add_text()}`}
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
