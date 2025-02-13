import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AttributesDTO } from '@/dtos/product.dto';

interface Props {
	info: AttributesDTO;
	isEditing: boolean;
	handleChange: (field: string, value: string) => void;
}

const ProductAttributes: React.FC<Props> = ({
	info,
	isEditing,
	handleChange,
}) => {
	const handleAttributeChange = (
		index: number,
		field: 'label' | 'value',
		value: string
	) => {
		handleChange(
			`data.tb_product_info.info.attribute[${index}].${field}`,
			value
		);
	};
	return (
		<Card className="py-2">
			<CardHeader className="py-2">
				<CardTitle>Product Attributes</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-2 py-2">
				{(info?.info?.attribute.length ?? 0 > 0) ? (
					<div className="grid grid-cols-2">
						{info?.info?.attribute.map((item, index) => (
							<div key={index}>
								{isEditing ? (
									<Input
										className="text-xs font-medium text-muted-foreground"
										value={item.label || ''}
										onChange={(e) =>
											handleAttributeChange(index, 'label', e.target.value)
										}
									/>
								) : (
									<label className="text-xs font-medium text-muted-foreground">
										{item.label}
									</label>
								)}
								{isEditing ? (
									<Input
										className="text-xs"
										value={item.value || ''}
										onChange={(e) =>
											handleAttributeChange(index, 'value', e.target.value)
										}
									/>
								) : (
									<p className="text-xs">{item.value}</p>
								)}
							</div>
						))}
					</div>
				) : (
					<p className="text-xs text-muted-foreground">Empty</p>
				)}
			</CardContent>
		</Card>
	);
};

export default ProductAttributes;
