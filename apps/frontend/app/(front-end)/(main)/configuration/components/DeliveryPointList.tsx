'use client';
import { useAuth } from '@/app/context/AuthContext';
import { DeliveryPointType } from '@carmensoftware/shared-types';
import React, { useEffect, useState } from 'react';

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

	if (isLoading) {
		return (
			<div className="flex items-center justify-center p-4">
				<span className="text-gray-500">Loading delivery points...</span>
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-4 text-red-500">
				Error loading delivery points: {error}
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<h2 className="text-xl font-semibold">Delivery Points</h2>
			<div className="grid gap-4">
				{deliveryPoints.map((point) => (
					<div
						key={point.id}
						className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
					>
						<div className="flex items-center justify-between">
							<div>
								<h3 className="font-medium">{point.name}</h3>
							</div>
							<span
								className={`px-2 py-1 rounded-full text-xs ${
									point.is_active
										? 'bg-green-100 text-green-800'
										: 'bg-red-100 text-red-800'
								}`}
							>
								{point.is_active ? 'Active' : 'Inactive'}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default DeliveryPointList;
