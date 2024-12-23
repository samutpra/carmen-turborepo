'use client';
import { useURLState } from '@/app/(front-end)/hooks/useURLState';
import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/components/ui/button';
import { LocationType } from '@carmensoftware/shared-types';
import React, { useEffect, useState, FormEvent } from 'react';
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
import StoreLocationDialog from './StoreLocationDialog';
import { Card, CardContent } from '@/components/ui/card';
import DataCard, { FieldConfig } from '@/components/templates/DataCard';
import SkeltonLoad from '@/components/ui-custom/Loading/SkeltonLoad';
import EmptyState from '@/components/ui-custom/EmptyState';
import TableData from '@/components/templates/TableData';
import { deleteStoreLocation, fetchStoreLocations } from '../actions/store_location';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { formType } from '@/types/form_type';
import SearchForm from '@/components/ui-custom/SearchForm';

const StoreLocationList = () => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [storeLocations, setStoreLocations] = useState<LocationType[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [statusOpen, setStatusOpen] = useState(false);
	const [search, setSearch] = useURLState('search');
	const [status, setStatus] = useURLState('status');

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const data = await fetchStoreLocations(token, tenantId, {
				search,
				status,
			});
			setStoreLocations(data.data);
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
					<p className="text-destructive">
						Error loading delivery points: {error}
					</p>
				</CardContent>
			</Card>
		);
	}

	const statusOptions = [
		{ label: 'All Status', value: '' },
		{ label: 'Active', value: 'true' },
		{ label: 'Inactive', value: 'false' },
	];

	const handleSuccess = (updatedLocation: LocationType) => {
		setStoreLocations((prev) => {
			const exists = prev.some((l) => l.id === updatedLocation.id);
			if (exists) {
				return prev.map((l) =>
					l.id === updatedLocation.id ? updatedLocation : l
				);
			}
			return [...prev, updatedLocation];
		});
	};

	const handleDelete = async (id: string) => {
		try {
			const res = await deleteStoreLocation(id, token, tenantId);
			if (res) {
				setStoreLocations((prev) => prev.filter((l) => l.id !== id));
				toastSuccess({ message: 'Store location deleted successfully' });
			}
		} catch (error) {
			if (error instanceof Error && error.message === 'Unauthorized') {
				toastError({ message: 'Your session has expired. Please login again.' });
			} else {
				console.error('Error deleting store location:', error);
				toastError({ message: 'Failed to delete store location' });
			}
		}
	};

	const handleSearch = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSearch(event.currentTarget.search.value);
	};

	const title = 'Store Locations';

	const actionButtons = (
		<div className="flex flex-col md:flex-row gap-4 md:items-start justify-between mb-6">
			<StoreLocationDialog mode={formType.ADD} onSuccess={handleSuccess} />
		</div>
	);

	const filter = (
		<div className="flex gap-4 mb-4 flex-col md:flex-row justify-between bg-background">
			<SearchForm
				onSubmit={handleSearch}
				defaultValue={search}
				placeholder="Search Store Location..."
			/>
			<div className="flex gap-2 justify-center items-center">
				<Popover open={statusOpen} onOpenChange={setStatusOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							role="combobox"
							aria-expanded={statusOpen}
							className="w-full md:w-[200px] justify-between"
						>
							{status
								? statusOptions.find((option) => option.value === status)?.label
								: 'Select status...'}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="p-0 w-full md:w-[200px]">
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

	const storeLocationFields: FieldConfig<LocationType>[] = [
		{ key: 'name', label: 'Name' },
		{ key: 'location_type', label: 'Type' },
		{ key: 'description', label: 'Description' },
		{ key: 'is_active', label: 'Status', type: 'badge' }
	];

	const content = (
		<>
			<div className="block md:hidden">
				<DataCard<LocationType>
					items={storeLocations}
					fields={storeLocationFields}
					idField="id"
					onSuccess={handleSuccess}
					onDelete={handleDelete}
					editComponent={({ item, onSuccess }) => (
						<StoreLocationDialog
							mode={formType.EDIT}
							defaultValues={item}
							onSuccess={onSuccess}
						/>
					)}
				/>
			</div>
			<div className="hidden md:block">
				<TableData<LocationType>
					items={storeLocations}
					fields={storeLocationFields}
					idField="id"
					onSuccess={handleSuccess}
					onDelete={handleDelete}
					editComponent={({ item, onSuccess }) => (
						<StoreLocationDialog
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

	if (storeLocations.length === 0) {
		return (
			<EmptyState
				title={title}
				description="No Store Location found"
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

export default StoreLocationList;
