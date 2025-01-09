import React from 'react'
import { ProductMainList } from './ProductList'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link } from '@/lib/i18n'
import { Eye, Pen } from 'lucide-react'

interface Props {
    products: ProductMainList[]
}

const ProductCard: React.FC<Props> = ({ products }) => {
    return (
        <div className="grid grid-cols-1 gap-4">
            {products?.map((product) => (
                <Card key={product.id} className="hover:shadow-md transition-all cursor-pointer">
                    <CardContent className="p-4">
                        <div className="space-y-3">
                            <div className="grid grid-cols-10 gap-4">
                                <span className="text-sm text-muted-foreground col-span-3">
                                    Name
                                </span>
                                <span className="text-sm font-medium col-span-7">
                                    {product.name}
                                </span>
                            </div>

                            <div className="grid grid-cols-10 gap-4">
                                <span className="text-sm text-muted-foreground col-span-3">
                                    Category
                                </span>
                                <span className="text-sm font-medium col-span-7">
                                    {product.categoryId}
                                </span>
                            </div>

                            <div className="grid grid-cols-10 gap-4">
                                <span className="text-sm text-muted-foreground col-span-3">
                                    Sub Category
                                </span>
                                <span className="text-sm font-medium col-span-7">
                                    {product.subCategoryId}
                                </span>
                            </div>
                            <div className="grid grid-cols-10 gap-4">
                                <span className="text-sm text-muted-foreground col-span-3">
                                    Item group
                                </span>
                                <span className="text-sm font-medium col-span-7">
                                    {product.itemGroup}
                                </span>
                            </div>
                            <div className="grid grid-cols-10 gap-4">
                                <span className="text-sm text-muted-foreground col-span-3">
                                    Status
                                </span>
                                <span className="text-sm font-medium col-span-7">
                                    <Badge>
                                        {product.isActive ? 'Active' : 'InActive'}
                                    </Badge>
                                </span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end pt-0 pb-2 px-2">
                        <Button asChild variant="ghost">
                            <Link href={`/product-management/products/${product.id}`}>
                                <Eye />
                            </Link>
                        </Button>
                        <Button asChild variant="ghost">
                            <Link href={`/product-management/products/${product.id}`}>
                                <Pen />
                            </Link>
                        </Button>

                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default ProductCard