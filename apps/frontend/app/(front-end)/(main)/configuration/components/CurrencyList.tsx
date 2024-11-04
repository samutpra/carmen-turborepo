"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { CurrencyLabel, currencySchema, currencyType } from '../type';
import { currencyData } from '../data/data';
import ListViewData from './template/ListViewData';
import DialogDelete from '@/components/ui-custom/DialogDelete';


const CurrencyList = () => {
    const [currency, setCurrency] = useState<currencyType[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | null>(null);

    useEffect(() => {
        const fetchCurrency = async () => {
            const data = currencyData.map((data) => {
                return currencySchema.parse(data);
            })
            setCurrency(data);
        }
        fetchCurrency();
    }, [])

    const handleAdd = async (item: currencyType) => {
        setCurrency((prev) => [...prev, item]);
    };

    const handleEdit = async (updatedItem: currencyType) => {
        setCurrency((prev) =>
            prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );
    };

    const handleDelete = (item: currencyType) => {
        setIdToDelete(item.id);
        setIsDialogOpen(true);
    };

    const confirmDelete = () => {
        setCurrency((prev) => prev.filter((loc) => loc.id !== idToDelete));
        setIdToDelete(null);
    };

    const fieldConfigs: CurrencyLabel[] = useMemo(() => [
        { key: 'code', display: 'Code', type: 'string' },
        { key: 'description', display: 'Description', type: 'string' },
        { key: 'isActive', display: 'Active Status', type: 'boolean' }
    ], []);

    return (
        <>
            <ListViewData
                data={currency}
                title="Currency"
                titleField="code"
                fields={fieldConfigs}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <DialogDelete
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onConfirm={confirmDelete}
                idDelete={idToDelete}
            />
        </>
    )
}

export default CurrencyList