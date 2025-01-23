import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BasicInfo = () => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<div className="space-y-4">
				<Card className="py-2">
					<CardHeader className="py-2">
						<CardTitle>Product Attributes</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-2 py-2">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="text-xs font-medium text-muted-foreground">
									Size
								</label>
								<p className="text-xs">XXL</p>
							</div>
							<div>
								<label className="text-xs font-medium text-muted-foreground">
									Color
								</label>
								<p className="text-xs">White</p>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="text-xs font-medium text-muted-foreground">
									Weight
								</label>
								<p className="text-xs">55 KG</p>
							</div>
							<div>
								<label className="text-xs font-medium text-muted-foreground">
									Shelf Life
								</label>
								<p className="text-xs">356 days</p>
							</div>
						</div>
						<div>
							<label className="text-xs font-medium text-muted-foreground">
								Dimensions (L × W × H)
							</label>
							<p className="text-xs">10 × 15 × 20 cm</p>
						</div>
						<div>
							<label className="text-xs font-medium text-muted-foreground">
								Storage Instructions
							</label>
							<p className="text-xs">
								Store in a cool, dry place away from direct sunlight
							</p>
						</div>
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
								<p className="text-xs">35.5 THB</p>
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
								<p className="text-xs">VAT</p>
							</div>
							<div>
								<label className="text-xs font-medium text-muted-foreground">
									Tax Rate
								</label>
								<p className="text-xs">7%</p>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="text-xs font-medium text-muted-foreground">
									Price Deviation Limit
								</label>
								<p className="text-xs">10%</p>
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
