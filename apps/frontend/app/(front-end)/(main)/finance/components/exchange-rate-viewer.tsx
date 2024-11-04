'use client';

import { MoreVertical, Plus, Printer, Upload } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useState } from 'react';
export function ExchangeRateViewer() {
	const [currencies] = useState([
		{ code: 'USD', name: 'United States Dollar', rate: 1.0, lastUpdated: '2023-07-01' },
		{ code: 'EUR', name: 'Euro', rate: 0.92, lastUpdated: '2023-07-01' },
		{ code: 'JPY', name: 'Japanese Yen', rate: 144.5, lastUpdated: '2023-07-01' },
		{ code: 'GBP', name: 'British Pound Sterling', rate: 0.79, lastUpdated: '2023-07-01' },
	]);

	return (
		<div className=' mx-auto p-6 bg-background'>
			<div className='flex justify-between items-center mb-6'>
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
				<Input type='text' placeholder='Search currencies...' className='max-w-sm' />
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Currency Code</TableHead>
						<TableHead>Currency Name</TableHead>
						<TableHead>Rate</TableHead>
						<TableHead>Last Updated</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{currencies.map((currency) => (
						<TableRow key={currency.code}>
							<TableCell>{currency.code}</TableCell>
							<TableCell>{currency.name}</TableCell>
							<TableCell>{currency.rate.toFixed(6)}</TableCell>
							<TableCell>{currency.lastUpdated}</TableCell>
							<TableCell>
								<Button variant='ghost' size='icon'>
									<MoreVertical className='h-4 w-4' />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
