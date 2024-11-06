"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from '@/lib/i18n';
import { CreditNoteType, FormAction } from '@/lib/types';
import { sampleCreditNoteData } from '@/lib/mock/sampleCreditNoteData';
import { CustomButton } from '@/components/ui-custom/CustomButton';
import { PlusCircle, Printer, Search, Sheet } from 'lucide-react';
import SearchInput from '@/components/ui-custom/SearchInput';
import SkeltonCardLoading from '@/components/ui-custom/Loading/SkeltonCardLoading';
import DataCard from '@/components/templates/DataCard';
import SkeletonTableLoading from '@/components/ui-custom/Loading/SkeltonTableLoading';
import DataTable from '@/components/templates/DataTable';
import DialogDelete from '@/components/ui-custom/DialogDelete';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';

const CreditNoteList = () => {
    const router = useRouter();
    const [creditNotes, setCreditNotes] = useState<CreditNoteType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [idToDelete, setIdToDelete] = useState<string | null | undefined>(null);
    const [dialogDelete, setDialogDelete] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchCreditNotes = async () => {
            setIsLoading(true);
            try {
                const data = sampleCreditNoteData.map((item: CreditNoteType) => item);
                setCreditNotes(data);
            } catch (error) {
                console.error('Error fetching credit notes:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCreditNotes();
    }, [])

    const handleAdd = () => {
        router.push(`/procurement/purchase-orders/${FormAction.CREATE}`);
    }

    const handleView = (item: CreditNoteType) => {
        router.push(`/procurement/purchase-orders/${item.id}`);
    };

    const handleEdit = (item: CreditNoteType) => {
        console.log(item);
        router.push(`/procurement/purchase-orders/${item.id}/${FormAction.EDIT}`);
    };

    const handleDelete = (item: CreditNoteType) => {
        setIdToDelete(item.id);
        setDialogDelete(true);
    };

    const confirmDelete = async () => {
        try {
            setIsLoading(true);
            setCreditNotes((prev) => prev.filter((item) => item.id !== idToDelete));
            setDialogDelete(false);
        } catch (error) {
            console.error('Error deleting:', error);
        } finally {
            setIsLoading(false);
            setIdToDelete(null);
        }
    };

    const title = 'Credit Notes';

    const columns: { key: keyof CreditNoteType; label: string }[] = [
        { key: 'status', label: 'Status' },
        { key: 'refNumber', label: 'Ref No.' },
        { key: 'description', label: 'Description' },
        { key: 'createdDate', label: 'Date' },
        { key: 'vendorName', label: 'Vendor' },
        { key: 'docNumber', label: 'Doc.#' },
        { key: 'docDate', label: 'Doc. Date' },
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
                    placeholder="Search Vendor..."
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
                        data={creditNotes}
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
                        data={creditNotes}
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

export default CreditNoteList