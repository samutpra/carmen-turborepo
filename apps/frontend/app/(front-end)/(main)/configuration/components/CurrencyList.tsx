'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CurrencyType } from '@carmensoftware/shared-types';
import { APIError } from '@carmensoftware/shared-types/src/pagination';
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
import { formType } from '@/types/form_type';
import SearchForm from '@/components/ui-custom/SearchForm';
import { useURL } from '@/hooks/useURL';

const CurrencyList = () => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [currencies, setCurrencies] = useState<CurrencyType[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [statusOpen, setStatusOpen] = useState(false);
	const [search, setSearch] = useURL('search');
	const [status, setStatus] = useURL('status');
	const [showRefreshToken, setShowRefreshToken] = useState(false);

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


	const statusOptions = [
		{ label: 'All Status', value: '' },
		{ label: 'Active', value: 'true' },
		{ label: 'Inactive', value: 'false' },
	];

	const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSearch(event.currentTarget.search.value);
	};

	// const handleSuccess = (values: CurrencyType) => {
	// 	setCurrencies((prev) => {
	// 		const exists = prev.some((p) => p.id === values.id);
	// 		if (exists) {
	// 			return prev.map((p) => (p.id === values.id ? values : p));
	// 		}
	// 		return [...prev, values];
	// 	});
	// };

	const handleSuccess = useCallback((values: CurrencyType) => {
		setCurrencies((prev) => {
			const mapValues = new Map(prev.map((u) => [u.id, u]));
			mapValues.set(values.id, values);
			return Array.from(mapValues.values());
		});
	}, [setCurrencies]);

	const handleDelete = useCallback(
		async (id: string) => {
			try {
				const res = await deleteCurrency(id, token, tenantId);
				if (res) {
					setCurrencies((prev) => prev.filter((p) => p.id !== id));
					toastSuccess({ message: 'Currency deleted successfully' });
				}
			} catch (error) {
				if (error instanceof Error) {
					if (error.message === 'Unauthorized') {
						toastError({ message: 'Your session has expired. Please login again.' });
					} else {
						toastError({ message: `Failed to delete currency: ${error.message}` });
					}
				} else {
					toastError({ message: 'An unknown error occurred while deleting the currency.' });
				}
			}
		}, [token, tenantId, deleteCurrency]
	)


	// const handleDelete = async (id: string) => {
	// 	try {
	// 		await deleteCurrency(id, token, tenantId);
	// 		setCurrencies((prev) => prev.filter((currency) => currency.id !== id));
	// 		toastSuccess({ message: 'Currency deleted successfully' });
	// 	} catch (error) {
	// 		if (error instanceof Error && error.message === 'Unauthorized') {
	// 			toastError({ message: 'Your session has expired. Please login again.' });
	// 			setShowRefreshToken(true);
	// 		} else {
	// 			console.error('Error deleting currency:', error);
	// 			toastError({ message: 'Failed to delete currency' });
	// 		}
	// 	}

	// };

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



	const title = 'Currencies';

	const actionButtons = (
		<div className="action-btn-container">
			<CurrencyDialog mode={formType.ADD} onSuccess={handleSuccess} />
		</div>
	);

	const filter = (
		<div className="filter-container">
			<SearchForm
				onSubmit={handleSearch}
				defaultValue={search}
				placeholder="Search Currency..."
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
							mode={formType.EDIT}
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
