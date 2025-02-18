import React from 'react';
import * as Form from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';
import { Control, useFieldArray } from 'react-hook-form';
import { ProductFormType } from '@/dtos/product.dto';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

interface OrderUnitsProps {
	control: Control<ProductFormType>;
}

const OrderUnits = ({ control }: OrderUnitsProps) => {
	const { fields, append, remove } = useFieldArray({
		name: 'orderUnits.add',
		control: control,
	});

	const handleAddUnit = () => {
		append({
			unit_id: '',
			unit_quantity: 1,
			to_unit_id: '',
			to_quantity: 0,
			to_unit_quantity: 0,
			description: '',
		});
	};

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Order Units</CardTitle>
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={handleAddUnit}
				>
					<Plus />
					Add Order Unit
				</Button>
			</CardHeader>
			<CardContent className="pt-0">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Unit ID</TableHead>
							<TableHead>Unit Quantity</TableHead>
							<TableHead>To Unit ID</TableHead>
							<TableHead>To Quantity</TableHead>
							<TableHead>To Unit Quantity</TableHead>
							<TableHead>Description</TableHead>
							<TableHead className="w-[50px]"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{fields.map((field, index) => (
							<TableRow key={field.id}>
								<TableCell>
									<Form.FormField
										control={control}
										name={`orderUnits.add.${index}.unit_id`}
										render={({ field }) => (
											<Form.FormItem>
												<Form.FormControl>
													<Input {...field} className="w-full" />
												</Form.FormControl>
											</Form.FormItem>
										)}
									/>
								</TableCell>
								<TableCell>
									<Form.FormField
										control={control}
										name={`orderUnits.add.${index}.unit_quantity`}
										render={({ field }) => (
											<Form.FormItem>
												<Form.FormControl>
													<Input type="number" {...field} className="w-full" />
												</Form.FormControl>
											</Form.FormItem>
										)}
									/>
								</TableCell>
								<TableCell>
									<Form.FormField
										control={control}
										name={`orderUnits.add.${index}.to_unit_id`}
										render={({ field }) => (
											<Form.FormItem>
												<Form.FormControl>
													<Input {...field} className="w-full" />
												</Form.FormControl>
											</Form.FormItem>
										)}
									/>
								</TableCell>
								<TableCell>
									<Form.FormField
										control={control}
										name={`orderUnits.add.${index}.to_quantity`}
										render={({ field }) => (
											<Form.FormItem>
												<Form.FormControl>
													<Input type="number" {...field} className="w-full" />
												</Form.FormControl>
											</Form.FormItem>
										)}
									/>
								</TableCell>
								<TableCell>
									<Form.FormField
										control={control}
										name={`orderUnits.add.${index}.to_unit_quantity`}
										render={({ field }) => (
											<Form.FormItem>
												<Form.FormControl>
													<Input type="number" {...field} className="w-full" />
												</Form.FormControl>
											</Form.FormItem>
										)}
									/>
								</TableCell>
								<TableCell>
									<Form.FormField
										control={control}
										name={`orderUnits.add.${index}.description`}
										render={({ field }) => (
											<Form.FormItem>
												<Form.FormControl>
													<Input {...field} className="w-full" />
												</Form.FormControl>
											</Form.FormItem>
										)}
									/>
								</TableCell>
								<TableCell>
									<Button
										type="button"
										variant="destructive"
										size="icon"
										onClick={() => remove(index)}
										aria-label="Remove order unit"
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export default OrderUnits;
