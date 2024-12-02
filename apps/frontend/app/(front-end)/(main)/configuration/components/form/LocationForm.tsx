import { LocationSchema, LocationType, PayloadLocationType } from '@/lib/types';
import React, { useEffect } from 'react';
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
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { InputCustom } from '@/components/ui-custom/InputCustom';
import { Switch } from '@/components/ui/switch';
import { LoaderButton } from '@/components/ui-custom/button/LoaderButton';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface Props {
	open: boolean;
	editingItem: LocationType | null;
	isLoading: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (data: LocationType) => void;
}

const LocationForm: React.FC<Props> = ({
	open,
	editingItem,
	isLoading,
	onOpenChange,
	onSubmit,
}) => {
	const form = useForm<PayloadLocationType>({
		resolver: zodResolver(LocationSchema),
		defaultValues: {
			name: '',
			location_type: 'inventory',
			description: '',
			delivery_point_id: '',
			is_active: true,
		},
	});

	useEffect(() => {
		if (editingItem) {
			form.reset({
				name: editingItem.name,
				location_type: editingItem.location_type,
				description: editingItem.description,
				delivery_point_id: '',
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
						{editingItem ? 'Edit Location' : 'Add New Location'}
					</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
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
								name="location_type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Location Type</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												value={field.value}
												defaultValue={field.value}
											>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select location type" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="inventory">Inventory</SelectItem>
													<SelectItem value="direct">Direct</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
								required
							/>

							<FormField
								control={form.control}
								name="delivery_point_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Delivery Point</FormLabel>
										<FormControl>
											<InputCustom
												type="number"
												placeholder="Enter Delivery Point"
												error={!!form.formState.errors.delivery_point_id}
												{...field}
												value={field.value?.toString() || ''}
												onChange={(e) =>
													field.onChange(e.target.value ? e.target.value : '')
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
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
								{isLoading ? 'Saving...' : editingItem ? 'Save Changes' : 'Add'}
							</LoaderButton>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default LocationForm;
