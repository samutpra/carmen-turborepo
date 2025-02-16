import React, { useState } from 'react';
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

interface LocationsProps {
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
			<div className={`text-xs text-muted-foreground flex`}>
				<div className="flex items-center">
					<span className="bg-secondary px-1.5 py-0.5 rounded-sm">
						{location.location_type?.toUpperCase()}
					</span>
					<span
						className={`px-1.5 py-0.5 rounded-sm ${
							location.is_active
								? 'bg-green-100 text-green-700'
								: 'bg-red-100 text-red-700'
						}`}
					>
						{location.is_active ? 'Active' : 'Inactive'}
					</span>
				</div>
			</div>
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

const Locations = ({ control, token, tenantId }: LocationsProps) => {
	const [locationsList, setLocationsList] = useState<LocationCreateModel[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { fields, append, remove } = useFieldArray({
		name: 'locations.add',
		control: control,
	});

	const handleFetchLocationList = async () => {
		if (locationsList.length > 0) return;

		setIsLoading(true);
		setError(null);
		try {
			const response = await fetchLocationList(token, tenantId);
			if (!response) {
				throw new Error('No data received');
			}
			setLocationsList(response.data);
		} catch (err: unknown) {
			console.error('Failed to fetch location list:', err);
			setError('Failed to load locations');
			setLocationsList([]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSelectOpen = async (open: boolean) => {
		if (open) {
			try {
				await handleFetchLocationList();
			} catch (err) {
				console.error('Error in handleSelectOpen:', err);
			}
		}
	};

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Locations</CardTitle>
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={() => append({ location_id: '' })}
				>
					<Plus />
					Add Location
				</Button>
			</CardHeader>
			<CardContent className="pt-0">
				{fields.map((field, index) => (
					<div key={field.id} className="flex items-center">
						<Form.FormField
							control={control}
							name={`locations.add.${index}.location_id`}
							render={({ field }) => (
								<Form.FormItem className="flex-1">
									<Form.FormControl>
										<Select
											value={field.value}
											onValueChange={field.onChange}
											onOpenChange={handleSelectOpen}
										>
											<SelectTrigger className="w-full h-auto items-start py-1 text-xs">
												<SelectValue placeholder="Select a location">
													{field.value && locationsList.length > 0 && (
														<LocationDisplay
															location={
																locationsList.find(
																	(loc) => loc.id === field.value
																)!
															}
														/>
													)}
												</SelectValue>
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
														locationsList.map((location) => (
															<LocationSelectItem
																key={location.id}
																location={location}
															/>
														))
													)}
												</SelectGroup>
											</SelectContent>
										</Select>
									</Form.FormControl>
									<Form.FormMessage />
								</Form.FormItem>
							)}
						/>
						<Button
							size={'sm'}
							onClick={() => remove(index)}
							variant={'ghost'}
							className="mt -2"
						>
							<Trash2 />
						</Button>
					</div>
				))}
			</CardContent>
		</Card>
	);
};

export default Locations;
