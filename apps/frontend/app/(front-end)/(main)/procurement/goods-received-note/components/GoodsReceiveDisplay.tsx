import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Eye, Pen, Trash } from 'lucide-react';
import Link from 'next/link';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import * as m from '@/paraglide/messages.js';
import { GoodsReceiveNote } from '@/lib/types';
import { FieldConfig } from '@/lib/util/uiConfig';
import { Badge } from '@/components/ui/badge';

interface GoodsReceiveProps {
    grnDatas: GoodsReceiveNote[];
    fields: FieldConfig<GoodsReceiveNote>[];
}

const GoodsReceiveDisplay: React.FC<GoodsReceiveProps> = ({ grnDatas, fields }) => {
    const renderField = (field: FieldConfig<GoodsReceiveNote>, item: GoodsReceiveNote): React.ReactNode => {
        const value = item[field.key];
        if (field.render) {
            return field.render(value, item); // Custom render
        }
        switch (field.type) {
            case 'badge':
                if (typeof value === 'boolean') {
                    return (
                        <Badge>
                            {value}
                        </Badge>
                    );
                }
                return <Badge>{String(value)}</Badge>;
            default:
                if (value instanceof Date) {
                    return <span className="text-xs">{value.toLocaleDateString()}</span>;
                }
                return <span className="text-xs">{String(value)}</span>;
        }
    };

    const actionButton = (id: string) => (
        <>
            <Button asChild variant="ghost" size={'sm'}>
                <Link href={`/procurement/goods-received-note/${id}`}>
                    <Eye />
                </Link>
            </Button>
            <Button variant={"ghost"} size={'sm'}>
                <Pen />
            </Button>
            <Button variant={"ghost"} size={'sm'}>
                <Trash />
            </Button>
        </>
    )
    return (
        <>
            {/* Mobile View */}
            <div className="block md:hidden">
                <div className="grid grid-cols-1 gap-4">
                    {grnDatas.map((data) => (
                        <Card key={data.id} className="hover:shadow-md transition-all">
                            <CardContent className="p-4 space-y-2">
                                {fields.map((field) => {
                                    return (
                                        <div key={field.key} className="grid grid-cols-10 gap-4">
                                            <span className="text-sm text-muted-foreground col-span-3">
                                                {field.label}
                                            </span>
                                            <span className="col-span-7">{renderField(field, data)}</span>
                                        </div>
                                    );
                                })}
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2 pt-0 pb-2 px-2">
                                {actionButton(data.id)}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block">
                <Table>
                    <TableHeader>
                        <TableRow className='text-xs'>
                            <TableHead className="w-[20px]">#</TableHead>
                            {fields.map((field) => (
                                <TableHead key={field.key}>{field.label}</TableHead>
                            ))}
                            <TableHead className="text-right">{m.action_text()}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {grnDatas.map((data, index) => (
                            <TableRow key={data.id}>
                                <TableCell className="font-medium text-xs">{index + 1}</TableCell>
                                {fields.map((field) => {
                                    return (
                                        <TableCell key={field.key}>
                                            {renderField(field, data)}
                                        </TableCell>
                                    );
                                })}
                                <TableCell className="text-right w-52">
                                    {actionButton(data.id)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default GoodsReceiveDisplay;
