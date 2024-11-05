'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Globe, LogOut, Settings, User } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TenantID, setTenantId } from '@/lib/currentUser';
import { useEffect, useState } from 'react';

import { ApiDomain } from '@/lib/apiDomain';
import { Button } from '@/components/ui/button';
import { ITenant } from '@/types/tenant';
import LanguageSwitcher from '@/components/languageSwitcher';
import { Link } from '@/lib/i18n';
import React from 'react';
import { useRouter } from '@/lib/i18n';

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
