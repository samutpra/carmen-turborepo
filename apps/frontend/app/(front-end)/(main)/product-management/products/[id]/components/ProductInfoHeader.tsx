import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ProductModel } from '@/dtos/product.dto';
import { Pencil, Save, Trash } from 'lucide-react';
import React from 'react';

interface Props {
	product?: ProductModel;
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
										value={product?.data.name || ''}
										onChange={(e) => handleChange('data.name', e.target.value)}
									/>
								) : (
									<div className="text-xl font-bold">{product?.data.name}</div>
								)}
								<Badge>{product?.data.product_status_type}</Badge>
							</div>
							<p className="text-muted-foreground text-xs">
								{product?.data.code}
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

					{/* Details Section */}
					<div className="border-t grid grid-cols-3 gap-4 py-4 text-xs">
						<div>
							<p className="text-muted-foreground">Description</p>
							{isEditing ? (
								<Textarea
									className="min-h-[60px] text-xs"
									value={product?.data.description || ''}
									onChange={(e) =>
										handleChange('data.description', e.target.value)
									}
								/>
							) : (
								<p>{product?.data.description}</p>
							)}
						</div>
						<div>
							<p className="text-muted-foreground">Category</p>
							{isEditing ? (
								<Input
									className="text-xs"
									value={product?.category_name || ''}
									onChange={(e) =>
										handleChange('category_name', e.target.value)
									}
								/>
							) : (
								<p>{product?.category_name}</p>
							)}
						</div>
						<div>
							<p className="text-muted-foreground">Subcategory</p>
							{isEditing ? (
								<Input
									className="text-xs"
									value={product?.sub_category_name || ''}
									onChange={(e) =>
										handleChange('sub_category_name', e.target.value)
									}
								/>
							) : (
								<p>{product?.sub_category_name}</p>
							)}
						</div>
						<div>
							<p className="text-muted-foreground">Item Group</p>
							{isEditing ? (
								<Input
									className="text-xs"
									value={product?.item_group_name || ''}
									onChange={(e) =>
										handleChange('item_group_name', e.target.value)
									}
								/>
							) : (
								<p>{product?.item_group_name}</p>
							)}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProductInfoHeader;
