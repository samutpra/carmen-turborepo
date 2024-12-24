'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
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
import { Switch } from '@/components/ui/switch';
import {
	deliveryPointSchema,
	DeliveryPointType,
} from '@carmensoftware/shared-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { PencilIcon, PlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/app/context/AuthContext';
import { CustomButton } from '@/components/ui-custom/CustomButton';
import { LoaderButton } from '@/components/ui-custom/button/LoaderButton';
import { InputCustom } from '@/components/ui-custom/InputCustom';
import { submitDeliveryPoint } from '../actions/delivery_point';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { formType } from '@/types/form_type';

export interface DeliveryPointDialogProps {
	mode: formType;
	defaultValues?: DeliveryPointType;
	onSuccess: (point: DeliveryPointType) => void;
}

export const DeliveryPointDialog: React.FC<DeliveryPointDialogProps> = ({
	mode,
	defaultValues,
	onSuccess,
}) => {
	const [open, setOpen] = useState(false);
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [isLoading, setIsLoading] = useState(false);

	const defaultDeliveryPointValues: DeliveryPointType = {
		name: '',
		is_active: true,
	};

	const form = useForm<DeliveryPointType>({
		resolver: zodResolver(deliveryPointSchema),
		defaultValues: mode === formType.EDIT && defaultValues
			? { ...defaultValues } : defaultDeliveryPointValues,
	});

	useEffect(() => {
		if (mode === formType.EDIT && defaultValues) {
			form.reset({ ...defaultValues });
		} else {
			form.reset({ ...defaultDeliveryPointValues })
		}
	}, [mode, defaultValues, form])

	const onSubmit = async (data: DeliveryPointType) => {
		setIsLoading(true);
		try {
			const id = defaultValues?.id || '';
			const result = await submitDeliveryPoint(data, mode, token, tenantId, id);

			const submitData: DeliveryPointType = {
				id: result.id,
				...data,
			}

			onSuccess(submitData);
			setOpen(false);
			form.reset();
			toastSuccess({ message: `Delivery point ${mode === formType.ADD ? 'created' : 'updated'} successfully` });
		} catch (err) {
			console.error(`Error ${mode}ing delivery point:`, err);
			toastError({ message: `Failed to ${mode} delivery point` });
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
				{mode === formType.ADD ? (
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
						{mode === formType.ADD
							? 'Create New Delivery Point'
							: 'Edit Delivery Point'}
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
					>
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
