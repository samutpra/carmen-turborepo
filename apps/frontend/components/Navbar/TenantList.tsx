'use client';
import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TenantID, setTenantId } from '@/lib/currentUser';
import { ApiDomain } from '@/lib/apiDomain';
import { ITenant } from '@/types/tenant';

export function TenantList() {
	const [businessUnit, setBusinessUnit] = useState('');
	const [list, SetList] = useState<ITenant[]>([]);

	useEffect(() => {
		// const token = localStorage.getItem("token");
		fetch(`${ApiDomain}/api/v1/tenants`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				SetList(data);
			});

		// SetList(Mock_TenantList);

		let tenantid = TenantID;

		if (tenantid || tenantid == '') {
			tenantid = list[0] ? list[0].id : '';
			setTenantId(tenantid);
		}

		setBusinessUnit(tenantid);
	}, []);

	return (
		<>
			<Select
				value={businessUnit}
				onValueChange={(businessUnit) => {
					console.log(businessUnit);
					setTenantId(businessUnit);
					setBusinessUnit(businessUnit);
				}}>
				<SelectTrigger className='w-[140px] sm:w-[180px]'>
					<SelectValue placeholder='Business Unit' />
				</SelectTrigger>
				<SelectContent>
					{list &&
						list.length > 0 &&
						list.map((tenant) => (
							<>
								<SelectItem key={tenant.id} value={tenant.id}>
									{tenant.name}
								</SelectItem>
							</>
						))}
				</SelectContent>
			</Select>
		</>
	);
}
