import { PrType } from '@/lib/types';
import React from 'react'
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

interface Props {
    prData: PrType[];
}

const PurchaseDisplay: React.FC<Props> = ({ prData }) => {
    return (
        <>
            {/* Mobile View */}
            <div className="block md:hidden">
                <div className="grid grid-cols-1 gap-4">
                    {prData.map((pr) => (
                        <Card key={pr.id} className="hover:shadow-md transition-all">
                            <CardContent className="p-4">
                                <div className="space-y-3">
                                    <div className="grid grid-cols-10 gap-4">
                                        <span className="text-sm text-muted-foreground col-span-3">
                                            Date
                                        </span>
                                        <span className="text-sm font-medium col-span-7">
                                            {pr.date.toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-10 gap-4">
                                        <span className="text-sm text-muted-foreground col-span-3">
                                            Type
                                        </span>
                                        <span className="text-sm font-medium col-span-7">
                                            {pr.type}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-10 gap-4">
                                        <span className="text-sm text-muted-foreground col-span-3">
                                            Requestor
                                        </span>
                                        <span className="text-sm font-medium col-span-7">
                                            {pr.requestor}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-10 gap-4">
                                        <span className="text-sm text-muted-foreground col-span-3">
                                            Amount
                                        </span>
                                        <span className="text-sm font-medium col-span-7 font-mono">
                                            {new Intl.NumberFormat().format(pr.amount)}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-10 gap-4">
                                        <span className="text-sm text-muted-foreground col-span-3">
                                            Current Stage
                                        </span>
                                        <span className="text-sm font-medium col-span-7">
                                            {pr.currentStage}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-10 gap-4">
                                        <span className="text-sm text-muted-foreground col-span-3">
                                            Description
                                        </span>
                                        <span className="text-sm font-medium col-span-7">
                                            {pr.description}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-10 gap-4">
                                        <span className="text-sm text-muted-foreground col-span-3">
                                            Status
                                        </span>
                                        <div className="col-span-7">
                                            <Badge>
                                                {pr.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2 pt-0 pb-2 px-2">
                                <Button asChild variant="ghost">
                                    <Link href={`/purchase-requests/${pr.id}`}>
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
                            <TableHead className="w-[100px]">#</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Requestor</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Workflow Stage</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {prData.map((pr, index) => (
                            <TableRow key={pr.id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{pr.date.toLocaleDateString()}</TableCell>
                                <TableCell>{pr.type}</TableCell>
                                <TableCell>{pr.requestor}</TableCell>
                                <TableCell className='font-mono'>{new Intl.NumberFormat().format(pr.amount)}</TableCell>
                                <TableCell>{pr.currentStage}</TableCell>
                                <TableCell>{pr.description}</TableCell>
                                <TableCell>
                                    <Badge>
                                        {pr.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button asChild variant="ghost" size={'sm'}>
                                        <Link href={`/purchase-requests/${pr.id}`}>
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

export default PurchaseDisplay