'use client';

import { useAuth } from '@/app/context/AuthContext';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileDown, Plus, Printer } from 'lucide-react';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import { fetchAllVendors } from '../actions/vendor';
import { Link } from '@/lib/i18n';
import SearchForm from '@/components/ui-custom/SearchForm';
import { useURL } from '@/hooks/useURL';
import * as m from '@/paraglide/messages.js';
import { statusOptions } from '@/lib/statusOptions';
import StatusSearchDropdown from '@/components/ui-custom/StatusSearchDropdown';
import VendorDisplay from './VendorDisplay';
import { FieldConfig, SortDirection } from '@/lib/util/uiConfig';
import ErrorCard from '@/components/ui-custom/error/ErrorCard';
import { VendorCreateModel } from '@/dtos/vendor.dto';
import SortComponent from '@/components/ui-custom/SortComponent';

const enum VendorFields {
	Name = 'name',
	Description = 'description',
	IsActive = 'is_active',
}

const sortFields: FieldConfig<VendorCreateModel>[] = [
	{
		key: VendorFields.Name,
		label: m.vendor_name_label(),
	},
	{
		key: VendorFields.Description,
		label: m.description(),
	},
	{
		key: VendorFields.IsActive,
		label: m.status_text(),
	},
];

type SortQuery = `${VendorFields}:${SortDirection}` | '';

const VendorList = () => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
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
			const data = await fetchAllVendors(token, tenantId, { search, status, page, sort });
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

	const title = `${m.vendors_title()}`;

	const actionButtons = (
		<div className="action-btn-container">
			<Button asChild variant={'outline'} size={'sm'}>
				<Link href="/vendor-management/vendors/new">
					<Plus className="h-4 w-4" />
					{m.create_vendor_text()}
				</Link>
			</Button>
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
				placeholder={`${m.Search()} ${m.Vendor()}...`}
			/>
			<div className="all-center gap-2">
				<StatusSearchDropdown
					options={statusOptions}
					value={status}
					onChange={setStatus}
					open={statusOpen}
					onOpenChange={setStatusOpen}
				/>
				<SortComponent
					fieldConfigs={sortFields}
					sort={sort}
					setSort={setSort} />
			</div>
		</div>
	);

	const content = (
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

export default VendorList;
