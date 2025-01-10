'use client';

import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/components/ui/button';
import { LocationType } from '@carmensoftware/shared-types';
import React, { useEffect, useState, useCallback } from 'react';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import StoreLocationDialog from './StoreLocationDialog';
import { Card, CardContent } from '@/components/ui/card';
import DataCard, { FieldConfig } from '@/components/templates/DataCard';
import EmptyState from '@/components/ui-custom/EmptyState';
import TableData from '@/components/templates/TableData';
import { deleteStoreLocation, fetchStoreLocations } from '../actions/store_location';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { formType } from '@/types/form_type';
import SearchForm from '@/components/ui-custom/SearchForm';
import { useURL } from '@/hooks/useURL';
import { statusOptions } from '@/lib/statusOptions';
import * as m from '@/paraglide/messages.js';
import { FileDown, Printer } from 'lucide-react';
import SortDropDown from '@/components/ui-custom/SortDropDown';
import StatusSearchDropdown from '@/components/ui-custom/StatusSearchDropdown';
import SkeltonLoad from '@/components/ui-custom/Loading/SkeltonLoad';

enum StoreLocationField {
	Name = 'name',
	LocationType = 'location_type',
	Description = 'description',
	isActive = 'is_active',
}

const sortFields: FieldConfig<LocationType>[] = [
	{ key: StoreLocationField.Name, label: m.store_location_name_label() },
	{ key: StoreLocationField.LocationType, label: m.location_type_label() },
	{ key: StoreLocationField.isActive, label: m.status_text(), type: 'badge' }
];
const storeLocationFields: FieldConfig<LocationType>[] = [
	...sortFields,
	{ key: StoreLocationField.Description, label: m.description() }
];

const StoreLocationList = () => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [storeLocations, setStoreLocations] = useState<LocationType[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [statusOpen, setStatusOpen] = useState(false);
	const [search, setSearch] = useURL('search');
	const [status, setStatus] = useURL('status');

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const data = await fetchStoreLocations(token, tenantId, {
				search,
				status,
			});
			setStoreLocations(data.data);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [token, tenantId, search, status]);

	if (error) {
		return (
			<Card className="border-destructive">
				<CardContent className="pt-6">
					<p className="text-destructive">
						Error loading delivery points: {error}
					</p>
				</CardContent>
			</Card>
		);
	}

	const handleSuccess = useCallback((values: LocationType) => {
		setStoreLocations((prev) => {
			const mapValues = new Map(prev.map((u) => [u.id, u]));
			mapValues.set(values.id, values);
			return Array.from(mapValues.values());
		});
	}, [setStoreLocations]);

	const handleDelete = useCallback(
		async (id: string) => {
			try {
				const res = await deleteStoreLocation(id, token, tenantId);
				if (res) {
					setStoreLocations((prev) => prev.filter((p) => p.id !== id));
					toastSuccess({ message: 'Store location deleted successfully' });
				}
			} catch (error) {
				if (error instanceof Error) {
					if (error.message === 'Unauthorized') {
						toastError({ message: 'Your session has expired. Please login again.' });
					} else {
						toastError({ message: `Failed to delete store location: ${error.message}` });
					}
				} else {
					toastError({ message: 'An unknown error occurred while deleting the store location.' });
				}
			}
		}, [token, tenantId, deleteStoreLocation]
	)

	const title = `${m.store_location()}`;

	const actionButtons = (
		<div className="action-btn-container">
			<StoreLocationDialog mode={formType.ADD} onSuccess={handleSuccess} />
			<Button variant="outline" className="group" size={'sm'}>
				<FileDown className="h-4 w-4" />
				{m.export_text()}
			</Button>
			<Button variant="outline" size={'sm'}>
				<Printer className="h-4 w-4" />
				{m.print_text()}
			</Button>
		</div>
	);

	const filter = (
		<div className="filter-container">
			<SearchForm
				onSearch={setSearch}
				defaultValue={search}
				placeholder={`${m.Search()} ${m.store_location()}...`}
			/>
			<div className="all-center gap-2">
				<StatusSearchDropdown
					options={statusOptions}
					value={status}
					onChange={setStatus}
					open={statusOpen}
					onOpenChange={setStatusOpen}
				/>
				<SortDropDown
					fieldConfigs={sortFields}
					items={storeLocations}
					onSort={setStoreLocations}
				/>
			</div>
		</div>
	);


	const content = (
		<>
			<div className="block md:hidden">
				<DataCard<LocationType>
					items={storeLocations}
					fields={storeLocationFields}
					idField="id"
					onSuccess={handleSuccess}
					onDelete={handleDelete}
					editComponent={({ item, onSuccess }) => (
						<StoreLocationDialog
							mode={formType.EDIT}
							defaultValues={item}
							onSuccess={onSuccess}
						/>
					)}
				/>
			</div>
			<div className="hidden md:block">
				<TableData<LocationType>
					items={storeLocations}
					fields={storeLocationFields}
					idField="id"
					onSuccess={handleSuccess}
					onDelete={handleDelete}
					editComponent={({ item, onSuccess }) => (
						<StoreLocationDialog
							mode={formType.EDIT}
							defaultValues={item}
							onSuccess={onSuccess}
						/>
					)}
				/>
			</div>
		</>
	);

	if (isLoading) {
		return <SkeltonLoad />
	}

	if (storeLocations.length === 0) {
		return (
			<EmptyState
				title={title}
				description={m.not_found_store_location()}
				actionButtons={actionButtons}
				filters={filter}
			/>
		);
	}

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
