'use client';

import { ArrowUpDown, Filter, PlusCircle, Printer, Search, Sheet } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
// import { CurrencyLabel, CurrencySchema, CurrencyType } from '@carmensoftware/shared-types';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui-custom/FormCustom';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CustomButton } from '@/components/ui-custom/CustomButton';
import DataCard from '@/components/templates/DataCard';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import DataTable from '@/components/templates/DataTable';
import DialogDelete from '@/components/ui-custom/DialogDelete';
import { FilterBuilder } from '@/components/ui-custom/FilterBuilder';
import { InputCustom } from '@/components/ui-custom/InputCustom';
import { LoaderButton } from '@/components/ui-custom/button/LoaderButton';
import SearchInput from '@/components/ui-custom/SearchInput';
import SkeletonTableLoading from '@/components/ui-custom/Loading/SkeltonTableLoading';
import SkeltonCardLoading from '@/components/ui-custom/Loading/SkeltonCardLoading';
import { Switch } from '@/components/ui/switch';
import { useCurrencies, updateCurrency, deleteCurrency, createCurrency } from '../currency/actions/currency';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorDisplay from '@/components/ErrorDisplay';
import { CurrencyLabel, CurrencySchema, CurrencyType } from '@/lib/types';
import { toast } from 'sonner';

const statusOptions = [
	{ value: 'all', label: 'All Statuses' },
	{ value: 'true', label: 'Active' },
	{ value: 'false', label: 'Not Active' },
];

const accessToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA0MzhmZjQ0LTc1NGYtNDJiZC05NWI1LTUzYWFlMjBkZWMzZSIsInVzZXJuYW1lIjoidGVzdDEiLCJpYXQiOjE3MzEzMDYzOTEsImV4cCI6MTczMTMwOTk5MX0.t9B5vLKv4CI7_bvK32KL3elJuOQrsuxoG489j2FD6Sc';

const CurrencyList = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [editingItem, setEditingItem] = useState<CurrencyType | null>(null);
	const [dialogForm, setDialogForm] = useState(false);
	const [idToDelete, setIdToDelete] = useState<string | null | undefined>(null);
	const [dialogDelete, setDialogDelete] = useState(false);
	const [statusOpen, setStatusOpen] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState('');

	const {
		currencies,
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
	} = useCurrencies(accessToken);

	const form = useForm<CurrencyType>({
		resolver: zodResolver(CurrencySchema),
		defaultValues: {
			code: "",
			name: "",
			symbol: "",
			description: "",
			rate: 0,
			isActive: true,
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
				isActive: editingItem.isActive,
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
			isActive: item.isActive,
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

				await deleteCurrency(accessToken, idToDelete);

				setCurrencies((prev: CurrencyType[]) =>
					prev.filter((currency: CurrencyType) => currency.id !== idToDelete)
				);
				toast("Event has been created.")
				setDialogDelete(false);
				fetchData();
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
				const updatedFields: CurrencyType = {
					code: data.code,
					name: data.name,
					symbol: data.symbol,
					description: data.description,
					rate: data.rate,
					isActive: data.isActive,
				};

				const updatedCurrency = await updateCurrency(accessToken, editingItem.id, updatedFields);

				setCurrencies((prev: CurrencyType[]) =>
					prev.map((currency) => {
						if ('id' in currency && currency.id === editingItem.id) {
							return updatedCurrency;
						}
						return currency;
					}) as CurrencyType[]
				);
			} else {
				const newCurrency = await createCurrency(accessToken, {
					code: data.code,
					name: data.name,
					symbol: data.symbol,
					description: data.description,
					rate: data.rate,
					isActive: data.isActive,
				});

				setCurrencies((prev: CurrencyType[]) => [...prev, newCurrency]);
			}

			handleCloseDialog();

		} catch (error) {
			console.error('Save error details:', {
				error,
				message: error instanceof Error ? error.message : 'Unknown error',
				stack: error instanceof Error ? error.stack : undefined
			});
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
			isActive: true,
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
		{ key: 'isActive', label: 'Active' },
	];

	const actionButtons = (
		<div className='flex flex-col gap-4 md:flex-row'>
			<CustomButton className='w-full md:w-20' prefixIcon={<PlusCircle />} onClick={() => setDialogForm(true)}>
				Add
			</CustomButton>
			<div className='flex flex-row md:flex-row gap-4'>
				<CustomButton className='w-full md:w-20' variant='outline' prefixIcon={<Sheet />}>
					Export
				</CustomButton>
				<CustomButton className='w-full md:w-20' variant='outline' prefixIcon={<Printer />}>
					Print
				</CustomButton>
			</div>
		</div>
	);

	const filter = (
		<div className='flex flex-col justify-start sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4'>
			<div className='w-full sm:w-auto flex-grow'>
				<SearchInput
					placeholder='Search Currency...'
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
			<div className='flex items-center space-x-4'>
				<Popover open={statusOpen} onOpenChange={setStatusOpen}>
					<PopoverTrigger asChild>
						<Button variant='outline' role='combobox' aria-expanded={statusOpen} className='w-[200px] justify-between'>
							{selectedStatus
								? statusOptions.find((status) => status.value === selectedStatus)?.label
								: 'Select status...'}
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-[200px] p-0'>
						<Command>
							<CommandInput placeholder='Search status...' className='h-9' />
							<CommandList>
								<CommandEmpty>No status found.</CommandEmpty>
								<CommandGroup>
									{statusOptions.map((status) => (
										<CommandItem
											key={status.value}
											onSelect={() => {
												setSelectedStatus(status.value === selectedStatus ? '' : status.value);
												setStatusOpen(false);
											}}>
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
						<Button variant='outline'>
							<Filter className='h-4 w-4' />
							More Filters
						</Button>
					</DialogTrigger>
					<DialogContent className='sm:w-[70vw] max-w-[60vw]'>
						<FilterBuilder
							fields={[
								{ value: 'name', label: 'Name' },
								{ value: 'description', label: 'Description' },
								{ value: 'isActive', label: 'Status' },
							]}
							onFilterChange={(filters) => {
								console.log('Applied filters:', filters);
							}}
						/>
					</DialogContent>
				</Dialog>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline'>
							<ArrowUpDown className='h-4 w-4' />
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

			<Dialog open={dialogForm} onOpenChange={handleCloseDialog}>
				<DialogContent className="sm:max-w-[700px]">
					<DialogHeader>
						<DialogTitle>{editingItem ? `Edit ${title}` : `Add New ${title}`}</DialogTitle>
					</DialogHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(handleSave)} className='space-y-4'>
							<div className="grid grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name='code'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Code</FormLabel>
											<FormControl>
												<InputCustom
													placeholder='Enter Code name'
													error={!!form.formState.errors.code}
													{...field}
													maxLength={3}
												/>
											</FormControl>
										</FormItem>
									)}
									required
								/>

								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<InputCustom
													placeholder='Enter Name'
													error={!!form.formState.errors.name}
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
									required
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name='symbol'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Symbol</FormLabel>
											<FormControl>
												<InputCustom
													placeholder='Enter Symbol'
													error={!!form.formState.errors.symbol}
													{...field}
													maxLength={3}
												/>
											</FormControl>
										</FormItem>
									)}
									required
								/>

								<FormField
									control={form.control}
									name='rate'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Rate</FormLabel>
											<FormControl>
												<InputCustom placeholder='Enter Rate'
													error={!!form.formState.errors.rate}
													{...field}
													onChange={(e) => field.onChange(parseFloat(e.target.value) || '')}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
									required
								/>
							</div>

							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<InputCustom
												placeholder='Enter unit description'
												error={!!form.formState.errors.description}
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
								required
							/>

							<FormField
								control={form.control}
								name='isActive'
								render={({ field }) => (
									<FormItem className='flex items-center space-x-2'>
										<FormControl>
											<Switch checked={field.value} onCheckedChange={field.onChange} />
										</FormControl>
										<FormLabel>Active</FormLabel>
										<FormMessage />
									</FormItem>
								)}
							/>
							<DialogFooter>
								<Button type='button' variant='secondary' onClick={handleCloseDialog} disabled={isLoading}>
									Cancel
								</Button>
								<LoaderButton type='submit' disabled={isLoading} isLoading={isLoading}>
									{isLoading ? 'Saving...' : editingItem ? 'Save Changes' : 'Add'}
								</LoaderButton>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</>
	);

	return <DataDisplayTemplate title={title} actionButtons={actionButtons} filters={filter} content={content} />;
};

export default CurrencyList;
