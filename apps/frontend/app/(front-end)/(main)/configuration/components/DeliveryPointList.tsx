'use client';
import { useAuth } from '@/app/context/AuthContext';
import { DeliveryPointType } from '@carmensoftware/shared-types';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { DeliveryPointDialog } from './DeliveryPointDialog';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { useURLState } from '@/app/(front-end)/hooks/useURLState';
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
import DeliveryPointTable from './DeliveryPointTable';
import DataCard, { FieldConfig } from '@/components/templates/DataCard';

const fetchDeliveryPoints = async (
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

		const url = `/api/configuration/delivery-point?${query}`;

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
			throw new Error('Failed to fetch delivery points');
		}

		const result = await response.json();
		return result.data;
	} catch (error) {
		console.error('Error fetching delivery points:', error);
		throw error;
	}
};

const DeliveryPointList = () => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [deliveryPoints, setDeliveryPoints] = useState<DeliveryPointType[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [statusOpen, setStatusOpen] = useState(false);
	const [search, setSearch] = useURLState('search');
	const [status, setStatus] = useURLState('status');

	const statusOptions = [
		{ label: 'All Status', value: '' },
		{ label: 'Active', value: 'true' },
		{ label: 'Inactive', value: 'false' },
	];

	const handleSuccess = (updatedPoint: DeliveryPointType) => {
		setDeliveryPoints((prev) => {
			const exists = prev.some((p) => p.id === updatedPoint.id);
			if (exists) {
				return prev.map((p) => (p.id === updatedPoint.id ? updatedPoint : p));
			}
			return [...prev, updatedPoint];
		});
	};

	const handleDelete = async (id: string) => {
		try {
			const response = await fetch(`/api/configuration/delivery-point/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
					'x-tenant-id': tenantId,
				},
			});

			if (!response.ok) {
				throw new Error('Failed to delete delivery point');
			}

			setDeliveryPoints((prev) => prev.filter((point) => point.id !== id));
			toast.success('Delivery point deleted successfully');
		} catch (err) {
			console.error('Error deleting delivery point:', err);
			toast.error('Failed to delete delivery point', {
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

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const data = await fetchDeliveryPoints(token, tenantId, {
				search,
				status,
			});
			setDeliveryPoints(data.data);
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

	const title = 'Delivery Points';

	const actionButtons = (
		<div className="flex flex-col md:flex-row gap-4 md:items-start justify-between mb-6">
			<DeliveryPointDialog mode="create" onSuccess={handleSuccess} />
		</div>
	);

	const filter = (
		<div className="flex gap-4 mb-4 flex-col md:flex-row justify-between bg-background">
			<form onSubmit={handleSearch} className="flex gap-2 w-full">
				<div className="relative w-full md:w-1/4">
					<Input
						name="search"
						placeholder="Search Delivery Point..."
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

	const deliveryPointsFields: FieldConfig<DeliveryPointType>[] = [
		{ key: 'name', label: 'Name' },
		{ key: 'is_active', label: 'Status', type: 'badge' }
	];

	const content = (
		<>
			<div className="block md:hidden">
				<DataCard<DeliveryPointType>
					items={deliveryPoints}
					fields={deliveryPointsFields}
					idField="id"
					onSuccess={handleSuccess}
					onDelete={handleDelete}
					editComponent={({ item, onSuccess }) => (
						<DeliveryPointDialog
							mode="edit"
							defaultValues={item}
							onSuccess={onSuccess}
						/>
					)}
				/>
			</div>
			<div className="hidden md:block">
				<DeliveryPointTable
					deliveryPoints={deliveryPoints}
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

export default DeliveryPointList;
