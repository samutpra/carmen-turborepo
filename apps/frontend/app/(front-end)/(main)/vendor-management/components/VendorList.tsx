'use client';
import { useURLState } from '@/app/(front-end)/hooks/useURLState';
import { useAuth } from '@/app/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { vendor_type } from '@carmensoftware/shared-types';
import React, { useEffect, useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import VendorCard from './VendorCard';
import VendorTable from './VendorTable';
import { fetchAllVendors } from '../actions/vendor';
import { Link } from '@/lib/i18n';
import SearchForm from '@/components/ui-custom/SearchForm';

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

	const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSearch(event.currentTarget.search.value);
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
			<SearchForm
				onSubmit={handleSearch}
				defaultValue={search}
				placeholder="Search Vendor..."
			/>
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
