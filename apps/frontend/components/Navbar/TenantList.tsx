'use client';
import React, { useState, useEffect } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface ITenant {
	id: string;
	name: string;
}
const mockTenants: ITenant[] = [
	{ id: '1', name: 'Marketing' },
	{ id: '2', name: 'Sales' },
	{ id: '3', name: 'Human Resources' },
	{ id: '4', name: 'Engineering' },
	{ id: '5', name: 'Finance' },
];

const TenantList = () => {
	const [businessUnit, setBusinessUnit] = useState('');
	const [list, setList] = useState<ITenant[]>([]);

	useEffect(() => {
		setList(mockTenants);
	}, []);

	return (
		<Select
			value={businessUnit}
			onValueChange={(businessUnit) => {
				console.log('Selected Business Unit ID:', businessUnit);
				setBusinessUnit(businessUnit);
			}}
			data-id="tenant-list-select"
		>
			<SelectTrigger data-id="tenant-list-select-trigger">
				<SelectValue
					placeholder="Business Unit"
					className="w-full md:w-[300px]"
					data-id="tenant-list-select-value"
				/>
			</SelectTrigger>
			<SelectContent data-id="tenant-list-select-content">
				{list.map((tenant) => (
					<SelectItem
						key={tenant.id}
						value={tenant.id}
						data-id="tenant-list-select-item"
					>
						{tenant.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default TenantList;
