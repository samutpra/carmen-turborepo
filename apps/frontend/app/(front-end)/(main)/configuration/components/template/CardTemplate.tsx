import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { Switch } from '@radix-ui/react-switch';
import { SquarePen, Trash } from 'lucide-react';
import { FieldType } from '../../../../../../../types';

interface Props<T> {
    item: T;
    titleField: keyof T;
    fields: Array<{
        key: keyof T;
        display: string;
        type?: FieldType;
    }>;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
}

const CardTemplate = <T,>({
    item,
    titleField,
    fields,
    onEdit,
    onDelete }:
    Props<T>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderFieldValue = (field: Props<T>['fields'][0], value: any) => {
        switch (field.type) {
            case 'boolean':
                return (
                    <Switch
                        checked={value}
                        aria-label={field.display}
                    />
                );
            default:
                return String(value);
        }
    };


    return (
        <Card className="mb-4 hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-semibold">
                        {String(item[titleField])}
                    </CardTitle>
                    <div className='space-x-2'>
                        {onEdit && (
                            <Button
                                variant="outline"
                                onClick={() => onEdit(item)}
                                className="hover:bg-blue-50 h-6 w-6"
                            >
                                <SquarePen />
                            </Button>
                        )}
                        {onDelete && (
                            <Button
                                variant="destructive"
                                onClick={() => onDelete(item)}
                                className="hover:bg-red-600 h-6 w-6"
                            >
                                <Trash />
                            </Button>
                        )}
                    </div>

                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 mt-4">
                    {fields.map((field) => (
                        <div
                            key={String(field.key)}
                            className="flex items-center"
                        >
                            <span className="w-1/3 text-xs text-gray-600 font-medium">
                                {field.display}
                            </span>
                            <div className="text-xs">
                                {renderFieldValue(field, item[field.key])}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default CardTemplate;