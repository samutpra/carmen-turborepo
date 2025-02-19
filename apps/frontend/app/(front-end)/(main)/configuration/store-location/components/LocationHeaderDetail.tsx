import React, { useCallback, useEffect, useState } from 'react';
import { Badge } from '@/components/ui-custom/is-active-badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DeliveryPointCreateModel } from '@/dtos/delivery-point.dto';
import { enum_location_type } from '@/dtos/location.dto';
import { Pen, Save, X } from 'lucide-react';
import { fetchListDP } from '../../actions/delivery_point';
import { DeliveryPointSelector } from './DeliveryPointSelect';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { LocationCreateModel } from '@/dtos/location.dto';
import { cancel_text, save_change_text } from '@/paraglide/messages';

interface Props {
	name: string;
	type: enum_location_type;
	description: string;
	delivery_point_id: string;
	is_active: boolean;
	isEdit: boolean;
	setIsEdit: (isEdit: boolean) => void;
	onCancel: () => void;
	token: string;
	tenantId: string;
	onSubmitData: (data: LocationCreateModel) => void;
}

const LocationHeaderDetail: React.FC<Props> = ({
	name,
	type,
	description,
	delivery_point_id,
	is_active,
	isEdit,
	setIsEdit,
	onCancel,
	token,
	tenantId,
	onSubmitData,
}) => {
	const [deliveryPoints, setDeliveryPoints] = useState<
		DeliveryPointCreateModel[]
	>([]);
	const [selectedDeliveryPoint, setSelectedDeliveryPoint] =
		useState<string>(delivery_point_id);
	const [selectedDeliveryPointName, setSelectedDeliveryPointName] =
		useState<string>('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(async () => {
		if (!token) {
			setError('Authentication token is missing');
			return;
		}

		try {
			setIsLoading(true);
			setError(null);
			const response = await fetchListDP(token, tenantId);
			setDeliveryPoints(response.data);

			const currentPoint: DeliveryPointCreateModel | undefined =
				response.data.find(
					(point: DeliveryPointCreateModel) => point.id === delivery_point_id
				);
			if (currentPoint) {
				setSelectedDeliveryPointName(currentPoint.name);
			}
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Failed to load delivery points'
			);
		} finally {
			setIsLoading(false);
		}
	}, [token, tenantId, delivery_point_id]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const handleDeliveryPointChange = (value: string) => {
		setSelectedDeliveryPoint(value);
		const selectedPoint = deliveryPoints.find((point) => point.id === value);
		if (selectedPoint) {
			setSelectedDeliveryPointName(selectedPoint.name);
		}
	};

	const handleSave = () => {
		const data: LocationCreateModel = {
			name,
			location_type: type,
			description,
			delivery_point_id: selectedDeliveryPoint,
			is_active,
		};
		console.log('Data to be submitted:', data);
		onSubmitData(data);
	};

	return (
		<Card className="p-4 space-y-2">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					{isEdit ? (
						<div className="space-y-1">
							<p className="text-gray-500 text-xs font-medium">Name</p>
							<Input defaultValue={name || ''} />
						</div>
					) : (
						<p className="text-xl font-bold">{name}</p>
					)}

					{isEdit ? (
						<RadioGroup
							defaultValue={is_active ? 'active' : 'inactive'}
							className="flex space-x-4"
						>
							<label className="flex items-center space-x-2">
								<RadioGroupItem value="active" id="active" />
								<span className="text-sm font-medium">Active</span>
							</label>
							<label className="flex items-center space-x-2">
								<RadioGroupItem value="inactive" id="inactive" />
								<span className="text-sm font-medium">Inactive</span>
							</label>
						</RadioGroup>
					) : (
						<Badge variant={is_active ? 'default' : 'destructive'}>
							{is_active ? 'Active' : 'Inactive'}
						</Badge>
					)}
				</div>
				<div className="flex items-center gap-2">
					{isEdit ? (
						<>
							<Button
								type="submit"
								size="sm"
								variant="outline"
								onClick={handleSave}
							>
								<Save className="w-4 h-4 mr-2" />
								{save_change_text()}
							</Button>
							<Button size="sm" variant="outline" onClick={onCancel}>
								<X className="w-4 h-4 mr-2" />
								{cancel_text()}
							</Button>
						</>
					) : (
						<Button
							size="sm"
							variant="outline"
							onClick={() => setIsEdit(true)}
							disabled={isLoading}
						>
							<Pen className="w-4 h-4 mr-2" />
						</Button>
					)}
				</div>
			</div>
			<div className="grid grid-cols-4 gap-4">
				<div className="space-y-1">
					<p className="text-gray-500 text-xs font-medium">Description</p>
					{isEdit ? (
						<Textarea defaultValue={description || ''} />
					) : (
						<p className="text-xs font-normal">{description}</p>
					)}
				</div>
				<div className="space-y-1">
					<p className="text-gray-500 text-xs font-medium">Location Type</p>
					{isEdit ? (
						<Select
							defaultValue={
								Object.values(enum_location_type).includes(type)
									? type
									: undefined
							}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select location Type" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value={enum_location_type.inventory}>
										Inventory
									</SelectItem>
									<SelectItem value={enum_location_type.direct}>
										Direct
									</SelectItem>
									<SelectItem value={enum_location_type.consignment}>
										Consignment
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					) : (
						<p className="text-xs font-normal">
							{type ? type.charAt(0).toUpperCase() + type.slice(1) : ''}
						</p>
					)}
				</div>
				<div className="space-y-1">
					<p className="text-gray-500 text-xs font-medium">Delivery Point</p>
					<DeliveryPointSelector
						isEdit={isEdit}
						isLoading={isLoading}
						error={error}
						deliveryPoints={deliveryPoints}
						selectedDeliveryPoint={selectedDeliveryPoint}
						selectedDeliveryPointName={selectedDeliveryPointName}
						onDeliveryPointChange={handleDeliveryPointChange}
					/>
				</div>
			</div>
		</Card>
	);
};

export default LocationHeaderDetail;