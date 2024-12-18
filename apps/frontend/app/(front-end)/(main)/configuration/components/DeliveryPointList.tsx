'use client';
import { useAuth } from '@/app/context/AuthContext';
import { DeliveryPointType } from '@carmensoftware/shared-types';
import React, { useEffect, useState } from 'react';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { TrashIcon, Search } from 'lucide-react';
import { DeliveryPointDialog } from './DeliveryPointDialog';
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
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { useURLState } from '@/app/(front-end)/hooks/useURLState';

const fetchDeliveryPoints = async (
	token: string,
	tenantId: string,
	params: { search?: string; status?: string } = {}
) => {
	try {
		const query = new URLSearchParams();

		if (params.search) {
			query.append('search', params.search);
		}

		if (params.status) {
			query.append('filter[is_active:bool]', params.status);
		}

		const url = `/api/configuration/delivery-point?${query}`;

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
			throw new Error('Failed to fetch delivery points');
		}

		const result = await response.json();
		return result.data;
	} catch (error) {
		console.error('Error fetching delivery points:', error);
		throw error;
	}
};

const DeliveryPointSkeleton = () => {
	return (
		<Card className="h-[140px]">
			<CardHeader className="pb-4">
				<Skeleton className="h-4 w-2/3" />
			</CardHeader>
			<CardContent>
				<div className="flex justify-between items-center">
					<Skeleton className="h-4 w-1/4" />
					<Skeleton className="h-6 w-16 rounded-full" />
				</div>
			</CardContent>
		</Card>
	);
};

const DeliveryPointList = () => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [deliveryPoints, setDeliveryPoints] = useState<DeliveryPointType[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [search, setSearch] = useURLState('search');
	const [status, setStatus] = useURLState('status');

	const handleSuccess = (updatedPoint: DeliveryPointType) => {
		setDeliveryPoints((prev) => {
			const exists = prev.some((p) => p.id === updatedPoint.id);
			if (exists) {
				return prev.map((p) => (p.id === updatedPoint.id ? updatedPoint : p));
			}
			return [...prev, updatedPoint];
		});
	};

	const handleDelete = async (id: string) => {
		try {
			const response = await fetch(`/api/configuration/delivery-point/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
					'x-tenant-id': tenantId,
				},
			});

			if (!response.ok) {
				throw new Error('Failed to delete delivery point');
			}

			setDeliveryPoints((prev) => prev.filter((point) => point.id !== id));
			toast.success('Delivery point deleted successfully');
		} catch (err) {
			console.error('Error deleting delivery point:', err);
			toast.error('Failed to delete delivery point', {
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

	const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setStatus(event.target.value);
	};

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const data = await fetchDeliveryPoints(token, tenantId, {
				search,
				status,
			});
			setDeliveryPoints(data.data);
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

	return (
		<div className="p-6">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-3xl font-bold tracking-tight">Delivery Points</h2>
				<DeliveryPointDialog mode="create" onSuccess={handleSuccess} />
			</div>
			<div className="flex gap-4 mb-4">
				<form onSubmit={handleSearch} className="flex gap-2 flex-1">
					<div className="relative w-full md:w-1/4">
						<Input
							name="search"
							placeholder="Search Delivery Point..."
							className="h-10 pr-10"
							defaultValue={search}
							onKeyDown={handleKeyDown}
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
				<select
					value={status}
					onChange={handleStatusChange}
					className="h-10 rounded-md border border-input bg-background px-3 py-2"
				>
					<option value="">All Status</option>
					<option value="true">Active</option>
					<option value="false">Inactive</option>
				</select>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{isLoading
					? [...Array(6)].map((_, index) => (
							<DeliveryPointSkeleton key={index} />
						))
					: deliveryPoints.map((point) => (
							<Card key={point.id} className="hover:shadow-md transition-all">
								<CardContent>
									<div className="flex justify-between items-center">
										<span className="text-base font-medium">{point.name}</span>
										<Badge className="capitalize">
											{point.is_active ? 'Active' : 'Inactive'}
										</Badge>
									</div>
								</CardContent>
								<CardFooter className="flex justify-end gap-2">
									<DeliveryPointDialog
										mode="edit"
										defaultValues={point}
										onSuccess={handleSuccess}
									/>
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button variant="destructive" size="icon">
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
													onClick={() => point.id && handleDelete(point.id)}
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
	);
};

export default DeliveryPointList;
