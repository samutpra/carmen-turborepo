'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CurrencyDialog from './CurrencyDialog';
import RefreshToken from '@/components/RefreshToken';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { deleteCurrency, fetchCurrencies } from '../actions/currency';
import { formType } from '@/types/form_type';
import SearchForm from '@/components/ui-custom/SearchForm';
import { useURL } from '@/hooks/useURL';
import { statusOptions } from '@/lib/statusOptions';
import { FileDown, Printer } from 'lucide-react';
import SortDropDown from '@/components/ui-custom/SortDropDown';
import StatusSearchDropdown from '@/components/ui-custom/StatusSearchDropdown';
import DisplayComponent from '@/components/templates/DisplayComponent';
import { FieldConfig } from '@/lib/util/uiConfig';
import { CurrencyCreateModel } from '@/dtos/currency.dto';
import ErrorCard from '@/components/ui-custom/error/ErrorCard';
import { code_label, currency, currency_delete_success, currency_name, error_del_text, export_text, fail_del_currency, fail_to_text, print_text, rate_label, refresh_exchange_rate, Search, session_expire, status_text, symbol_label } from '@/paraglide/messages.js';

enum CurrencyField {
	Code = 'code',
	Name = 'name',
	Symbol = 'symbol',
	Description = 'description',
	Rate = 'exchange_rate',
	isActive = 'is_active',
}

const sortFields: FieldConfig<CurrencyCreateModel>[] = [
	{ key: CurrencyField.Code, label: `${code_label()}`, className: 'w-20' },
	{ key: CurrencyField.Name, label: `${currency_name()}`, className: 'w-40' },
	{ key: CurrencyField.Rate, label: `${rate_label()}`, className: 'w-20' },
	{
		key: CurrencyField.isActive,
		label: `${status_text()}`,
		type: 'badge',
		className: 'w-24',
	},
];

const currenciesFiltered: FieldConfig<CurrencyCreateModel>[] = [
	...sortFields,
	{
		key: CurrencyField.Symbol,
		label: `${symbol_label()}`,
		className: 'w-20',
	},
];

const CurrencyList = () => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [currencies, setCurrencies] = useState<CurrencyCreateModel[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [statusOpen, setStatusOpen] = useState(false);
	const [search, setSearch] = useURL('search');
	const [status, setStatus] = useURL('status');
	const [page, setPage] = useURL('page');
	const [pages, setPages] = useURL('pages');
	const [showRefreshToken, setShowRefreshToken] = useState(false);

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const data = await fetchCurrencies(token, tenantId, {
				search,
				status,
				page,
			});
			setCurrencies(data.data);
			setPage(data.pagination.page);
			setPages(data.pagination.pages);
			setShowRefreshToken(false);
		} catch (err) {
			if (err instanceof Error && err.message === 'Unauthorized') {
				toastError({
					message: 'Your session has expired. Please login again.',
				});
				setShowRefreshToken(true);
				setCurrencies([]);
			} else {
				setError(err instanceof Error ? err.message : 'An error occurred');
				toastError({ message: `${fail_to_text()} ${currency()}` });
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [token, tenantId, search, status]);

	const handleSuccess = useCallback(
		(values: CurrencyCreateModel) => {
			setCurrencies((prev) => {
				const mapValues = new Map(prev.map((u) => [u.id, u]));
				mapValues.set(values.id, values);
				return Array.from(mapValues.values());
			});
		},
		[setCurrencies]
	);

	const handleDelete = useCallback(
		async (id: string) => {
			try {
				const res = await deleteCurrency(id, token, tenantId);
				if (res) {
					setCurrencies((prev) => prev.filter((p) => p.id !== id));
					toastSuccess({ message: `${currency_delete_success()}` });
				}
			} catch (error) {
				if (error instanceof Error) {
					if (error.message === 'Unauthorized') {
						toastError({ message: `${session_expire()}` });
					} else {
						toastError({
							message: `${fail_del_currency()}: ${error.message}`,
						});
					}
				} else {
					toastError({ message: `${error_del_text()} ${currency()}.` });
				}
			}
		},
		[token, tenantId, deleteCurrency]
	);

	if (showRefreshToken) {
		return (
			<Card
				className="border-destructive w-full md:w-1/2"
				data-id="currency-refresh-token-card"
			>
				<CardContent className="pt-6" data-id="currency-refresh-token-content">
					<div
						className="flex flex-col items-center gap-4"
						data-id="currency-refresh-token-container"
					>
						<p className="text-destructive">{session_expire()}</p>
						<RefreshToken />
					</div>
				</CardContent>
			</Card>
		);
	}

	if (error) {
		return <ErrorCard message={error} data-id="currency-error-card" />;
	}

	const title = `${currency()}`;

	const actionButtons = (
		<div
			className="action-btn-container"
			data-id="currency-action-btn-container"
		>
			<Button
				variant={'outline'}
				size={'sm'}
				data-id="currency-refresh-exchange-rate-button"
			>
				{refresh_exchange_rate()}
			</Button>
			<CurrencyDialog
				mode={formType.ADD}
				onSuccess={handleSuccess}
				data-id="currency-add-dialog"
			/>
			<Button
				variant="outline"
				className="group"
				size={'sm'}
				data-id="currency-export-button"
			>
				<FileDown className="h-4 w-4" />
				{export_text()}
			</Button>
			<Button variant="outline" size={'sm'} data-id="currency-print-button">
				<Printer className="h-4 w-4" />
				{print_text()}
			</Button>
		</div>
	);

	const filter = (
		<div className="filter-container" data-id="currency-filter-container">
			<SearchForm
				defaultValue={search}
				onSearch={setSearch}
				placeholder={`${Search()} ${currency()}..`}
				data-id="currency-search-form"
			/>
			<div className="all-center gap-2">
				<StatusSearchDropdown
					options={statusOptions}
					value={status}
					onChange={setStatus}
					open={statusOpen}
					onOpenChange={setStatusOpen}
					data-id="currency-status-search-dropdown"
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
		<DisplayComponent<CurrencyCreateModel>
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
					data-id="currency-edit-dialog"
				/>
			)}
			page={+page}
			totalPage={+pages}
			setPage={setPage}
			data-id="currency-display-component"
		/>
	);

	return (
		<DataDisplayTemplate
			title={title}
			actionButtons={actionButtons}
			filters={filter}
			content={content}
			isLoading={isLoading}
			data-id="currency-data-display-template"
		/>
	);
};

export default CurrencyList;
