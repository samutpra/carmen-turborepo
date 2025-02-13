import { PriceDTO } from '@/dtos/product.dto';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Props {
	data: PriceDTO;
	isEditing: boolean;
	handleChange: (field: string, value: string) => void;
}

const PricingField: React.FC<{
	label: string;
	value: string;
	field: string;
	isEditing: boolean;
	onChange: (field: string, value: string) => void;
}> = ({ label, value, field, isEditing, onChange }) => (
	<div>
		<label className="text-xs font-medium text-muted-foreground">{label}</label>
		{isEditing ? (
			<Input
				className="text-xs"
				value={value}
				onChange={(e) =>
					onChange(`data.tb_product_info.${field}`, e.target.value)
				}
				aria-label={label}
			/>
		) : (
			<p className="text-xs">{value}</p>
		)}
	</div>
);

const PricingInformation: React.FC<Props> = ({
	data,
	isEditing,
	handleChange,
}) => {
	return (
		<Card className="py-2">
			<CardHeader className="py-2">
				<CardTitle>Product Attributes</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-2 py-2">
				<div className="grid grid-cols-2 gap-4">
					<PricingField
						label="Tax Type"
						value={data.tax_type}
						field="tax_type"
						isEditing={isEditing}
						onChange={handleChange}
					/>
					<PricingField
						label="Price Deviation Limit"
						value={data.price_deviation_limit}
						field="price_deviation_limit"
						isEditing={isEditing}
						onChange={handleChange}
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<PricingField
						label="Tax Rate"
						value={data.tax_rate}
						field="tax_rate"
						isEditing={isEditing}
						onChange={handleChange}
					/>
					<div>
						<label className="text-xs font-medium text-muted-foreground">
							Last Cost (mock)
						</label>
						<p className="text-xs">29.75 THB</p>
					</div>
				</div>

			</CardContent>
		</Card>
	);
};

export default PricingInformation;
