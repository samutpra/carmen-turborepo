import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductInfoDto } from '@/dtos/product.dto';
interface Props {
	info: ProductInfoDto;
}

const BasicInfo: React.FC<Props> = ({ info }) => {
	console.log('info', info);

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<div className="space-y-4">
				<Card className="py-2">
					<CardHeader className="py-2">
						<CardTitle>Product Attributes</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-2 py-2">
						{info?.info?.length ?? 0 > 0 ? (
							<div className="grid grid-cols-2 gap-4">
								{info?.info?.map((item, index) => (
									<div key={index}>
										<label className="text-xs font-medium text-muted-foreground">
											{item.label}
										</label>
										<p className="text-xs">{item.value}</p>
									</div>
								))}
							</div>
						) : (
							<p className="text-xs text-muted-foreground">Empty</p>
						)}
					</CardContent>


				</Card>

				<Card className="py-2">
					<CardHeader className="py-2">
						<CardTitle>Pricing Information</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-2 py-2">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="text-xs font-medium text-muted-foreground">
									Base Price
								</label>
								<p className="text-xs">{info.price}</p>
							</div>
							<div>
								<label className="text-xs font-medium text-muted-foreground">
									Standard Cost
								</label>
								<p className="text-xs">28.4 THB</p>
							</div>

						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="text-xs font-medium text-muted-foreground">
									Tax Type
								</label>
								<p className="text-xs">{info.tax_type}</p>
							</div>
							<div>
								<label className="text-xs font-medium text-muted-foreground">
									Price Deviation Limit
								</label>
								<p className="text-xs">{info.price_deviation_limit}</p>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="text-xs font-medium text-muted-foreground">
									Tax Rate
								</label>
								<p className="text-xs">{info.tax_rate}</p>
							</div>
							<div>
								<label className="text-xs font-medium text-muted-foreground">
									Last Cost
								</label>
								<p className="text-xs">29.75 THB</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default BasicInfo;
