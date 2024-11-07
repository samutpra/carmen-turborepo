import React from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table';
import { EyeIcon, Pen, Trash } from 'lucide-react';
import { CustomButton } from '../ui-custom/CustomButton';
import IsActiveIcon from '../ui-custom/Icon/IsActiveIcon';
import { TypeDateKey, dateKeys, formatDateCustom } from '@/lib/formatDate';
import StatusBadge from '../ui-custom/custom-status-badge';
import { amountKeys, formatPrice, TypeAmountKey } from '@/lib/formatPrice';
import { PaginationType } from '@/lib/types';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ColumnProps<T> {
    key: Extract<keyof T, string>;
    label: string;
}

interface Props<T> {
    data: T[];
    columns: ColumnProps<T>[];
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    onView?: (item: T) => void;
    pagination?: PaginationType;
    goToPage?: (page: number) => void;
    nextPage?: () => void;
    previousPage?: () => void;
    setPerPage?: (perPage: number) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataTable = <T extends Record<string, any>>({
    data,
    columns,
    onEdit,
    onDelete,
    onView,
    pagination,
    goToPage,
    nextPage,
    previousPage,
    setPerPage
}: Props<T>) => {
    const getPageNumbers = () => {
        const currentPage = pagination?.page;
        const totalPages = pagination?.pages;
        const delta = 2;

        const pages: (number | 'ellipsis')[] = [];

        for (let i = 1; i <= (totalPages ?? 0); i++) {
            if (
                i === 1 ||
                i === (totalPages ?? 0) ||
                (i >= (currentPage ?? 1) - delta && i <= (currentPage ?? 1) + delta)
            ) {
                pages.push(i);
            } else if (
                (i === (currentPage ?? 1) - delta - 1 && (currentPage ?? 1) - delta > 2) ||
                (i === (currentPage ?? 1) + delta + 1 && (currentPage ?? 1) + delta < (totalPages ?? 0) - 1)
            ) {
                pages.push('ellipsis');
            }
        }

        return pages;
    };

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell>#</TableCell>
                        {columns.map((column) => (
                            <TableCell key={column.key} className="font-medium">
                                {column.label}
                            </TableCell>
                        ))}
                        {(onEdit || onDelete) && <TableCell className="font-medium">Actions</TableCell>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{((pagination?.page ?? 1) - 1) * (pagination?.perPage ?? 10) + index + 1}</TableCell>
                            {columns.map((column) => {
                                const value = item[column.key];
                                return (
                                    <TableCell key={column.key} className="whitespace-nowrap">
                                        {typeof value === 'boolean' ? (
                                            <IsActiveIcon isChecked={value} />
                                        ) : dateKeys.includes(column.key as TypeDateKey) ? (
                                            formatDateCustom(value)
                                        ) : column.key === 'status' ? (
                                            <StatusBadge status={value} />
                                        ) : amountKeys.includes(column.key as TypeAmountKey) ? (
                                            formatPrice(value)
                                        ) : value != null ? (
                                            String(value)
                                        ) : (
                                            '-'
                                        )}
                                    </TableCell>
                                );
                            })}

                            {(onEdit || onDelete || onView) && (
                                <TableCell>
                                    <div className="flex gap-2">
                                        {onView && (
                                            <CustomButton
                                                variant="outline"
                                                size="sm"
                                                onClick={() => onView(item)}
                                                className="hover:bg-blue-50"
                                            >
                                                <EyeIcon className="h-4 w-4" />
                                            </CustomButton>
                                        )}
                                        {onEdit && (
                                            <CustomButton
                                                variant="outline"
                                                size="sm"
                                                onClick={() => onEdit(item)}
                                                className="hover:bg-blue-50"
                                            >
                                                <Pen className="h-4 w-4" />
                                            </CustomButton>
                                        )}
                                        {onDelete && (
                                            <CustomButton
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => onDelete(item)}
                                            >
                                                <Trash className="h-4 w-4" />
                                            </CustomButton>
                                        )}
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


            <div className='flex justify-end mt-10'>
                <div className='flex items-center'>
                    <Select
                        value={String(pagination?.perPage)}
                        onValueChange={(value) => setPerPage(Number(value))}
                    >
                        <SelectTrigger className="w-[70px]">
                            <SelectValue placeholder="10" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="30">30</SelectItem>
                            <SelectItem value="40">40</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>

                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={previousPage}
                                />
                            </PaginationItem>

                            {getPageNumbers().map((pageNum, index) => (
                                <PaginationItem key={index}>
                                    {pageNum === 'ellipsis' ? (
                                        <PaginationEllipsis />
                                    ) : (
                                        <PaginationLink
                                            onClick={() => goToPage(pageNum)}
                                            isActive={pagination?.page === pageNum}
                                            className="cursor-pointer"
                                        >
                                            {pageNum}
                                        </PaginationLink>
                                    )}
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={nextPage}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </>
    );
};

export default DataTable;