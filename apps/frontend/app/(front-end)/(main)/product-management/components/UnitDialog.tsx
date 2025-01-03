'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/app/context/AuthContext';
import { UnitSchema } from '@carmensoftware/shared-types';
import { UnitType } from '@carmensoftware/shared-types';
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
import { Textarea } from '@/components/ui/textarea';
import { submitUnit } from '../actions/unit';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { formType } from '@/types/form_type';

interface UnitDialogProps {
	mode: formType
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

	const defaultUnitValues: UnitType = {
		name: '',
		description: '',
		is_active: true,
	};

	const form = useForm<UnitType>({
		resolver: zodResolver(UnitSchema),
		defaultValues: mode === formType.EDIT && defaultValues
			? { ...defaultValues }
			: defaultUnitValues,
	});

	useEffect(() => {
		if (mode === formType.EDIT && defaultValues) {
			form.reset({ ...defaultValues });
		} else {
			form.reset({ ...defaultUnitValues });
		}
	}, [mode, defaultValues, form]);

	const onSubmit = async (values: UnitType) => {
		setIsLoading(true);
		try {
			const url = defaultValues?.id || '';
			const result = await submitUnit(values, mode, token, tenantId, url);

			const data: UnitType = {
				id: result.id,
				...values,
			};

			if (result) {
				onSuccess(data);
				setOpen(false);
				form.reset();
				toastSuccess({ message: `Unit  successfully` });
			} else {
				toastError({ message: `Failed to ${mode} unit` });
			}
		} catch (error) {
			toastError({ message: error instanceof Error ? error.message : String(error) });
		} finally {
			setIsLoading(false);
		}
	}
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
						{mode === formType.ADD ? 'Create' : 'Edit'} Unit
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
								<FormItem className="flex-between rounded-lg border p-4">
									<FormLabel className="text-base">Active</FormLabel>
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

export default UnitDialog;
