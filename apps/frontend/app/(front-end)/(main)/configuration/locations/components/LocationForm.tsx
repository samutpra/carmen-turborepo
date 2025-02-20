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
import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
} from 'lucide-react';
import { useRouter } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

	const [availableUsers, setAvailableUsers] = useState<UserLocationModel[]>(
		defaultValues?.users?.in_active || []
	);

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
			router.push('/configuration/locations');
			return;
		}

		form.reset(originalValues);
		setAvailableUsers(defaultValues?.users?.in_active || []);
		setSelectedUsersToDelete([]);
		setSelectedUsersToAdd([]);
		setIsEdit(false);
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

	const handleMoveLeftConfirm = () => {
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
		setShowDeleteDialog(false);
	};

	const handleCheckAll = (
		checked: boolean,
		tableType: 'active' | 'inactive'
	) => {
		if (tableType === 'active') {
			if (checked) {
				const allUserIds = originalValues.users.active.map((user) => user.id);
				setSelectedUsersToDelete(allUserIds);
			} else {
				setSelectedUsersToDelete([]);
			}
		} else {
			if (checked) {
				const allUserIds = availableUsers.map((user) => user.id);
				setSelectedUsersToAdd(allUserIds);
			} else {
				setSelectedUsersToAdd([]);
			}
		}
	};

	return (
		<Form {...form} data-id="location-form">
			<form onSubmit={form.handleSubmit(onSubmit)} data-id="location-form-form">
				<div
					className="p-6 flex flex-col space-y-4"
					data-id="location-form-div"
				>
					<LocationsInfo
						control={form.control}
						token={token}
						tenantId={tenantId}
						isEdit={isEdit}
						setIsEdit={setIsEdit}
						onCancel={onCancel}
						defaultValues={originalValues}
						data-id="location-info"
					/>

					<Card>
						<CardHeader className="px-6 pt-6 pb-2">
							<CardTitle className="text-xl font-bold">
								Assigned Users
							</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-col items-center justify-center lg:flex-row gap-4 p-4">
							<UserTable
								users={originalValues.users.active}
								selectedUsers={selectedUsersToDelete}
								isEdit={isEdit}
								onUserChange={handleUserChange}
								title="Available Users"
								data-id="location-form-user-table"
								onCheckAll={(checked) => handleCheckAll(checked, 'active')}
							/>
							<div
								className="flex flex-row lg:flex-col gap-2"
								data-id="location-form-user-table-button-div"
							>
								<Button
									variant={'outline'}
									type="button"
									size="icon"
									onClick={(e) => {
										e.preventDefault();
										handleMoveRight();
									}}
									disabled={!isEdit || selectedUsersToDelete.length === 0}
									data-id="location-form-user-table-button"
								>
									<ChevronDown className="block lg:hidden" />
									<ChevronRight className="hidden lg:block" />
								</Button>
								<Button
									variant={'outline'}
									type="button"
									size="icon"
									onClick={(e) => {
										e.preventDefault();
										setShowDeleteDialog(true);
									}}
									disabled={!isEdit || selectedUsersToAdd.length === 0}
									data-id="location-form-user-table-button"
								>
									<ChevronUp className="block lg:hidden" />
									<ChevronLeft className="hidden lg:block" />
								</Button>
							</div>
							<UserTable
								users={availableUsers}
								selectedUsers={selectedUsersToAdd}
								isEdit={isEdit}
								onUserChange={handleAddUserChange}
								title="Assigned Users"
								data-id="location-form-user-table"
								onCheckAll={(checked) => handleCheckAll(checked, 'inactive')}
							/>
						</CardContent>
					</Card>
				</div>
			</form>

			<AlertDialog
				open={showDeleteDialog}
				onOpenChange={setShowDeleteDialog}
				data-id="location-form-alert-dialog"
			>
				<AlertDialogContent data-id="location-form-alert-dialog-content">
					<AlertDialogHeader data-id="location-form-alert-dialog-header">
						<AlertDialogTitle data-id="location-form-alert-dialog-title">
							Are you sure?
						</AlertDialogTitle>
						<AlertDialogDescription>
							This will add the selected users to the active users list.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter data-id="location-form-alert-dialog-footer">
						<AlertDialogCancel data-id="location-form-alert-dialog-cancel">
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleMoveLeftConfirm}
							data-id="location-form-alert-dialog-action"
						>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</Form>
	);
};

export default LocationForm;
