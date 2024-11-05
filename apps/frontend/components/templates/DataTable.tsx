import React from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table';
import { EyeIcon, Pen, Trash } from 'lucide-react';
import { CustomButton } from '../ui-custom/CustomButton';
import IsActiveIcon from '../ui-custom/Icon/IsActiveIcon';
import { DateKey, dateKeys, formatDateCustom } from '@/lib/formatDate';

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
                        {columns.map((column) => (
                            <TableCell key={column.key} className="whitespace-nowrap">
                            {typeof item[column.key] === 'boolean' ? (
                                <IsActiveIcon isChecked={item[column.key]} />
                            ) : dateKeys.includes(column.key as DateKey) ? ( 
                                formatDateCustom(item[column.key])
                            ) : item[column.key] != null ? (
                                String(item[column.key])
                            ) : (
                                '-'
                            )}
                        </TableCell>
                        
                        ))}
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