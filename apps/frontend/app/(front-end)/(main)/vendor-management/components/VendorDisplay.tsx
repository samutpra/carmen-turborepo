import { Badge } from '@/components/ui-custom/is-active-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import * as m from '@/paraglide/messages.js';
import { VendorCreateModel } from '@/dtos/vendor.dto';
import PaginationComponent from '@/components/PaginationComponent';

interface VendorDisplayProps {
    vendors: VendorCreateModel[];
    page: number;
    totalPage: number;
    handlePageChange: (newPage: number) => void;
}
const VendorDisplay: React.FC<VendorDisplayProps> = ({ vendors, page, totalPage, handlePageChange }) => {

    return (
        <>
            {/* Mobile View */}
            <div className="block md:hidden">
                <div className="grid grid-cols-1 gap-4">
                    {vendors.map((vendor) => (
                        <Card key={vendor.id} className="hover:shadow-md transition-all">
                            <CardContent className="p-4">
                                <div className="space-y-3">
                                    <div className="grid grid-cols-10 gap-4">
                                        <span className="text-xs text-muted-foreground col-span-3">
                                            {m.vendor_name_label()}
                                        </span>
                                        <span className="text-xs font-medium col-span-7">
                                            {vendor.name}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-10 gap-4">
                                        <span className="text-xs text-muted-foreground col-span-3">
                                            {m.description()}
                                        </span>
                                        <span className="text-xs font-medium col-span-7">
                                            {vendor.description}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-10 gap-4">
                                        <span className="text-xs text-muted-foreground col-span-3">
                                            {m.status_text()}
                                        </span>
                                        <div className="col-span-7">
                                            <Badge variant={vendor.is_active ? 'default' : 'destructive'}>
                                                {vendor.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2 pt-0 pb-2 px-2">
                                <Button asChild variant="ghost">
                                    <Link href={`/vendor-management/vendors/${vendor.id}`}>
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
                            <TableHead className='w-[200px]'>{m.vendor_name_label()}</TableHead>
                            <TableHead className='w-[400px]'>{m.description()}</TableHead>
                            <TableHead>{m.status_text()}</TableHead>
                            <TableHead className="text-right">{m.action_text()}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vendors.map((vendor, index) => (
                            <TableRow key={vendor.id} className='text-xs'>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{vendor.name}</TableCell>
                                <TableCell>{vendor.description}</TableCell>
                                <TableCell>
                                    <Badge variant={vendor.is_active ? 'default' : 'destructive'}>
                                        {vendor.is_active ? `${m.status_active()}` : `${m.status_inactive()}`}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button asChild variant="ghost" size={'sm'}>
                                        <Link href={`/vendor-management/vendors/${vendor.id}`}>
                                            <Eye className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <PaginationComponent
                    currentPage={page}
                    totalPages={totalPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </>
    )
}

export default VendorDisplay