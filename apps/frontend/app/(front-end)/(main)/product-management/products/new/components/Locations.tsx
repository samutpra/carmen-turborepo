import React, { useEffect, useMemo, useState } from 'react';
import * as Form from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { Control, useFieldArray } from 'react-hook-form';
import { ProductFormType } from '@/dtos/product.dto';
import { LocationCreateModel } from '@/dtos/location.dto';
import { fetchLocationList } from '../../actions/product';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface LocationsProps {
	control: Control<ProductFormType>;
	token: string;
	tenantId: string;
}

// Extracted components
const LocationDisplay: React.FC<{ location: LocationCreateModel }> = ({ location }) => (
	<div className="flex items-center justify-between">
		<span className="font-medium">{location.name || 'Unnamed Location'}</span>
	</div>
);

const LocationStatus: React.FC<{ isActive: boolean }> = ({ isActive }) => (
	<span
		className={`inline-flex items-center px-2 py-1 rounded-md text-sm font-medium ${isActive
			? 'bg-green-100 text-green-700'
			: 'bg-red-100 text-red-700'
			}`}
		role="status"
		aria-label={isActive ? 'Active' : 'Inactive'}
	>
		{isActive ? 'Active' : 'Inactive'}
	</span>
);

const LocationType: React.FC<{ type?: string }> = ({ type }) => (
	<span
		className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-secondary"
		role="text"
	>
		{type?.toUpperCase() || 'N/A'}
	</span>
);

const LocationSelectTrigger: React.FC<{
	location: LocationCreateModel | undefined;
	onEdit: () => void;
}> = ({ location, onEdit }) => {
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === 'Space') {
			e.preventDefault();
			onEdit();
		}
	};

	return (
		<div
			className="flex items-center space-x-2 cursor-pointer hover:bg-secondary/50 p-2 rounded-md transition-colors"
			onClick={onEdit}
			role="button"
			tabIndex={0}
			onKeyDown={handleKeyDown}
			aria-label={location ? `Edit ${location.name}` : 'Select a location'}
		>
			{location ? (
				<LocationDisplay location={location} />
			) : (
				<span className="text-muted-foreground">Select a location</span>
			)}
		</div>
	);
};

const Locations: React.FC<LocationsProps> = ({ control, token, tenantId }) => {
	const [locationsList, setLocationsList] = useState<LocationCreateModel[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [editingIndex, setEditingIndex] = useState<number | null>(null);

	const { fields, append, remove, update } = useFieldArray({
		name: 'locations.add',
		control,
	});

	const fetchLocations = async () => {
		if (locationsList.length > 0) return;

		setIsLoading(true);
		setError(null);

		try {
			const response = await fetchLocationList(token, tenantId);
			if (!response) throw new Error('No data received');
			setLocationsList(response.data);
		} catch (err: unknown) {
			const errorMessage = err instanceof Error ? err.message : 'Failed to load locations';
			setError(errorMessage);
			setLocationsList([]);
		} finally {
			setIsLoading(false);
		}
	};

	const getLocationById = useMemo(
		() => (id: string) => locationsList.find((loc) => loc.id === id),
		[locationsList]
	);

	const handleLocationSelect = (value: string, index: number) => {
		const selectedLocation = getLocationById(value);
		if (!selectedLocation) return;

		update(index, {
			location_id: selectedLocation.id || '',
			name: selectedLocation.name,
			location_type: selectedLocation.location_type,
			is_active: Boolean(selectedLocation.is_active),
		});
		setEditingIndex(null);
	};

	const handleAddLocation = () => {
		append({
			location_id: '',
			name: '',
			location_type: '',
			is_active: false,
		});
		setEditingIndex(fields.length);
	};

	useEffect(() => {
		fetchLocations();
	}, []);

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Locations</CardTitle>
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={handleAddLocation}
					className="space-x-2"
					disabled={isLoading}
				>
					<Plus className="h-4 w-4" />
					<span>Add Location</span>
				</Button>
			</CardHeader>
			<CardContent className="pt-0">
				{error && (
					<Alert variant="destructive" className="mb-4">
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}

				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[40%]">Location</TableHead>
							<TableHead className="w-[20%]">Type</TableHead>
							<TableHead className="w-[20%]">Status</TableHead>
							<TableHead className="w-[100px]">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{fields.map((field, index) => {
							const location = getLocationById(field.location_id);

							return (
								<TableRow key={field.id}>
									<TableCell className="py-2">
										<Form.FormField
											control={control}
											name={`locations.add.${index}.location_id`}
											render={({ field: formField }) => (
												<Form.FormItem className="space-y-0">
													<Form.FormControl>
														{editingIndex === index ? (
															<Select
																value={formField.value}
																onValueChange={(value) => {
																	formField.onChange(value);
																	handleLocationSelect(value, index);
																}}
																onOpenChange={() => {
																	if (locationsList.length === 0) {
																		fetchLocations();
																	}
																}}
																disabled={isLoading}
															>
																<SelectTrigger className="w-full">
																	<SelectValue placeholder="Select a location" />
																</SelectTrigger>
																<SelectContent>
																	<SelectGroup>
																		{isLoading ? (
																			<SelectItem value="loading" disabled>
																				<div className="flex items-center space-x-2">
																					<Loader2 className="h-4 w-4 animate-spin" />
																					<span>Loading locations...</span>
																				</div>
																			</SelectItem>
																		) : locationsList.length === 0 ? (
																			<SelectItem value="empty" disabled>
																				No locations available
																			</SelectItem>
																		) : (
																			locationsList.map((loc) => (
																				<SelectItem
																					key={loc.id}
																					value={loc.id || 'default'}
																					className="flex flex-col items-start py-2 cursor-pointer"
																				>
																					<LocationDisplay location={loc} />
																				</SelectItem>
																			))
																		)}
																	</SelectGroup>
																</SelectContent>
															</Select>
														) : (
															<LocationSelectTrigger
																location={location}
																onEdit={() => setEditingIndex(index)}
															/>
														)}
													</Form.FormControl>
													<Form.FormMessage />
												</Form.FormItem>
											)}
										/>
									</TableCell>
									<TableCell>
										{location ? (
											<LocationType type={location.location_type} />
										) : (
											<span className="text-muted-foreground">-</span>
										)}
									</TableCell>
									<TableCell>
										{location ? (
											<LocationStatus isActive={Boolean(location.is_active)} />
										) : (
											<span className="text-muted-foreground">-</span>
										)}
									</TableCell>
									<TableCell>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											onClick={() => remove(index)}
											className="text-destructive hover:text-destructive hover:bg-destructive/10"
											aria-label={`Remove ${location?.name || 'location'}`}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export default Locations;