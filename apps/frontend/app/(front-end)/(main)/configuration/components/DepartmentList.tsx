'use client';

import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DepartmentType } from '@carmensoftware/shared-types/src/department';
import React, { useEffect, useState, FormEvent, useMemo, useCallback, useTransition } from 'react';
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
import SkeltonLoad from '@/components/ui-custom/Loading/SkeltonLoad';
import EmptyState from '@/components/ui-custom/EmptyState';
import { deleteDepartment, fetchDepartments } from '../actions/department';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { formType } from '@/types/form_type';
import SearchForm from '@/components/ui-custom/SearchForm';
import { useURL } from '@/hooks/useURL';
import { statusOptions } from '@/lib/statusOptions';
import * as m from '@/paraglide/messages.js';
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

	const departmentFields = useMemo<FieldConfig<DepartmentType>[]>(() => [
		{ key: 'name', label: `${m.department_name_label()}` },
		{ key: 'description', label: `${m.description()}` },
		{ key: 'is_active', label: `${m.status_text()}`, type: 'badge' }
	], []);

	const handleSearch = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		startTransition(() => {
			setSearch(event.currentTarget.search.value);
		});
	};

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const data = await fetchDepartments(token, tenantId, { search, status });
			startTransition(() => {
				setDepartments(data);
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		startTransition(() => {
			fetchData();
		});
	}, [token, tenantId, search, status]);



	if (error) {
		return (
			<Card className="border-destructive">
				<CardContent className="pt-6">
					<p className="text-destructive">Error loading departments: {error}</p>
				</CardContent>
			</Card>
		);
	}

	const handleSuccess = useCallback((values: DepartmentType) => {
		startTransition(() => {
			setDepartments((prev) => {
				const mapValues = new Map(prev.map((u) => [u.id, u]));
				mapValues.set(values.id, values);
				return Array.from(mapValues.values());
			});
		})
	}, [setDepartments]);

	const handleDelete = useCallback(
		async (id: string) => {
			try {
				startTransition(async () => {
					const res = await deleteDepartment(id, token, tenantId);
					if (res) {
						setDepartments((prev) => prev.filter((department) => department.id !== id));
						toastSuccess({ message: `${m.del_department_success()}` });
					}
				});
			} catch (error) {
				if (error instanceof Error) {
					if (error.message === 'Unauthorized') {
						toastError({ message: `${m.session_expire()}` });
					} else {
						toastError({ message: `${m.fail_del_department()}: ${error.message}` });
					}
				} else {
					toastError({ message: `${m.error_del_text()} ${m.department()}.` });
				}
			}
		}, [token, tenantId, deleteDepartment]
	)

	const title = `${m.department()}`;

	const actionButtons = (
		<div className="action-btn-container">
			<DepartmentDialog mode={formType.ADD} onSuccess={handleSuccess} />
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
						>
							{status
								? statusOptions.find((option) => option.value === status)?.label
								: `${m.select_status()}`}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="pop-content">
						<Command>
							<CommandInput placeholder={`${m.Search()} ${m.status_text()}`} className="h-9" />
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
										>
											{option.label}
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
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

	if (isLoading || isPending) {
		return <SkeltonLoad />;
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
