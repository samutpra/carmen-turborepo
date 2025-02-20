'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	enum_location_type,
	LocationCreateModel,
	LocationCreateSchema,
} from '@/dtos/location.dto';
import {
	Form,
	FormControl,
	FormField,
	FormMessage,
} from '@/components/ui-custom/FormCustom';
import { useAuth } from '@/app/context/AuthContext';
import LocationsInfo from './LocationsInfo';
import UserTable from './UserTable';
import UserActions from './UserActions';
import UserDialog from './UserDialog';
import { Card } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { FormItem } from '@/components/ui/form';
import { InputCustom } from '@/components/ui-custom/InputCustom';
import { Checkbox } from '@/components/ui/checkbox';

type Props = {
	defaultValues?: Partial<LocationCreateModel>;
};

const LocationForm = ({ defaultValues }: Props) => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [isEdit, setIsEdit] = useState(false);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [originalValues, setOriginalValues] = useState<any>(
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

	console.log('originalValues', defaultValues);
	console.log('isEdit', isEdit);

	const form = useForm<LocationCreateModel>({
		resolver: zodResolver(LocationCreateSchema),
		defaultValues: originalValues,
	});

	const onCancel = () => {
		form.reset(originalValues);
		setIsEdit(false);
	};

	const onSubmit = async (data: LocationCreateModel) => {
		console.log('Form submitted');
		console.log('Form data:', data);

		// Add your API call here
		// const response = await saveLocation(formData);

		setOriginalValues(data);
		setIsEdit(false);
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
						<Card className="w-full lg:w-1/2 p-4 h-[55vh] overflow-y-auto">
							<p className="px-2 text-md font-semibold">Active User</p>
							<Table>
								<TableHeader>
									<TableRow>
										{isEdit && <TableHead className="w-[30px]"></TableHead>}
										<TableHead>Full Name</TableHead>
										<TableHead>Email</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{originalValues.users?.length > 0 ? (
										// eslint-disable-next-line @typescript-eslint/no-explicit-any
										originalValues.users?.map((user: any) => (
											<TableRow key={user.id}>
												{isEdit && (
													<TableCell className="font-medium">
														<FormField
															control={form.control}
															name={`users.delete.${user.id}`}
															render={({ field }) => (
																<FormItem>
																	<FormControl>
																		<Checkbox
																			id={user.id}
																			checked={!!field.value}
																			onCheckedChange={(checked) =>
																				field.onChange(checked)
																			}
																		/>
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>
													</TableCell>
												)}

												<TableCell className="font-medium">
													{user.full_name}
												</TableCell>
												<TableCell>{user.email}</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell
												colSpan={isEdit ? 3 : 2}
												className="text-center"
											>
												No users found.
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</Card>
					</div>
				</div>
			</form>
		</Form>
	);
};

export default LocationForm;
