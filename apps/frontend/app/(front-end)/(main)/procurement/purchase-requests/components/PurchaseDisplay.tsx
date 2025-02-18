import { PrType } from '@/lib/types';
import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n';
import { Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { FieldConfig } from '@/lib/util/uiConfig';

interface Props {
    prData: PrType[];
    fields: FieldConfig<PrType>[];
}

const formatDate = (date: string | Date | number): string => {
    if (!date) return 'N/A';

    try {
        const dateObject = date instanceof Date
            ? date
            : new Date(date);

        if (isNaN(dateObject.getTime())) {
            return 'Invalid Date';
        }

        return dateObject.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid Date';
    }
};

const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderFieldValue = (field: FieldConfig<PrType>, value: any): React.ReactNode => {
    switch (field.type) {
        case 'date':
            return formatDate(value);
        case 'amount':
            return <span className="font-mono">{formatAmount(value)}</span>;
        case 'badge':
            return <Badge>{value}</Badge>;
        default:
            return value;
    }
};


const PurchaseDisplay: React.FC<Props> = ({ prData, fields }) => {
    return (
        <>
            {/* Mobile View */}
            <div className="block md:hidden">
                <div className="grid grid-cols-1 gap-4">
                    {prData.map((pr) => (
                        <Card key={pr.id} className="hover:shadow-md transition-all">
                            <CardContent className="p-4">
                                <div className="space-y-3">
                                    {fields.map((field) => (
                                        <div key={String(field.key)} className="grid grid-cols-10 gap-4">
                                            <span className="text-xs text-muted-foreground col-span-3">
                                                {field.label}
                                            </span>
                                            <span className="text-xs font-medium col-span-7">
                                                {renderFieldValue(field, pr[field.key])}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2 pt-0 pb-2 px-2">
                                <Button asChild variant="ghost">
                                    <Link href={`/procurement/purchase-requests/${pr.id}`}>
                                        <Eye className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">#</TableHead>
                            {fields.map((field) => (
                                <TableHead key={String(field.key)} className='text-xs'>{field.label}</TableHead>
                            ))}
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {prData.map((pr, index) => (
                            <TableRow key={pr.id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                {fields.map((field) => (
                                    <TableCell key={String(field.key)} className='text-xs'>
                                        {renderFieldValue(field, pr[field.key])}
                                    </TableCell>
                                ))}
                                <TableCell className="text-right">
                                    <Button asChild variant="ghost" size="sm">
                                        <Link href={`/procurement/purchase-requests/${pr.id}`}>
                                            <Eye className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

export default PurchaseDisplay;