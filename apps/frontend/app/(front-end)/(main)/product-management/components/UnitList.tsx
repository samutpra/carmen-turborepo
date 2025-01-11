'use client';

import { useAuth } from '@/app/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { UnitType } from '@carmensoftware/shared-types';
import React, { useCallback, useEffect, useState } from 'react';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import { Button } from '@/components/ui/button';
import UnitDialog from './UnitDialog';
import EmptyState from '@/components/ui-custom/EmptyState';
import { deleteUnit, fetchUnits } from '../actions/unit';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { formType } from '@/types/form_type';
import SearchForm from '@/components/ui-custom/SearchForm';
import { useURL } from '@/hooks/useURL';
import * as m from '@/paraglide/messages.js';
import { statusOptions } from '@/lib/statusOptions';
import { FileDown, Printer } from 'lucide-react';
import StatusSearchDropdown from '@/components/ui-custom/StatusSearchDropdown';
import SortDropDown from '@/components/ui-custom/SortDropDown';
import SkeltonLoad from '@/components/ui-custom/Loading/SkeltonLoad';
import DisplayComponent from '@/components/templates/DisplayComponent';
import { FieldConfig } from '@/lib/util/uiConfig';

enum UnitField {
	Name = 'name',
	Description = 'description',
	Status = 'is_active',
}

const sortFields: FieldConfig<UnitType>[] = [
	{ key: UnitField.Name, label: `${m.unit_name_label()}` },
	{ key: UnitField.Status, label: `${m.status_text()}`, type: 'badge' },
];

const unitFields: FieldConfig<UnitType>[] = [
	...sortFields,
	{ key: 'description', label: `${m.unit_des_label()}` },
];
const UnitList = () => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [units, setUnits] = useState<UnitType[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [statusOpen, setStatusOpen] = useState(false);
	const [search, setSearch] = useURL('search');
	const [status, setStatus] = useURL('status');

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const data = await fetchUnits(token, tenantId, { search, status });
			setUnits(data.data);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [token, tenantId, search, status]);

	if (error) {
		return (
			<Card className="border-destructive">
				<CardContent className="pt-6">
					<p className="text-destructive">Error loading units: {error}</p>
				</CardContent>
			</Card>
		);
	}

	const handleSuccess = useCallback((updatedUnit: UnitType) => {
		setUnits((prev) => {
			const unitsMap = new Map(prev.map((u) => [u.id, u])); // สร้าง Map เพื่อใช้ id เป็น key
			unitsMap.set(updatedUnit.id, updatedUnit); // อัปเดตหรือเพิ่ม updatedUnit
			return Array.from(unitsMap.values()); // แปลง Map กลับเป็น array
		});
	}, [setUnits]);

	const handleDelete = useCallback(
		async (id: string) => {
			try {
				const res = await deleteUnit(id, token, tenantId);
				if (res) {
					setUnits((prev) => prev.filter((u) => u.id !== id));
					toastSuccess({ message: `${m.unit_delete_success()}` });
				}
			} catch (error) {
				if (error instanceof Error) {
					if (error.message === 'Unauthorized') {
						toastError({ message: 'Your session has expired. Please login again.' });
					} else {
						toastError({ message: `Failed to delete unit: ${error.message}` });
					}
				} else {
					toastError({ message: 'An unknown error occurred while deleting the unit.' });
				}
			}
		},
		[token, tenantId, deleteUnit]
	);

	const title = `${m.unit()}`;

	const actionButtons = (
		<div className="action-btn-container">
			<UnitDialog mode={formType.ADD} onSuccess={handleSuccess} />
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
				placeholder={m.placeholder_search_unit()}
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
					items={units}
					onSort={setUnits}
				/>
			</div>
		</div>
	);


	const content = (
		<DisplayComponent<UnitType>
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
		/>
	);

	if (isLoading) {
		return <SkeltonLoad />
	}

	if (units.length === 0) {
		return (
			<EmptyState
				title={title}
				description={m.not_found_unit()}
				actionButtons={actionButtons}
				filters={filter}
			/>
		);
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

export default UnitList;
