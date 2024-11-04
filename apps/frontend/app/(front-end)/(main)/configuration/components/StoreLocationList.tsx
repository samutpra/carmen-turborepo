"use client";
import { StoreLocationLabel, StoreLocationSchema, StoreLocationType } from '@/lib/types';
import React, { useEffect, useState } from 'react'
import { storeLocationData } from '../data/data';
import { InputCustom } from '@/components/ui-custom/InputCustom';
import SkeltonCardLoading from '@/components/ui-custom/Loading/SkeltonCardLoading';
import SkeletonTableLoading from '@/components/ui-custom/Loading/SkeltonTableLoading';
import DataTable from '@/components/templates/DataTable';
import DataCard from '@/components/templates/DataCard';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import { CustomButton } from '@/components/ui-custom/CustomButton';
import { PlusCircle, Printer, Sheet } from 'lucide-react';
import DialogDelete from '@/components/ui-custom/DialogDelete';
import { useRouter } from '@/lib/i18n';

const StoreLocationList = () => {
    const router = useRouter();
    const [storeLocations, setStoreLocation] = useState<StoreLocationType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dialogDelete, setDialogDelete] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | null | undefined>(null);

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
            try {
                const data = storeLocationData.map((data) => StoreLocationSchema.parse(data));
                setStoreLocation(data);
            } catch (error) {
                console.error('Error fetching:', error);
            }
        };
        setTimeout(() => {
            setIsLoading(false)
        }, 3000);

        fetchData();
    }, []);

    const handleView = (item: StoreLocationType) => {
        router.push(`/configuration/store-location/${item.id}`)
    };


    const handleDelete = (item: StoreLocationType) => {
        console.log(item);

        // setStoreLocation(item.id);
        // setDialogDelete(true);
    };

    const confirmDelete = async () => {
        try {
            setIsLoading(true);
            setStoreLocation((prev) => prev.filter((unit) => unit.id !== idToDelete));
            setDialogDelete(false);
        } catch (error) {
            console.error('Error deleting unit:', error);
        } finally {
            setIsLoading(false);
            setIdToDelete(null);
        }
    };


    const actionButtons = (
        <div className="flex flex-col gap-4 md:flex-row">
            <CustomButton
                className='w-full md:w-20'
                prefixIcon={<PlusCircle />}
            >
                Add
            </CustomButton>
            <div className='flex flex-row md:flex-row gap-4'>
                <CustomButton className='w-full md:w-20' variant="outline" prefixIcon={<Sheet />}>Export</CustomButton>
                <CustomButton className='w-full md:w-20' variant="outline" prefixIcon={<Printer />}>Print</CustomButton>
            </div>

        </div>
    );

    const title = 'Store Locations';

    const filter = (
        <div className="flex flex-col justify-start sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
            <div className="w-full sm:w-auto flex-grow">
                <InputCustom
                    placeholder="Search Units..."
                />
            </div>
        </div>
    );

    const columns: StoreLocationLabel[] = [
        { key: 'storeCode', label: 'Code' },
        { key: 'storeName', label: 'Name' },
        { key: 'departmentName', label: 'Department Name' },
        { key: 'type', label: 'Type' },
        { key: 'status', label: 'Status' },
        { key: 'isActive', label: 'Active' }
    ];

    const content = (
        <>
            <div className="block lg:hidden">
                {isLoading ? (
                    <SkeltonCardLoading />
                ) : (
                    <DataCard
                        data={storeLocations}
                        columns={columns}
                        onView={handleView}
                        onDelete={handleDelete}
                    />
                )}
            </div>

            <div className="hidden lg:block">
                {isLoading ? (
                    <SkeletonTableLoading />
                ) : (
                    <DataTable
                        data={storeLocations}
                        columns={columns}
                        onView={handleView}
                        onDelete={handleDelete}
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
    )


    return (
        <DataDisplayTemplate
            title={title}
            actionButtons={actionButtons}
            filters={filter}
            content={content}
        />
    )
}

export default StoreLocationList