'use client';

import { use, useCallback, useEffect } from 'react';
import { useURLState } from '@/app/(front-end)/hooks/useURLState';
import { useAuth } from '@/app/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { UnitType } from '@carmensoftware/shared-types';
import React, { Suspense, useState } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import { Button } from '@/components/ui/button';
import EmptyState from '@/components/ui-custom/EmptyState';
import SkeltonLoad from '@/components/ui-custom/Loading/SkeltonLoad';
import DataCard, { FieldConfig } from '@/components/templates/DataCard';
import TableData from '@/components/templates/TableData';
import { deleteUnit, fetchUnits } from '../actions/unit';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { formType } from '@/types/form_type';
import SearchForm from '@/components/ui-custom/SearchForm';
import UnitDialog from '../components/UnitDialog';

// Component to handle data fetching
const UnitData = ({
    token,
    tenantId,
    search,
    status
}: {
    token: string;
    tenantId: string;
    search?: string;
    status?: string;
}) => {
    const unitsPromise = fetchUnits(token, tenantId, { search, status });
    const { data: units } = use(unitsPromise);
    return <UnitContent units={units} token={token} tenantId={tenantId} />;
};

// Component to handle errors
class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean; error?: Error }
> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            return (
                <Card className="border-destructive">
                    <CardContent className="pt-6">
                        <p className="text-destructive">
                            Error loading units: {this.state.error?.message || 'An error occurred'}
                        </p>
                    </CardContent>
                </Card>
            );
        }

        return this.props.children;
    }
}

// Component to render the unit content
const UnitContent = ({
    units: initialUnits,
    token,
    tenantId
}: {
    units: UnitType[];
    token: string;
    tenantId: string;
}) => {
    const [units, setUnits] = useState<UnitType[]>(initialUnits);

    useEffect(() => {
        setUnits(initialUnits);
    }, [initialUnits]);

    const unitFields: FieldConfig<UnitType>[] = [
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' },
        { key: 'is_active', label: 'Status', type: 'badge' }
    ];

    const handleSuccess = useCallback((updatedUnit: UnitType) => {
        setUnits(currentUnits => {
            const index = currentUnits.findIndex(unit => unit.id === updatedUnit.id);
            if (index === -1) {
                // If unit doesn't exist, add it to the list
                return [...currentUnits, updatedUnit];
            } else {
                // If unit exists, update it
                const newUnits = [...currentUnits];
                newUnits[index] = updatedUnit;
                return newUnits;
            }
        });
    }, []);

    const handleDelete = useCallback(async (id: string) => {
        // Optimistically remove the unit from the UI
        setUnits(currentUnits => currentUnits.filter(unit => unit.id !== id));

        try {
            const res = await deleteUnit(id, token, tenantId);
            if (res) {
                toastSuccess({ message: 'Unit deleted successfully' });
            }
        } catch (error) {
            // If deletion fails, revert the optimistic update
            const deletedUnit = units.find(unit => unit.id === id);
            if (deletedUnit) {
                setUnits(currentUnits => [...currentUnits, deletedUnit]);
            }

            if (error instanceof Error && error.message === 'Unauthorized') {
                toastError({ message: 'Your session has expired. Please login again.' });
            } else {
                toastError({ message: 'Failed to delete unit' });
            }
        }
    }, [token, tenantId, units]);

    if (units.length === 0) {
        return (
            <EmptyState
                title="Units"
                description="No units found"
                actionButtons={
                    <UnitDialog mode={formType.ADD} onSuccess={handleSuccess} />
                }
            />
        );
    }

    return (
        <>
            <div className="block md:hidden">
                <DataCard<UnitType>
                    items={units}
                    fields={unitFields}
                    idField="id"
                    onSuccess={handleSuccess}
                    onDelete={handleDelete}
                    editComponent={({ item, onSuccess }) => (
                        <UnitDialog
                            mode={formType.EDIT}
                            defaultValues={item}
                            onSuccess={onSuccess}
                        />
                    )}
                />
            </div>
            <div className="hidden md:block">
                <TableData<UnitType>
                    items={units}
                    fields={unitFields}
                    idField="id"
                    onSuccess={handleSuccess}
                    onDelete={handleDelete}
                    editComponent={({ item, onSuccess }) => (
                        <UnitDialog
                            mode={formType.EDIT}
                            defaultValues={item}
                            onSuccess={onSuccess}
                        />
                    )}
                />
            </div>
        </>
    );
};

// Main component
const UnitList = () => {
    const { accessToken } = useAuth();
    const token = accessToken || '';
    const tenantId = 'DUMMY';
    const [search, setSearch] = useURLState('search');
    const [status, setStatus] = useURLState('status');
    const [statusOpen, setStatusOpen] = useState(false);

    const statusOptions = [
        { label: 'All Status', value: '' },
        { label: 'Active', value: 'true' },
        { label: 'Inactive', value: 'false' },
    ];

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSearch(event.currentTarget.search.value);
    };

    const filter = (
        <div className="filter-container">
            <SearchForm
                onSubmit={handleSearch}
                defaultValue={search}
                placeholder="Search Unit..."
            />
            <div className="all-center gap-2">
                <Popover open={statusOpen} onOpenChange={setStatusOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={statusOpen}
                            className="btn-combobox"
                            size={'sm'}
                        >
                            {status
                                ? statusOptions.find((option) => option.value === status)?.label
                                : 'Select status...'}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="pop-content">
                        <Command>
                            <CommandInput placeholder="Search status..." className="h-9" />
                            <CommandList>
                                <CommandEmpty>No status found.</CommandEmpty>
                                <CommandGroup>
                                    {statusOptions.map((option) => (
                                        <CommandItem
                                            key={option.value}
                                            value={option.value}
                                            onSelect={() => {
                                                setStatus(option.value);
                                                setStatusOpen(false);
                                            }}
                                        >
                                            {option.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );

    return (
        <DataDisplayTemplate
            title="Units"
            actionButtons={
                <div className="action-btn-container">
                    <UnitDialog mode={formType.ADD} onSuccess={() => { }} />
                </div>
            }
            filters={filter}
            content={
                <ErrorBoundary>
                    <Suspense fallback={<SkeltonLoad />}>
                        <UnitData
                            token={token}
                            tenantId={tenantId}
                            search={search}
                            status={status}
                        />
                    </Suspense>
                </ErrorBoundary>
            }
        />
    );
};

export default UnitList;