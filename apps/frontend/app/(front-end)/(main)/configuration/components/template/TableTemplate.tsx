/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui-custom/TableCustom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown, Check, ChevronLeft, ChevronRight, SquarePen, Trash, X } from 'lucide-react';
import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import EmptyData from '@/components/EmptyData';
import { Input } from '@/components/ui/input';
import { FieldType } from '../../../../../../../types';
import { Checkbox } from '@/components/ui/checkbox';

interface Props<T> {
    data: T[];
    fields: Array<{
        key: keyof T;
        display: string;
        type?: FieldType;
    }>;
    titleField?: keyof T;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    onSort?: (field: keyof T) => void;
    sortField?: keyof T | null;
    sortDirection?: 'asc' | 'desc';
}

const TableTemplate = <T,>({
    data,
    fields,
    titleField,
    onEdit,
    onDelete,
    onSort,
    sortField,
    sortDirection = 'asc',
}: Props<T>) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / 10);
    const paginatedData = data.slice((currentPage - 1) * 10, currentPage * 10);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderCellValue = (field: Props<T>['fields'][0], value: any) => {
        if (field.type === 'boolean') {
            return value ? <Check className='text-green-700' size="16px" /> : <X className='text-gray-700' size="16px" />;
        } else {
            return String(value);
        }
    };


    const renderSortableHeader = (field: Props<T>['fields'][0]) => (
        <div
            className={`flex items-center gap-1 cursor-pointer select-none
                ${onSort ? 'hover:text-gray-700' : ''}`}
            onClick={() => onSort?.(field.key)}
        >
            {field.display}
            {/* {onSort && (
                <ArrowUpDown
                    className={`h-4 w-4 transition-transform
                        ${sortField === field.key ? 'text-blue-500' : 'text-gray-400'}
                        ${sortField === field.key && sortDirection === 'desc' ? 'rotate-180' : ''}`}
                />
            )} */}
        </div>
    );

    const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    return (
        <div className="w-full overflow-x-auto rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        {fields.map((field) => (
                            <TableCell key={String(field.key)}>
                                {renderSortableHeader(field)}
                            </TableCell>
                        ))}
                        {(onEdit || onDelete) && (
                            <TableCell>Actions</TableCell>
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedData.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={fields.length + (onEdit || onDelete ? 1 : 0)}
                                className="text-center text-gray-500 py-8"
                            >
                                <EmptyData />
                            </TableCell>
                        </TableRow>
                    ) : (
                        paginatedData.map((item, index) => (
                            <TableRow key={index}>
                                {fields.map((field) => (
                                    <TableCell key={String(field.key)} className="whitespace-nowrap">
                                        {renderCellValue(field, item[field.key])}
                                    </TableCell>
                                ))}
                                {(onEdit || onDelete) && (
                                    <TableCell>
                                        <div className="flex gap-2">
                                            {onEdit && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => onEdit(item)}
                                                    className="hover:bg-blue-50"
                                                >
                                                    <SquarePen size={12} />
                                                </Button>
                                            )}
                                            {onDelete && (
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => onDelete(item)}
                                                >
                                                    <Trash size={2} />
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {totalPages > 1 && (
                <div className="flex justify-end items-center p-4 gap-4">
                    <Button
                        variant="default"
                        className={`w-4 h-6 ${currentPage === 1 ? 'cursor-not-allowed' : ''}`}
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft />
                    </Button>


                    {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        return (
                            <Button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-6 h-6 flex justify-center items-center hover:text-white 
                                    ${currentPage === page ? 'bg-zinc-800 text-white' :
                                        'bg-transparent text-gray-700 border'
                                    }`}
                            >
                                {page}
                            </Button>
                        );
                    })}

                    <Button
                        className={`w-4 h-6 ${currentPage === totalPages ? 'cursor-not-allowed' : ''}`}
                        variant="default"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight />
                    </Button>
                    <Input
                        type="number"
                        // value={currentPage}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            if (!isNaN(value) && value > 0 && value <= totalPages) {
                                setCurrentPage(value);
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                const value = Number(e.currentTarget.value);
                                if (!isNaN(value) && value > 0 && value <= totalPages) {
                                    setCurrentPage(value);
                                }
                            }
                        }}
                        className="w-12 h-6 text-center"
                        min={1}
                        max={totalPages}
                    />
                </div>
            )}
        </div>
    );
};

export default TableTemplate;