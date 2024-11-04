"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { UnitLabel, unitSchema, unitType } from '../type'
import { unitData } from '../data/data'
import ListViewData from './template/ListViewData'
import DialogDelete from '@/components/ui-custom/DialogDelete'


const UnitList = () => {
    const [unit, setUnit] = useState<unitType[]>([])
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | null>(null);

    useEffect(() => {
        const fetchCurrency = async () => {
            const data = unitData.map((data) => {
                return unitSchema.parse(data);
            })
            setUnit(data);
        }
        fetchCurrency();
    }, [])

    const handleAdd = async (item: unitType) => {
        setUnit((prev) => [...prev, item]);
    };

    const handleEdit = async (updatedItem: unitType) => {
        setUnit((prev) =>
            prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );
    };

    const handleDelete = (item: unitType) => {
        setIdToDelete(item.id);
        setIsDialogOpen(true);
    };

    const confirmDelete = () => {
        setUnit((prev) => prev.filter((loc) => loc.id !== idToDelete));
        setIdToDelete(null);
    };

    const fieldConfigs: UnitLabel[] = useMemo(() => [
        { key: 'code', display: 'Code', type: 'string' },
        { key: 'description', display: 'Description', type: 'string' },
        { key: 'isActive', display: 'Active Status', type: 'boolean' }
    ], []);


    return (
        <>
            <ListViewData
                data={unit}
                title="Unit"
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

export default UnitList