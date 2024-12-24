'use client';
import { useAuth } from '@/app/context/AuthContext';
import { DeliveryPointType } from '@carmensoftware/shared-types';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DeliveryPointDialog } from './DeliveryPointDialog';
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
import DataCard, { FieldConfig } from '@/components/templates/DataCard';
import SkeltonLoad from '@/components/ui-custom/Loading/SkeltonLoad';
import EmptyState from '@/components/ui-custom/EmptyState';
import TableData from '@/components/templates/TableData';
import { deleteDeliveryPoint, fetchDeliveryPoints } from '../actions/delivery_point';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { formType } from '@/types/form_type';
import SearchForm from '@/components/ui-custom/SearchForm';

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

	const handleSuccess = (updatedPoint: DeliveryPointType) => {
		setDeliveryPoints((prev) => {
			const exists = prev.some((p) => p.id === updatedPoint.id);
			if (exists) {
				return prev.map((p) => (p.id === updatedPoint.id ? updatedPoint : p));
			}
			return [...prev, updatedPoint];
		});
		fetchData();
	};


	const handleDelete = async (id: string) => {
		try {
			await deleteDeliveryPoint(id, token, tenantId);
			setDeliveryPoints((prev) => prev.filter((p) => p.id !== id));
			toastSuccess({ message: 'Delivery point deleted successfully' });
			fetchData();
		} catch (error) {
			if (error instanceof Error && error.message === 'Unauthorized') {
				toastError({ message: 'Your session has expired. Please login again.' });
			} else {
				console.error('Error deleting currency:', error);
				toastError({ message: 'Failed to delete currency' });
			}
		}
	};

	const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSearch(event.currentTarget.search.value);
	};

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
			<DeliveryPointDialog mode={formType.ADD} onSuccess={handleSuccess} />
		</div>
	);

	const filter = (
		<div className="flex gap-4 mb-4 flex-col md:flex-row justify-between bg-background">
			<SearchForm
				onSubmit={handleSearch}
				defaultValue={search}
				placeholder="Search Delivery Point..."
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
							mode={formType.EDIT}
							defaultValues={item}
							onSuccess={onSuccess}
						/>
					)}
				/>
			</div>
			<div className="hidden md:block">
				<TableData<DeliveryPointType>
					items={deliveryPoints}
					fields={deliveryPointsFields}
					idField="id"
					onSuccess={handleSuccess}
					onDelete={handleDelete}
					editComponent={({ item, onSuccess }) => (
						<DeliveryPointDialog
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

	if (deliveryPoints.length === 0) {
		return (
			<EmptyState
				title={title}
				description="No Delevery Points found"
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

export default DeliveryPointList;
