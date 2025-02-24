"use client";
import { toastError } from '@/components/ui-custom/Toast';
import { useURL } from '@/hooks/useURL';
import { PrType } from '@/lib/types';
import React, { useEffect, useState } from 'react';
import * as m from '@/paraglide/messages.js';
import SearchForm from '@/components/ui-custom/SearchForm';
import StatusSearchDropdown from '@/components/ui-custom/StatusSearchDropdown';
import SortDropDown from '@/components/ui-custom/SortDropDown';
import { statusOptions } from '@/lib/statusOptions';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import PurchaseDisplay from './PurchaseDisplay';
import { prSortFields } from '@/constants/fields';
import PrActions from './PrActions';

const PurchaseRequestList = () => {
	const [prList, setPrList] = useState<PrType[]>([]);
	const [statusOpen, setStatusOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useURL('search');
	const [status, setStatus] = useURL('status');
	const [error, setError] = useState<string | null>(null);
	const fetchPrList = async () => {
		setIsLoading(true);
		try {
			const response = await fetch('/api/procurement/purchase-requests');
			const result = await response.json();
			if (!response.ok) {
				throw new Error(result.error || 'Failed to fetch credit notes');
			}
			setPrList(result.data);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
			toastError({ message: 'Failed to fetch purchase requests' });
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchPrList();
	}, [search, status]);

	if (error) {
		return <div>Error: {error}</div>;
	}

	const title = 'Purchase Requests';

	const filter = (
		<div className="filter-container">
			<SearchForm
				defaultValue={search}
				onSearch={setSearch}
				placeholder={`${m.Search()}..`}
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
					fieldConfigs={prSortFields}
					items={prList}
					onSort={setPrList}
				/>
			</div>
		</div>
	);

	const content = (
		<PurchaseDisplay
			prData={prList}
			fields={prSortFields}
			isLoading={isLoading}
		/>
	);

	return (
		<DataDisplayTemplate
			title={title}
			actionButtons={<PrActions />}
			filters={filter}
			content={content}
		/>
	);
};

export default PurchaseRequestList