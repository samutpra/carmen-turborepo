'use client';

import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DepartmentType } from '@carmensoftware/shared-types/src/department';
import React, { useEffect, useState, FormEvent, useCallback, useTransition } from 'react';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
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
import { ArrowUpDown, ChevronDown, FileDown, Printer } from 'lucide-react';
import SkeltonCardLoading from '@/components/ui-custom/Loading/SkeltonCardLoading';
import SkeletonTableLoading from '@/components/ui-custom/Loading/SkeltonTableLoading';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

enum DepartmentFields {
	Name = 'name',
	Description = 'description',
	isActive = 'is_active',
}

const DepartmentList = () => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';

	const [departments, setDepartments] = useState<DepartmentType[]>([]);
	const [isPending, startTransition] = useTransition();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [statusOpen, setStatusOpen] = useState(false);
	const [search, setSearch] = useURL('search');
	const [status, setStatus] = useURL('status');
	const [sortField, setSortField] = useState<DepartmentFields | null>(null);
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

	const departmentFields: FieldConfig<DepartmentType>[] = [
		{ key: DepartmentFields.Name, label: m.department_name_label() },
		{ key: DepartmentFields.Description, label: m.description() },
		{ key: DepartmentFields.isActive, label: m.status_text(), type: 'badge' },
	];

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
		startTransition(() => {
			fetchData();
		});
	}, [fetchData]);


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

	const handleSearch = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		startTransition(() => {
			setSearch(event.currentTarget.search.value);
		});
	};

	const handleSort = (field: DepartmentFields) => {
		const isAscending = sortField === field && sortDirection === "asc";
		const newDirection = isAscending ? "desc" : "asc";

		const sortedData = [...departments].sort((a, b) => {
			if (a[field] < b[field]) return newDirection === "asc" ? -1 : 1;
			if (a[field] > b[field]) return newDirection === "asc" ? 1 : -1;
			return 0;
		});

		setDepartments(sortedData);
		setSortField(field);
		setSortDirection(newDirection);
	};

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
				onSubmit={handleSearch}
				defaultValue={search}
				placeholder={`${m.Search()} ${m.department()}...`}
			/>
			<div className="all-center gap-2">
				<Popover open={statusOpen} onOpenChange={setStatusOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							role="combobox"
							aria-expanded={statusOpen}
							className="btn-combobox"
							size={'sm'}
							disabled={isPending}
							aria-label={m.select_status()}
						>
							{status
								? statusOptions.find((option) => option.value === status)?.label
								: `${m.select_status()}`}
							<ChevronDown className="h-4 w-4" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="pop-content">
						<Command>
							<CommandInput placeholder={`${m.Search()} ${m.status_text()}`} className="h-9 text-xs" />
							<CommandList>
								<CommandEmpty>No status found.</CommandEmpty>
								<CommandGroup>
									{statusOptions.map((option) => (
										<CommandItem
											key={option.value}
											value={option.value}
											onSelect={() => {
												startTransition(() => {
													setStatus(option.value);
													setStatusOpen(false);
												});
											}}
											className='text-xs'
										>
											{option.label}
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="sm">
							<ArrowUpDown className="h-4 w-4" />
							{m.sort_by()}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem onClick={() => handleSort(DepartmentFields.Name)}>
							<span className="flex items-center justify-between w-full text-xs">
								<span>{m.department_label_name()}</span>
								{sortField === DepartmentFields.Name && (sortDirection === "asc" ? "↑" : "↓")}
							</span>
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => handleSort(DepartmentFields.isActive)}>
							<span className="flex items-center justify-between w-full text-xs">
								<span>{m.status_text()}</span>
								{sortField === DepartmentFields.isActive && (sortDirection === "asc" ? "↑" : "↓")}
							</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
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
		return (
			<>
				<div className='block md:hidden'>
					<SkeltonCardLoading />
				</div>
				<div className='hidden md:block'>
					<SkeletonTableLoading />;
				</div>
			</>
		)
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
