'use client';
import React, { useEffect, useState } from 'react';
import { useURLState } from '@/app/(front-end)/hooks/useURLState';
import { useAuth } from '@/app/context/AuthContext';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CurrencyType } from '@carmensoftware/shared-types';
import { APIError } from '@carmensoftware/shared-types/src/pagination';
import { Search, Trash, TrashIcon } from 'lucide-react';
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
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import { CustomButton } from '@/components/ui-custom/CustomButton';

const fetchCurrencies = async (
	token: string,
	tenantId: string,
	params: { search?: string; status?: string } = {}
) => {
	try {
		if (!token) {
			throw new Error('Access token is required');
		}

		const query = new URLSearchParams();

		if (params.search) {
			query.append('search', params.search);
		}

		if (params.status) {
			query.append('filter[is_active:bool]', params.status);
		}

		const url = `/api/configuration/currency?${query}`;

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
			throw new APIError(
				response.status,
				`Failed to fetch currencies: ${response.status} ${response.statusText}`
			);
		}

		const result = await response.json();
		return result.data;
	} catch (error) {
		console.error('Error fetching delivery points:', error);
		throw error;
	}
};

const CurrencySkeleton = () => {
	return (
		<Card className="h-[140px]">
			<CardHeader className="pb-4">
				<Skeleton className="h-4 w-2/3" />
			</CardHeader>
		</Card>
	);
};

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

	console.log('currencies', currencies);

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
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		fetchData();
	}, [token, tenantId, search, status]);

	const handleDelete = async (id: string) => {
		try {
			const response = await fetch(`/api/configuration/currency/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
					'x-tenant-id': tenantId,
				},
			});

			if (!response.ok) {
				throw new Error('Failed to delete currency');
			}

			setCurrencies((prev) => prev.filter((currency) => currency.id !== id));
			toast.success('Currency deleted successfully');
		} catch (err) {
			console.error('Error deleting currency:', err);
			toast.error('Failed to delete currency', {
				description: err instanceof Error ? err.message : 'An error occurred',
			});
		}
	};

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
		<div className="flex flex-col md:flex-row gap-4 md:items-start justify-between mb-6">
			<Button>add</Button>
		</div>
	);

	const filter = (
		<div className="flex gap-4 mb-4 flex-col md:flex-row justify-between">
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

	const content = (
		<>
			<div className="block md:hidden">
				<div className="grid grid-cols-1 gap-4">
					{isLoading
						? [...Array(6)].map((_, index) => <CurrencySkeleton key={index} />)
						: currencies?.map((currency) => (
								<Card
									key={currency.id}
									className="hover:shadow-md transition-all"
								>
									<CardContent>
										<div className="flex justify-between items-center">
											<span className="text-base font-medium">
												{currency.name}
											</span>
											<Badge
												variant={currency.is_active ? 'default' : 'destructive'}
											>
												{currency.is_active ? 'Active' : 'Inactive'}
											</Badge>
										</div>
									</CardContent>
									<CardFooter className="flex justify-end gap-2">
										<Button>Edit</Button>
										<AlertDialog>
											<AlertDialogTrigger asChild>
												<Button variant="ghost" size="sm">
													<TrashIcon className="w-4 h-4" />
												</Button>
											</AlertDialogTrigger>
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>Are you sure?</AlertDialogTitle>
													<AlertDialogDescription>
														This action cannot be undone. This will permanently
														delete the delivery point.
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>Cancel</AlertDialogCancel>
													<AlertDialogAction
														onClick={() =>
															currency.id && handleDelete(currency.id)
														}
														className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
													>
														Delete
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>
									</CardFooter>
								</Card>
							))}
				</div>
			</div>
			<div className="hidden md:block">
				{isLoading ? (
					<CurrencySkeleton />
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{currencies?.map((currency, index) => (
								<TableRow key={currency.id}>
									<TableCell className="font-medium">{index + 1}</TableCell>
									<TableCell>{currency.name}</TableCell>
									<TableCell>
										<Badge
											variant={currency.is_active ? 'default' : 'destructive'}
										>
											{currency.is_active ? 'Active' : 'Inactive'}
										</Badge>
									</TableCell>
									<TableCell className="text-right">
										<div className="flex justify-end gap-2">
											<Button>Edit</Button>
											<AlertDialog>
												<AlertDialogTrigger asChild>
													<CustomButton variant="ghost" size="sm">
														<Trash className="h-4 w-4" />
													</CustomButton>
												</AlertDialogTrigger>
												<AlertDialogContent>
													<AlertDialogHeader>
														<AlertDialogTitle>Are you sure?</AlertDialogTitle>
														<AlertDialogDescription>
															This action cannot be undone. This will
															permanently delete the delivery point.
														</AlertDialogDescription>
													</AlertDialogHeader>
													<AlertDialogFooter>
														<AlertDialogCancel>Cancel</AlertDialogCancel>
														<AlertDialogAction
															onClick={() =>
																currency.id && handleDelete(currency.id)
															}
															className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
														>
															Delete
														</AlertDialogAction>
													</AlertDialogFooter>
												</AlertDialogContent>
											</AlertDialog>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</div>
		</>
	);

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
