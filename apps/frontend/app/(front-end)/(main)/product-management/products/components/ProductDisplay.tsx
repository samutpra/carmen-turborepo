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
			<div className="block md:hidden">
				<div className="grid grid-cols-1 gap-4">
					{products.map((product) => (
						<Card key={product.id} className="hover:shadow-md transition-all">
							<CardContent className="p-4">
								<div className="space-y-3">
									{fields.map((field) => (
										<div className="grid grid-cols-10 gap-4" key={field.key}>
											<span className="text-sm text-muted-foreground col-span-3">
												{field.label}
											</span>
											<span className="text-sm font-medium col-span-7">
												{String(product[field.key as keyof ProductCreateModel])}
											</span>
										</div>
									))}
								</div>
							</CardContent>
							<CardFooter className="flex justify-end gap-2 pt-0 pb-2 px-2">
								<Button asChild variant="ghost" size="sm">
									<Link href={`/vendor-management/vendors/${product.id}`}>
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
								<TableHead key={field.key} className="text-xs">
									{field.label}
								</TableHead>
							))}
							<TableHead className="text-right">{m.action_text()}</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{products.map((product, index) => (
							<TableRow key={product.id}>
								<TableCell className="font-medium text-xs">
									{index + 1}
								</TableCell>
								{fields.map((field) => (
									<TableCell key={field.key} className="text-xs">
										{String(product[field.key as keyof ProductCreateModel])}
									</TableCell>
								))}
								<TableCell className="text-right">
									<Button asChild variant="ghost" size="sm">
										<Link href={`/product-management/products/${product.id}`}>
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
	);
};

export default ProductDisplay;
