'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CurrencyType } from '@carmensoftware/shared-types';
import { APIError } from '@carmensoftware/shared-types/src/pagination';
import CurrencyDialog from './CurrencyDialog';
import RefreshToken from '@/components/RefreshToken';
import DataCard, { FieldConfig } from '@/components/templates/DataCard';
import TableData from '@/components/templates/TableData';
import EmptyState from '@/components/ui-custom/EmptyState';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { deleteCurrency, fetchCurrencies } from '../actions/currency';
import { formType } from '@/types/form_type';
import SearchForm from '@/components/ui-custom/SearchForm';
import { useURL } from '@/hooks/useURL';
import * as m from '@/paraglide/messages.js';
import { statusOptions } from '@/lib/statusOptions';
import { FileDown, Printer } from 'lucide-react';
import SkeletonTableLoading from '@/components/ui-custom/Loading/SkeltonTableLoading';
import SkeltonCardLoading from '@/components/ui-custom/Loading/SkeltonCardLoading';
import SortDropDown from '@/components/ui-custom/SortDropDown';
import StatusSearchDropdown from '@/components/ui-custom/StatusSearchDropdown';

enum CurrencyField {
	Code = 'code',
	Name = 'name',
	Symbol = 'symbol',
	Description = 'description',
	Rate = 'rate',
	isActive = 'is_active',
}

const sortFields: FieldConfig<CurrencyType>[] = [
	{ key: CurrencyField.Code, label: `${m.code_label()}` },
	{ key: CurrencyField.Name, label: `${m.currency_name()}` },
	{ key: CurrencyField.Rate, label: `${m.rate_label()}` },
	{ key: CurrencyField.isActive, label: `${m.status_text()}`, type: 'badge' }
]

const currenciesFiltered: FieldConfig<CurrencyType>[] = [
	...sortFields,
	{ key: CurrencyField.Symbol, label: `${m.symbol_label()}` },
	{ key: CurrencyField.Description, label: `${m.description()}` },
]

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
					toastSuccess({ message: `${m.currency_delete_success()}` });
				}
			} catch (error) {
				if (error instanceof Error) {
					if (error.message === 'Unauthorized') {
						toastError({ message: `${m.session_expire()}` });
					} else {
						toastError({ message: `${m.fail_del_currency()}: ${error.message}` });
					}
				} else {
					toastError({ message: `${m.error_del_text()} ${m.currency()}.` });
				}
			}
		}, [token, tenantId, deleteCurrency]
	)


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

	const title = `${m.currency()}`;

	const actionButtons = (
		<div className="action-btn-container">
			<CurrencyDialog mode={formType.ADD} onSuccess={handleSuccess} />
			<Button variant="outline" className="group" size={'sm'}>
				<FileDown className="h-4 w-4" />
				{m.export_text()}
			</Button>
			<Button variant="outline" size={'sm'}>
				<Printer className="h-4 w-4" />
				{m.print_text()}
			</Button>
		</div>
	);

	const filter = (
		<div className="filter-container">
			<SearchForm
				defaultValue={search}
				onSearch={setSearch}
				placeholder={`${m.Search()} ${m.currency()}..`}
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
					items={currencies}
					onSort={setCurrencies}
				/>
			</div>
		</div>
	);




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

	if (currencies.length === 0) {
		return (
			<EmptyState
				title={title}
				description={m.no_currency_found_text()}
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
