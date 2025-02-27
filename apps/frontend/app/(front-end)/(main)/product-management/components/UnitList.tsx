'use client';

import React, { useEffect, useState } from 'react';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import UnitDialog from './UnitDialog';
import { useURL } from '@/hooks/useURL';
import DisplayComponent from '@/components/templates/DisplayComponent';
import { SortQuery } from '@/lib/util/uiConfig';
import { UnitCreateModel } from '@/dtos/unit.dto';
import ErrorCard from '@/components/ui-custom/error/ErrorCard';
import { unitFields } from '@/constants/fields';
import UnitFilter from './UnitFilter';
import { unit } from '@/paraglide/messages.js';
import UnitAction from './UnitAction';
import { CommentAttachments } from './CommentAttachments ';
import { formType } from '@/constants/enums';
import { useUnit } from '@/app/(front-end)/hooks/useUnit';

const UnitList = () => {
	const [statusOpen, setStatusOpen] = useState(false);
	const [search, setSearch] = useURL('search');
	const [status, setStatus] = useURL('status');
	const [page, setPage] = useURL('page');
	const [pages, setPages] = useURL('pages');
	const [sort, setSort] = useURL('sort');

	const { units, isLoading, error, handleSuccess, handleDelete } = useUnit();

	useEffect(() => {
		if (!isLoading && units.length > 0) {
			// This assumes your hook is returning the current page and total pages
			// If not, you'll need to adjust this logic
			setPages(pages);
		}
	}, [isLoading, units]);

	if (error) {
		return <ErrorCard message={error} data-id="unit-list-error-card" />;
	}

	return (
		<DataDisplayTemplate
			title={unit()}
			actionButtons={
				<UnitAction
					handleSuccess={handleSuccess}
					data-id="unit-list-action-button"
				/>
			}
			filters={
				<UnitFilter
					search={search}
					setSearch={setSearch}
					status={status}
					setStatus={setStatus}
					statusOpen={statusOpen}
					setStatusOpen={setStatusOpen}
					sort={sort}
					setSort={setSort}
					data-id="unit-list-filter"
				/>
			}
			content={
				<DisplayComponent<UnitCreateModel>
					items={units}
					fields={unitFields}
					idField="id"
					onSuccess={handleSuccess}
					onDelete={handleDelete}
					editComponent={({ item, onSuccess }) => (
						<UnitDialog
							mode={formType.EDIT}
							defaultValues={item}
							onSuccess={onSuccess}
						/>
					)}
					page={+page}
					totalPage={+pages}
					setPage={setPage}
					sort={sort}
					onSortChange={(newSort: SortQuery) => {
						setSort(newSort);
					}}
					isLoading={isLoading}
					data-id="unit-list-display-component"
				/>
			}
			data-id="unit-list-data-display-template"
			commentAttachments={<CommentAttachments />}
		/>
	);
};

export default UnitList;
