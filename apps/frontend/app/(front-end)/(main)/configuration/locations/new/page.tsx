'use client';

import React from 'react';
import LocationForm from '../components/LocationForm';
import ProductLoading from '@/components/ui-custom/Loading/ProductLoading';
import useAvailableUsers from './useAvailableUsers';
import { formType } from '@/constants/enums';

const NewLocationPage = () => {
	const { availableUsers, isLoading } = useAvailableUsers();
	if (isLoading) return <ProductLoading />;
	return (
		<LocationForm
			data-id="location-form"
			type={formType.ADD}
			defaultValues={{
				users: {
					active: [],
					inactive: availableUsers,
				},
			}}
		/>

	);
};

export default NewLocationPage;
