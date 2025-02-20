'use client';

import React, { useEffect, useState } from 'react';
import LocationForm from '../components/LocationForm';
import { UserLocationModel } from '@/dtos/location.dto';
import { useAuth } from '@/app/context/AuthContext';
import ProductLoading from '@/components/ui-custom/Loading/ProductLoading';

const NewLocationPage = () => {
	const { accessToken } = useAuth();
	const [availableUsers, setAvailableUsers] = useState<UserLocationModel[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchAvailableUsers = async () => {
			if (!accessToken) return;

			try {
				const response = await fetch(
					'/api/configuration/locations/available-users',
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error('Failed to fetch available users');
				}

				const data = await response.json();
				setAvailableUsers(data.data);
			} catch (error) {
				console.error('Error fetching available users:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAvailableUsers();
	}, [accessToken]);

	if (isLoading) return <ProductLoading />;
	return (
		<LocationForm
			data-id="location-form"
			isNew={true}
			defaultValues={{
				users: {
					active: [],
					in_active: availableUsers,
				},
			}}
		/>
	);
};

export default NewLocationPage;
