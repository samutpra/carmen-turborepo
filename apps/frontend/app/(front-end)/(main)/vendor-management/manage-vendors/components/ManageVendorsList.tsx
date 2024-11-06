'use client';

import { PlusCircle, Printer, Search, Sheet } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { CustomButton } from '@/components/ui-custom/CustomButton';
import DataCard from '@/components/templates/DataCard';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import DataTable from '@/components/templates/DataTable';
import DialogDelete from '@/components/ui-custom/DialogDelete';
import { FormAction } from '@/lib/types';
import SearchInput from '@/components/ui-custom/SearchInput';
import SkeletonTableLoading from '@/components/ui-custom/Loading/SkeltonTableLoading';
import SkeltonCardLoading from '@/components/ui-custom/Loading/SkeltonCardLoading';
import { VendorDataList } from '../vendorsData';
import { VendorType } from '@shared/types/vendorSchema';
import { useRouter } from '@/lib/i18n';

const ManageVendorsList = () => {
	const router = useRouter();
	const [vendors, setVendors] = useState<VendorType[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [idToDelete, setIdToDelete] = useState<string | null | undefined>(null);
	const [dialogDelete, setDialogDelete] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		async function fetchVendors() {
			try {
				setIsLoading(true);
				const data = VendorDataList.map((vendor) => ({
					...vendor,
					primaryAddress: vendor.addresses[0] ? formatAddress(vendor.addresses[0]) : '-',
					primaryContact: vendor.contacts[0] ? formatContact(vendor.contacts[0]) : '-',
					businessTypeName: vendor.businessType.name,
				}));
				setVendors(data);
			} catch (err) {
				console.error('Fetch error:', err);
				setVendors([]);
			} finally {
				setIsLoading(false);
			}
		}

		fetchVendors();
	}, []);

	const handleAdd = () => {
		router.push(`/procurement/purchase-orders/${FormAction.CREATE}`);
	};

	const handleView = (item: VendorType) => {
		router.push(`/procurement/purchase-orders/${item.id}`);
	};

	const handleEdit = (item: VendorType) => {
		console.log(item);
		router.push(`/procurement/purchase-orders/${item.id}/${FormAction.EDIT}`);
	};

	const handleDelete = (item: VendorType) => {
		setIdToDelete(item.id);
		setDialogDelete(true);
	};

	const confirmDelete = async () => {
		try {
			setIsLoading(true);
			setVendors((prev) => prev.filter((item) => item.id !== idToDelete));
			setDialogDelete(false);
		} catch (error) {
			console.error('Error deleting:', error);
		} finally {
			setIsLoading(false);
			setIdToDelete(null);
		}
	};

	const formatAddress = (address: VendorType['addresses'][0]): string => {
		return `${address.addressLine}, ${address.subDistrictId ?? ''}, ${address.districtId ?? ''}, ${address.provinceId ?? ''} ${address.postalCode ?? ''}`.trim();
	};

	const formatContact = (contact: VendorType['contacts'][0]): string => {
		return `${contact.name} - ${contact.phone}`;
	};

	const title = 'Vendor Management';

	const columns: { key: keyof VendorType; label: string }[] = [
		{ key: 'companyName', label: 'Company Name' },
		{ key: 'businessTypeName', label: 'Vendor Name' },
		{ key: 'primaryAddress', label: 'Address' },
		{ key: 'primaryContact', label: 'Contact' },
		{ key: 'isActive', label: 'Status' },
	];

	const actionButtons = (
		<div className='flex flex-col gap-4 md:flex-row'>
			<CustomButton className='w-full md:w-20' prefixIcon={<PlusCircle />} onClick={handleAdd}>
				Add
			</CustomButton>
			<div className='flex flex-row md:flex-row gap-4'>
				<CustomButton className='w-full md:w-20' variant='outline' prefixIcon={<Sheet />}>
					Export
				</CustomButton>
				<CustomButton className='w-full md:w-20' variant='outline' prefixIcon={<Printer />}>
					Print
				</CustomButton>
			</div>
		</div>
	);

	const filter = (
		<div className='flex flex-col justify-start sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4'>
			<div className='w-full sm:w-auto flex-grow'>
				<SearchInput
					placeholder='Search Vendor...'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					Icon={Search}
				/>
			</div>
		</div>
	);

	const content = (
		<>
			<div className='block lg:hidden'>
				{isLoading ? (
					<SkeltonCardLoading />
				) : (
					<DataCard data={vendors} columns={columns} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />
				)}
			</div>

			<div className='hidden lg:block'>
				{isLoading ? (
					<SkeletonTableLoading />
				) : (
					<DataTable data={vendors} columns={columns} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />
				)}
			</div>

			<DialogDelete
				open={dialogDelete}
				onOpenChange={setDialogDelete}
				onConfirm={confirmDelete}
				idDelete={idToDelete}
			/>
		</>
	);

	return <DataDisplayTemplate title={title} actionButtons={actionButtons} filters={filter} content={content} />;
};

export default ManageVendorsList;
