import React, { useEffect, useMemo, useState } from 'react';
import * as Form from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
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

interface Props {
	control: Control<ProductFormType>;
	token: string;
	tenantId: string;
}

const LocationDisplay: React.FC<{
	location: LocationCreateModel;
}> = ({ location }) => {
	return (
		<div className={`flex items-center justify-between`}>
			<h1 className="font-medium">{location.name || 'Unnamed Location'}</h1>
		</div>
	);
};

const LocationSelectItem: React.FC<{ location: LocationCreateModel }> = ({
	location,
}) => {
	return (
		<SelectItem
			key={location.id}
			value={location.id || 'default'}
			className="flex flex-col items-start py-2 cursor-pointer"
		>
			<LocationDisplay location={location} />
		</SelectItem>
	);
};

const LocationStatus: React.FC<{ isActive: boolean }> = ({ isActive }) => (
	<span
		className={`px-1.5 py-0.5 rounded-sm ${
			isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
		}`}
	>
		{isActive ? 'Active' : 'Inactive'}
	</span>
);

const LocationType: React.FC<{ type?: string }> = ({ type }) => (
	<span className="bg-secondary px-1.5 py-0.5 rounded-sm">
		{type?.toUpperCase() || 'N/A'}
	</span>
);

const LocationValue: React.FC<{
	location: LocationCreateModel | undefined;
	onEdit: () => void;
}> = ({ location, onEdit }) => {
	if (!location) {
		return (
			<div
				className="flex items-center space-x-2 cursor-pointer hover:bg-secondary/50 p-2 rounded-md text-muted-foreground"
				onClick={onEdit}
				role="button"
				tabIndex={0}
				onKeyDown={(e) => e.key === 'Enter' && onEdit()}
			>
				<span>Select a location</span>
			</div>
		);
	}

	return (
		<div
			className="flex items-center justify-between w-full cursor-pointer hover:bg-secondary/50 p-2 rounded-md"
			onClick={onEdit}
			role="button"
			tabIndex={0}
			onKeyDown={(e) => e.key === 'Enter' && onEdit()}
		>
			<LocationDisplay location={location} />
		</div>
	);
};

const Locations = ({ control, token, tenantId }: Props) => {
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
			console.error('Failed to fetch location list:', err);
			setError('Failed to load locations');
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
		if (selectedLocation) {
			update(index, {
				location_id: selectedLocation.id || '',
				name: selectedLocation.name,
				location_type: selectedLocation.location_type,
				is_active: Boolean(selectedLocation.is_active),
			});
		}
		setEditingIndex(null);
	};

	// Add a new location
	const handleAddLocation = () => {
		append({
			location_id: '',
			name: '',
			location_type: '',
			is_active: false,
		});
		setEditingIndex(fields.length);
	};

	// Fetch locations when component mounts
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
				>
					<Plus />
					Add Location
				</Button>
			</CardHeader>
			<CardContent className="pt-0">
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
															>
																<SelectTrigger className="w-full">
																	<SelectValue placeholder="Select a location" />
																</SelectTrigger>
																<SelectContent>
																	<SelectGroup>
																		{isLoading ? (
																			<SelectItem value="loading" disabled>
																				Loading locations...
																			</SelectItem>
																		) : error ? (
																			<SelectItem value="error" disabled>
																				{error}
																			</SelectItem>
																		) : locationsList.length === 0 ? (
																			<SelectItem value="empty" disabled>
																				No locations available
																			</SelectItem>
																		) : (
																			locationsList.map((loc) => (
																				<LocationSelectItem
																					key={loc.id}
																					location={loc}
																				/>
																			))
																		)}
																	</SelectGroup>
																</SelectContent>
															</Select>
														) : (
															<LocationValue
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
											variant={'ghost'}
											size={'sm'}
											onClick={() => remove(index)}
											aria-label="Remove location"
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
