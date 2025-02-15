import React, { Dispatch, SetStateAction } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { LocationCreateModel, LocationData } from '@/dtos/location.dto';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { PRODUCT_ACTION } from '../../page';

interface Props {
	isEdit: boolean;
	setOriginalLocations: Dispatch<SetStateAction<LocationData[]>>;
	originalLocations: LocationData[];
	loading: boolean;
	locationsList: LocationCreateModel[];
	isAddingNew: boolean;
	setIsAddingNew: Dispatch<SetStateAction<boolean>>;
	newLocationId: string;
	setNewLocationId: Dispatch<SetStateAction<string>>;
	locationError: string | null;
	setLocationError: Dispatch<SetStateAction<string | null>>;
	handleFetchLocationList: () => Promise<void>;
	locationState: {
		addedLocations: { location_id: string }[];
		editedLocations: { location_id: string }[];
		deletedLocations: { location_id: string }[];
	};
	onLocationStateChange: (action: {
		type: PRODUCT_ACTION;
		payload: { location_id: string };
	}) => void;
}

const Location: React.FC<Props> = ({
	isEdit,
	originalLocations,
	setOriginalLocations,
	loading,
	locationsList,
	isAddingNew,
	setIsAddingNew,
	newLocationId,
	setNewLocationId,
	locationError: error,
	setLocationError: setError,
	handleFetchLocationList,
	locationState,
	onLocationStateChange,
}) => {
	const handleSelectOpen = async (open: boolean) => {
		if (open) {
			try {
				await handleFetchLocationList();
			} catch (err) {
				console.error('Error in handleSelectOpen:', err);
			}
		}
	};

	const handleAddRow = () => {
		setIsAddingNew(true);
		handleFetchLocationList();
	};

	const handleConfirmAdd = (selectedId: string) => {
		const selectedLocation = findLocationById(selectedId);
		if (!selectedLocation) {
			setError('Selected location not found');
			return;
		}

		const newRow: LocationData = {
			location_id: selectedLocation.id ?? '',
			location_name: selectedLocation.name ?? '',
			location_type: selectedLocation.location_type ?? '',
		};

		setOriginalLocations((prev) => [...prev, newRow]);
		onLocationStateChange({
			type: PRODUCT_ACTION.ADD,
			payload: { location_id: newRow.location_id },
		});
		setIsAddingNew(false);
		setNewLocationId('');
		setError(null);
	};

	const handleDeleteRow = (locationId: string) => {
		const updatedLocations = originalLocations.filter(
			(loc) => loc.location_id !== locationId
		);
		setOriginalLocations(updatedLocations);
		onLocationStateChange({
			type: PRODUCT_ACTION.DELETE,
			payload: { location_id: locationId },
		});
	};

	const findLocationById = (selectedId: string) => {
		return locationsList.find((loc) => loc.id === selectedId);
	};

	if (error) {
		return (
			<div className="p-4 text-red-500 bg-red-50 rounded-md" role="alert">
				<p>{error}</p>
				<Button
					onClick={() => {
						setError(null);
						handleFetchLocationList();
					}}
					variant="ghost"
					size="sm"
					className="mt-2"
				>
					Retry
				</Button>
			</div>
		);
	}

	return (
		<Card>
			<CardContent className="p-6">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold">Locations</h2>
					{isEdit && (
						<Button
							onClick={handleAddRow}
							size="sm"
							aria-label="Add new location"
							className="text-xs"
						>
							Add Location
						</Button>
					)}
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[10rem]">Location Name</TableHead>
							<TableHead>Location Type</TableHead>
							{isEdit && <TableHead className="w-[4rem]">Actions</TableHead>}
						</TableRow>
					</TableHeader>
					<TableBody>
						{originalLocations.length === 0 && !isAddingNew ? (
							<TableRow>
								<TableCell colSpan={isEdit ? 3 : 2} className="text-center">
									No locations available
								</TableCell>
							</TableRow>
						) : (
							<>
								{originalLocations.map(
									({ location_id, location_name, location_type }) => (
										<TableRow key={location_id} className="text-xs">
											<TableCell>
												{isEdit &&
												locationState.addedLocations.some(
													(loc) => loc.location_id === location_id
												) ? (
													<Select
														defaultValue={location_id || undefined}
														onValueChange={(value) => {
															const selectedLoc = locationsList.find(
																(loc) => loc.id === value
															);
															if (selectedLoc) {
																const updatedLocations = originalLocations.map(
																	(loc) =>
																		loc.location_id === location_id
																			? {
																					...loc,
																					location_id:
																						selectedLoc.id || 'default',
																					location_name:
																						selectedLoc.name || 'Unknown',
																					location_type:
																						selectedLoc.location_type ||
																						'default',
																				}
																			: loc
																);
																setOriginalLocations(updatedLocations);
																onLocationStateChange({
																	type: PRODUCT_ACTION.EDIT,
																	payload: {
																		location_id: selectedLoc.id || 'default',
																	},
																});
															}
														}}
														onOpenChange={handleSelectOpen}
													>
														<SelectTrigger className="w-full h-8">
															<SelectValue placeholder="Select location">
																{locationsList.find(
																	(loc) => loc.id === location_id
																)?.name || location_name}
															</SelectValue>
														</SelectTrigger>
														<SelectContent>
															<SelectGroup>
																{loading ? (
																	<SelectItem value="loading" disabled>
																		Loading locations...
																	</SelectItem>
																) : error ? (
																	<SelectItem value="error" disabled>
																		{error}
																	</SelectItem>
																) : (
																	locationsList.map((location) => (
																		<SelectItem
																			key={location.id}
																			value={location.id || 'default'}
																		>
																			{location.name || 'Unnamed Location'}
																		</SelectItem>
																	))
																)}
															</SelectGroup>
														</SelectContent>
													</Select>
												) : (
													<span>{location_name}</span>
												)}
											</TableCell>
											<TableCell>{location_type.toUpperCase()}</TableCell>
											{isEdit && (
												<TableCell>
													<Button
														variant="ghost"
														size="sm"
														onClick={() => handleDeleteRow(location_id)}
														aria-label={`Delete ${location_name}`}
														tabIndex={0}
													>
														<Trash />
													</Button>
												</TableCell>
											)}
										</TableRow>
									)
								)}
								{isAddingNew && (
									<TableRow>
										<TableCell>
											<Select
												value={newLocationId || undefined}
												onValueChange={handleConfirmAdd}
												onOpenChange={(open) =>
													open && handleFetchLocationList()
												}
											>
												<SelectTrigger className="w-full h-8">
													<SelectValue placeholder="Select location" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														{loading ? (
															<SelectItem value="loading" disabled>
																Loading locations...
															</SelectItem>
														) : error ? (
															<SelectItem value="error" disabled>
																{error}
															</SelectItem>
														) : (
															locationsList
																.filter(
																	(location) =>
																		!originalLocations.some(
																			(existingLoc) =>
																				existingLoc.location_id === location.id
																		)
																)
																.map((location) => (
																	<SelectItem
																		key={location.id}
																		value={location.id || 'default'}
																	>
																		{location.name || 'Unnamed Location'}
																	</SelectItem>
																))
														)}
													</SelectGroup>
												</SelectContent>
											</Select>
										</TableCell>
										<TableCell>-</TableCell>
										{isEdit && (
											<TableCell>
												<Button
													variant="ghost"
													size="sm"
													onClick={() => setIsAddingNew(false)}
													aria-label="Cancel adding"
													tabIndex={0}
												>
													<Trash />
												</Button>
											</TableCell>
										)}
									</TableRow>
								)}
							</>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export default Location;
