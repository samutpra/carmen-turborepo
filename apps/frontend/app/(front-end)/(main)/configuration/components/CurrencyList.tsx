'use client';

import { ArrowUpDown, Filter, PlusCircle, Printer, Search, Sheet } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CustomButton } from '@/components/ui-custom/CustomButton';
import DataCard from '@/components/templates/DataCard';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import DataTable from '@/components/templates/DataTable';
import DialogDelete from '@/components/ui-custom/DialogDelete';
import { FilterBuilder } from '@/components/ui-custom/FilterBuilder';
import SearchInput from '@/components/ui-custom/SearchInput';
import SkeletonTableLoading from '@/components/ui-custom/Loading/SkeltonTableLoading';
import SkeltonCardLoading from '@/components/ui-custom/Loading/SkeltonCardLoading';
import { useCurrencies, updateCurrency, deleteCurrency, createCurrency } from '../currency/actions/currency';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorDisplay from '@/components/ErrorDisplay';
import CurrencyForm from './form/CurrencyForm';
import { useAuth } from '@/app/context/AuthContext';
import EmptyData from '@/components/EmptyData';
import {
	CurrencyLabel,
	CurrencySchema,
	CurrencyType,
} from '@carmensoftware/shared-types/dist/currencySchema';

const statusOptions = [
	{ value: 'all', label: 'All Statuses' },
	{ value: 'true', label: 'Active' },
	{ value: 'false', label: 'Not Active' },
];


const CurrencyList = () => {
	const { accessToken } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [editingItem, setEditingItem] = useState<CurrencyType | null>(null);
	const [dialogForm, setDialogForm] = useState(false);
	const [idToDelete, setIdToDelete] = useState<string | null | undefined>(null);
	const [dialogDelete, setDialogDelete] = useState(false);
	const [statusOpen, setStatusOpen] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState('');

	const token = accessToken || ''

	const {
		currencies: rawCurrencies,
		setCurrencies,
		loading,
		error,
		pagination,
		search,
		goToPage,
		nextPage,
		previousPage,
		setPerPage,
		handleSearch,
		fetchData
	} = useCurrencies(token);

	const currencies = rawCurrencies.map(currency => ({
		...currency,
		symbol: currency.symbol || '',
		is_active: currency.is_active || false
	})) as CurrencyType[];

	const form = useForm<CurrencyType>({
		resolver: zodResolver(CurrencySchema),
		defaultValues: {
			code: '',
			name: '',
			symbol: '',
			description: '',
			rate: 0,
			is_active: true,
		},
	});

	useEffect(() => {
		if (editingItem) {
			form.reset({
				code: editingItem.code,
				name: editingItem.name,
				symbol: editingItem.symbol,
				description: editingItem.description,
				rate: editingItem.rate,
				is_active: editingItem.is_active,
			});
		}
	}, [editingItem, form]);

	const handleEdit = (item: CurrencyType) => {
		setEditingItem(item);
		form.reset({
			id: item.id,
			code: item.code,
			name: item.name,
			symbol: item.symbol,
			description: item.description,
			rate: item.rate,
			is_active: item.is_active,
		});
		setDialogForm(true);
	};

	const handleDelete = (item: CurrencyType) => {
		setIdToDelete(item.id);
		setDialogDelete(true);
	};

	const confirmDelete = async () => {
		try {
			setIsLoading(true);
			if (idToDelete) {
				await deleteCurrency(token, idToDelete);
				setCurrencies((prev) =>
					prev.filter((currency) => currency.id !== idToDelete)
				);
				fetchData();
				setDialogDelete(false);
			}
		} catch (error) {
			console.error('Error deleting currency:', error);
		} finally {
			setIsLoading(false);
			setIdToDelete(null);
		}
	};

	const handleSave = async (data: CurrencyType) => {
		try {
			setIsLoading(true);
			if (editingItem?.id) {
				const updatedCurrency = await updateCurrency(token, editingItem.id, data);
				setCurrencies((prev) =>
					prev.map((item) => item.id === editingItem.id ? updatedCurrency : item)
				);
			} else {
				const newCurrency = await createCurrency(token, data);
				const currencyWithRequiredFields: CurrencyType = {
					...newCurrency,
					symbol: newCurrency.symbol || '',
					is_active: newCurrency.is_active || false
				};
				setCurrencies((prev) => [...prev, currencyWithRequiredFields]);
			}
			handleCloseDialog();
		} catch (error) {
			console.error('Save error:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCloseDialog = () => {
		form.reset({
			code: '',
			description: '',
			name: '',
			symbol: '',
			rate: 0,
			is_active: true,
		});
		setDialogForm(false);
		setEditingItem(null);
	};

	const title = 'Currency';

	const columns: CurrencyLabel[] = [
		{ key: 'code', label: 'Code' },
		{ key: 'name', label: 'Name' },
		{ key: 'symbol', label: 'Symbol' },
		{ key: 'description', label: 'Description' },
		{ key: 'rate', label: 'Rate' },
		{ key: 'is_active', label: 'Active' },
	];

	const actionButtons = (
		<div className="flex flex-col gap-4 md:flex-row">
			<CustomButton
				className="w-full md:w-20"
				prefixIcon={<PlusCircle />}
				onClick={() => setDialogForm(true)}
			>
				Add
			</CustomButton>
			<div className="flex flex-row md:flex-row gap-4">
				<CustomButton
					className="w-full md:w-20"
					variant="outline"
					prefixIcon={<Sheet />}
				>
					Export
				</CustomButton>
				<CustomButton
					className="w-full md:w-20"
					variant="outline"
					prefixIcon={<Printer />}
				>
					Print
				</CustomButton>
			</div>
		</div>
	);

	const filter = (
		<div className="flex flex-col justify-start sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
			<div className="w-full sm:w-auto flex-grow">
				<SearchInput
					placeholder="Search Currency..."
					value={search}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						handleSearch(e.target.value, false);
					}}
					onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
						if (e.key === 'Enter') {
							e.preventDefault();
							handleSearch(e.currentTarget.value, true);
						}
					}}
					Icon={Search}
				/>
			</div>
			<div className="flex items-center space-x-4">
				<Popover open={statusOpen} onOpenChange={setStatusOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							role="combobox"
							aria-expanded={statusOpen}
							className="w-[200px] justify-between"
						>
							{selectedStatus
								? statusOptions.find(
									(status) => status.value === selectedStatus
								)?.label
								: 'Select status...'}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[200px] p-0">
						<Command>
							<CommandInput placeholder="Search status..." className="h-9" />
							<CommandList>
								<CommandEmpty>No status found.</CommandEmpty>
								<CommandGroup>
									{statusOptions.map((status) => (
										<CommandItem
											key={status.value}
											onSelect={() => {
												setSelectedStatus(
													status.value === selectedStatus ? '' : status.value
												);
												setStatusOpen(false);
											}}
										>
											{status.label}
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>

				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline">
							<Filter className="h-4 w-4" />
							More Filters
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:w-[70vw] max-w-[60vw]">
						<FilterBuilder
							fields={[
								{ value: 'name', label: 'Name' },
								{ value: 'description', label: 'Description' },
								{ value: 'is_active', label: 'Status' },
							]}
							onFilterChange={(filters) => {
								console.log('Applied filters:', filters);
							}}
						/>
					</DialogContent>
				</Dialog>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">
							<ArrowUpDown className="h-4 w-4" />
							Sort
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Name</DropdownMenuItem>
						<DropdownMenuItem>Description</DropdownMenuItem>
						<DropdownMenuItem>Status</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);

	const content = (
		<>
			<div className='block lg:hidden'>
				{loading ? (
					<SkeltonCardLoading />
				) : error ? (
					<div className='text-red-500'>{error.message}</div>
				) : (
					<DataCard data={currencies} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />
				)}
			</div>

			<div className='hidden lg:block'>
				{loading ? (
					<SkeletonTableLoading />
				) : error ? (
					<ErrorDisplay errMessage={error.message} />
				) : (
					<DataTable
						data={currencies}
						columns={columns}
						onEdit={handleEdit}
						onDelete={handleDelete}
						pagination={pagination}
						goToPage={goToPage}
						nextPage={nextPage}
						previousPage={previousPage}
						setPerPage={setPerPage}
					/>
				)}
			</div>

			<DialogDelete
				open={dialogDelete}
				onOpenChange={setDialogDelete}
				onConfirm={confirmDelete}
				idDelete={idToDelete}
			/>

			<CurrencyForm
				open={dialogForm}
				editingItem={editingItem}
				isLoading={isLoading}
				onOpenChange={setDialogForm}
				onSubmit={(data) => handleSave({ ...data, symbol: data.symbol || '', is_active: data.is_active || false } as CurrencyType)}
			/>
		</>
	);

	return (
		<>
			{currencies.length > 0 ? (
				<DataDisplayTemplate
					title={title}
					actionButtons={actionButtons}
					filters={filter}
					content={content}
				/>
			) : (
				<EmptyData />
			)}
		</>


	);
};

export default CurrencyList;



