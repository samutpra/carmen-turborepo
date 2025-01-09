import React from 'react'
import { ProductMainList } from './ProductList'
import EmptyState from '@/components/ui-custom/EmptyState';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n';
import { Eye, Pencil } from 'lucide-react';

interface Props {
    products: ProductMainList[]
}

const ProductTable: React.FC<Props> = ({ products }) => {
    if (products.length === 0) {
        return (
            <EmptyState title='No product' description='No product description' />
        );
    }
    return (
        <Table>
            <TableHeader>
                <TableRow className="bg-gray-50/75">
                    <TableHead className="w-12 py-3">
                        <Checkbox className="ml-3" />
                    </TableHead>
                    <TableHead className="py-3 font-medium text-gray-600">Name</TableHead>
                    <TableHead className="py-3 font-medium text-gray-600">Category</TableHead>
                    <TableHead className="py-3 font-medium text-gray-600">Subcategory</TableHead>
                    <TableHead className="py-3 font-medium text-gray-600">Item Group</TableHead>
                    <TableHead className="py-3 font-medium text-gray-600">Status</TableHead>
                    <TableHead className="py-3 text-right font-medium text-gray-600">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product) => (
                    <TableRow
                        key={product.id}
                        className="group hover:bg-gray-50/50 cursor-pointer border-b last:border-b-0"
                    >
                        <TableCell className="py-4 pl-4">
                            <Checkbox />
                        </TableCell>
                        <TableCell className="py-4">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{product.name}</span>
                                    <Badge variant="secondary" className="rounded-full px-2 py-0.5 text-xs">
                                        {product.productCode}
                                    </Badge>
                                </div>
                                <span className="text-sm text-gray-500 mt-0.5">
                                    {product.description || 'No description available'}
                                </span>
                            </div>
                        </TableCell>
                        <TableCell className="py-4 text-gray-600">{product.categoryId}</TableCell>
                        <TableCell className="py-4 text-gray-600">{product.subCategoryId}</TableCell>
                        <TableCell className="py-4 text-gray-600">{product.itemGroup}</TableCell>
                        <TableCell className="py-4">
                            <Badge>
                                {product.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                        </TableCell>
                        <TableCell className="py-4">
                            <div className="flex justify-end gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                                    asChild
                                >
                                    <Link href={`/product-management/products/${product.id}`}>
                                        <span className="sr-only">View</span>
                                        <Eye className="h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                                    asChild
                                >
                                    <Link href={`/product-management/products/${product.id}/edit`}>
                                        <span className="sr-only">Edit</span>
                                        <Pencil className="h-4 w-4" />
                                    </Link>
                                </Button>

                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default ProductTable