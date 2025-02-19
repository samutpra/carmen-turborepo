"use client";
import React, { useEffect, useState } from 'react';
import {
	enum_location_type,
	LocationCreateModel,
	LocationCreateSchema,
} from '@/dtos/location.dto';
import { useAuth } from '@/app/context/AuthContext';
import LocationHeaderDetail from './LocationHeaderDetail';

import { fetchLocationByID } from '../../actions/store_location';
import ProductLoading from '@/components/ui-custom/Loading/ProductLoading';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import UserTable from './UserTable';
import UserActions from './UserActions';
import UserDialog from './UserDialog';

const userActive = [
	{ id: 'user-1', full_name: 'John Doe', email: 'john.doe@example.com' },
	{ id: 'user-2', full_name: 'Jane Smith', email: 'jane.smith@example.com' },
	{
		id: 'user-3',
		full_name: 'Alice Johnson',
		email: 'alice.johnson@example.com',
	},
	{ id: 'user-4', full_name: 'Bob Brown', email: 'bob.brown@example.com' },
];

const userAvailable = [
	{
		id: 'user-5',
		full_name: 'Charlie Davis',
		email: 'charlie.davis@example.com',
	},
	{ id: 'user-6', full_name: 'Eva Wilson', email: 'eva.wilson@example.com' },
	{ id: 'user-7', full_name: 'Frank Lee', email: 'frank.lee@example.com' },
	{ id: 'user-8', full_name: 'Grace Moore', email: 'grace.moore@example.com' },
	{
		id: 'user-9',
		full_name: 'Hannah Taylor',
		email: 'hannah.taylor@example.com',
	},
	{
		id: 'user-10',
		full_name: 'Ivy Anderson',
		email: 'ivy.anderson@example.com',
	},
	{ id: 'user-11', full_name: 'Jack Thomas', email: 'jack.thomas@example.com' },
	{ id: 'user-12', full_name: 'Karen Clark', email: 'karen.clark@example.com' },
	{ id: 'user-13', full_name: 'Linda Lewis', email: 'linda.lewis@example.com' },
	{ id: 'user-14', full_name: 'Mike Scott', email: 'mike.scott@example.com' },
];

interface Props {
	id: string;
}

const StoreLcationDetails: React.FC<Props> = ({ id }) => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [locationData, setLocationData] = useState<LocationCreateModel | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(true);
	const [mockUsers, setMockUsers] = useState(userActive);
	const [listUser, setListUser] = useState(userAvailable);
	const [selectedActiveUsers, setSelectedActiveUsers] = useState<string[]>([]);
	const [selectedAvailableUsers, setSelectedAvalibleUsers] = useState<string[]>(
		[]
	);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isEdit, setIsEdit] = useState(false);

	const defaultLocationValues: LocationCreateModel = {
		name: locationData?.name || '',
		location_type: enum_location_type.inventory,
		description: locationData?.description || '',
		is_active: locationData?.is_active ?? true,
		delivery_point_id: locationData?.delivery_point_id || '',
		info: locationData?.info ?? undefined,
		users: locationData?.users ?? undefined,
	};

	const form = useForm<LocationCreateModel>({
		resolver: zodResolver(LocationCreateSchema),
		defaultValues: defaultLocationValues,
	});

	const onSubmit = form.handleSubmit((data) => {
		// Debugging: Check if the onSubmit function is called and what data is received
		console.log('Received Data from LocationHeaderDetail:', data);

		// Create a structured log for submission
		const logData = {
			...data, // Spread the location data
			users: {
				add: selectedAvailableUsers.map((id) => ({ id })),
				delete: selectedActiveUsers.map((id) => ({ id })),
			},
		};

		// Log the summary when the form is submitted
		console.log('Submission log:', logData);

		setLocationData(data);
	});

	useEffect(() => {
		const loadData = async () => {
			setIsLoading(true);
			const data = await fetchLocationByID(id, token, tenantId);
			setLocationData(data);
			setIsLoading(false);
		};

		loadData();
	}, [id, accessToken]);

	const addHandleChange = (id: string) => {
		if (selectedActiveUsers.includes(id)) {
			setSelectedActiveUsers(
				selectedActiveUsers.filter((userId) => userId !== id)
			);
		} else {
			setSelectedActiveUsers([...selectedActiveUsers, id]);
		}
	};

	const deleteHandleChange = (id: string) => {
		if (selectedAvailableUsers.includes(id)) {
			setSelectedAvalibleUsers(
				selectedAvailableUsers.filter((userId) => userId !== id)
			);
		} else {
			setSelectedAvalibleUsers([...selectedAvailableUsers, id]);
		}
	};

	const onDelete = () => {
		const selectedUserData = mockUsers.filter((user) =>
			selectedActiveUsers.includes(user.id)
		);

		// Remove individual log for delete
		setListUser((prevListUser) => [...prevListUser, ...selectedUserData]);
		setMockUsers((prevMockUsers) =>
			prevMockUsers.filter((user) => !selectedActiveUsers.includes(user.id))
		);
		setSelectedActiveUsers([]);
		setIsDialogOpen(false);
	};

	const onCreate = () => {
		const selectedUserData = listUser.filter((user) =>
			selectedAvailableUsers.includes(user.id)
		);

		// Remove individual log for add
		setMockUsers((prevMockUsers) => [...prevMockUsers, ...selectedUserData]);
		setListUser((prevListUser) =>
			prevListUser.filter((user) => !selectedAvailableUsers.includes(user.id))
		);
		setSelectedAvalibleUsers([]);
	};

	const onCancel = () => {
		setIsEdit(false);
		setSelectedActiveUsers([]);
		setSelectedAvalibleUsers([]);
	};

	if (isLoading) return <ProductLoading />;

	return (
		<form onSubmit={onSubmit}>
			<div className="p-6 flex flex-col space-y-4">
				<LocationHeaderDetail
					name={locationData?.name || ''}
					type={locationData?.location_type as enum_location_type}
					description={locationData?.description || ''}
					delivery_point_id={locationData?.delivery_point_id || ''}
					is_active={Boolean(locationData?.is_active)}
					isEdit={isEdit}
					setIsEdit={setIsEdit}
					onCancel={onCancel}
					token={token}
					tenantId={tenantId}
					onSubmitData={(data) => {
						console.log('Data received in StoreLcationDetails:', data); // Log the data received
						setLocationData(data);
					}}
				/>

				<div className="flex flex-col lg:flex-row items-center w-full gap-4">
					<UserTable
						users={mockUsers}
						selectedUsers={selectedActiveUsers}
						isEdit={isEdit}
						onUserChange={addHandleChange}
						title="Active User"
					/>
					<UserActions
						isEdit={isEdit}
						selectedActiveUsers={selectedActiveUsers}
						selectedAvailableUsers={selectedAvailableUsers}
						onCreate={onCreate}
						onDelete={onDelete}
						isDialogOpen={isDialogOpen}
						setIsDialogOpen={setIsDialogOpen}
					/>
					<UserTable
						users={listUser}
						selectedUsers={selectedAvailableUsers}
						isEdit={isEdit}
						onUserChange={deleteHandleChange}
						title="Available User"
					/>
				</div>
				<UserDialog
					isOpen={isDialogOpen}
					onClose={() => setIsDialogOpen(false)}
					onConfirm={onDelete}
				/>
			</div>
		</form>
	);
};

export default StoreLcationDetails;