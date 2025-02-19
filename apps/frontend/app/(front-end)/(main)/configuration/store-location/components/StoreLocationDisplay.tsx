import React, { useEffect, useState } from 'react'
import { LocationCreateModel } from '@/dtos/location.dto'
import { FieldConfig, SortQuery } from '@/lib/util/uiConfig';
import { ChevronDown, ChevronUp, Eye, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PaginationComponent from '@/components/PaginationComponent';
import { CardsContainerSkeleton } from '@/components/ui-custom/Loading/CardsContainerSkeleton';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Link } from '@/lib/i18n';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TableBodySkeleton } from '@/components/ui-custom/Loading/TableBodySkeleton';
import * as m from '@/paraglide/messages.js';
import SortButton, { SortDirection } from '@/components/SortButton';
import { Badge } from '@/components/ui-custom/is-active-badge';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog';

interface Props {
    locations: LocationCreateModel[];
    fields: FieldConfig<LocationCreateModel>[];
    page: number;
    totalPage: number;
    handlePageChange: (newPage: number) => void;
    sort?: string;
    onSortChange?: (sort: SortQuery) => void;
    isLoading?: boolean;
    handleDelete: (id: string) => void;

}

const StoreLocationDisplay: React.FC<Props> = ({
    locations,
    fields = [],
    page,
    totalPage,
    handlePageChange,
    sort,
    onSortChange,
    isLoading = false,
    handleDelete
}) => {
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        if (!sort) return;

        const [field, direction] = sort.split(':');
        setSortField(field);
        setSortDirection((direction as SortDirection) || 'asc');
    }, [sort]);

    const handleSort = (field: string) => {
        const newDirection: SortDirection =
            sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';

        setSortField(field);
        setSortDirection(newDirection);
        onSortChange?.(`${field}:${newDirection}` as SortQuery);
    };

    const openDeleteDialog = (id: string) => {
        setSelectedId(id);
        setIsDialogOpen(true);
    };

    const confirmDelete = () => {
        if (selectedId) {
            handleDelete(selectedId);
        }
        setIsDialogOpen(false);
        setSelectedId(null);
    };

    const renderFieldValue = (field: FieldConfig<LocationCreateModel>, location: LocationCreateModel) => {
        if (field.render) {
            return field.render(location[field.key], location);
        }

        if (field.type === 'badge') {
            return (
                <Badge variant={field.key ? 'default' : 'destructive'}>
                    {field.key ? `${m.status_active()}` : `${m.status_inactive()}`}
                </Badge>
            );
        }
        return String(location[field.key]);
    };

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>ยืนยันการลบ</DialogTitle>
                    </DialogHeader>
                    <p>คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้? การกระทำนี้ไม่สามารถย้อนกลับได้</p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>ยกเลิก</Button>
                        <Button variant="destructive" onClick={confirmDelete}>ยืนยันลบ</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="block md:hidden" role="region" aria-label="Product list mobile view">
                <div className="flex items-center gap-2 mb-4 overflow-x-auto">
                    {fields.map((field) => (
                        <Button
                            key={field.key as string}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSort(String(field.key))}
                            aria-label={`Sort by ${field.label}`}
                        >
                            {field.label}
                            {sortField === field.key && (
                                sortDirection === 'asc' ? (
                                    <ChevronUp className="ml-1 h-4 w-4" />
                                ) : (
                                    <ChevronDown className="ml-1 h-4 w-4" />
                                )
                            )}
                        </Button>
                    ))}
                </div>

                {isLoading ? (
                    <CardsContainerSkeleton
                        fields={fields.length}
                        cards={5}
                        withAction
                    />
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {locations.map((location) => (
                            <Card
                                key={location.id}
                                className="hover:shadow-md transition-all"
                            >
                                <CardContent className="p-4">
                                    {fields.map((field) => (
                                        <div
                                            key={field.key as string}
                                            className="grid grid-cols-10 gap-4"
                                        >
                                            <span className="text-sm text-muted-foreground col-span-3">
                                                {field.label}
                                            </span>
                                            <span className="text-sm font-medium col-span-7">
                                                {renderFieldValue(field, location)}
                                            </span>
                                        </div>
                                    ))}
                                </CardContent>
                                <CardFooter className="flex justify-end gap-2 pt-0 pb-2 px-2">
                                    <Button
                                        asChild
                                        variant="ghost"
                                        size="sm"
                                        aria-label={`View product ${location.id} details`}
                                    >
                                        <Link href={`/configuration/store-location/${location.id}`}>
                                            <Eye />
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        aria-label={`View location ${location.id} details`}
                                        onClick={() => openDeleteDialog(location.id || '')}
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
            <div className="hidden md:block" role="region" aria-label="Location list desktop view">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">#</TableHead>
                            {fields.map((field) => (
                                <TableHead
                                    key={field.key as string}
                                    className={`text-xs ${field.className || ''}`}
                                    style={{ width: field.width }}
                                    align={field.align}
                                >
                                    <SortButton
                                        field={String(field.key)}
                                        label={field.label}
                                        isActive={sortField === field.key}
                                        direction={sortDirection}
                                        onSort={handleSort}
                                    />
                                </TableHead>
                            ))}
                            <TableHead className="text-right">
                                {m.action_text()}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    {isLoading ? (
                        <TableBodySkeleton
                            columns={fields.length}
                            withAction
                        />
                    ) : (
                        <TableBody>
                            {locations.map((location, index) => (
                                <TableRow key={location.id}>
                                    <TableCell className="font-medium text-xs">
                                        {index + 1}
                                    </TableCell>
                                    {fields.map((field) => (
                                        <TableCell
                                            key={field.key as string}
                                            className={`text-xs ${field.className || ''}`}
                                            align={field.align}
                                        >
                                            {renderFieldValue(field, location)}
                                        </TableCell>
                                    ))}
                                    <TableCell className="text-right">
                                        <Button
                                            asChild
                                            variant="ghost"
                                            size="sm"
                                            aria-label={`View product ${location.id} details`}
                                        >
                                            <Link href={`/configuration/store-location/${location.id}`}>
                                                <Eye />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            aria-label={`View location ${location.id} details`}
                                            onClick={() => openDeleteDialog(location.id || '')}
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    )}
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

export default StoreLocationDisplay;