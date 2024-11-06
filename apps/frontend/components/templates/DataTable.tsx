import React from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table';
import { EyeIcon, Pen, Trash } from 'lucide-react';
import { CustomButton } from '../ui-custom/CustomButton';
import IsActiveIcon from '../ui-custom/Icon/IsActiveIcon';
import { TypeDateKey, dateKeys, formatDateCustom } from '@/lib/formatDate';
import StatusBadge from '../ui-custom/custom-status-badge';
import { amountKeys, formatPrice, TypeAmountKey } from '@/lib/formatPrice';

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
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataTable = <T extends Record<string, any>>({ data, columns, onEdit, onDelete, onView }: Props<T>) => {
    return (
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
                        <TableCell>{index + 1}</TableCell>
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
                            <TableCell className="">
                                <div className="flex gap-2">
                                    {onView && (
                                        <CustomButton
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onView(item)}
                                            className="hover:bg-blue-50"
                                        >
                                            <EyeIcon />
                                        </CustomButton>
                                    )}
                                    {onEdit && (
                                        <CustomButton
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onEdit(item)}
                                            className="hover:bg-blue-50"
                                        >
                                            <Pen />
                                        </CustomButton>
                                    )}
                                    {onDelete && (
                                        <CustomButton
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => onDelete(item)}
                                        >
                                            <Trash />
                                        </CustomButton>
                                    )}
                                </div>
                            </TableCell>
                        )}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default DataTable;