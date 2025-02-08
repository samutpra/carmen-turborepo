import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Eye } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import * as m from '@/paraglide/messages.js';
import { Link } from '@/lib/i18n';
import { ProductCreateModel } from '@/dtos/product.dto';
import { FieldConfig } from '@/lib/util/uiConfig';
import { TableBodySkeleton } from '@/components/ui-custom/Loading/TableBodySkeleton';
import PaginationComponent from '@/components/PaginationComponent';
import { SortDirection } from './ProductDisplay';

interface SortButtonProps {
    field: string;
    label: string;
    isActive: boolean;
    direction: SortDirection;
    onSort: (field: string) => void;
}

const SortButton: React.FC<SortButtonProps> = ({
    field,
    label,
    isActive,
    direction,
    onSort,
}) => (
    <div className="flex items-center gap-1">
        <span>{label}</span>
        <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => onSort(field)}
            aria-label={`Sort by ${label} ${isActive ? direction === 'asc' ? 'descending' : 'ascending' : ''}`}
        >
            {isActive ? (
                direction === 'asc' ? (
                    <ChevronUp className="h-4 w-4" />
                ) : (
                    <ChevronDown className="h-4 w-4" />
                )
            ) : (
                <div className="flex flex-col -space-y-2">
                    <ChevronUp className="h-3 w-3 opacity-50" />
                    <ChevronDown className="h-3 w-3 opacity-50" />
                </div>
            )}
        </Button>
    </div>
);

interface ProductDesktopProps {
    products: ProductCreateModel[];
    fields: FieldConfig<ProductCreateModel>[];
    page: number;
    totalPage: number;
    handlePageChange: (newPage: number) => void;
    sortField: string | null;
    sortDirection: SortDirection;
    handleSort: (field: string) => void;
    isLoading?: boolean;
}

const renderFieldValue = (field: FieldConfig<ProductCreateModel>, product: ProductCreateModel) => {
    if (field.render) {
        return field.render(product[field.key], product);
    }
    return String(product[field.key]);
};

const ProductDesktop: React.FC<ProductDesktopProps> = ({
    products,
    fields,
    page,
    totalPage,
    handlePageChange,
    sortField,
    sortDirection,
    handleSort,
    isLoading = false,
}) => {
    return (
        <div className="hidden md:block" role="region" aria-label="Product list desktop view">
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
                        {products.map((product, index) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium text-xs">
                                    {index + 1}
                                </TableCell>
                                {fields.map((field) => (
                                    <TableCell
                                        key={field.key as string}
                                        className={`text-xs ${field.className || ''}`}
                                        align={field.align}
                                    >
                                        {renderFieldValue(field, product)}
                                    </TableCell>
                                ))}
                                <TableCell className="text-right">
                                    <Button
                                        asChild
                                        variant="ghost"
                                        size="sm"
                                        aria-label={`View product ${product.id} details`}
                                    >
                                        <Link href={`/product-management/products/${product.id}`}>
                                            <Eye className="h-4 w-4" />
                                        </Link>
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
    );
};

export default ProductDesktop;