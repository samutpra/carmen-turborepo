"use client"

import React, { useEffect, useState } from 'react';
import { unitType } from '../type';
import DialogDelete from '@/components/ui-custom/DialogDelete';
import { Button } from '@/components/ui/button';
import { AlertCircle, Pen, Trash } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { mockToken } from '@/lib/util/api';
import { DisplayData } from './template/DisplayData';
import DialogAdd from './template/DialogAdd';
import { PaginationType } from '@/lib/types';

const UnitList = () => {
    const [units, setUnits] = useState<unitType[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState<PaginationType | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    const fetchUnits = async (page: number) => {
        setIsLoading(true);
        setError(null);

        const url = `http://localhost:4000/api/v1/units?page=${page}`;
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${mockToken}`,
                'x-tenant-id': "DUMMY",
            },
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const result = await response.json();
            setUnits(result.data);
            setPagination({
                total: result.total,
                page: result.page,
                perPage: result.perPage,
                pages: result.pages
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while fetching units');
            console.error("Fetch error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (mockToken) {
            fetchUnits(currentPage);
        }
    }, [mockToken, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleAdd = (newUnit: unitType) => {
        setUnits(prev => [...prev, newUnit]);
    };

    const handleEdit = (updatedUnit: unitType) => {
        setUnits(prev =>
            prev.map(unit => unit.id === updatedUnit.id ? updatedUnit : unit)
        );
    };

    const handleDelete = (unit: unitType) => {
        setIdToDelete(unit.id);
        setIsDialogOpen(true);
    };

    const confirmDelete = () => {
        if (idToDelete) {
            setUnits(prev => prev.filter(unit => unit.id !== idToDelete));
            setIdToDelete(null);
            setIsDialogOpen(false);
        }
    };

    const handleActions = (unit: unitType) => (
        <div className="space-x-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(unit)}
            >
                <Pen />
            </Button>
            <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(unit)}
            >
                <Trash />
            </Button>
        </div>
    );
    if (isLoading) {
        return <div className="flex justify-center p-4">Loading units...</div>;
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }
    const columns = [
        { key: 'name' as keyof unitType, header: 'Name' },
        { key: 'description' as keyof unitType, header: 'Description' },
    ];

    const openAddDialog = () => {
        setIsAddDialogOpen(true);
    };

    return (
        <div className="space-y-4">
            <DisplayData
                data={units}
                columns={columns}
                isActive={(unit) => unit.isActive}
                actions={handleActions}
                pagination={pagination}
                onPageChange={handlePageChange}
                onAdd={openAddDialog}
                addButtonLabel="Add Unit"
                title="Units"
            />

            <DialogDelete
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onConfirm={confirmDelete}
                idDelete={idToDelete}
            />

            <DialogAdd
                open={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}
                onSubmit={handleAdd}
            />
        </div>
    );
};

export default UnitList;