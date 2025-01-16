'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { CurrencySchema, CurrencyType, SystemCurrencyType } from '@carmensoftware/shared-types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { PencilIcon, PlusIcon } from 'lucide-react';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { submitCurrency } from '../actions/currency';
import { formType } from '@/types/form_type';
import * as m from '@/paraglide/messages.js';
import { APIError } from '@carmensoftware/shared-types/src/pagination';
import { useURL } from '@/hooks/useURL';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Switch } from '@/components/ui/switch';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui-custom/dialog/dialog';

const fetchSystemCurrencies = async (
	token: string,
	tenantId: string,
	params: {
		search?: string;
		status?: string;
		page?: string;
		perpage?: string;
		sort?: string;
	} = {}
) => {
	try {
		if (!token) {
			throw new Error('Access token is required');
		}

		const query = new URLSearchParams();

		if (params.search) {
			query.append('search', params.search);
		}
		if (params.page) {
			query.append('page', params.page);
		}
		if (params.perpage) {
			query.append('perpage', params.perpage);
		}
		if (params.sort) {
			query.append('sort', params.sort);
		}

		const url = `/api/system/system-currency-iso?${query}`;

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

		const result = await response.json();

		return result;
	} catch (error) {
		console.error('Error fetching currencies:', error);
		throw error;
	}
};

export interface CurrencyDialogProps {
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
	const [search, setSearch] = useURL('search');
	const [page, setPage] = useURL('page');
	const [perpage, setPerpage] = useURL('perpage');
	const [sort, setSort] = useURL('sort');
	const [listCurrencies, setListCurrencies] = useState<SystemCurrencyType[]>([]);
	const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);

	const fetchListCurrencies = async () => {
		try {
			const result = await fetchSystemCurrencies(token, tenantId, {
				search,
				sort,
				page,
				perpage,
			});
			console.log('result >>>', result);
			setListCurrencies(result.data);

			// Update pagination state
			setPage(result.pagination.page.toString());
			setPerpage(result.pagination.perpage.toString());
		} catch (error) {
			console.error('Error fetching currencies:', error);
		}
	};

	useEffect(() => {
		fetchListCurrencies();
	}, [token, tenantId, search, page, perpage, sort]);

	const handleSwitchChange = (currencyId: string, checked: boolean) => {
		setSelectedCurrencies((prev) => {
			if (checked) {
				return [...prev, currencyId]; // Add the selected currency id
			} else {
				return prev.filter((id) => id !== currencyId); // Remove the unselected currency id
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
	};

	const handlePageChange = (newPage: number) => {
		const nextPage = Math.max(newPage, 1); // Ensure the page is at least 1
		setPage(nextPage.toString());
	};

	// Pagination logic
	const totalPages = Math.ceil(156 / parseInt(perpage, 10)); // Example total pages, calculate dynamically based on 'total'
	const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

	const paginationRange = (totalPages: number, currentPage: number) => {
		const range: (number | string)[] = [];

		if (totalPages <= 3) {
			// If total pages are 3 or fewer, show all pages
			for (let i = 1; i <= totalPages; i++) {
				range.push(i);
			}
		} else {
			// Always show the first page
			range.push(1);

			// Show ellipsis if the current page is greater than 3
			if (currentPage > 3) {
				range.push('...');
			}

			// Show the 2 or 3 pages around the current page
			let start = currentPage - 1;
			let end = currentPage + 1;

			// Ensure that pages are within bounds
			if (start < 2) start = 2;
			if (end > totalPages - 1) end = totalPages - 1;

			for (let i = start; i <= end; i++) {
				range.push(i);
			}

			// Show ellipsis if the current page is near the last page
			if (currentPage < totalPages - 2) {
				range.push('...');
			}

			// Always show the last page
			range.push(totalPages);
		}

		return range;
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant={mode === formType.ADD ? 'outline' : 'ghost'} size={'sm'}>
					{mode === formType.ADD ? (
						<>
							<PlusIcon className="h-4 w-4" />
							{m.add_text()} {m.currency()}
						</>
					) : (
						<PencilIcon className="w-4 h-4" />
					)}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{mode === formType.ADD ? `${m.create_new_currency()}` : `${m.edit_currency()}`}</DialogTitle>
				</DialogHeader>
				{mode === formType.EDIT && defaultValues ? (
					<h1>Edit Currency</h1>
				) : (
					<Table>
						<TableCaption>A list of your recent Currency.</TableCaption>
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
										/>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
						<TableFooter className="flex items-center justify-between w-full">
							<Pagination>
								<PaginationContent className="flex items-center space-x-2">
									<PaginationItem>
										<PaginationPrevious
											href="#"
											onClick={(e) => {
												e.preventDefault();
												handlePageChange(Number(page) - 1);
											}}
										/>
									</PaginationItem>
									{paginationRange(totalPages, Number(page)).map((pageNum, index) => (
										pageNum === '...' ? (
											<PaginationItem key={index}>
												<PaginationEllipsis />
											</PaginationItem>
										) : (
											<PaginationItem key={pageNum}>
												<PaginationLink
													href="#"
													isActive={page === pageNum.toString()}
													onClick={(e) => {
														e.preventDefault();
														handlePageChange(Number(pageNum)); // Directly set the page when a page number is clicked
													}}
												>
													{pageNum}
												</PaginationLink>
											</PaginationItem>
										)
									))}
									<PaginationItem>
										<PaginationNext
											href="#"
											onClick={(e) => {
												e.preventDefault();
												handlePageChange(Number(page) + 1);
											}}
										/>
									</PaginationItem>
								</PaginationContent>
							</Pagination>
							<Button
								onClick={handleSubmit}
								aria-label="Submit Selected Currencies"
								size={'sm'}
							>
								Submit
							</Button>
						</TableFooter>
					</Table>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default CurrencyDialog;