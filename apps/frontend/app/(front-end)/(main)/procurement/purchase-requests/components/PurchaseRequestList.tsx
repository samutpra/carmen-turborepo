"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from '@/lib/i18n';
import { FormAction, PrType } from '@/lib/types';
import { sampleData } from '../data/sampleData';
import { CustomButton } from '@/components/ui-custom/CustomButton';
import { PlusCircle, Printer, Search, Sheet } from 'lucide-react';
import SearchInput from '@/components/ui-custom/SearchInput';
import SkeletonTableLoading from '@/components/ui-custom/Loading/SkeltonTableLoading';
import DialogDelete from '@/components/ui-custom/DialogDelete';
import DataTable from '@/components/templates/DataTable';
import SkeltonCardLoading from '@/components/ui-custom/Loading/SkeltonCardLoading';
import DataCard from '@/components/templates/DataCard';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';


const PurchaseRequestList = () => {
  const [prData, setPrData] = useState<PrType[]>([])
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null | undefined>(null);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPr = async () => {
      setIsLoading(true);
      try {
        const data = sampleData.map((item: PrType) => item);
        setPrData(data);
      } catch (error) {
        console.error('Error fetching units:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPr();
  }, [])

  const handleAdd = () => {
    router.push(`/procurement/purchase-requests/${FormAction.CREATE}`);

  }

  const handleView = (item: PrType) => {
    console.log('Viewing unit:', item);
    router.push(`/procurement/purchase-requests/${item.id}`);
  };

  const handleEdit = (item: PrType) => {
    console.log(item);
    router.push(`/procurement/purchase-requests/${item.id}/${FormAction.EDIT}`);
  };

  const handleDelete = (item: PrType) => {
    setIdToDelete(item.id);
    setDialogDelete(true);
  };

  const confirmDelete = async () => {
    try {
      setIsLoading(true);
      setPrData((prev) => prev.filter((item) => item.id !== idToDelete));
      setDialogDelete(false);
    } catch (error) {
      console.error('Error deleting:', error);
    } finally {
      setIsLoading(false);
      setIdToDelete(null);
    }
  };

  const title = 'Purchase Request';


  const columns: { key: keyof PrType; label: string }[] = [
    { key: 'type', label: 'Type' },
    { key: 'requestor', label: 'Requestor' },
    { key: 'department', label: 'Department' },
    { key: 'description', label: 'Description' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status' },
    { key: 'amount', label: 'Amount' },
    { key: 'currentStage', label: 'Current Stage' },
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
            data={prData}
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
            data={prData}
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

export default PurchaseRequestList