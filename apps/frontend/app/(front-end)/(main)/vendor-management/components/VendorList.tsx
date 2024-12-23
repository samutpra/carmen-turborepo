'use client';
import { useURLState } from '@/app/(front-end)/hooks/useURLState';
import { useAuth } from '@/app/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { vendor_type } from '@carmensoftware/shared-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
// import VendorDialog from './VendorDialog';
import VendorCard from './VendorCard';
import VendorTable from './VendorTable';
import { fetchAllVendors } from './api';
import { Link } from '@/lib/i18n';

const VendorList = () => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [vendors, setVendors] = useState<vendor_type[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [statusOpen, setStatusOpen] = useState(false);
	const [search, setSearch] = useURLState('search');
	const [status, setStatus] = useURLState('status');

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const data = await fetchAllVendors(token, tenantId, { search, status });
			setVendors(data.data);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [token, tenantId, search, status]);

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

	const statusOptions = [
		{ label: 'All Status', value: '' },
		{ label: 'Active', value: 'true' },
		{ label: 'Inactive', value: 'false' },
	];

	const handleSuccess = (updatedVendor: vendor_type) => {
		setVendors((prev) => {
			const exists = prev.some((v) => v.id === updatedVendor.id);
			if (exists) {
				return prev.map((v) => (v.id === updatedVendor.id ? updatedVendor : v));
			}
			return [...prev, updatedVendor];
		});
	};

	const handleDelete = async (id: string) => {
		try {
			const response = await fetch(`/api/vendor-management/vendor/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
					'x-tenant-id': tenantId,
				},
			});

			if (!response.ok) {
				throw new Error('Failed to delete vendor');
			}
			setVendors((prev) => prev.filter((v) => v.id !== id));
			toast.success('Vendor deleted successfully');
		} catch (err) {
			console.error('Error deleting vendor:', err);
			toast.error('Failed to delete vendor', {
				description: err instanceof Error ? err.message : 'An error occurred',
			});
		}
	};

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

	const title = 'Vendors';

	const actionButtons = (
		<div className="flex flex-col md:flex-row gap-4 md:items-start justify-between mb-6">
			<Button asChild>
				<Link href="/vendor-management/vendors/new">
					<Plus className="h-4 w-4" />
					Create vendor
				</Link>
			</Button>
		</div>
	);

	const filter = (
		<div className="flex gap-4 mb-4 flex-col md:flex-row justify-between bg-background">
			<form onSubmit={handleSearch} className="flex gap-2 w-full">
				<div className="relative w-full md:w-1/4">
					<Input
						name="search"
						placeholder="Search Vendors..."
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
				<VendorCard
					vendors={vendors}
					onSuccess={handleSuccess}
					onDelete={handleDelete}
					isLoading={isLoading}
				/>
			</div>
			<div className="hidden md:block">
				<VendorTable
					vendors={vendors}
					isLoading={isLoading}
				/>
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

export default VendorList;
