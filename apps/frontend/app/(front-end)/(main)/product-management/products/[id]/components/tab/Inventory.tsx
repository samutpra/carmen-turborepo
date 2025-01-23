import React from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Package } from 'lucide-react';
import { inventoryData } from '../../../data';
import { Badge } from '@/components/ui/badge';

const Inventory = () => {
	return (
		<div className="space-y-6">
			{/* Total Stock Summary */}
			<Card>
				<CardContent className="p-4">
					<div className="flex items-center space-x-2 mb-4 border-b pb-4">
						<Package className="w-5 h-5 text-muted-foreground" />
						<h2 className="text-xs font-medium">Total Stock Position</h2>
					</div>
					<div className="grid grid-cols-2 gap-6">
						<div>
							<label className="text-xs text-muted-foreground block text-right">
								On Hand
							</label>
							<div className="mt-1 text-xl font-semibold tabular-nums text-right">
								{inventoryData.totalStock.onHand.toLocaleString()}
							</div>
						</div>
						<div>
							<label className="text-xs text-muted-foreground block text-right">
								On Order
							</label>
							<div className="mt-1 text-xl font-semibold tabular-nums text-right">
								{inventoryData.totalStock.onOrder.toLocaleString()}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Location Details */}
			<Card>
				<CardHeader>
					<CardTitle>Stock by Location</CardTitle>
				</CardHeader>
				<CardContent className="pt-0">
					<Table>
						<TableHeader>
							<TableRow className="text-xs">
								<TableHead>Location</TableHead>
								<TableHead className="text-right">On Hand</TableHead>
								<TableHead className="text-right">On Order</TableHead>
								<TableHead className="text-right">Minimum</TableHead>
								<TableHead className="text-right">Maximum</TableHead>
								<TableHead className="text-right">Reorder</TableHead>
								<TableHead className="text-right">PAR</TableHead>
								<TableHead className="text-center">Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{inventoryData.locations.map((location) => {
								const isLow = location.onHand < location.minimum;
								const isHigh = location.onHand > location.maximum;
								const needsReorder = location.onHand < location.reorderPoint;

								return (
									<TableRow key={location.code} className="text-xs">
										<TableCell>
											<div>
												<div className="font-medium">{location.name}</div>
												<div className="text-xs text-muted-foreground">
													{location.code}
												</div>
											</div>
										</TableCell>
										<TableCell className="text-right tabular-nums">
											{location.onHand.toLocaleString()}
										</TableCell>
										<TableCell className="text-right tabular-nums">
											{location.onOrder.toLocaleString()}
										</TableCell>
										<TableCell className="text-right tabular-nums">
											{location.minimum.toLocaleString()}
										</TableCell>
										<TableCell className="text-right tabular-nums">
											{location.maximum.toLocaleString()}
										</TableCell>
										<TableCell className="text-right tabular-nums">
											{location.reorderPoint.toLocaleString()}
										</TableCell>
										<TableCell className="text-right tabular-nums">
											{location.parLevel.toLocaleString()}
										</TableCell>
										<TableCell className="text-center">
											<Badge>
												{isLow
													? 'below-min'
													: needsReorder
														? 'reorder'
														: isHigh
															? 'over-max'
															: 'normal'}
											</Badge>
										</TableCell>
									</TableRow>
								);
							})}
							{/* Totals Row */}
							<TableRow className="font-medium bg-muted/50 text-xs">
								<TableCell>Total All Locations</TableCell>
								<TableCell className="text-right tabular-nums">
									{inventoryData.totalStock.onHand.toLocaleString()}
								</TableCell>
								<TableCell className="text-right tabular-nums">
									{inventoryData.totalStock.onOrder.toLocaleString()}
								</TableCell>
								<TableCell className="text-right tabular-nums">
									{inventoryData.aggregateSettings.minimum.toLocaleString()}
								</TableCell>
								<TableCell className="text-right tabular-nums">
									{inventoryData.aggregateSettings.maximum.toLocaleString()}
								</TableCell>
								<TableCell className="text-right tabular-nums">
									{inventoryData.aggregateSettings.reorderPoint.toLocaleString()}
								</TableCell>
								<TableCell className="text-right tabular-nums">
									{inventoryData.aggregateSettings.parLevel.toLocaleString()}
								</TableCell>
								<TableCell />
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			<Card>
				<CardContent className="p-4">
					<div className="flex items-start space-x-2">
						<AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
						<div>
							<h4 className="font-medium">Status Indicators</h4>
							<div className="mt-2 grid grid-cols-2 gap-4">
								<div className="flex items-center text-xs">
									<div className="w-2 h-2 bg-destructive rounded-full mr-2" />
									<span className="text-muted-foreground">
										Below Minimum Level
									</span>
								</div>
								<div className="flex items-center text-xs">
									<div className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
									<span className="text-muted-foreground">
										Reorder Point Reached
									</span>
								</div>
								<div className="flex items-center text-xs">
									<div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
									<span className="text-muted-foreground">
										Exceeds Maximum Level
									</span>
								</div>
								<div className="flex items-center text-xs">
									<div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
									<span className="text-muted-foreground">
										Normal Stock Level
									</span>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Inventory;
