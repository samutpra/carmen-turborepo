'use client';

import { useAuth } from '@/app/context/AuthContext';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomButton } from '@/components/ui-custom/CustomButton';
import { ArrowUpDown, Filter, PlusCircle, Printer, Search, Sheet } from 'lucide-react';
import SearchInput from '@/components/ui-custom/SearchInput';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FilterBuilder } from '@/components/ui-custom/FilterBuilder';
import DialogDelete from '@/components/ui-custom/DialogDelete';
import SkeltonCardLoading from '@/components/ui-custom/Loading/SkeltonCardLoading';
import SkeletonTableLoading from '@/components/ui-custom/Loading/SkeltonTableLoading';
import DataTable from '@/components/templates/DataTable';
import DataCard from '@/components/templates/DataCard';
import { createDepartment, deleteDepartment, updateDepartment, useDepartments } from '../actions/department';
import ErrorDisplay from '@/components/ErrorDisplay';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import DepartmentForm from './form/DepartmentForm';
import { DepartmentLabel, DepartmentSchema, DepartmentType, PayloaDepartmentType } from '@carmensoftware/shared-types/src/department';

const statusOptions = [
	{ value: 'all', label: 'All Statuses' },
	{ value: 'true', label: 'Active' },
	{ value: 'false', label: 'Not Active' },
];

const DepartmentList = () => {
	const { accessToken } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [editingItem, setEditingItem] = useState<DepartmentType | null>(null);
	const [dialogForm, setDialogForm] = useState(false);
	const [idToDelete, setIdToDelete] = useState<string | null | undefined>(null);
	const [dialogDelete, setDialogDelete] = useState(false);
	const [statusOpen, setStatusOpen] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState('');

	const token = accessToken || ''

	const {
		departments,
		setDepartments,
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
	} = useDepartments(token);

	const form = useForm<DepartmentType>({
		resolver: zodResolver(DepartmentSchema),
		defaultValues: {
			name: '',
			description: '',
			is_active: true,
		},
	});

	useEffect(() => {
		if (editingItem) {
			form.reset({
				name: editingItem.name,
				description: editingItem.description,
				is_active: editingItem.is_active,
			});
		}
	}, [editingItem, form]);

	const handleEdit = (item: PayloaDepartmentType) => {
		setEditingItem(item);
		form.reset({
			name: item.name,
			description: item.description,
			is_active: item.is_active,
		});
		setDialogForm(true);
	};

	const handleDelete = (item: DepartmentType) => {
		setIdToDelete(item.id);
		setDialogDelete(true);
	};

	const confirmDelete = async () => {
		try {
			setIsLoading(true);
			if (idToDelete) {
				await deleteDepartment(token, idToDelete);
				setDepartments((prev) =>
					prev.filter((item) => item.id !== idToDelete)
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

	const handleSave = async (data: DepartmentType) => {
		try {
			setIsLoading(true);

			if (editingItem?.id) {
				const updatedFields: DepartmentType = { ...data };
				const updatedCurrency = await updateDepartment(
					token,
					editingItem.id,
					updatedFields
				);
				setDepartments((prev) =>
					prev.map((item) =>
						item.id === editingItem.id ? updatedCurrency : item
					)
				);
			} else {
				const newDepartment = await createDepartment(token, data);
				setDepartments((prev: DepartmentType[]) => [...prev, newDepartment]);
			}

			handleCloseDialog();
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error('Save error details:', {
					error: error.message,
					stack: error.stack,
				});
			} else {
				console.error('Save error details:', {
					error: 'Unknown error occurred',
				});
			}
		} finally {
			setIsLoading(false);
			setDialogForm(false);
		}
	};
	

	const handleCloseDialog = () => {
		form.reset({
			description: '',
			name: '',
			is_active: true,
		});
		setDialogForm(false);
		setEditingItem(null);
	};

	const title = 'Departments';

	const columns: DepartmentLabel[] = [
		{ key: 'name', label: 'Name' },
		{ key: 'description', label: 'Description' },
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
					<DataCard data={departments} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />
				)}
			</div>

			<div className='hidden lg:block'>
				{loading ? (
					<SkeletonTableLoading />
				) : error ? (
					<ErrorDisplay errMessage={error.message} />
				) : (
					<DataTable
						data={departments}
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

			<DepartmentForm
				open={dialogForm}
				editingItem={editingItem}
				isLoading={isLoading}
				onOpenChange={setDialogForm}
				onSubmit={handleSave}
			/>
		</>
	);

	return (
		<DataDisplayTemplate
			title={title}
			actionButtons={actionButtons}
			filters={filter}
			content={content}
		/>
	)
}

export default DepartmentList