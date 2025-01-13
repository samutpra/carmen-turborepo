'use client';

import { MoreVertical, Plus, Printer, Upload } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState, useEffect } from 'react';
import { ExchangeRateData, fetchExchangeRate } from '../actions/exchangeRate';

export function ExchangeRateViewer() {
	const [exchangeRates, setExchangeRates] = useState<ExchangeRateData | null>(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadExchangeRates = async () => {
			try {
				setIsLoading(true);
				setError(null);
				const data = await fetchExchangeRate();
				setExchangeRates(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to load exchange rates');
				console.error('Failed to load exchange rates:', err);
			} finally {
				setIsLoading(false);
			}
		};

		loadExchangeRates();
	}, []);

	// Filter exchange rates based on search term
	const filteredRates = exchangeRates ?
		Object.entries(exchangeRates).filter(([code]) =>
			code.toLowerCase().includes(searchTerm.toLowerCase())
		) : [];

	return (
		<div className='mx-auto p-6 bg-background'>
			<div className='flex justify-between mb-6'>
				<h1 className='text-3xl font-bold'>Exchange Rate Viewer</h1>
				<div className='space-x-2'>
					<Button>
						<Plus className='mr-2 h-4 w-4' /> Add Rate
					</Button>
					<Button variant='outline'>
						<Printer className='mr-2 h-4 w-4' /> Print
					</Button>
					<Button variant='outline'>
						<Upload className='mr-2 h-4 w-4' /> Import CSV
					</Button>
				</div>
			</div>
			<div className='mb-6'>
				<Input
					type='text'
					placeholder='Search currencies...'
					className='max-w-sm'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Currency Code</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Rate</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{isLoading ? (
						<TableRow>
							<TableCell colSpan={4} className="text-center">Loading...</TableCell>
						</TableRow>
					) : error ? (
						<TableRow>
							<TableCell colSpan={4} className="text-center text-red-500">{error}</TableCell>
						</TableRow>
					) : filteredRates.length === 0 ? (
						<TableRow>
							<TableCell colSpan={4} className="text-center">No exchange rates found</TableCell>
						</TableRow>
					) : (
						filteredRates.map(([code, { rate, description }]) => (
							<TableRow key={code}>
								<TableCell className="font-medium">{code}</TableCell>
								<TableCell>{description}</TableCell>
								<TableCell>{rate.toFixed(4)}</TableCell>
								<TableCell>
									<Button variant="ghost" size="icon">
										<MoreVertical className="h-4 w-4" />
									</Button>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}