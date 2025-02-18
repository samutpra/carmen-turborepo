'use client';

import React, { useCallback, useEffect, useState } from 'react';
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
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { submitStoreLocation } from '../../actions/store_location';
import { formType } from '@/types/form_type';
import * as m from '@/paraglide/messages.js';
import { enum_location_type, LocationCreateModel, LocationCreateSchema } from '@/dtos/location.dto';
import { DeliveryPointCreateModel } from '@/dtos/delivery-point.dto';
import { fetchListDP } from '../../actions/delivery_point';
import DeliveryPointSelect from '../../components/DeliveryPointSelect ';
import { StoreLocationField } from './StoreLocationList';
import { locationField } from '@/lib/util/fields';

interface StoreLocationDialogProps {
	mode: formType;
	defaultValues?: LocationCreateModel;
	onSuccess: (values: LocationCreateModel) => void;
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
	const [deliveryPoints, setDeliveryPoints] = useState<
		DeliveryPointCreateModel[]
	>([]);

	const fetchData = useCallback(async () => {
		if (!token) return;

		try {
			setIsLoading(true);
			const data = await fetchListDP(token, tenantId);
			setDeliveryPoints(data.data);
		} catch (err) {
			console.error(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	}, [token, tenantId]);


	useEffect(() => {
		if (open) {
			fetchData();
		} else {
			setDeliveryPoints([]);
		}
	}, [open, fetchData]);

	const defaultLocationValues: LocationCreateModel = {
		name: '',
		location_type: enum_location_type.inventory,
		description: '',
		is_active: true,
		delivery_point_id: null,
	};

	const form = useForm<LocationCreateModel>({
		resolver: zodResolver(LocationCreateSchema),
		defaultValues:
			mode === formType.EDIT && defaultValues
				? { ...defaultValues }
				: defaultLocationValues,
	});

	useEffect(() => {
		if (mode === formType.EDIT && defaultValues) {
			form.reset({ ...defaultValues });
		} else {
			form.reset({ ...defaultLocationValues });
		}
	}, [mode, defaultValues, form]);

	const onSubmit = async (data: LocationCreateModel) => {
		setIsLoading(true);
		try {
			const id = defaultValues?.id || '';
			const result = await submitStoreLocation(data, mode, token, tenantId, id);
			const submitData: LocationCreateModel = {
				id: result.id,
				...data,
			};
			if (result) {
				onSuccess(submitData);
				setOpen(false);
				form.reset();
				toastSuccess({
					message: `${m.store_location()} ${mode === formType.ADD ? `${m.create_txt()}` : `${m.edit_txt()}`
						} ${m.successfully()}`,
				});
			} else {
				toastError({
					message: `${m.fail_to_text()} ${mode} ${m.store_location()}`,
				});
			}
		} catch (error) {
			toastError({
				message: error instanceof Error ? error.message : String(error),
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
		<Dialog open={open} onOpenChange={setOpen} data-id="store-location-dialog">
			<DialogTrigger asChild data-id="store-location-dialog-trigger">
				<Button
					variant={mode === formType.ADD ? 'default' : 'ghost'}
					size={'sm'}
					data-id="store-location-dialog-button"
				>
					{mode === formType.ADD ? (
						<>
							<PlusIcon
								className="h-4 w-4"
								data-id="store-location-dialog-add-icon"
							/>
							{m.add_text()} {m.store_location()}
						</>
					) : (
						<PencilIcon
							className="w-4 h-4"
							data-id="store-location-dialog-edit-icon"
						/>
					)}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader data-id="store-location-dialog-header">
					<DialogTitle data-id="store-location-dialog-title">
						{mode === formType.ADD
							? `${m.store_location()}`
							: `${m.store_location()}`}
					</DialogTitle>
				</DialogHeader>
				<Form {...form} data-id="store-location-dialog-form">
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
						data-id="store-location-dialog-form-submit"
					>
						<FormField
							control={form.control}
							name={StoreLocationField.Name}
							data-id="store-location-dialog-form-name-field"
							render={({ field }) => (
								<FormItem data-id="store-location-dialog-form-name-item">
									<FormLabel data-id="store-location-dialog-form-name-label">
										{m.store_location_name_label()}
									</FormLabel>
									<FormControl>
										<InputCustom
											placeholder={m.placeholder_store_location_name()}
											error={!!form.formState.errors.name}
											{...field}
											data-id="store-location-dialog-form-name-input"
										/>
									</FormControl>
									<FormMessage data-id="store-location-dialog-form-name-message" />
								</FormItem>
							)}
							required
						/>

						<FormField
							control={form.control}
							name={StoreLocationField.LocationType}
							render={({ field }) => (
								<FormItem data-id="store-location-dialog-form-location-type-item">
									<FormLabel data-id="store-location-dialog-form-location-type-label">
										{m.location_type_label()}
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value ?? undefined}
										data-id="store-location-dialog-form-location-type-select"
									>
										<SelectTrigger
											className="h-8"
											data-id="store-location-dialog-form-location-type-select-trigger"
										>
											<SelectValue placeholder="Select type" />
										</SelectTrigger>
										<SelectContent data-id="store-location-dialog-form-location-type-select-content">
											{locationField.map(({ label, value }) => (
												<SelectItem
													key={value}
													value={value}
													data-id={`store-location-dialog-form-location-type-select-item-${value}`}
													className='cursor-pointer hover:bg-muted text-xs'

												>
													{label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage data-id="store-location-dialog-form-location-type-message" />
								</FormItem>
							)}
							required
						/>

						<FormField
							control={form.control}
							name={StoreLocationField.DeliveryPointID}
							data-id="store-location-dialog-form-delivery_point_id-field"
							render={({ field }) => (
								<FormItem data-id="store-location-dialog-form-delivery_point_id-item">
									<FormLabel data-id="store-location-dialog-form-delivery_point_id-label">
										{m.delivery_point()}
									</FormLabel>
									<FormControl>
										<DeliveryPointSelect
											value={field.value || ''}
											onValueChange={field.onChange}
											items={deliveryPoints}
										/>
										{/* 
										<DeliveryPointCombobox
											value={field.value || ''}
											onValueChange={field.onChange}
											items={deliveryPoints}
											error={form.formState.errors.delivery_point_id?.message}
											disabled={isLoading}
											isLoading={isLoading}
											page={page}
											pages={pages}
											onPopoverOpenChange={(open) => {
												if (open) {
													setSearch('');
													setPage('1');
													fetchData();
												}
											}}
											onPageChange={(newPage) => {
												setPage(newPage);
												fetchData();
											}}
											onSearchChange={(newSearch) => {
												setSearch(newSearch);
												setPage("1");
												fetchData();
											}}
										/> */}
									</FormControl>
									<FormMessage data-id="store-location-dialog-form-delivery_point_id-message" />
								</FormItem>
							)}
							required
						/>
						<FormField
							control={form.control}
							name={StoreLocationField.Description}
							data-id="store-location-dialog-form-description-field"
							render={({ field }) => (
								<FormItem data-id="store-location-dialog-form-description-item">
									<FormLabel data-id="store-location-dialog-form-description-label">
										{m.description()}
									</FormLabel>
									<FormControl>
										<Textarea
											placeholder={m.placeholder_enter()}
											{...field}
											data-id="store-location-dialog-form-description-textarea"
										/>
									</FormControl>
									<FormMessage data-id="store-location-dialog-form-description-message" />
								</FormItem>
							)}
							required
						/>
						<FormField
							control={form.control}
							name={StoreLocationField.isActive}
							data-id="store-location-dialog-form-active-field"
							render={({ field }) => (
								<FormItem
									className="flex-between rounded-lg border p-2"
									data-id="store-location-dialog-form-active-item"
								>
									<div
										className="space-y-0.5"
										data-id="store-location-dialog-form-active-label-container"
									>
										<FormLabel
											className="text-base"
											data-id="store-location-dialog-form-active-label"
										>
											{m.status_active_text()}
										</FormLabel>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
											data-id="store-location-dialog-form-active-switch"
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<DialogFooter data-id="store-location-dialog-footer">
							<div
								className="flex-end gap-2"
								data-id="store-location-dialog-footer-container"
							>
								<Button
									type="button"
									variant={'outline'}
									onClick={handleClose}
									size={'sm'}
									data-id="store-location-dialog-footer-cancel-button"
								>
									{m.cancel_text()}
								</Button>
								<LoaderButton
									type="submit"
									disabled={isLoading}
									isLoading={isLoading}
									size={'sm'}
									data-id="store-location-dialog-footer-submit-button"
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

export default StoreLocationDialog;
