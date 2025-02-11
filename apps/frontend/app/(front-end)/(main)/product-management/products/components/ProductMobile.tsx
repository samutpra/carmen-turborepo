import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { Link } from '@/lib/i18n';
import { ProductCreateModel } from '@/dtos/product.dto';
import { FieldConfig } from '@/lib/util/uiConfig';
import { CardsContainerSkeleton } from '@/components/ui-custom/Loading/CardsContainerSkeleton';
import { SortDirection } from './ProductDisplay';

interface ProductMobileProps {
    products: ProductCreateModel[];
    fields: FieldConfig<ProductCreateModel>[];
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

const ProductMobile: React.FC<ProductMobileProps> = ({
    products,
    fields,
    sortField,
    sortDirection,
    handleSort,
    isLoading = false,
}) => {
    return (
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
                    {products.map((product) => (
                        <Card
                            key={product.id}
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
                                            {renderFieldValue(field, product)}
                                        </span>
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2 pt-0 pb-2 px-2">
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
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductMobile;