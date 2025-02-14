import React, { Dispatch, SetStateAction, useEffect, useReducer, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { LocationChanges, LocationCreateModel, LocationData } from "@/dtos/location.dto";
import { fetchLocationList } from "../../../../actions/product";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
	token: string;
	tenantId: string;
	setLocations: Dispatch<SetStateAction<LocationChanges>>;
	isEdit: boolean;
	setOriginalLocations: Dispatch<SetStateAction<LocationData[]>>;
	originalLocations: LocationData[];
	loading: boolean;
}

type State = {
	addedLocations: { location_id: string }[];
	editedLocations: { location_id: string }[];
	deletedLocations: { location_id: string }[];
};

type Action =
	| { type: "ADD"; payload: { location_id: string } }
	| { type: "EDIT"; payload: { location_id: string } }
	| { type: "DELETE"; payload: { location_id: string } };

const initialState: State = {
	addedLocations: [],
	editedLocations: [],
	deletedLocations: [],
};

const reducer = (state: State, action: Action) => {
	switch (action.type) {
		case "ADD":
			return { ...state, addedLocations: [...state.addedLocations, action.payload] };
		case "EDIT":
			if (!state.editedLocations.some(loc => loc.location_id === action.payload.location_id)) {
				return { ...state, editedLocations: [...state.editedLocations, action.payload] };
			}
			return state;
		case "DELETE":
			return {
				...state,
				addedLocations: state.addedLocations.filter(loc => loc.location_id !== action.payload.location_id),
				editedLocations: state.editedLocations.filter(loc => loc.location_id !== action.payload.location_id),
				deletedLocations: [...state.deletedLocations, action.payload],
			};
		default:
			return state;
	}
}

const Location: React.FC<Props> = ({
	token,
	tenantId,
	setLocations,
	isEdit,
	originalLocations,
	setOriginalLocations,
	loading
}) => {
	const [error, setError] = useState<string | null>(null);
	const [locationsList, setLocationsList] = useState<LocationCreateModel[]>([]);
	const [state, dispatch] = useReducer(reducer, initialState);
	const [newLocationId, setNewLocationId] = useState<string>("");
	const [isAddingNew, setIsAddingNew] = useState(false);

	useEffect(() => {
		setLocations({
			add: state.addedLocations,
			edit: state.editedLocations,
			delete: state.deletedLocations,
		});
	}, [state]);

	console.log('originalLocations', originalLocations);


	const handleFetchLocationList = async () => {
		if (locationsList.length > 0) return;
		try {
			const data = await fetchLocationList(token, tenantId);
			setLocationsList(data);
		} catch (err: unknown) {
			console.error("Failed to fetch location list:", err);
			setError("Failed to fetch location data");
		}
	};

	const handleSelectOpen = (open: boolean) => {
		if (open && locationsList.length === 0) {
			handleFetchLocationList();
		}
	};

	const handleAddRow = () => {
		setIsAddingNew(true);
		handleFetchLocationList();
	};

	const handleConfirmAdd = (selectedId: string) => {
		const selectedLocation = findLocationById(selectedId);
		if (!selectedLocation) {
			setError("Selected location not found");
			return;
		}

		const newRow: LocationData = {
			location_id: selectedLocation.id ?? "",
			location_name: selectedLocation.name ?? "",
			location_type: selectedLocation.location_type ?? "",
		};

		setOriginalLocations(prev => [...prev, newRow]);
		dispatch({ type: "ADD", payload: { location_id: newRow.location_id } });
		setIsAddingNew(false);
		setNewLocationId("");
		setError(null);
	};

	const handleDeleteRow = (locationId: string) => {
		const updatedLocations = originalLocations.filter((loc) => loc.location_id !== locationId);
		setOriginalLocations(updatedLocations);
		dispatch({ type: "DELETE", payload: { location_id: locationId } });
	};

	const findLocationById = (selectedId: string) => {
		return locationsList.find((loc) => loc.id === selectedId);
	};


	if (error) {
		return (
			<div className="p-4 text-red-500 bg-red-50 rounded-md" role="alert">
				{error}
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
								{originalLocations.map(({ location_id, location_name, location_type }) => (
									<TableRow key={location_id} className="text-xs">
										<TableCell>
											{isEdit && state.addedLocations.some((loc) => loc.location_id === location_id) ? (
												<Select
													defaultValue={location_id} // เพิ่ม defaultValue
													onValueChange={(value) => {
														const selectedLoc = locationsList.find(loc => loc.id === value);
														if (selectedLoc) {
															const updatedLocations = originalLocations.map((loc) =>
																loc.location_id === location_id
																	? {
																		...loc,
																		location_id: selectedLoc.id ?? "",
																		location_name: selectedLoc.name ?? "",
																		location_type: selectedLoc.location_type ?? ""
																	}
																	: loc
															);
															setOriginalLocations(updatedLocations);
															dispatch({ type: "EDIT", payload: { location_id: selectedLoc.id ?? "" } });
														}
													}}
													onOpenChange={handleSelectOpen}
												>
													<SelectTrigger className="w-full h-8">
														<SelectValue>
															{locationsList.find(loc => loc.id === location_id)?.name || location_name}
														</SelectValue>
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															{loading ? (
																<SelectItem value="" disabled>
																	Loading...
																</SelectItem>
															) : error ? (
																<SelectItem value="" disabled>
																	{error}
																</SelectItem>
															) : (
																locationsList.map((location) => (
																	<SelectItem
																		key={location.id ?? ""}
																		value={location.id ?? ""}
																	>
																		{location.name}
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
								))}
								{isAddingNew && (
									<TableRow>
										<TableCell>
											<Select
												value={newLocationId}
												onValueChange={handleConfirmAdd}
												onOpenChange={(open) => open && handleFetchLocationList()}
											>
												<SelectTrigger className="w-full h-8">
													<SelectValue placeholder="Select location" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														{loading ? (
															<SelectItem value="" disabled>
																Loading...
															</SelectItem>
														) : error ? (
															<SelectItem value="" disabled>
																{error}
															</SelectItem>
														) : (
															locationsList
																.filter(location =>
																	!originalLocations.some(
																		existingLoc => existingLoc.location_id === location.id
																	)
																)
																.map((location) => (
																	<SelectItem key={location.id ?? ""} value={location.id ?? ""}>
																		{location.name}
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