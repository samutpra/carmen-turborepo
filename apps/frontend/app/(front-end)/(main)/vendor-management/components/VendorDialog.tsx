import { useAuth } from '@/app/context/AuthContext';
import { vendor_schema, vendor_type } from '@carmensoftware/shared-types';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
import { Button } from '@/components/ui/button';
import { PencilIcon, PlusIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { LoaderButton } from '@/components/ui-custom/button/LoaderButton';
import { InputCustom } from '@/components/ui-custom/InputCustom';

interface VendorDialogProps {
	mode: 'create' | 'edit';
	defaultValues?: vendor_type;
	onSuccess: (values: vendor_type) => void;
}

const VendorDialog: React.FC<VendorDialogProps> = ({
	mode,
	defaultValues,
	onSuccess,
}) => {
	const [open, setOpen] = useState(false);
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<vendor_type>({
		resolver: zodResolver(vendor_schema),
		defaultValues: {
			name: defaultValues?.name || '',
			description: defaultValues?.description || '',
			is_active: defaultValues?.is_active ?? true,
		},
	});

	const onSubmit = async (values: vendor_type) => {
		setIsLoading(true);
		try {
			const url = defaultValues?.id
				? `/api/vendor-management/vendor/${defaultValues.id}`
				: '/api/vendor-management/vendor';
			const method = mode === 'create' ? 'POST' : 'PATCH';
			const response = await fetch(url, {
				method,
				headers: {
					Authorization: `Bearer ${token}`,
					'x-tenant-id': tenantId,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});
			if (!response.ok) {
				throw new Error(`Failed to ${mode} vendor`);
			}
			const result = await response.json();
			const data: vendor_type = {
				id: mode === 'create' ? result.id : defaultValues?.id || result.id,
				...values,
			};
			onSuccess(data);
			setOpen(false);
			form.reset();
			toast.success(
				`Vendor ${defaultValues?.id ? 'updated' : 'created'} successfully`
			);
		} catch (error) {
			console.error('Error saving vendor:', error);
			toast.error('Failed to save vendor', {
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
							Add Vendor
						</>
					) : (
						<PencilIcon className="w-4 h-4" />
					)}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{mode === 'create' ? 'Create' : 'Edit'} Vendor
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
										<InputCustom
											placeholder="Enter Description"
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
							required
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

export default VendorDialog;