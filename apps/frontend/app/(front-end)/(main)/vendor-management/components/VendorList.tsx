'use client';

import { useAuth } from '@/app/context/AuthContext';
import React, { useEffect, useState } from 'react';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import { fetchAllVendors } from '../actions/vendor';
import { useURL } from '@/hooks/useURL';
import VendorDisplay from './VendorDisplay';
import { SortDirection } from '@/lib/util/uiConfig';
import ErrorCard from '@/components/ui-custom/error/ErrorCard';
import { VendorCreateModel } from '@/dtos/vendor.dto';
import { VendorFields } from '@/constants/fields';
import VendorFilter from './VendorFilter';
import VendorAction from './VendorAction';
import { vendors_title } from '@/paraglide/messages.js';

type SortQuery = `${VendorFields}:${SortDirection}` | '';

const VendorList = () => {
	const { accessToken, tenantId } = useAuth();
	const token = accessToken || '';
	const [vendors, setVendors] = useState<VendorCreateModel[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [statusOpen, setStatusOpen] = useState(false);
	const [search, setSearch] = useURL('search');
	const [status, setStatus] = useURL('status');
	const [page, setPage] = useURL('page');
	const [pages, setPages] = useURL('pages');
	const [sort, setSort] = useURL('sort');

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const data = await fetchAllVendors(token, tenantId, {
				search,
				status,
				page,
				sort,
			});
			setVendors(data.data);
			setPage(data.pagination.page);
			setPages(data.pagination.pages);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [token, tenantId, search, status, page, sort]);

	if (error) {
		return <ErrorCard message={error} />;
	}

	const handlePageChange = (newPage: number) => {
		const numericTotalPages = Number(pages);
		if (newPage < 1 || newPage > numericTotalPages) return;
		setPage(newPage.toString());
	};

	return (
		<DataDisplayTemplate
			title={vendors_title()}
			actionButtons={<VendorAction />}
			filters={
				<VendorFilter
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
				<VendorDisplay
					vendors={vendors}
					page={Number(page)}
					totalPage={Number(pages)}
					handlePageChange={handlePageChange}
					sort={sort}
					onSortChange={(newSort: SortQuery) => {
						setSort(newSort);
					}}
					isLoading={isLoading}
				/>
			}
		/>
	);
};

export default VendorList;
