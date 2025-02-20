import { DeliveryPointCreateModel } from '@/dtos/delivery-point.dto';
import { enum_location_type, UserLocationModel } from '@/dtos/location.dto';
import React, { useCallback, useEffect, useState } from 'react';
import { Control } from 'react-hook-form';
import { fetchListDP } from '../../actions/delivery_point';
import { Card } from '@/components/ui/card';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui-custom/FormCustom';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { InputCustom } from '@/components/ui-custom/InputCustom';
import {
	description,
	location_type_label,
	placeholder_store_location_name,
	store_location_name_label,
	delivery_point,
	placeholder_enter,
	save_text,
	cancel_text,
} from '@/paraglide/messages';
import { Textarea } from '@/components/ui/textarea';
import { locationField } from '@/lib/util/fields';
import DeliveryPointSelect from '../../components/DeliveryPointSelect ';
import { Button } from '@/components/ui/button';
import { Pen, Save, X } from 'lucide-react';
import { Badge } from '@/components/ui-custom/is-active-badge';
import { Switch } from '@/components/ui/switch';

interface LocationFormState {
	id: string;
	name: string;
	description: string;
	is_active: boolean;
	location_type: enum_location_type;
	delivery_point: {
		id: string;
		name: string;
	};
	users: {
		active: UserLocationModel[];
		in_active: UserLocationModel[];
	};
}

interface Props {
	control: Control<LocationFormState>;
	token: string;
	tenantId: string;
	isEdit: boolean;
	setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
	onCancel: () => void;
	defaultValues?: Partial<LocationFormState>;
}

// Add this interface for better type safety
interface DeliveryPointValue {
	id: string;
	name: string;
}

const LocationsInfo = ({
	control,
	token,
	tenantId,
	isEdit,
	setIsEdit,
	onCancel,
	defaultValues,
}: Props) => {
	const [deliveryPoints, setDeliveryPoints] = useState<
		DeliveryPointCreateModel[]
	>([]);

	const [isLoading, setIsLoading] = useState(false);
	const [selectedDeliveryPoint, setSelectedDeliveryPoint] =
		useState<DeliveryPointValue | null>(defaultValues?.delivery_point || null);

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
		fetchData();
	}, []);

	const handleCancel = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsEdit(false);
		onCancel();
	};

	return (
		<Card className="p-6">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-4">
					{isEdit ? (
						<FormField
							control={control}
							name="name"
							data-id="store-location-dialog-form-name-field"
							render={({ field }) => (
								<FormItem data-id="store-location-dialog-form-name-item">
									<FormLabel data-id="store-location-dialog-form-name-label">
										{store_location_name_label()}
									</FormLabel>
									<FormControl>
										<InputCustom
											placeholder={placeholder_store_location_name()}
											{...field}
											className="max-w-[300px]"
											data-id="store-location-dialog-form-name-input"
										/>
									</FormControl>
									<FormMessage data-id="store-location-dialog-form-name-message" />
								</FormItem>
							)}
							required
						/>
					) : (
						<div className="space-y-1">
							<p className="text-sm text-muted-foreground">
								{store_location_name_label()}
							</p>
							<p className="text-xl font-semibold">{defaultValues?.name}</p>
						</div>
					)}

					{isEdit ? (
						<FormField
							control={control}
							name="is_active"
							data-id="store-location-dialog-form-active-field"
							render={({ field }) => (
								<FormItem
									data-id="store-location-dialog-form-active-item"
									className="flex flex-row items-center gap-2 space-y-0"
								>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
											aria-label="Toggle active status"
										/>
									</FormControl>
									<FormLabel className="text-sm font-medium">
										{field.value ? 'Active' : 'Inactive'}
									</FormLabel>
								</FormItem>
							)}
						/>
					) : (
						<Badge
							variant={defaultValues?.is_active ? 'default' : 'destructive'}
						>
							{defaultValues?.is_active ? 'Active' : 'Inactive'}
						</Badge>
					)}
				</div>

				<div className="flex items-center gap-2">
					{isEdit ? (
						<>
							<Button
								type="submit"
								size="sm"
								disabled={isLoading}
								data-id="store-location-dialog-footer-submit-button"
							>
								<Save className="h-4 w-4 mr-2" />
								{save_text()}
							</Button>
							<Button
								size="sm"
								variant="outline"
								type="button"
								onClick={handleCancel}
							>
								<X className="h-4 w-4 mr-2" />
								{cancel_text()}
							</Button>
						</>
					) : (
						<Button
							size="sm"
							variant="outline"
							type="button"
							onClick={(e) => {
								e.preventDefault();
								setIsEdit(true);
							}}
							disabled={isLoading}
						>
							<Pen className="h-4 w-4" />
						</Button>
					)}
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<FormField
					control={control}
					name="location_type"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{location_type_label()}</FormLabel>
							{isEdit ? (
								<Select
									onValueChange={field.onChange}
									value={field.value || defaultValues?.location_type}
									disabled={isLoading}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select type">
												{
													locationField.find(
														(item) => item.value === field.value
													)?.label
												}
											</SelectValue>
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{locationField.map(({ label, value }) => (
											<SelectItem
												key={value}
												value={value}
												className="cursor-pointer"
											>
												{label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							) : (
								<p className="text-sm">
									{locationField.find(
										(item) => item.value === defaultValues?.location_type
									)?.label || defaultValues?.location_type}
								</p>
							)}
							<FormMessage />
						</FormItem>
					)}
					required
				/>

				<FormField
					control={control}
					name="delivery_point.id"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{delivery_point()}</FormLabel>
							{isEdit ? (
								<FormControl>
									<DeliveryPointSelect
										value={field.value || defaultValues?.delivery_point?.id}
										onValueChange={(value) => {
											field.onChange(value);
											// Update the selected delivery point name
											const selectedDP = deliveryPoints.find(
												(dp) => dp.id === value
											);
											if (selectedDP) {
												setSelectedDeliveryPoint({
													id: selectedDP.id,
													name: selectedDP.name,
												});
											}
										}}
										items={deliveryPoints}
										disabled={isLoading}
									/>
								</FormControl>
							) : (
								<p className="text-sm">
									{selectedDeliveryPoint?.name ||
										defaultValues?.delivery_point?.name}
								</p>
							)}
							<FormMessage />
						</FormItem>
					)}
					required
				/>
			</div>

			<div className="mt-6">
				<FormField
					control={control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{description()}</FormLabel>
							{isEdit ? (
								<FormControl>
									<Textarea
										placeholder={placeholder_enter()}
										className="resize-none min-h-[100px]"
										{...field}
										value={field.value || defaultValues?.description || ''}
									/>
								</FormControl>
							) : (
								<p className="text-sm whitespace-pre-wrap">
									{defaultValues?.description}
								</p>
							)}
							<FormMessage />
						</FormItem>
					)}
					required
				/>
			</div>
		</Card>
	);
};

export default LocationsInfo;
