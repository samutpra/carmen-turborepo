"use client"
import DataCard from '@/components/templates/DataCard';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import DataTable from '@/components/templates/DataTable';
import { CustomButton } from '@/components/ui-custom/CustomButton';
import DialogDelete from '@/components/ui-custom/DialogDelete';
import SkeltonCardLoading from '@/components/ui-custom/Loading/SkeltonCardLoading';
import SkeletonTableLoading from '@/components/ui-custom/Loading/SkeltonTableLoading';
import SearchInput from '@/components/ui-custom/SearchInput';
import { mockGoodsReceiveNotes } from '@/lib/mock/mock_goodsReceiveNotes';
import { GoodsReceiveNote } from '@/lib/types';
import { PlusCircle, Printer, Search, Sheet } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const GoodsReceiveNoteList = () => {
    const [grnData, setGrnData] = useState<GoodsReceiveNote[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | null | undefined>(null);
    const [dialogDelete, setDialogDelete] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchGrn = async () => {
            setIsLoading(true);
            try {
                const data = mockGoodsReceiveNotes.map((item: GoodsReceiveNote) => item);
                setGrnData(data);
            } catch (error) {
                console.error('Error fetching units:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGrn();
    }, []);

    const handleView = (item: GoodsReceiveNote) => {
        console.log('Viewing unit:', item);
    };

    const handleEdit = (item: GoodsReceiveNote) => {
        console.log(item);
    };

    const handleDelete = (item: GoodsReceiveNote) => {
        setIdToDelete(item.id);
        setDialogDelete(true);
    };

    const confirmDelete = async () => {
        try {
            setIsLoading(true);
            setGrnData((prev) => prev.filter((item) => item.id !== idToDelete));
            setDialogDelete(false);
        } catch (error) {
            console.error('Error deleting Good Recieve Note:', error);
        } finally {
            setIsLoading(false);
            setIdToDelete(null);
        }
    };



    const title = 'Goods Receive Note';

    const columns: { key: keyof GoodsReceiveNote; label: string }[] = [
        { key: 'date', label: 'Date' },
        { key: 'ref', label: 'Code' },
        { key: 'description', label: 'Description' },
        { key: 'status', label: 'Status' },
        { key: 'vendor', label: 'Vendor' },
        { key: 'invoiceNumber', label: 'Invoice Number' },
        { key: 'invoiceDate', label: 'Invoice Date' },
        { key: 'totalAmount', label: 'Total Amount' },
    ];

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

    const filter = (
        <div className="flex flex-col justify-start sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
            <div className="w-full sm:w-auto flex-grow">
                <SearchInput
                    placeholder="Search Units..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    Icon={Search}
                />
                <div>asdasd {process.env.NEXT_PUBLIC_SHORT_DATE_FORMAT || 'pipe'}</div>
            </div>

        </div>
    );

    const content = (
        <>
            <div className="block lg:hidden">
                {isLoading ? (
                    <SkeltonCardLoading />) : (

                    <DataCard
                        data={grnData}
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
                        data={grnData}
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

export default GoodsReceiveNoteList