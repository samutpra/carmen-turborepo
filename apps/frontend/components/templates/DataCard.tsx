import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EyeIcon, Pen, Trash } from 'lucide-react';
import IsActiveIcon from '../ui-custom/Icon/IsActiveIcon';

interface Column {
    key: string;
    label: string;
}

interface Props<T> {
    data: T[];
    columns: Column[];
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    onView?: (item: T) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataCard = <T extends Record<string, any>>({ data, columns, onEdit, onDelete, onView }: Props<T>) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item, index) => (
                <Card key={index} className="overflow-hidden">
                    <CardContent>
                        <div className="space-y-2">
                            {columns.map((column) => (
                                <div key={column.key} className="flex">
                                    <span className="w-3/5 text-sm font-medium text-gray-500">
                                        {column.label}
                                    </span>
                                    {typeof item[column.key] === 'boolean' ? (
                                        <IsActiveIcon isChecked={item[column.key]} />
                                    ) : (
                                        <span className="text-sm w-full">
                                            {String(item[column.key] ?? '')}
                                        </span>
                                    )}
                                </div>
                            ))}
                            {(onEdit || onDelete || onView) && (
                                <div className="flex gap-2 pt-2 justify-end">
                                    {onView && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onView(item)}
                                            className="hover:bg-blue-50"
                                        >
                                            <EyeIcon />
                                        </Button>
                                    )}
                                    {onEdit && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onEdit(item)}
                                            className="hover:bg-blue-50"
                                        >
                                            <Pen />                                        </Button>
                                    )}
                                    {onDelete && (
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => onDelete(item)}
                                        >
                                            <Trash />
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default DataCard;