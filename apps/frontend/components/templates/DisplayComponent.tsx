'use client';

import React from 'react';
import { Badge } from '../ui-custom/is-active-badge';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Trash } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import * as m from '@/paraglide/messages.js';

type FieldValue = string | number | boolean | null | undefined;

type RenderFunction<T> = (value: T[keyof T], item?: T) => React.ReactNode;

type SuccessCallback<T> = (updatedItem: T, oldItem: T) => void | Promise<void>;

export interface FieldConfig<T> {
    key: keyof T;
    label: string;
    type?: 'text' | 'badge' | 'custom';
    render?: RenderFunction<T>;
    width?: string;
    align?: 'left' | 'center' | 'right';
}

interface DeleteProps {
    title?: string;
    description?: string;
    confirmLabel?: string;
}

interface DisplayComponentProps<T extends Record<string, FieldValue>> {
    items: T[];
    fields: FieldConfig<T>[];
    idField: keyof T;
    onSuccess?: SuccessCallback<T>;
    onDelete?: (id: string) => void;
    showIndex?: boolean;
    editComponent?: (props: {
        item: T;
        onSuccess: (updatedItem: T) => void;
    }) => React.ReactNode;
    deleteDialogProps?: DeleteProps;
}

const DisplayComponent = <T extends Record<string, FieldValue>>({
    items,
    fields,
    idField,
    onSuccess,
    onDelete,
    showIndex = true,
    editComponent,
    deleteDialogProps = {
        title: `${m.are_you_sure()}`,
        description: `${m.delete_dialog_des()}`,
        confirmLabel: `${m.delete_text()}`,
    },
}: DisplayComponentProps<T>): React.ReactElement => {
    const renderField = (field: FieldConfig<T>, item: T): React.ReactNode => {
        const value = item[field.key];

        if (field.render) {
            return field.render(value, item);
        }

        switch (field.type) {
            case 'badge':
                if (typeof value === 'boolean') {
                    return (
                        <Badge variant={value ? 'default' : 'destructive'}>
                            {value ? `${m.status_active()}` : `${m.status_inactive()}`}
                        </Badge>
                    );
                }
                return <Badge>{String(value)}</Badge>;

            default:
                return <span className="text-sm">{String(value)}</span>;
        }
    };

    const renderActions = (item: T): React.ReactNode => (
        <div className="flex justify-end">
            {editComponent && editComponent({
                item,
                onSuccess: (updatedItem: T) => onSuccess?.(updatedItem, item),
            })}
            {onDelete && (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                            <Trash className="h-4 w-4" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>{deleteDialogProps.title}</AlertDialogTitle>
                            <AlertDialogDescription>
                                {deleteDialogProps.description}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => onDelete(String(item[idField]))}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                {deleteDialogProps.confirmLabel}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    );

    return (
        <>
            {/* Mobile */}
            <div className="block md:hidden">
                <div className="grid grid-cols-1 gap-4">
                    {items.map((item) => (
                        <Card key={String(item[idField])} className="hover:shadow-md transition-all">
                            <CardContent className="p-4 space-y-2">
                                {fields.map((field) => (
                                    <div key={String(field.key)} className="grid grid-cols-10 gap-4">
                                        <span className="text-sm text-muted-foreground col-span-3">
                                            {field.label}
                                        </span>
                                        <span className="col-span-7">{renderField(field, item)}</span>
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2 pt-0 pb-2 px-2">{renderActions(item)}</CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Desktop */}
            <div className="hidden md:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {showIndex && <TableHead className="w-10">#</TableHead>}
                            {fields.map((field) => (
                                <TableHead key={String(field.key)} style={{ width: field.width }}>
                                    {field.label}
                                </TableHead>
                            ))}
                            <TableHead className="text-right">{m.action_text()}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((item, index) => (
                            <TableRow key={String(item[idField])}>
                                {showIndex && <TableCell>{index + 1}</TableCell>}
                                {fields.map((field) => (
                                    <TableCell
                                        key={String(field.key)}
                                        className={`text-${field.align || 'left'}`}
                                    >
                                        {renderField(field, item)}
                                    </TableCell>
                                ))}
                                <TableCell className="text-right">
                                    {renderActions(item)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default DisplayComponent;
