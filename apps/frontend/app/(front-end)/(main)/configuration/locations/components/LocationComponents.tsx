'use client';

import { useAuth } from '@/app/context/AuthContext';
import { LocationCreateModel } from '@/dtos/location.dto';
import { useURL } from '@/hooks/useURL';
import { FieldConfig, SortQuery } from '@/lib/util/uiConfig';
import {
	status_text,
	description,
	location_type_label,
	store_location_name_label,
	store_location,
	fail_del_store,
	export_text,
	print_text,
	Search,
} from '@/paraglide/messages';
import React, { useCallback, useEffect, useState } from 'react';
import {
	deleteStoreLocation,
	fetchStoreLocations,
} from '../../actions/store_location';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { Button } from '@/components/ui/button';
import { FileDown, Plus, Printer } from 'lucide-react';
import { Link } from '@/lib/i18n';
import SearchForm from '@/components/ui-custom/SearchForm';
import SortComponent from '@/components/ui-custom/SortComponent';
import { statusOptions } from '@/lib/statusOptions';
import StatusSearchDropdown from '@/components/ui-custom/StatusSearchDropdown';
import ErrorCard from '@/components/ui-custom/error/ErrorCard';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import LocationList from './LocationList';

export const enum LocationField {
	Name = 'name',
	LocationType = 'location_type',
	DeliveryPointID = 'delivery_point_id',
	Description = 'description',
	isActive = 'is_active',
}

const sortFields: FieldConfig<LocationCreateModel>[] = [
	{
		key: LocationField.Name,
		label: store_location_name_label(),
		className: 'w-24',
	},
	{
		key: LocationField.Description,
		label: description(),
		className: 'w-40',
	},
	{
		key: LocationField.LocationType,
		label: location_type_label(),
		className: 'w-10',
	},
	{
		key: LocationField.isActive,
		label: status_text(),
		type: 'badge',
		className: 'w-10',
	},
];

const LocationComponents = () => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [locations, setLocations] = useState<LocationCreateModel[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [statusOpen, setStatusOpen] = useState(false);
	const [search, setSearch] = useURL('search');
	const [status, setStatus] = useURL('status');
	const [page, setPage] = useURL('page');
	const [pages, setPages] = useURL('pages');
	const [sort, setSort] = useURL('sort');

	const handleDelete = useCallback(
		async (id: string) => {
			try {
				const res = await deleteStoreLocation(id, token, tenantId);
				if (res) {
					setLocations((prev) => prev.filter((p) => p.id !== id));
					toastSuccess({
						message: `${store_location()} deleted successfully`,
					});
				}
			} catch (error) {
				if (error instanceof Error) {
					if (error.message === 'Unauthorized') {
						toastError({
							message: 'Your session has expired. Please login again.',
						});
					} else {
						toastError({
							message: `${fail_del_store()}: ${error.message}`,
						});
					}
				} else {
					toastError({
						message:
							'An unknown error occurred while deleting the store location.',
					});
				}
			}
		},
		[token, tenantId]
	);

	const fetchLocations = async () => {
		try {
			setIsLoading(true);
			const data = await fetchStoreLocations(token, tenantId, {
				search,
				status,
				page,
				sort,
			});
			setLocations(data.data);
			setPage(data.pagination.page);
			setPages(data.pagination.pages);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchLocations();
	}, [token, tenantId, search, status, page, sort]);

	const handlePageChange = (newPage: number) => {
		const numericTotalPages = Number(pages);
		if (newPage < 1 || newPage > numericTotalPages) return;
		setPage(newPage.toString());
	};

	const title = `${store_location()}`;

	const actionButtons = (
		<div className="action-btn-container">
			<Button asChild size={'sm'}>
				<Link href="/configuration/locations/new">
					<Plus data-id="store-location-add-icon" />
					{store_location()}
				</Link>
			</Button>
			<Button
				variant="outline"
				className="group"
				size={'sm'}
				data-id="store-location-export-button"
			>
				<FileDown data-id="store-location-export-icon" />
				{export_text()}
			</Button>
			<Button
				variant="outline"
				size={'sm'}
				data-id="store-location-print-button"
			>
				<Printer data-id="store-location-print-icon" />
				{print_text()}
			</Button>
		</div>
	);

	const filter = (
		<div className="filter-container" data-id="store-location-filter-container">
			<SearchForm
				onSearch={setSearch}
				defaultValue={search}
				placeholder={`${Search()} ${store_location()}...`}
				data-id="store-location-search-form"
			/>
			<div
				className="all-center gap-2"
				data-id="store-location-filter-container"
			>
				<StatusSearchDropdown
					options={statusOptions}
					value={status}
					onChange={setStatus}
					open={statusOpen}
					onOpenChange={setStatusOpen}
					data-id="store-location-status-search-dropdown"
				/>
				<SortComponent
					fieldConfigs={sortFields}
					sort={sort}
					setSort={setSort}
					data-id="store-location-sort-component"
				/>
			</div>
		</div>
	);

	const content = (
		<LocationList
			locations={locations}
			fields={sortFields}
			page={+page}
			totalPage={+pages}
			handlePageChange={handlePageChange}
			sort={sort}
			onSortChange={(newSort: SortQuery) => {
				setSort(newSort);
			}}
			isLoading={isLoading}
			handleDelete={handleDelete}
			data-id="product-list-product-display"
		/>
	);

	if (error) {
		return <ErrorCard message={error} data-id="store-location-error-card" />;
	}

	return (
		<DataDisplayTemplate
			title={title}
			actionButtons={actionButtons}
			filters={filter}
			content={content}
			data-id="store-location-data-display-template"
		/>
	);
};

export default LocationComponents;
