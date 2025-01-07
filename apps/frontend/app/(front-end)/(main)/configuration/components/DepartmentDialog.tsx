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
import * as m from '@/paraglide/messages.js';

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

				toastSuccess({
					message: `${m.department()} ${mode === formType.ADD
						? `${m.create_txt()}`
						: `${m.edit_txt()}`} ${m.successfully()}`
				});
			} else {
				toastError({ message: `Failed to ${mode} department` });
			}

		} catch (error) {
			console.error(`Error ${mode}ing department:`, error);
			toastError({ message: `${m.fail_to_text()} ${mode} ${m.department()}` });
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
							{m.add_text()} {m.department()}
						</>
					) : (
						<PencilIcon className="w-4 h-4" />
					)}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{mode === formType.ADD ? `${m.create_txt()}` : `${m.edit_txt()}`} {m.department()}
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{m.department_label_name()}</FormLabel>
									<FormControl>
										<InputCustom
											placeholder={m.placeholder_department_name()}
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

export default DepartmentDialog;
