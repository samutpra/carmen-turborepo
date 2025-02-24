'use client';
import React, { useMemo, useState } from 'react';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import { Link } from '@/lib/i18n';
import { FileDown, Plus, Printer } from 'lucide-react';
import ErrorCard from '@/components/ui-custom/error/ErrorCard';
import * as m from '@/paraglide/messages.js';
import { Button } from '@/components/ui/button';
import { useURL } from '@/hooks/useURL';
import GoodsReceiveDisplay from './GoodsReceiveDisplay';
import { GRNFilters } from './GRNFilters';
import { goodsReceiveNoteFields } from '@/constants/fields';
import { useGRNData } from '../../hooks/useGRNData';

const GoodsReceiveNoteList = () => {
	const { grnData, setGrnData, isLoading, error } = useGRNData();
	const [statusOpen, setStatusOpen] = useState(false);
	const [search, setSearch] = useURL('search');
	const [status, setStatus] = useURL('status');

	const actionButtons = useMemo(
		() => (
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
		),
		[]
	);

	const filter = (
		<GRNFilters
			search={search}
			setSearch={setSearch}
			status={status}
			setStatus={setStatus}
			statusOpen={statusOpen}
			setStatusOpen={setStatusOpen}
			grnData={grnData}
			setGrnData={setGrnData}
		/>
	);

	const content = (
		<GoodsReceiveDisplay
			grnDatas={grnData}
			fields={goodsReceiveNoteFields}
			isLoading={isLoading}
		/>
	);

	if (error) return <ErrorCard message={error} />;

	return (
		<DataDisplayTemplate
			title="Goods Receive Note"
			actionButtons={actionButtons}
			filters={filter}
			content={content}
		/>
	);
};

export default GoodsReceiveNoteList;
