'use client';
import { toastError } from '@/components/ui-custom/Toast';
import { Button } from '@/components/ui/button';
import { useURL } from '@/hooks/useURL';
import { PrType } from '@/lib/types';
import { FileDown, Plus, Printer } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import * as m from '@/paraglide/messages.js';
import SearchForm from '@/components/ui-custom/SearchForm';
import StatusSearchDropdown from '@/components/ui-custom/StatusSearchDropdown';
import SortDropDown from '@/components/ui-custom/SortDropDown';
import { statusOptions } from '@/lib/statusOptions';
import { FieldConfig } from '@/lib/util/uiConfig';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import PurchaseDisplay from './PurchaseDisplay';
import { Link } from '@/lib/i18n';

enum PrField {
	Id = 'id',
	Type = 'type',
	Description = 'description',
	Requestor = 'requestor',
	Department = 'department',
	Date = 'date',
	Status = 'status',
	Amount = 'amount',
	CurrentStage = 'currentStage',
}

export const sortFields: FieldConfig<PrType>[] = [
	{ key: PrField.Type, label: 'Type' },
	{ key: PrField.Requestor, label: 'Requestor' },
	{ key: PrField.Department, label: 'Department' },
	{ key: PrField.Date, label: 'Date', type: 'date' },
	{ key: PrField.Status, label: 'Status', type: 'badge' },
	{ key: PrField.Amount, label: 'Amount', type: 'amount' },
	{ key: PrField.CurrentStage, label: 'Current Stage' },
];
const sortFields: FieldConfig<PrType>[] = [
	{ key: PrField.Type, label: 'Type' },
	{ key: PrField.Requestor, label: 'Requestor' },
	{ key: PrField.Department, label: 'Department' },
	{ key: PrField.Date, label: 'Date' },
	{ key: PrField.Status, label: 'Status', type: 'badge' },
	{ key: PrField.Amount, label: 'Amount' },
	{ key: PrField.CurrentStage, label: 'Current Stage' },
];

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
			// Simulate an async operation
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setPrList(sampleData);
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

	const actionButtons = (
		<div className="action-btn-container">
			<Button variant={'outline'} size={'sm'} asChild>
				<Link href={'/procurement/purchase-requests/new'}>
					<Plus />
					New Purchase Request
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
					fieldConfigs={sortFields}
					items={prList}
					onSort={setPrList}
				/>
			</div>
		</div>
	);

	const content = <PurchaseDisplay prData={prList} />;

	if (isLoading) {
		return <SkeltonLoad />;
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

export default PurchaseRequestList;
