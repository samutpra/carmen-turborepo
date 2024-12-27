'use client';

import { useAuth } from '@/app/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { UnitType } from '@carmensoftware/shared-types';
import React, { useCallback, useEffect, useState } from 'react';
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
import { Button } from '@/components/ui/button';
import UnitDialog from './UnitDialog';
import EmptyState from '@/components/ui-custom/EmptyState';
import SkeltonLoad from '@/components/ui-custom/Loading/SkeltonLoad';
import DataCard, { FieldConfig } from '@/components/templates/DataCard';
import TableData from '@/components/templates/TableData';
import { deleteUnit, fetchUnits } from '../actions/unit';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { formType } from '@/types/form_type';
import SearchForm from '@/components/ui-custom/SearchForm';
import { useURL } from '@/hooks/useURL';

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

	const statusOptions = [
		{ label: 'All Status', value: '' },
		{ label: 'Active', value: 'true' },
		{ label: 'Inactive', value: 'false' },
	];

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
					toastSuccess({ message: 'Unit deleted successfully' });
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

	const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSearch(event.currentTarget.search.value);
	};

	const title = 'Units';

	const actionButtons = (
		<div className="action-btn-container">
			<UnitDialog mode={formType.ADD} onSuccess={handleSuccess} />
		</div>
	);

	const filter = (
		<div className="filter-container">
			<SearchForm
				onSubmit={handleSearch}
				defaultValue={search}
				placeholder="Search Unit..."
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
						>
							{status
								? statusOptions.find((option) => option.value === status)?.label
								: 'Select status...'}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="pop-content">
						<Command>
							<CommandInput placeholder="Search status..." className="h-9" />
							<CommandList>
								<CommandEmpty>No status found.</CommandEmpty>
								<CommandGroup>
									{statusOptions.map((option) => (
										<CommandItem
											key={option.value}
											value={option.value}
											onSelect={() => {
												setStatus(option.value);
												setStatusOpen(false);
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

	const unitFields: FieldConfig<UnitType>[] = [
		{ key: 'name', label: 'Name' },
		{ key: 'description', label: 'Description' },
		{ key: 'is_active', label: 'Status', type: 'badge' }
	];

	const content = (
		<>
			<div className="block md:hidden">
				<DataCard<UnitType>
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
			</div>
			<div className="hidden md:block">
				<TableData<UnitType>
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
			</div>
		</>
	);

	if (isLoading) {
		return <SkeltonLoad />;
	}

	if (units.length === 0) {
		return (
			<EmptyState
				title={title}
				description="No units found"
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
