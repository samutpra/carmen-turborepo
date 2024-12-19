'use client';
import React, { useState } from 'react';
import SkeltonCardLoading from '@/components/ui-custom/Loading/SkeltonCardLoading';
import SkeletonTableLoading from '@/components/ui-custom/Loading/SkeltonTableLoading';
import DataTable from '@/components/templates/DataTable';
import DataCard from '@/components/templates/DataCard';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import { CustomButton } from '@/components/ui-custom/CustomButton';
import { PlusCircle, Printer, Search, Sheet } from 'lucide-react';
import DialogDelete from '@/components/ui-custom/DialogDelete';
import { useRouter } from '@/lib/i18n';
import {
	createLocation,
	deleteLocation,
	updateLocation,
	useLocations,
} from '../actions/location';
import { useAuth } from '@/app/context/AuthContext';
import SearchInput from '@/components/ui-custom/SearchInput';
import ErrorDisplay from '@/components/ErrorDisplay';

import LocationForm from './form/LocationForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as m from '@/paraglide/messages.js';
import {
	LocationLabel,
	LocationSchema,
	LocationType,
	PayloadLocationType,
} from '@carmensoftware/shared-types/src/locationSchema';

const StoreLocationList = () => {
	const { accessToken } = useAuth();
	const router = useRouter();
	const [dialogDelete, setDialogDelete] = useState(false);
	const [idToDelete, setIdToDelete] = useState<string | null | undefined>(null);
	const [editingItem, setEditingItem] = useState<LocationType | null>(null);
	const [dialogForm, setDialogForm] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const token = accessToken || '';

	const {
		locations,
		setLocations,
		loading,
		error,
		pagination,
		search,
		goToPage,
		nextPage,
		previousPage,
		setPerPage,
		handleSearch,
		fetchData,
	} = useLocations(token);

	const form = useForm<PayloadLocationType>({
		resolver: zodResolver(LocationSchema),
		defaultValues: {
			description: '',
			name: '',
			delivery_point_id: '',
			location_type: 'inventory',
			is_active: true,
		},
	});

	const handleView = (item: LocationType) => {
		router.push(`/configuration/store-location/${item.id}`);
	};

	const handleSave = async (data: LocationType) => {
		console.log('Submitting data:', data);
		try {
			setIsLoading(true);

			if (editingItem?.id) {
				const updatedFields: LocationType = {
					...data,
					id: editingItem.id,
				};
				const updatedLocation = await updateLocation(
					token,
					editingItem.id,
					updatedFields
				);
				setLocations((prev) =>
					prev.map((loc) => (loc.id === editingItem.id ? updatedLocation : loc))
				);
			} else {
				console.log('Creating new location with:', data);
				const newLocation = await createLocation(token, data);
				setLocations((prev) => [...prev, newLocation]);
			}

			handleCloseDialog();
		} catch (error) {
			console.error('Save error:', error);
			// อาจจะเพิ่ม toast หรือ alert แจ้ง error
		} finally {
			setIsLoading(false);
		}
	};

	const handleDelete = (item: LocationType) => {
		setIdToDelete(item.id);
		setDialogDelete(true);
	};

	const confirmDelete = async () => {
		try {
			if (idToDelete) {
				await deleteLocation(token, idToDelete);
				setLocations((prev) =>
					prev.filter((location) => location.id !== idToDelete)
				);
				fetchData();
				setDialogDelete(false);
			}
		} catch (error) {
			console.error('Error deleting currency:', error);
		} finally {
			setIdToDelete(null);
		}
	};

	const handleCloseDialog = () => {
		form.reset({
			description: '',
			name: '',
			delivery_point_id: '',
			location_type: 'inventory',
			is_active: true,
		});
		setDialogForm(false);
		setEditingItem(null);
	};

	const actionButtons = (
		<div className="flex flex-col gap-4 md:flex-row">
			<CustomButton
				className="w-full md:w-20"
				prefixIcon={<PlusCircle />}
				onClick={() => setDialogForm(true)}
			>
				Add
			</CustomButton>
			<div className="flex flex-row md:flex-row gap-4">
				<CustomButton
					className="w-full md:w-20"
					variant="outline"
					prefixIcon={<Sheet />}
				>
					Export
				</CustomButton>
				<CustomButton
					className="w-full md:w-20"
					variant="outline"
					prefixIcon={<Printer />}
				>
					Print
				</CustomButton>
			</div>
		</div>
	);

	const title = `${m.store_location()}`;

	const filter = (
		<div className="flex flex-col justify-start sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
			<div className="w-full sm:w-auto flex-grow">
				<SearchInput
					placeholder="Search Currency..."
					value={search}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						handleSearch(e.target.value, false);
					}}
					onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
						if (e.key === 'Enter') {
							e.preventDefault();
							handleSearch(e.currentTarget.value, true);
						}
					}}
					Icon={Search}
				/>
			</div>
		</div>
	);

	const columns: LocationLabel[] = [
		{ key: 'name', label: 'Name' },
		{ key: 'location_type', label: 'Location Type' },
		{ key: 'description', label: 'Description' },
		{ key: 'is_active', label: 'Active Status' },
		{ key: 'delivery_point_id', label: 'Delivery Point ID' },
	];

	const content = (
		<>
			<div className="block lg:hidden">
				{loading ? (
					<SkeltonCardLoading />
				) : error ? (
					<div className="text-red-500">{error.message}</div>
				) : (
					<DataCard
						data={locations}
						columns={columns}
						onView={handleView}
						onDelete={handleDelete}
					/>
				)}
			</div>

			<div className="hidden lg:block">
				{loading ? (
					<SkeletonTableLoading />
				) : error ? (
					<ErrorDisplay errMessage={error.message} />
				) : (
					<DataTable
						data={locations}
						columns={columns}
						onView={handleView}
						onDelete={handleDelete}
						pagination={pagination}
						goToPage={goToPage}
						nextPage={nextPage}
						previousPage={previousPage}
						setPerPage={setPerPage}
					/>
				)}
			</div>
			<LocationForm
				open={dialogForm}
				editingItem={editingItem}
				isLoading={isLoading}
				onOpenChange={setDialogForm}
				onSubmit={handleSave}
			/>

			<DialogDelete
				open={dialogDelete}
				onOpenChange={setDialogDelete}
				onConfirm={confirmDelete}
				idDelete={idToDelete}
			/>
		</>
	);

	return (
		<DataDisplayTemplate
			title={title}
			actionButtons={actionButtons}
			filters={filter}
			content={content}
		/>
	);
};

export default StoreLocationList;
