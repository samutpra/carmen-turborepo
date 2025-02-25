'use client';

import { useAuth } from '@/app/context/AuthContext';
import { LocationCreateModel } from '@/dtos/location.dto';
import { useURL } from '@/hooks/useURL';
import { SortQuery } from '@/lib/util/uiConfig';
import { store_location, fail_del_store } from '@/paraglide/messages';
import React, { useCallback, useEffect, useState } from 'react';
import {
	deleteStoreLocation,
	fetchStoreLocations,
} from '../../actions/store_location';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import ErrorCard from '@/components/ui-custom/error/ErrorCard';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import LocationList from './LocationList';
import LocationActions from './LocationActions';
import { locationSortFields } from '@/constants/fields';
import LocationFilter from './LocationFilter';

const LocationComponents = () => {
	const { accessToken, tenantId } = useAuth();
	const token = accessToken || '';
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

	if (error) {
		return <ErrorCard message={error} data-id="store-location-error-card" />;
	}

	return (
		<DataDisplayTemplate
			title={store_location()}
			actionButtons={<LocationActions />}
			filters={
				<LocationFilter
					search={search}
					setSearch={setSearch}
					status={status}
					setStatus={setStatus}
					statusOpen={statusOpen}
					setStatusOpen={setStatusOpen}
					sort={sort}
					setSort={setSort}
				/>
			}
			content={
				<LocationList
					locations={locations}
					fields={locationSortFields}
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
			}
			data-id="store-location-data-display-template"
		/>
	);
};

export default LocationComponents;
