"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from '@/lib/i18n';
import { FormAction, PurchaseOrderType } from '@/lib/types';
import { samplePoData } from '../poData';
import { CustomButton } from '@/components/ui-custom/CustomButton';
import { PlusCircle, Printer, Search, Sheet } from 'lucide-react';
import SearchInput from '@/components/ui-custom/SearchInput';
import SkeltonCardLoading from '@/components/ui-custom/Loading/SkeltonCardLoading';
import DataCard from '@/components/templates/DataCard';
import SkeletonTableLoading from '@/components/ui-custom/Loading/SkeltonTableLoading';
import DataTable from '@/components/templates/DataTable';
import DialogDelete from '@/components/ui-custom/DialogDelete';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';


const PurchaseOrdersList = () => {
    const [poData, setPoData] = useState<PurchaseOrderType[]>([])
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | null | undefined>(null);
    const [dialogDelete, setDialogDelete] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchPo = async () => {
            setIsLoading(true);
            try {
                const data = samplePoData.map((item: PurchaseOrderType) => item);
                setPoData(data);
            } catch (error) {
                console.error('Error fetching po:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPo();
    }, [])

    const handleAdd = () => {
        router.push(`/procurement/purchase-orders/${FormAction.CREATE}`);

    }

    const handleView = (item: PurchaseOrderType) => {
        console.log('Viewing unit:', item);
        router.push(`/procurement/purchase-orders/${item.poId}`);
    };

    const handleEdit = (item: PurchaseOrderType) => {
        console.log(item);
        router.push(`/procurement/purchase-orders/${item.poId}/${FormAction.EDIT}`);
    };


    const handleDelete = (item: PurchaseOrderType) => {
        setIdToDelete(item.poId);
        setDialogDelete(true);
    };

    const confirmDelete = async () => {
        try {
            setIsLoading(true);
            setPoData((prev) => prev.filter((item) => item.poId !== idToDelete));
            setDialogDelete(false);
        } catch (error) {
            console.error('Error deleting:', error);
        } finally {
            setIsLoading(false);
            setIdToDelete(null);
        }
    };

    const title = 'Purchase Orders';

    const columns: { key: keyof PurchaseOrderType; label: string }[] = [
        { key: 'number', label: 'No' },
        { key: 'vendorName', label: 'Vendor Name' },
        { key: 'orderDate', label: 'Order Date' },
        { key: 'deliveryDate', label: 'Delivery Date' },
        { key: 'currencyCode', label: 'Currency' },
        { key: 'netAmount', label: 'Net Amount' },
        { key: 'taxAmount', label: 'Tax Amount' },
        { key: 'totalAmount', label: 'Amount' },
    ];

    const actionButtons = (
        <div className="flex flex-col gap-4 md:flex-row">
            <CustomButton
                className='w-full md:w-20'
                prefixIcon={<PlusCircle />}
                onClick={handleAdd}
            >
                Add
            </CustomButton>
            <div className='flex flex-row md:flex-row gap-4'>
                <CustomButton className='w-full md:w-20' variant="outline" prefixIcon={<Sheet />}>Export</CustomButton>
                <CustomButton className='w-full md:w-20' variant="outline" prefixIcon={<Printer />}>Print</CustomButton>
            </div>

        </div>
    );

    const filter = (
        <div className="flex flex-col justify-start sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
            <div className="w-full sm:w-auto flex-grow">
                <SearchInput
                    placeholder="Search Units..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    Icon={Search}
                />
            </div>
        </div>
    );

    const content = (
        <>
            <div className="block lg:hidden">
                {isLoading ? (
                    <SkeltonCardLoading />) : (
                    <DataCard
                        data={poData}
                        columns={columns}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onView={handleView}
                    />
                )}
            </div>

            <div className="hidden lg:block">


                {isLoading ? (
                    <SkeletonTableLoading />
                ) : (
                    <DataTable
                        data={poData}
                        columns={columns}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onView={handleView}
                    />
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

    return (
        <DataDisplayTemplate
            title={title}
            actionButtons={actionButtons}
            filters={filter}
            content={content}
        />
    )
}

export default PurchaseOrdersList