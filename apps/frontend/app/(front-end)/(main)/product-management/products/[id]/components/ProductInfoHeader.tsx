import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ProductData } from '@/dtos/product.dto';
import { Pencil, Save, Trash } from 'lucide-react';
import React from 'react';

interface Props {
	product?: ProductData;
	isEditing: boolean;
	handleChange: (path: string, value: string) => void;
	handleSave: () => void;
	handleCancel: () => void;
	handleEdit: () => void;
}

const ProductInfoHeader: React.FC<Props> = ({
	product,
	isEditing,
	handleChange,
	handleSave,
	handleCancel,
	handleEdit,
}) => {

	return (
		<Card>
			<CardContent className="py-4">
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-2">
								{isEditing ? (
									<Input
										className="text-xl font-bold w-64"
										value={product?.name || ''}
										onChange={(e) => handleChange('data.name', e.target.value)}
									/>
								) : (
									<div className="text-xl font-bold">{product?.name}</div>
								)}
								<Badge>{product?.product_status_type}</Badge>
							</div>
							<p className="text-muted-foreground text-xs">
								{product?.code}
							</p>
						</div>
						<div className="flex items-center gap-2">
							{isEditing ? (
								<>
									<Button onClick={handleSave} size="sm" variant="ghost">
										<Save className="h-4 w-4" />
									</Button>
									<Button onClick={handleCancel} variant="outline" size="sm">
										Cancel
									</Button>
								</>
							) : (
								<>
									<Button onClick={handleEdit} size="sm" variant="ghost">
										<Pencil className="h-4 w-4" />
									</Button>
									<Button size="sm" variant="ghost">
										<Trash className="h-4 w-4" />
									</Button>
								</>
							)}
						</div>
					</div>
					<div className="border-t grid grid-cols-3 gap-4 py-4 text-xs">
						<div>
							<p className="text-muted-foreground">Description</p>
							{isEditing ? (
								<Textarea
									className="min-h-[60px] text-xs"
									value={product?.description || ''}
									onChange={(e) =>
										handleChange('data.description', e.target.value)
									}
								/>
							) : (
								<p>{product?.description}</p>
							)}
						</div>
						<div>
							<p className="text-muted-foreground">Category</p>
							{isEditing ? (
								<Input
									className="text-xs"
									onChange={(e) =>
										handleChange('category_name', e.target.value)
									}
								/>
							) : (
								<p>{product?.product_category.name}</p>
							)}
						</div>
						<div>
							<p className="text-muted-foreground">Subcategory</p>
							{isEditing ? (
								<Input
									className="text-xs"
									onChange={(e) =>
										handleChange('sub_category_name', e.target.value)
									}
								/>
							) : (
								<p>{product?.product_subcategory.name}</p>
							)}
						</div>
						<div>
							<p className="text-muted-foreground">Item Group</p>
							{isEditing ? (
								<Input
									className="text-xs"
									value={product?.product_item_group.id}
									onChange={(e) =>
										handleChange('item_group_name', e.target.value)
									}
								/>
							) : (
								<p>{product?.product_item_group.name}</p>
							)}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProductInfoHeader;
