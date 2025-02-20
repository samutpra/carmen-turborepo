import { DeliveryPointCreateModel } from '@/dtos/delivery-point.dto';
import { LocationCreateModel } from '@/dtos/location.dto';
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
import { LocationField } from './LocationComponents';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Props {
	control: Control<LocationCreateModel>;
	token: string;
	tenantId: string;
	isEdit: boolean;
	setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
	onCancel: () => void;
	defaultValues?: Partial<LocationCreateModel>;
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

	console.log('deliveryPoints', deliveryPoints);

	const [isLoading, setIsLoading] = useState(false);
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

	const deliveryPointName = deliveryPoints.find(
		(dp) => dp.id === defaultValues?.delivery_point_id
	)?.name;

	console.log('deliveryPointName', deliveryPointName);

	const dpName = isLoading ? <p>Loading...</p> : deliveryPointName;

	const handleCancel = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsEdit(false);
		onCancel();
	};

	return (
		<>
			<Card className="p-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						{isEdit ? (
							<FormField
								control={control}
								name={LocationField.Name}
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
												data-id="store-location-dialog-form-name-input"
											/>
										</FormControl>
										<FormMessage data-id="store-location-dialog-form-name-message" />
									</FormItem>
								)}
								required
							/>
						) : (
							<p className="text-xl font-bold">{defaultValues?.name}</p>
						)}

						{!isEdit && (
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
									data-id="store-location-dialog-footer-submit-button"
								>
									<Save />
									{save_text()}
								</Button>
								<Button
									size="sm"
									variant="outline"
									type="button"
									onClick={handleCancel}
								>
									<X />
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
								<Pen />
							</Button>
						)}
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<FormField
							control={control}
							name={LocationField.LocationType}
							render={({ field }) => (
								<FormItem data-id="store-location-dialog-form-location-type-item">
									<FormLabel data-id="store-location-dialog-form-location-type-label">
										{location_type_label()}
									</FormLabel>
									{isEdit ? (
										<FormControl>
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
															className="cursor-pointer hover:bg-muted text-xs"
														>
															{label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
									) : (
										<p className="text-xs font-normal">
											{defaultValues?.location_type}
										</p>
									)}

									<FormMessage data-id="store-location-dialog-form-location-type-message" />
								</FormItem>
							)}
							required
						/>
					</div>

					<div className="space-y-2">
						<FormField
							control={control}
							name={LocationField.DeliveryPointID}
							data-id="store-location-dialog-form-delivery_point_id-field"
							render={({ field }) => (
								<FormItem data-id="store-location-dialog-form-delivery_point_id-item">
									<FormLabel data-id="store-location-dialog-form-delivery_point_id-label">
										{delivery_point()}
									</FormLabel>
									{isEdit ? (
										<FormControl>
											<DeliveryPointSelect
												value={field.value || ''}
												onValueChange={field.onChange}
												items={deliveryPoints}
											/>
										</FormControl>
									) : (
										<p className="text-xs font-normal">{dpName}</p>
									)}
									<FormMessage data-id="store-location-dialog-form-delivery_point_id-message" />
								</FormItem>
							)}
							required
						/>
					</div>

					<div className="space-y-2">
						<FormField
							control={control}
							name={LocationField.Description}
							data-id="store-location-dialog-form-description-field"
							render={({ field }) => (
								<FormItem data-id="store-location-dialog-form-description-item">
									<FormLabel data-id="store-location-dialog-form-description-label">
										{description()}
									</FormLabel>
									{isEdit ? (
										<FormControl>
											<Textarea
												placeholder={placeholder_enter()}
												{...field}
												data-id="store-location-dialog-form-description-textarea"
											/>
										</FormControl>
									) : (
										<p className="text-xs font-normal">
											{defaultValues?.description}
										</p>
									)}
									<FormMessage data-id="store-location-dialog-form-description-message" />
								</FormItem>
							)}
							required
						/>
					</div>
					<div>
						{isEdit && (
							<FormField
								control={control}
								name={LocationField.isActive}
								data-id="store-location-dialog-form-active-field"
								render={({ field }) => (
									<FormItem data-id="store-location-dialog-form-active-item">
										<FormControl>
											<RadioGroup
												defaultValue={field.value ? 'active' : 'inactive'}
												className="flex space-x-4"
												onValueChange={(value: 'active' | 'inactive') =>
													field.onChange(value === 'active')
												}
											>
												<div className="flex flex-col justify-center items-center gap-1">
													<p className="text-xs font-medium">Active</p>
													<RadioGroupItem value="active" id="active" />
												</div>
												<div className="flex flex-col justify-center items-center gap-1">
													<p className="text-xs font-medium">Inactive</p>
													<RadioGroupItem value="inactive" id="inactive" />
												</div>
											</RadioGroup>
										</FormControl>
									</FormItem>
								)}
							/>
						)}
					</div>
				</div>
			</Card>
		</>
	);
};

export default LocationsInfo;
