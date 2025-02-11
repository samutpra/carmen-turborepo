import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { fetchData } from '@/app/(front-end)/services/client';
import { toastError } from '@/components/ui-custom/Toast';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type LocationData = {
	id: string;
	name: string;
};

const LocationSkeleton = () => (
	<Card>
		<CardContent className="p-6">
			<div className="grid gap-4">
				<div className="flex flex-col gap-1">
					<span className="text-sm font-medium text-muted-foreground">
						Location ID
					</span>
					<Skeleton className="h-4 w-[200px]" />
				</div>
				<div className="flex flex-col gap-1">
					<span className="text-sm font-medium text-muted-foreground">
						Location Name
					</span>
					<Skeleton className="h-4 w-[200px]" />
				</div>
			</div>
		</CardContent>
	</Card>
);

const Location = () => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [location, setLocation] = useState<LocationData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadLocation = async () => {
			setLoading(true);
			try {
				const response = await fetchData(
					'/api/product-management/products/location',
					token,
					tenantId
				);
				setLocation(response.data);
			} catch (err) {
				console.error('Error fetching location:', err);
				toastError({ message: 'Failed to fetch location data' });
			} finally {
				setLoading(false);
			}
		};

		loadLocation();
	}, [token]);

	if (loading) {
		return <LocationSkeleton />;
	}

	return (
		<Card>
			<CardContent className="p-6">
				<div className="grid gap-4">
					<div className="flex flex-col gap-1">
						<span className="text-sm font-medium text-muted-foreground">
							Location ID
						</span>
						<span className="text-sm">{location?.id}</span>
					</div>
					<div className="flex flex-col gap-1">
						<span className="text-sm font-medium text-muted-foreground">
							Location Name
						</span>
						<span className="text-sm">{location?.name}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default Location;
