'use client';
import React, { useEffect, useState } from 'react';
import { useURLState } from '@/app/(front-end)/hooks/useURLState';
import { useAuth } from '@/app/context/AuthContext';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CurrencyType } from '@carmensoftware/shared-types';
import { APIError } from '@carmensoftware/shared-types/src/pagination';
import { Search } from 'lucide-react';
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
import CurrencyDialog from './CurrencyDialog';
import RefreshToken from '@/components/RefreshToken';
import DataCard, { FieldConfig } from '@/components/templates/DataCard';
import TableData from '@/components/templates/TableData';
import SkeltonLoad from '@/components/ui-custom/Loading/SkeltonLoad';
import EmptyState from '@/components/ui-custom/EmptyState';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { deleteCurrency, fetchCurrencies } from '../actions/currency';

const CurrencyList = () => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [currencies, setCurrencies] = useState<CurrencyType[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [statusOpen, setStatusOpen] = useState(false);
	const [search, setSearch] = useURLState('search');
	const [status, setStatus] = useURLState('status');
	const [showRefreshToken, setShowRefreshToken] = useState(false);

	const statusOptions = [
		{ label: 'All Status', value: '' },
		{ label: 'Active', value: 'true' },
		{ label: 'Inactive', value: 'false' },
	];

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
			const data = await fetchCurrencies(token, tenantId, {
				search,
				status,
			});
			setCurrencies(data);
			setShowRefreshToken(false);
		} catch (err) {
			if (err instanceof APIError && err.status === 401) {
				toastError({ message: 'Your session has expired. Please login again.' });
				setShowRefreshToken(true);
				setCurrencies([]);
			} else {
				setError(err instanceof Error ? err.message : 'An error occurred');
				toastError({ message: 'Failed to fetch currencies' });
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [token, tenantId, search, status]);

	const handleDelete = async (id: string) => {
		try {
			await deleteCurrency(id, token, tenantId);
			setCurrencies((prev) => prev.filter((currency) => currency.id !== id));
			toastSuccess({ message: 'Currency deleted successfully' });
		} catch (error) {
			if (error instanceof Error && error.message === 'Unauthorized') {
				toastError({ message: 'Your session has expired. Please login again.' });
				setShowRefreshToken(true);
			} else {
				console.error('Error deleting currency:', error);
				toastError({ message: 'Failed to delete currency' });
			}
		}

	};

	if (showRefreshToken) {
		return (
			<Card className="border-destructive w-full md:w-1/2">
				<CardContent className="pt-6">
					<div className="flex flex-col items-center gap-4">
						<p className="text-destructive">Your session has expired.</p>
						<RefreshToken />
					</div>
				</CardContent>
			</Card>
		);
	}

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

	const handleSuccess = (values: CurrencyType) => {
		setCurrencies((prev) => {
			const exists = prev.some((p) => p.id === values.id);
			if (exists) {
				return prev.map((p) => (p.id === values.id ? values : p));
			}
			return [...prev, values];
		});
	};

	const title = 'Currencies';

	const actionButtons = (
		<div className="flex flex-col md:flex-row gap-4 md:items-start justify-between mb-6">
			<CurrencyDialog mode="create" onSuccess={handleSuccess} />
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

	const currenciesFiltered: FieldConfig<CurrencyType>[] = [
		{ key: 'code', label: 'Code' },
		{ key: 'name', label: 'Name' },
		{ key: 'symbol', label: 'Symbol' },
		{ key: 'description', label: 'Description' },
		{ key: 'rate', label: 'Rate' },
		{ key: 'is_active', label: 'Status', type: 'badge' },
	]

	const content = (
		<>
			<div className="block md:hidden">
				<DataCard<CurrencyType>
					items={currencies}
					fields={currenciesFiltered}
					idField="id"
					onSuccess={handleSuccess}
					onDelete={handleDelete}
					editComponent={({ item, onSuccess }) => (
						<CurrencyDialog
							mode="update"
							defaultValues={item}
							onSuccess={onSuccess}
						/>
					)}
				/>
			</div>
			<div className="hidden md:block">
				<TableData<CurrencyType>
					items={currencies}
					fields={currenciesFiltered}
					idField="id"
					onSuccess={handleSuccess}
					onDelete={handleDelete}
					editComponent={({ item, onSuccess }) => (
						<CurrencyDialog
							mode="update"
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

	if (currencies.length === 0) {
		return (
			<EmptyState
				title={title}
				description="No Currency found"
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

export default CurrencyList;
