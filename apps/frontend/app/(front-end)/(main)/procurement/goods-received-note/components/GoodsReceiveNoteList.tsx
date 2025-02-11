"use client"
import React, { useEffect, useState } from 'react'
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import { Link } from '@/lib/i18n';
import { GoodsReceiveNote } from '@/lib/types';
import { FileDown, Filter, Plus, Printer } from 'lucide-react';
import { FieldConfig } from '@/lib/util/uiConfig';
import ErrorCard from '@/components/ui-custom/error/ErrorCard';
import * as m from '@/paraglide/messages.js';
import { Button } from '@/components/ui/button';
import SearchForm from '@/components/ui-custom/SearchForm';
import StatusSearchDropdown from '@/components/ui-custom/StatusSearchDropdown';
import SortDropDown from '@/components/ui-custom/SortDropDown';
import { useURL } from '@/hooks/useURL';
import { statusOptions } from '@/lib/statusOptions';
import SkeltonLoad from '@/components/ui-custom/Loading/SkeltonLoad';
import GoodsReceiveDisplay from './GoodsReceiveDisplay';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FilterBuilder } from './FilterBuilder';

enum GOOD_RECIEVE_NOTE_FIELDS {
	DATE = 'date',
	REF = 'ref',
	DESCRIPTION = 'description',
	VENDOR = 'vendor',
	INVOICE_NUMBER = 'invoiceNumber',
	INVOICE_DATE = 'invoiceDate',
	TOTAL_AMOUNT = 'totalAmount',
	STATUS = 'status',
}

const sortFields: FieldConfig<GoodsReceiveNote>[] = [
	{ key: GOOD_RECIEVE_NOTE_FIELDS.DATE, label: 'Date' },
	{ key: GOOD_RECIEVE_NOTE_FIELDS.REF, label: 'Code' },
	{ key: GOOD_RECIEVE_NOTE_FIELDS.VENDOR, label: 'Vendor' },
	{ key: GOOD_RECIEVE_NOTE_FIELDS.INVOICE_NUMBER, label: 'Invoice Number' },
	{ key: GOOD_RECIEVE_NOTE_FIELDS.INVOICE_DATE, label: 'Invoice Date' },
	{ key: GOOD_RECIEVE_NOTE_FIELDS.TOTAL_AMOUNT, label: 'Total Amount' },
	{ key: GOOD_RECIEVE_NOTE_FIELDS.STATUS, label: 'Status', type: 'badge' },
];

const goodsReceiveNoteFields: FieldConfig<GoodsReceiveNote>[] = [
	...sortFields,
	{ key: GOOD_RECIEVE_NOTE_FIELDS.DESCRIPTION, label: 'Description' },
];

const GoodsReceiveNoteList = () => {
	const [grnData, setGrnData] = useState<GoodsReceiveNote[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [statusOpen, setStatusOpen] = useState(false);
	const [search, setSearch] = useURL('search');
	const [status, setStatus] = useURL('status');

	const fetchGrn = async () => {
		setIsLoading(true);
		try {
			const response = await fetch('/api/procurement/goods-received-note');
			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Failed to fetch goods received notes');
			}
			setGrnData(result.data);
		} catch (error) {
			console.error('Error fetching Goods Receive Notes:', error);
			setError(
				error instanceof Error
					? error.message
					: 'Error fetching Goods Receive Notes'
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchGrn();
	}, []);

	if (error) return <ErrorCard message={error} />;

	if (isLoading) return <SkeltonLoad />;

	const title = 'Goods Receive Note';

	const actionButtons = (
		<div className="action-btn-container">
			<Button asChild variant={'outline'} size={'sm'}>
				<Link href="/procurement/goods-received-note/new">
					<Plus className="h-4 w-4" />
					Create Good Recieve Note
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
				placeholder={`${m.Search()} Goods Receive Note...`}
			/>
			<div className="all-center gap-2">
				<StatusSearchDropdown
					options={statusOptions}
					value={status}
					onChange={setStatus}
					open={statusOpen}
					onOpenChange={setStatusOpen}
				/>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline" size={'sm'} className="text-xs">
							<Filter className="h-4 w-4" />
							More Filters
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:w-[70vw] max-w-[60vw]">
						<FilterBuilder
							fields={[
								{ value: GOOD_RECIEVE_NOTE_FIELDS.REF, label: 'Reference' },
								{ value: GOOD_RECIEVE_NOTE_FIELDS.VENDOR, label: 'Vendor' },
								{ value: GOOD_RECIEVE_NOTE_FIELDS.DATE, label: 'Date' },
								{
									value: GOOD_RECIEVE_NOTE_FIELDS.INVOICE_NUMBER,
									label: 'Invoice Number',
								},
								{
									value: GOOD_RECIEVE_NOTE_FIELDS.INVOICE_DATE,
									label: 'Invoice Date',
								},
								{ value: GOOD_RECIEVE_NOTE_FIELDS.STATUS, label: 'Status' },
							]}
							onFilterChange={(filters) => {
								// Handle filter changes
								console.log(filters);
								// You'll need to implement the actual filtering logic
							}}
						/>
					</DialogContent>
				</Dialog>
				<SortDropDown
					fieldConfigs={sortFields}
					items={grnData}
					onSort={setGrnData}
				/>
			</div>
		</div>
	);

	const content = (
		<GoodsReceiveDisplay grnDatas={grnData} fields={goodsReceiveNoteFields} />
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

export default GoodsReceiveNoteList