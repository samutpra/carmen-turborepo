'use client';
import { useURLState } from '@/app/(front-end)/hooks/useURLState';
import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LocationType } from '@carmensoftware/shared-types';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
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
import StoreLocationTable from './StoreLocationTable';
import { Card, CardContent } from '@/components/ui/card';
import DataCard, { FieldConfig } from '@/components/templates/DataCard';

const fetchStoreLocations = async (
	token: string,
	tenantId: string,
	params: { search?: string; status?: string } = {}
) => {
	try {
		const query = new URLSearchParams();

		if (params.search) {
			query.append('search', params.search);
		}

		if (params.status) {
			query.append('filter[is_active:bool]', params.status);
		}

		const url = `/api/configuration/locations?${query}`;

		const options = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'x-tenant-id': tenantId,
				'Content-Type': 'application/json',
			},
		};
		const response = await fetch(url, options);

		if (!response.ok) {
			throw new Error('Failed to fetch store locations');
		}
		const result = await response.json();
		return result;
	} catch (error) {
		console.error('Error fetching store locations:', error);
		throw error;
	}
};

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
			const response = await fetch(`/api/configuration/locations/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
					'x-tenant-id': tenantId,
				},
			});

			if (!response.ok) {
				throw new Error('Failed to delete store location');
			}
			setStoreLocations((prev) => prev.filter((l) => l.id !== id));
			toast.success('Store location deleted successfully');
		} catch (err) {
			console.error('Error deleting store location:', err);
			toast.error('Failed to delete store location', {
				description: err instanceof Error ? err.message : 'An error occurred',
			});
		}
	};

	const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSearch(event.currentTarget.search.value);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			setSearch(event.currentTarget.value);
		}
	};

	const title = 'Store Locations';

	const actionButtons = (
		<div className="flex flex-col md:flex-row gap-4 md:items-start justify-between mb-6">
			<StoreLocationDialog mode="create" onSuccess={handleSuccess} />
		</div>
	);

	const filter = (
		<div className="flex gap-4 mb-4 flex-col md:flex-row justify-between bg-background">
			<form onSubmit={handleSearch} className="flex gap-2 w-full">
				<div className="relative w-full md:w-1/4">
					<Input
						name="search"
						placeholder="Search Store Location..."
						defaultValue={search}
						onKeyDown={handleKeyDown}
						className="h-10 pr-10"
					/>
					<Button
						type="submit"
						variant="ghost"
						size="icon"
						className="absolute right-0 top-0 h-full px-3"
					>
						<Search className="h-4 w-4" />
						<span className="sr-only">Search</span>
					</Button>
				</div>
			</form>
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
							mode="edit"
							defaultValues={item}
							onSuccess={onSuccess}
						/>
					)}
				/>
			</div>
			<div className="hidden md:block">
				<StoreLocationTable
					storeLocations={storeLocations}
					onSuccess={handleSuccess}
					onDelete={handleDelete}
					isLoading={isLoading}
				/>
			</div>
		</>
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

export default StoreLocationList;
