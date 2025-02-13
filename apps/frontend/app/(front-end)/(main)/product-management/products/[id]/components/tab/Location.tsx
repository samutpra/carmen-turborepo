import React, { useEffect, useState } from "react";
import { fetchData } from "@/app/(front-end)/services/client";
import { toastError } from "@/components/ui-custom/Toast";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type LocationData = {
	id: string;
	location_id: string;
	location_name: string;
	location_type: string;
};

interface Props {
	id: string;
	token: string;
	tenantId: string;
	locations: LocationData[];
	setLocations: (data: LocationData[]) => void;
}

const LocationSkeleton = () => (
	<Card>
		<CardContent className="p-6">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Location Name</TableHead>
						<TableHead>Location Type</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{[...Array(3)].map((_, index) => (
						<TableRow key={index}>
							<TableCell>
								<Skeleton className="h-4 w-[150px]" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-[100px]" />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
);

const Location: React.FC<Props> = ({
	id,
	token,
	tenantId,
	locations,
	setLocations
}) => {

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadLocation = async () => {
			setLoading(true);
			try {
				const response = await fetchData(
					`/api/product-management/products/location/${id}`,
					token,
					tenantId
				);
				setLocations(response.data.data || []);
			} catch (err) {
				console.error("Error fetching location:", err);
				toastError({ message: "Failed to fetch location data" });
			} finally {
				setLoading(false);
			}
		};

		if (id && token) {
			loadLocation();
		}
	}, [id, token]);

	if (loading) {
		return <LocationSkeleton />;
	}

	return (
		<Card>
			<CardContent className="p-6">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-40">Location Name</TableHead>
							<TableHead>Location Type</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{locations.length > 0 ? (
							locations.map((location) => (
								<TableRow key={location.id}>
									<TableCell>{location.location_name}</TableCell>
									<TableCell>{location.location_type}</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={2} className="text-center text-muted-foreground">
									No locations found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export default Location;
