'use client';

import React, { useState } from 'react';
import { useURL } from '@/hooks/useURL';
import PoActions from './PoActions';
import PoFilters from './PoFilters';
import ErrorCard from '@/components/ui-custom/error/ErrorCard';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import PoData from './PoData';
import { poSortFields } from '@/constants/fields';
import { usePOderData } from '../../hooks/usePo';

const PurchaseOrdersList = () => {
	const { poData, setPoData, isLoading, error } = usePOderData();
	const [statusOpen, setStatusOpen] = useState(false);
	const [search, setSearch] = useURL('search');
	const [status, setStatus] = useURL('status');

	const actionButtons = <PoActions />;

	const filter = (
		<PoFilters
			search={search}
			setSearch={setSearch}
			status={status}
			setStatus={setStatus}
			statusOpen={statusOpen}
			setStatusOpen={setStatusOpen}
			poData={poData}
			setPoData={setPoData}
		/>
	);

	const content = (
		<PoData poDatas={poData} fields={poSortFields} isLoading={isLoading} />
	);
	console.log('error', error);

	if (error) return <ErrorCard message={error} />;

	return (
		<DataDisplayTemplate
			title="Purchase Orders"
			actionButtons={actionButtons}
			filters={filter}
			content={content}
		/>
	);
};

export default PurchaseOrdersList;
