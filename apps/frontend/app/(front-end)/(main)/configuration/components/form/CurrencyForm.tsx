"use client"
import React, { useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui-custom/FormCustom';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { InputCustom } from '@/components/ui-custom/InputCustom';
import { Switch } from '@/components/ui/switch';
import { LoaderButton } from '@/components/ui-custom/button/LoaderButton';
import { Button } from '@/components/ui/button';
import { CurrencySchema, CurrencyType } from '@/lib/types';

interface Props {
    open: boolean;
    editingItem: CurrencyType | null;
    isLoading: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: CurrencyType) => Promise<void>;
}

const CurrencyForm: React.FC<Props> = ({
    open,
    editingItem,
    isLoading,
    onOpenChange,
    onSubmit,
}) => {

    const form = useForm<CurrencyType>({
			resolver: zodResolver(CurrencySchema),
			defaultValues: {
				code: '',
				name: '',
				symbol: '',
				description: '',
				rate: 0,
				is_active: true,
			},
		});

		useEffect(() => {
			if (editingItem) {
				form.reset({
					code: editingItem.code,
					name: editingItem.name,
					symbol: editingItem.symbol,
					description: editingItem.description,
					rate: editingItem.rate,
					is_active: editingItem.is_active,
				});
			}
		}, [editingItem, form]);

		const handleClose = () => {
			form.reset();
			onOpenChange(false);
		};

		return (
			<Dialog open={open} onOpenChange={handleClose}>
				<DialogContent className="sm:max-w-[700px]">
					<DialogHeader>
						<DialogTitle>
							{editingItem ? 'Edit Currency' : 'Add New Currency'}
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
													value={field.value.toString()} // Convert number to string
													onChange={(e) =>
														field.onChange(parseFloat(e.target.value) || '')
													}
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
											<InputCustom
												placeholder="Enter unit description"
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
							/>

							<DialogFooter>
								<Button
									type="button"
									variant="secondary"
									onClick={handleClose}
									disabled={isLoading}
								>
									Cancel
								</Button>
								<LoaderButton
									type="submit"
									disabled={isLoading}
									isLoading={isLoading}
								>
									{isLoading
										? 'Saving...'
										: editingItem
											? 'Save Changes'
											: 'Add'}
								</LoaderButton>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		);
}

export default CurrencyForm