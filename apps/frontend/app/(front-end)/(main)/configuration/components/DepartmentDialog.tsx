'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import {
	DepartmentSchema,
	DepartmentType,
} from '@carmensoftware/shared-types/src/department';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { submitDepartment } from '../actions/department';
import { formType } from '@/types/form_type';

export interface DepartmentDialogProps {
	mode: formType;
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

	const defaultDepartmentValues: DepartmentType = {
		name: '',
		description: '',
		is_active: true,
	};

	const form = useForm<DepartmentType>({
		resolver: zodResolver(DepartmentSchema),
		defaultValues: mode === formType.EDIT && defaultValues
			? { ...defaultValues }
			: defaultDepartmentValues,
	});

	useEffect(() => {
		if (mode === formType.EDIT && defaultValues) {
			form.reset({ ...defaultValues });
		} else {
			form.reset({ ...defaultDepartmentValues });
		}
	}, [mode, defaultValues, form]);

	const onSubmit = async (data: DepartmentType) => {
		setIsLoading(true);
		try {
			const id = defaultValues?.id || '';
			const result = await submitDepartment(data, mode, token, tenantId, id);

			if (result) {
				const submitData: DepartmentType = {
					id: result.id,
					...data,
				}
				onSuccess(submitData);
				setOpen(false);
				form.reset();
				toastSuccess({ message: `Department ${mode === formType.ADD ? 'created' : 'updated'} successfully` });
			} else {
				toastError({ message: `Failed to ${mode} department` });
			}

		} catch (error) {
			console.error(`Error ${mode}ing department:`, error);
			toastError({ message: `Failed to ${mode} department` });
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
						{mode === formType.ADD ? 'Create' : 'Edit'} Department
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

export default DepartmentDialog;
