'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { CurrencySchema, CurrencyType, SystemCurrencyType } from '@carmensoftware/shared-types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Loader2, PencilIcon, PlusIcon } from 'lucide-react';
import { APIError } from '@carmensoftware/shared-types/src/pagination';
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui-custom/dialog/dialog';
import PaginationComponent from '@/components/PaginationComponent';
import * as m from '@/paraglide/messages.js';
import { formType } from '@/types/form_type';
import SearchForm from '@/components/ui-custom/SearchForm';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const fetchSystemCurrencies = async (
	token: string,
	tenantId: string,
	page: number,
	perpage: number,
	search: string,
	sort: string
) => {
	try {
		if (!token) {
			throw new Error('Access token is required');
		}

		const url = `/api/system/system-currency-iso?page=${page}&perpage=${perpage}&search=${search}&sort=${sort}`;

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
			throw new APIError(response.status, `Failed to fetch currencies: ${response.status} ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error fetching currencies:', error);
		throw error;
	}
};

enum SORT_OPTIONS {
	NAME = 'name',
	CODE = 'iso_code',
	SYMBOL = 'symbol',
}


const toggleSort = (field: SORT_OPTIONS, currentValue: string): string => {
	if (currentValue === field) {
		return `${field}:desc`; // เพิ่ม :desc หากไม่มี
	} else if (currentValue === `${field}:desc`) {
		return field; // ลบ :desc หากมี
	} else {
		return field; // ค่าเริ่มต้น
	}
}

interface CurrencyDialogProps {
	mode: formType;
	defaultValues?: CurrencyType;
	onSuccess: (currency: CurrencyType) => void;
}

const CurrencyDialog: React.FC<CurrencyDialogProps> = ({
	mode,
	defaultValues,
	onSuccess,
}) => {
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';

	const [listCurrencies, setListCurrencies] = useState<SystemCurrencyType[]>([]);
	const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
	const [pagination, setPagination] = useState({
		page: 1,
		pages: 1,
		perpage: 10,
		total: 0
	});
	const [search, setSearch] = useState('');
	const [sort, setSort] = useState('');

	const fetchListCurrencies = async () => {
		setIsLoading(true);
		try {
			const result = await fetchSystemCurrencies(
				token,
				tenantId,
				pagination.page,
				pagination.perpage,
				search,
				sort
			);
			setListCurrencies(result.data);
			setPagination(result.pagination);
		} catch (error) {
			console.error('Error fetching currencies:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (open) {
			fetchListCurrencies();
		}
	}, [token, tenantId, pagination.page, pagination.perpage, open, search, sort]);

	const handleSwitchChange = (currencyId: string, checked: boolean) => {
		setSelectedCurrencies((prev) => {
			if (checked) {
				return [...prev, currencyId];
			} else {
				return prev.filter((id) => id !== currencyId);
			}
		});
	};

	const defaultCurrencyValues: CurrencyType = {
		code: '',
		name: '',
		symbol: '',
		rate: '',
		is_active: true,
	};

	const form = useForm<CurrencyType>({
		resolver: zodResolver(CurrencySchema),
		defaultValues: mode === formType.EDIT && defaultValues ? { ...defaultValues } : defaultCurrencyValues,
	});

	useEffect(() => {
		if (mode === formType.EDIT && defaultValues) {
			form.reset({ ...defaultValues });
		} else {
			form.reset({ ...defaultCurrencyValues });
		}
	}, [mode, defaultValues, form]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Submitting:', selectedCurrencies);
		handleClose();
	};

	const handleClose = () => {
		setOpen(false);
		form.reset();
		setSelectedCurrencies([]);
		setPagination(prev => ({ ...prev, page: 1 })); // Reset page when closing
	};

	const handlePageChange = (newPage: number) => {
		setPagination(prev => ({ ...prev, page: newPage }));
	};

	const handleSortChange = (field: SORT_OPTIONS) => {
		setSort((prev) => toggleSort(field, prev));
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant={mode === formType.ADD ? 'outline' : 'ghost'}
					size={'sm'}
					disabled={isLoading}
				>
					{mode === formType.ADD ? (
						<>
							<PlusIcon className="h-4 w-4 mr-2" />
							{m.add_text()} {m.currency()}
						</>
					) : (
						<PencilIcon className="w-4 h-4" />
					)}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{mode === formType.ADD ? `${m.create_new_currency()}` : `${m.edit_currency()}`}
					</DialogTitle>
				</DialogHeader>
				{mode === formType.EDIT && defaultValues ? (
					<h1>Edit Currency</h1>
				) : (

					<div className=''>
						{isLoading && (
							<div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center z-50">
								<Loader2 className="h-8 w-8 animate-spin text-primary" />
							</div>
						)}
						<SearchForm
							defaultValue={search}
							onSearch={setSearch}
							placeholder={`${m.Search()} ${m.currency()}..`}
						/>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline">Sort: {sort}</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56">
								<DropdownMenuLabel>Sort By</DropdownMenuLabel>
								<DropdownMenuSeparator />
								{Object.values(SORT_OPTIONS).map((field) => (
									<DropdownMenuItem
										key={field}
										onClick={() => handleSortChange(field as SORT_OPTIONS)}
									>
										{field} {sort.includes(field) ? (sort.endsWith(":desc") ? "↓" : "↑") : ""}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className='w-40'>Code</TableHead>
									<TableHead>Name</TableHead>
									<TableHead>Symbol</TableHead>
									<TableHead>Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{listCurrencies.map((currency) => (
									<TableRow key={currency.id}>
										<TableCell>{currency.iso_code}</TableCell>
										<TableCell>{currency.name}</TableCell>
										<TableCell>{currency.symbol}</TableCell>
										<TableCell>
											<Switch
												checked={selectedCurrencies.includes(currency.iso_code)}
												onCheckedChange={(checked) => handleSwitchChange(currency.iso_code, checked)}
												aria-label={`Select ${currency.name}`}
												disabled={isLoading}
											/>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<TableFooter>

							</TableFooter>
						</Table>
						<PaginationComponent
							currentPage={pagination.page}
							totalPages={pagination.pages}
							onPageChange={handlePageChange}
						/>
						<div className='text-right pt-2'>
							<Button
								onClick={handleSubmit}
								aria-label="Submit Selected Currencies"
								size={'sm'}
								disabled={isLoading}
							>
								{isLoading ? (
									<>
										<Loader2 className="h-4 w-4 mr-2 animate-spin" />
										Loading...
									</>
								) : (
									'Submit'
								)}
							</Button>
						</div>

					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default CurrencyDialog;