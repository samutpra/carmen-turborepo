import React, { useCallback, useState } from 'react';
import CardTemplate from './CardTemplate';
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import TableTemplate from './TableTemplate';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import SearchInput from '@/components/ui-custom/SearchInput';
import { PlusCircle, Search } from 'lucide-react';
import { CustomButton } from '@/components/ui-custom/CustomButton';
import { Field } from '../../../../../../../types';
interface Props<T> {
    data: T[];
    title: string;
    titleField: keyof T;
    fields: Field<T>[];
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    onAdd?: (item: T) => void;
    onBulkDelete?: (items: T[]) => void;
    pageSize?: number;
}

const ListViewData = <T extends { id?: string },>({
    data,
    title,
    titleField,
    fields,
    onEdit,
    onDelete,
    onAdd,
    pageSize = 10,
}: Props<T>) => {

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Partial<T> | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sortField, setSortField] = useState<keyof T | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const [validationErrors, setValidationErrors] = useState<Record<keyof T, string>>({} as Record<keyof T, string>);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currentPage, setCurrentPage] = useState(1);


    // const filteredAndSortedData = useCallback(() => {
    //     let result = data.filter((item) =>
    //         String(item[titleField]).toLowerCase().includes(searchTerm.toLowerCase())
    //     );

    //     if (sortField) {
    //         result = [...result].sort((a, b) => {
    //             const aValue = String(a[sortField]);
    //             const bValue = String(b[sortField]);
    //             return sortDirection === 'asc'
    //                 ? aValue.localeCompare(bValue)
    //                 : bValue.localeCompare(aValue);
    //         });
    //     }

    //     return result;
    // }, [data, searchTerm, sortField, sortDirection, titleField]);

    // const paginatedData = useCallback(() => {
    //     const start = 0;
    //     const end = currentPage * pageSize;
    //     return filteredAndSortedData().slice(start, end);
    // }, [filteredAndSortedData, currentPage, pageSize]);


    const validateForm = (): boolean => {
        const errors: Record<keyof T, string> = {} as Record<keyof T, string>;
        let isValid = true;

        fields.forEach((field) => {
            if (field.required && !editingItem?.[field.key]) {
                errors[field.key] = `${field.display} is required`;
                isValid = false;
            }

            if (field.validate && editingItem?.[field.key]) {
                const error = field.validate(editingItem[field.key]);
                if (error) {
                    errors[field.key] = error;
                    isValid = false;
                }
            }
        });

        setValidationErrors(errors);
        return isValid;
    };

    const handleSave = async () => {
        try {
            if (!editingItem || !validateForm()) return;

            setIsLoading(true);
            setError(null);

            if (editingItem.id) {
                await onEdit?.(editingItem as T);
            } else {
                await onAdd?.(editingItem as T);
            }

            setEditingItem(null);
            setDialogOpen(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };



    const handleSort = (field: keyof T) => {
        if (sortField === field) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const openAddDialog = () => {
        const initialItem = fields.reduce((acc, field) => ({
            ...acc,
            [field.key]: field.type === 'boolean' ? false : ''
        }), {} as Partial<T>);

        setEditingItem(initialItem);
        setDialogOpen(true);
        setValidationErrors({} as Record<keyof T, string>);
    };



    const openEditDialog = (item: T) => {
        setEditingItem({ ...item });
        setDialogOpen(true);
        setValidationErrors({} as Record<keyof T, string>);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFieldChange = (field: keyof T, value: any) => {
        setEditingItem(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                [field]: value,
            };
        });

        // Clear validation error when field is changed
        if (validationErrors[field]) {
            setValidationErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const renderField = (field: Field<T>) => {
        const value = editingItem?.[field.key];
        const error = validationErrors[field.key];

        const commonProps = {
            id: String(field.key),
            'aria-invalid': Boolean(error),
            'aria-describedby': error ? `${String(field.key)}-error` : undefined
        };

        switch (field.type) {
            case 'boolean':
                return (
                    <div className="flex items-center space-x-2" key={String(field.key)}>
                        <Switch
                            {...commonProps}
                            checked={Boolean(value)}
                            onCheckedChange={(checked) => handleFieldChange(field.key, checked)}
                        />
                        <Label htmlFor={String(field.key)}>{field.display}</Label>
                        {error && <span className="text-red-500 text-sm" id={`${String(field.key)}-error`}>{error}</span>}
                    </div>
                );

            default:
                return (
                    <div className="space-y-1" key={String(field.key)}>
                        <Label htmlFor={String(field.key)}>{field.display}</Label>
                        <Input
                            {...commonProps}
                            value={String(value ?? '')}
                            onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        />
                        {error && <span className="text-red-500 text-sm" id={`${String(field.key)}-error`}>{error}</span>}
                    </div>
                );
        }
    };

    return (
        <Card className="space-y-4 p-6 m-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{title}</h1>
            </div>

            <div className="flex gap-4 justify-between items-center">
                <SearchInput
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    Icon={Search}
                    variant="suffix"
                    className='flex-1'
                />

                <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <CustomButton variant="default" onClick={openAddDialog}>
                            <PlusCircle />
                            Add
                        </CustomButton>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogTitle>
                            {editingItem?.id ? `Edit ${title}` : `Add New ${title}`}
                        </DialogTitle>
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-4 mt-4">
                            {fields.map(renderField)}
                        </div>
                        <DialogFooter className="mt-4">
                            <Button
                                variant="secondary"
                                onClick={() => setDialogOpen(false)}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="default"
                                onClick={handleSave}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Saving...' : (editingItem?.id ? 'Save Changes' : 'Add')}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            {/* 
            <div className="block lg:hidden">
                {paginatedData().map((item, index) => (
                    <CardTemplate
                        key={item.id ?? index}
                        item={item}
                        titleField={titleField}
                        fields={fields}
                        onEdit={() => openEditDialog(item)}
                        onDelete={onDelete}
                    />
                ))}
            </div> */}

            <div className="hidden lg:block">
                <TableTemplate
                    data={data}
                    fields={fields}
                    titleField={titleField}
                    onEdit={openEditDialog}
                    onDelete={onDelete}
                    sortField={sortField}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                />
            </div>
        </Card>
    );
};

export default ListViewData;