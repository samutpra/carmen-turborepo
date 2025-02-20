'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	enum_location_type,
	LocationsModel,
	LocationSchema,
	UserLocationModel,
} from '@/dtos/location.dto';
import { Form } from '@/components/ui-custom/FormCustom';
import { useAuth } from '@/app/context/AuthContext';
import LocationsInfo from './LocationsInfo';
import UserTable from './UserTable';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
	defaultValues?: Partial<
		LocationsModel & {
			users: {
				active: UserLocationModel[];
				in_active: UserLocationModel[];
			};
		}
	>;
	isNew?: boolean;
};

// Define the form state type
interface LocationFormState {
	id: string;
	name: string;
	description: string;
	is_active: boolean;
	location_type: enum_location_type;
	delivery_point: {
		id: string;
		name: string;
	};
	users: {
		active: UserLocationModel[];
		in_active: UserLocationModel[];
	};
}

const LocationForm = ({ defaultValues, isNew = false }: Props) => {
	const router = useRouter();
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [isEdit, setIsEdit] = useState(isNew);

	// Initialize with empty arrays for users
	const [originalValues, setOriginalValues] = useState<LocationFormState>(
		defaultValues
			? {
					id: defaultValues.id || '',
					name: defaultValues.name || '',
					description: defaultValues.description || '',
					is_active: defaultValues.is_active ?? true,
					location_type:
						(defaultValues.location_type as enum_location_type) ||
						enum_location_type.inventory,
					delivery_point: defaultValues.delivery_point || { id: '', name: '' },
					users: defaultValues.users || { active: [], in_active: [] },
				}
			: {
					id: '',
					name: '',
					description: '',
					is_active: true,
					location_type: enum_location_type.inventory,
					delivery_point: { id: '', name: '' },
					users: { active: [], in_active: [] },
				}
	);

	// Initialize available users with empty array if undefined
	const [availableUsers, setAvailableUsers] = useState<UserLocationModel[]>(
		defaultValues?.users?.in_active || []
	);

	console.log('availableUsers', availableUsers);

	const [selectedUsersToDelete, setSelectedUsersToDelete] = useState<string[]>(
		[]
	);
	const [selectedUsersToAdd, setSelectedUsersToAdd] = useState<string[]>([]);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	const form = useForm<LocationFormState>({
		resolver: zodResolver(LocationSchema),
		defaultValues: originalValues,
	});

	const onCancel = () => {
		if (isNew) {
			// If it's a new form, navigate back to locations list
			router.push('/configuration/locations');
			return;
		}

		// Reset form to original values
		form.reset(originalValues);

		// Reset available users to original state
		setAvailableUsers(defaultValues?.users?.in_active || []);

		// Clear any selected users
		setSelectedUsersToDelete([]);
		setSelectedUsersToAdd([]);

		// Exit edit mode
		setIsEdit(false);

		// Reset original values to initial state
		setOriginalValues(
			defaultValues
				? {
						id: defaultValues.id || '',
						name: defaultValues.name || '',
						description: defaultValues.description || '',
						is_active: defaultValues.is_active ?? true,
						location_type:
							(defaultValues.location_type as enum_location_type) ||
							enum_location_type.inventory,
						delivery_point: defaultValues.delivery_point || {
							id: '',
							name: '',
						},
						users: defaultValues.users || { active: [], in_active: [] },
					}
				: {
						id: '',
						name: '',
						description: '',
						is_active: true,
						location_type: enum_location_type.inventory,
						delivery_point: { id: '', name: '' },
						users: { active: [], in_active: [] },
					}
		);
	};

	const onSubmit = async (formData: LocationFormState) => {
		console.log('formData', formData);

		setOriginalValues(formData);
		setIsEdit(false);
	};

	const handleUserChange = (userId: string) => {
		setSelectedUsersToDelete((prev) =>
			prev.includes(userId)
				? prev.filter((id) => id !== userId)
				: [...prev, userId]
		);
	};

	const handleAddUserChange = (userId: string) => {
		setSelectedUsersToAdd((prev) =>
			prev.includes(userId)
				? prev.filter((id) => id !== userId)
				: [...prev, userId]
		);
	};

	const handleMoveRight = () => {
		const selectedUsers = originalValues.users.active.filter((user) =>
			selectedUsersToDelete.includes(user.id)
		);

		const updatedActiveUsers = originalValues.users.active.filter(
			(user) => !selectedUsersToDelete.includes(user.id)
		);

		const updatedInactiveUsers = [...availableUsers, ...selectedUsers];

		// Update both active and inactive users in form values
		form.setValue('users.active', updatedActiveUsers, { shouldValidate: true });
		form.setValue('users.in_active', updatedInactiveUsers, {
			shouldValidate: true,
		});

		setOriginalValues((prev) => ({
			...prev,
			users: {
				...prev.users,
				active: updatedActiveUsers,
				in_active: updatedInactiveUsers,
			},
		}));

		setAvailableUsers(updatedInactiveUsers);
		setSelectedUsersToDelete([]);
		setShowDeleteDialog(false);
	};

	const handleMoveLeft = () => {
		const selectedUsers = availableUsers.filter((user) =>
			selectedUsersToAdd.includes(user.id)
		);

		const updatedActiveUsers = [
			...originalValues.users.active,
			...selectedUsers,
		];
		const updatedAvailableUsers = availableUsers.filter(
			(user) => !selectedUsersToAdd.includes(user.id)
		);

		// Update form values
		form.setValue('users.active', updatedActiveUsers, { shouldValidate: true });
		form.setValue('users.in_active', updatedAvailableUsers, {
			shouldValidate: true,
		});

		setOriginalValues((prev) => ({
			...prev,
			users: {
				...prev.users,
				active: updatedActiveUsers,
			},
		}));

		setAvailableUsers(updatedAvailableUsers);
		setSelectedUsersToAdd([]);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} data-id="location-form">
				<div className="p-6 flex flex-col space-y-4">
					<LocationsInfo
						control={form.control}
						token={token}
						tenantId={tenantId}
						isEdit={isEdit}
						setIsEdit={setIsEdit}
						onCancel={onCancel}
						defaultValues={originalValues}
					/>
					<div className="flex flex-col lg:flex-row items-center w-full gap-4">
						<UserTable
							users={originalValues.users.active}
							selectedUsers={selectedUsersToDelete}
							isEdit={isEdit}
							onUserChange={handleUserChange}
							title="Active Users"
						/>
						<div className="flex flex-col gap-2">
							<Button
								variant="outline"
								type="button"
								size="icon"
								onClick={(e) => {
									e.preventDefault();
									setShowDeleteDialog(true);
								}}
								disabled={!isEdit || selectedUsersToDelete.length === 0}
							>
								<ChevronRight className="h-4 w-4" />
							</Button>
							<Button
								variant="outline"
								type="button"
								size="icon"
								onClick={(e) => {
									e.preventDefault();
									handleMoveLeft();
								}}
								disabled={!isEdit || selectedUsersToAdd.length === 0}
							>
								<ChevronLeft className="h-4 w-4" />
							</Button>
						</div>
						<UserTable
							users={availableUsers}
							selectedUsers={selectedUsersToAdd}
							isEdit={isEdit}
							onUserChange={handleAddUserChange}
							title="Available Users"
						/>
					</div>
				</div>
			</form>

			<AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This will remove the selected users from the active users list.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={handleMoveRight}>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</Form>
	);
};

export default LocationForm;
