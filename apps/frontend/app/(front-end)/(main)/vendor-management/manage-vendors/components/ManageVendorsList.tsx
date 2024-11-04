"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from '@/lib/i18n';
import { VendorType } from '../types';
import { VendorDataList } from '../vendorsData';
import { FormAction } from '@/lib/types';
import { CustomButton } from '@/components/ui-custom/CustomButton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui-custom/TableCustom"
import ListPageTemplate from '@/components/templates/ListPageTemplate';
import EmptyData from '@/components/EmptyData';


const ManageVendorsList = () => {
    const router = useRouter();
    const [vendors, setVendors] = useState<VendorType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchVendors() {
            try {
                setIsLoading(true);
                // const response = await fetch('/api/vendors');
                // if (!response.ok) {
                //   throw new Error('Failed to fetch vendors');
                // }
                // const data = await response.json();
                const data = VendorDataList;

                setVendors(data.vendors || []);
            } catch (err) {
                console.error('Fetch error:', err);
                setVendors([]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchVendors();
    }, []);

    const handleAddVendor = () => {
        router.push(`/vendor-management/manage-vendors/${FormAction.CREATE}`);
    };

    const handleEditVendor = (id: string) => {
        router.push(`/vendor-management/manage-vendors/${id}/${FormAction.EDIT}`);
    };

    const handleViewVendor = (id: string) => {
        router.push(`/vendor-management/manage-vendors/${id}`);
    };


    const actionButtons = (
        <CustomButton onClick={handleAddVendor}>
            Add Vendor
        </CustomButton>
    );

    const content = (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : vendors.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Company Name</TableHead>
                            <TableHead>Business Type</TableHead>
                            <TableHead>Primary Address</TableHead>
                            <TableHead>Primary Contact</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vendors.map((vendor) => (
                            <TableRow key={vendor.id} className='hover:bg-zinc-50'>
                                <TableCell>{vendor.companyName}</TableCell>
                                <TableCell>{vendor.businessType?.name}</TableCell>
                                <TableCell>
                                    {vendor.addresses.find(a => a.isPrimary)?.addressLine || 'N/A'}
                                </TableCell>
                                <TableCell>
                                    {vendor.contacts.find(c => c.isPrimary)?.name || 'N/A'}
                                    {' '}
                                    {vendor.contacts.find(c => c.isPrimary)?.phone || ''}
                                </TableCell>
                                <TableCell>
                                    <div className='flex items-center space-x-4'>
                                        <CustomButton size="sm" className='text-xs'
                                            onClick={() => handleViewVendor(vendor.id)}
                                        >View</CustomButton>
                                        <CustomButton size="sm" className='text-xs'
                                            onClick={() => handleEditVendor(vendor.id)}
                                        >Edit</CustomButton>
                                    </div>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <EmptyData />
            )}
        </>
    );

    return (
        <ListPageTemplate
            title="Vendor Management"
            actionButtons={actionButtons}
            content={content}
        />
    )
}

export default ManageVendorsList