'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	enum_location_type,
	LocationCreateModel,
	LocationCreateSchema,
} from '@/dtos/location.dto';
import { Form } from '@/components/ui-custom/FormCustom';
import { useAuth } from '@/app/context/AuthContext';
import LocationsInfo from './LocationsInfo';

type Props = {
	defaultValues?: Partial<LocationCreateModel>;
};

const LocationForm = ({ defaultValues }: Props) => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [isEdit, setIsEdit] = useState(false);

	const [originalValues, setOriginalValues] = useState<
		Partial<LocationCreateModel>
	>(
		defaultValues || {
			name: '',
			description: '',
			is_active: true,
			location_type: enum_location_type.inventory,
			info: null,
			delivery_point_id: null,
			users: {
				add: [{ id: '' }],
				delete: [{ id: '' }],
			},
		}
	);

	const form = useForm<LocationCreateModel>({
		resolver: zodResolver(LocationCreateSchema),
		defaultValues: originalValues,
	});

	const onCancel = () => {
		form.reset(originalValues);
		setIsEdit(false);
	};

	const onSubmit = async (data: LocationCreateModel) => {
		if (!isEdit) return;

		try {
			console.log('Form submitted');
			console.log('Form data:', data);

			// Add your API call here
			// const response = await saveLocation(data);

			setOriginalValues(data);
			setIsEdit(false);
		} catch (error) {
			console.error('Submit error:', error);
		}
	};

	return (
		<div className="p-4">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} data-id="location-form">
					<LocationsInfo
						control={form.control}
						token={token}
						tenantId={tenantId}
						isEdit={isEdit}
						setIsEdit={setIsEdit}
						onCancel={onCancel}
						defaultValues={originalValues}
					/>
				</form>
			</Form>
		</div>
	);
};

export default LocationForm;
