'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import {
	CurrencySchema,
	SystemCurrencyType,
} from '@carmensoftware/shared-types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Loader2, PencilIcon, PlusIcon } from 'lucide-react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui-custom/dialog/dialog';
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
} from '@/components/ui/dropdown-menu';
import { SORT_OPTIONS, sortFields, toggleSort } from '@/lib/util/currency';
import { fetchSystemCurrencies } from '../actions/currency';
import { LoaderButton } from '@/components/ui-custom/button/LoaderButton';
import { CurrencyCreateModel } from '../../../../../../backend/shared-dtos/currency.dto';

// Helper function to validate SORT_OPTIONS
interface CurrencyDialogProps {
	mode: formType;
	defaultValues?: CurrencyCreateModel;
	onSuccess: (currency: CurrencyCreateModel) => void;
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

	const [listCurrencies, setListCurrencies] = useState<SystemCurrencyType[]>(
		[]
	);
	const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
	const [pagination, setPagination] = useState({
		page: 1,
		pages: 1,
		perpage: 10,
		total: 0,
	});
	const [search, setSearch] = useState('');
	const [sort, setSort] = useState(SORT_OPTIONS.NAME);

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
	}, [
		token,
		tenantId,
		pagination.page,
		pagination.perpage,
		open,
		search,
		sort,
	]);

	const handleSwitchChange = (currencyId: string, checked: boolean) => {
		setSelectedCurrencies((prev) => {
			if (checked) {
				return [...prev, currencyId];
			} else {
				return prev.filter((id) => id !== currencyId);
			}
		});
	};

	const defaultCurrencyValues: CurrencyCreateModel = {
		code: '',
		name: '',
		symbol: '',
		exchange_rate: 0,
		is_active: true,
	};

	const form = useForm<CurrencyCreateModel>({
		resolver: zodResolver(CurrencySchema),
		defaultValues:
			mode === formType.EDIT && defaultValues
				? { ...defaultValues }
				: defaultCurrencyValues,
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
		setSort(SORT_OPTIONS.NAME);
		setPagination((prev) => ({ ...prev, page: 1 }));
	};

	const handlePageChange = (newPage: number) => {
		setPagination((prev) => ({ ...prev, page: newPage }));
	};

	const handleSortChange = (field: SORT_OPTIONS) => {
		setSort((prev) => toggleSort(field, prev) as SORT_OPTIONS);
	};

	if (isLoading) {
		<div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center z-50">
			<Loader2 className="h-8 w-8 animate-spin text-primary" />
		</div>;
	}

	return (
		<Dialog
			open={open}
			onOpenChange={(isOpen) => {
				setOpen(isOpen);
				if (!isOpen) {
					handleClose();
				}
			}}
		>
			<DialogTrigger asChild>
				<Button
					variant={mode === formType.ADD ? 'outline' : 'ghost'}
					size={'sm'}
					disabled={isLoading}
				>
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
					<DialogTitle>
						{mode === formType.ADD
							? `${m.create_new_currency()}`
							: `${m.edit_currency()}`}
					</DialogTitle>
				</DialogHeader>
				{mode === formType.EDIT && defaultValues ? (
					<h1>Edit Currency</h1>
				) : (
					<>
						<div className="flex my-4">
							<SearchForm
								defaultValue={search}
								onSearch={setSearch}
								placeholder={`${m.Search()} ${m.currency()}..`}
							/>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" size="sm" aria-label="Sort options">
										{sortFields.find((f) => sort.startsWith(f.key))?.label ??
											'Sort'}{' '}
										{sort.endsWith(':desc') ? '↓' : sort ? '↑' : ''}
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56">
									<DropdownMenuLabel>Sort By</DropdownMenuLabel>
									<DropdownMenuSeparator />
									{sortFields.map(({ key, label }) => (
										<DropdownMenuItem
											key={key}
											className={`flex justify-between items-center ${
												sort.startsWith(key) ? 'font-bold text-blue-500' : ''
											}`}
											onClick={() => handleSortChange(key)}
											aria-selected={sort.startsWith(key)}
										>
											{label}
											{sort.startsWith(key) && (
												<span>{sort.endsWith(':desc') ? '↓' : '↑'}</span>
											)}
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-40">Code</TableHead>
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
												onCheckedChange={(checked) =>
													handleSwitchChange(currency.iso_code, checked)
												}
												aria-label={`Select ${currency.name}`}
												disabled={isLoading}
											/>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						<PaginationComponent
							currentPage={pagination.page}
							totalPages={pagination.pages}
							onPageChange={handlePageChange}
						/>
						<div className="text-right pt-2">
							<LoaderButton
								onClick={handleSubmit}
								disabled={isLoading}
								isLoading={isLoading}
								size={'sm'}
							>
								{isLoading
									? `${m.loading()}...`
									: mode === formType.EDIT
										? `${m.save_change_text()}`
										: `${m.add_text()}`}
							</LoaderButton>
						</div>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default CurrencyDialog;