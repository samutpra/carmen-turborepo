import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Eye } from 'lucide-react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import * as m from '@/paraglide/messages.js';
import { FieldConfig } from '@/lib/util/uiConfig';
import PaginationComponent from '@/components/PaginationComponent';
import { Link } from '@/lib/i18n';
import { ProductCreateModel } from '@/dtos/product.dto';

interface Props {
	products: ProductCreateModel[];
	fields?: FieldConfig<ProductCreateModel>[];
	page: number;
	totalPage: number;
	handlePageChange: (newPage: number) => void;
}

const ProductDisplay: React.FC<Props> = ({
	products,
	fields = [],
	page,
	totalPage,
	handlePageChange,
}) => {
	return (
		<>
			{/* Mobile View */}
			<div
				className="block md:hidden"
				data-id="product-display-mobile-view-container"
			>
				<div className="grid grid-cols-1 gap-4">
					{products.map((product) => (
						<Card
							key={product.id}
							className="hover:shadow-md transition-all"
							data-id="product-display-mobile-view-card"
						>
							<CardContent
								className="p-4"
								data-id="product-display-mobile-view-card-content"
							>
								<div
									className="space-y-3"
									data-id="product-display-mobile-view-card-content-container"
								>
									{fields.map((field) => (
										<div
											className="grid grid-cols-10 gap-4"
											key={field.key}
											data-id="product-display-mobile-view-card-content-item"
										>
											<span
												className="text-sm text-muted-foreground col-span-3"
												data-id="product-display-mobile-view-card-content-item-label"
											>
												{field.label}
											</span>
											<span
												className="text-sm font-medium col-span-7"
												data-id="product-display-mobile-view-card-content-item-value"
											>
												{String(product[field.key as keyof ProductCreateModel])}
											</span>
										</div>
									))}
								</div>
							</CardContent>
							<CardFooter
								className="flex justify-end gap-2 pt-0 pb-2 px-2"
								data-id="product-display-mobile-view-card-footer"
							>
								<Button
									asChild
									variant="ghost"
									size="sm"
									data-id="product-display-mobile-view-card-footer-button"
								>
									<Link
										href={`/product-management/products/${product.id}`}
										data-id="product-display-mobile-view-card-footer-link"
									>
										<Eye className="h-4 w-4" />
									</Link>
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>

			{/* Desktop View */}
			<div
				className="hidden md:block"
				data-id="product-display-desktop-view-container"
			>
				<Table data-id="product-display-desktop-view-table">
					<TableHeader data-id="product-display-desktop-view-table-header">
						<TableRow data-id="product-display-desktop-view-table-header-row">
							<TableHead
								className="w-[50px]"
								data-id="product-display-desktop-view-table-header-index-column"
							>
								#
							</TableHead>
							{fields.map((field) => (
								<TableHead
									key={field.key}
									className="text-xs"
									data-id="product-display-desktop-view-table-header-column"
								>
									{field.label}
								</TableHead>
							))}
							<TableHead
								className="text-right"
								data-id="product-display-desktop-view-table-header-action-column"
							>
								{m.action_text()}
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody data-id="product-display-desktop-view-table-body">
						{products.map((product, index) => (
							<TableRow key={product.id}>
								<TableCell
									className="font-medium text-xs"
									data-id="product-display-desktop-view-table-body-index-column"
								>
									{index + 1}
								</TableCell>
								{fields.map((field) => (
									<TableCell
										key={field.key}
										className="text-xs"
										data-id="product-display-desktop-view-table-body-column"
									>
										{String(product[field.key as keyof ProductCreateModel])}
									</TableCell>
								))}
								<TableCell
									className="text-right"
									data-id="product-display-desktop-view-table-body-action-column"
								>
									<Button
										asChild
										variant="ghost"
										size="sm"
										data-id="product-display-desktop-view-table-body-action-button"
									>
										<Link
											href={`/product-management/products/${product.id}`}
											data-id="product-display-desktop-view-table-body-action-link"
										>
											<Eye
												className="h-4 w-4"
												data-id="product-display-desktop-view-table-body-action-icon"
											/>
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
	);
};

export default ProductDisplay;
