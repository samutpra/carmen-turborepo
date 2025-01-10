'use client';

import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DepartmentType } from '@carmensoftware/shared-types/src/department';
import React, { useEffect, useState, useCallback } from 'react';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import DepartmentDialog from './DepartmentDialog';
import DataCard, { FieldConfig } from '@/components/templates/DataCard';
import TableData from '@/components/templates/TableData';
import EmptyState from '@/components/ui-custom/EmptyState';
import { deleteDepartment, fetchDepartments } from '../actions/department';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { formType } from '@/types/form_type';
import SearchForm from '@/components/ui-custom/SearchForm';
import { useURL } from '@/hooks/useURL';
import { statusOptions } from '@/lib/statusOptions';
import * as m from '@/paraglide/messages.js';
import { FileDown, Printer } from 'lucide-react';
import SortDropDown from '@/components/ui-custom/SortDropDown';
import StatusSearchDropdown from '@/components/ui-custom/StatusSearchDropdown';
import SkeltonLoad from '@/components/ui-custom/Loading/SkeltonLoad';

enum DepartmentFields {
	Name = 'name',
	Description = 'description',
	isActive = 'is_active',
}

const sortFields: FieldConfig<DepartmentType>[] = [
	{ key: DepartmentFields.Name, label: m.department_name_label() },
	{ key: DepartmentFields.isActive, label: m.status_text(), type: 'badge' },
];

const departmentFields: FieldConfig<DepartmentType>[] = [
	...sortFields,
	{ key: DepartmentFields.Description, label: m.description() },
];

const DepartmentList = () => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [departments, setDepartments] = useState<DepartmentType[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [statusOpen, setStatusOpen] = useState(false);
	const [search, setSearch] = useURL('search');
	const [status, setStatus] = useURL('status');

	const fetchData = useCallback(async () => {
		setIsLoading(true);
		try {
			const data = await fetchDepartments(token, tenantId, { search, status });
			setDepartments(data);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	}, [token, tenantId, search, status]);

	useEffect(() => {
		fetchData();
	}, [token, tenantId, search, status]);

	const handleSuccess = useCallback((values: DepartmentType) => {
		setDepartments((prev) => {
			const mapValues = new Map(prev.map((u) => [u.id, u]));
			mapValues.set(values.id, values);
			return Array.from(mapValues.values());
		});
	}, []);

	const handleDelete = useCallback(async (id: string) => {
		try {
			await deleteDepartment(id, token, tenantId);
			setDepartments((prev) => prev.filter((department) => department.id !== id));
			toastSuccess({ message: m.del_department_success() });
		} catch (error) {
			const message = error instanceof Error ? error.message : m.error_del_text();
			toastError({ message: `${m.fail_del_department()}: ${message}` });
		}
	}, [token, tenantId]);


	const title = m.department();

	const actionButtons = (
		<div className="action-btn-container">
			<DepartmentDialog mode={formType.ADD} onSuccess={handleSuccess} />
			<Button variant="outline" size="sm" aria-label={m.export_text()}>
				<FileDown className="h-4 w-4" />
				{m.export_text()}
			</Button>
			<Button variant="outline" size="sm" aria-label={m.print_text()}>
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
				placeholder={`${m.Search()} ${m.department()}...`}
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
					items={departments}
					onSort={setDepartments}
				/>
			</div>
		</div>
	);

	const content = (
		<>
			<div className="block md:hidden">
				<DataCard<DepartmentType>
					items={departments}
					fields={departmentFields}
					idField="id"
					onSuccess={handleSuccess}
					onDelete={handleDelete}
					editComponent={({ item, onSuccess }) => (
						<DepartmentDialog
							mode={formType.EDIT}
							defaultValues={item}
							onSuccess={onSuccess}
						/>
					)}
				/>
			</div>
			<div className="hidden md:block">
				<TableData<DepartmentType>
					items={departments}
					fields={departmentFields}
					idField="id"
					onSuccess={handleSuccess}
					onDelete={handleDelete}
					editComponent={({ item, onSuccess }) => (
						<DepartmentDialog
							mode={formType.EDIT}
							defaultValues={item}
							onSuccess={onSuccess}
						/>
					)}
				/>
			</div>
		</>
	);


	if (error) {
		return (
			<Card className="border-destructive">
				<CardContent className="pt-6">
					<p className="text-destructive">Error loading departments: {error}</p>
				</CardContent>
			</Card>
		);
	}


	if (isLoading) {
		return <SkeltonLoad />
	}

	if (departments.length === 0) {
		return (
			<EmptyState
				title={title}
				description="No Departments found"
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

export default DepartmentList;
