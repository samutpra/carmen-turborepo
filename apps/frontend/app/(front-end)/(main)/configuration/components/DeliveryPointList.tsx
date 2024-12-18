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
import { TrashIcon } from 'lucide-react';
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

const fetchDeliveryPoints = async (token: string, tenantId: string) => {
	try {
		const url = `/api/configuration/delivery-point`;

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

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const data = await fetchDeliveryPoints(token, tenantId);
				setDeliveryPoints(data.data);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'An error occurred');
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [token, tenantId]);

	const handleSuccess = (point: DeliveryPointType) => {
		setDeliveryPoints((prev) => {
			if (point.id) {
				// Update existing point
				return prev.map((p) => (p.id === point.id ? point : p));
			}
			// Add new point
			return [...prev, point];
		});
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

	return (
		<div className="p-6">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-3xl font-bold tracking-tight">Delivery Points</h2>
				<DeliveryPointDialog mode="create" onSuccess={handleSuccess} />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
													onClick={() => handleSuccess(point)}
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
