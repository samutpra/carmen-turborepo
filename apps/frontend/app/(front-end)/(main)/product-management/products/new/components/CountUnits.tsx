import React from 'react';
import * as Form from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';
import { Control, useFieldArray } from 'react-hook-form';
import { ProductFormType } from '@/dtos/product.dto';

interface CountUnitsProps {
	control: Control<ProductFormType>;
}

const CountUnits = ({ control }: CountUnitsProps) => {
	const { fields, append, remove } = useFieldArray({
		name: 'countUnits.add',
		control: control,
	});

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Count Units</CardTitle>
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={() =>
						append({
							unit_id: '',
							unit_quantity: 1,
							description: '',
							to_unit_id: '',
							to_unit_quantity: 1,
						})
					}
				>
					<Plus className="h-4 w-4 mr-2" />
					Add Count Unit
				</Button>
			</CardHeader>
			<CardContent className="space-y-4">
				{fields.map((field, index) => (
					<div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<Form.FormField
							control={control}
							name={`countUnits.add.${index}.unit_id`}
							render={({ field }) => (
								<Form.FormItem>
									<Form.FormLabel>Unit ID</Form.FormLabel>
									<Form.FormControl>
										<Input {...field} />
									</Form.FormControl>
								</Form.FormItem>
							)}
						/>
						<Form.FormField
							control={control}
							name={`countUnits.add.${index}.unit_quantity`}
							render={({ field }) => (
								<Form.FormItem>
									<Form.FormLabel>Unit Quantity</Form.FormLabel>
									<Form.FormControl>
										<Input type="number" {...field} />
									</Form.FormControl>
								</Form.FormItem>
							)}
						/>
						<Form.FormField
							control={control}
							name={`countUnits.add.${index}.description`}
							render={({ field }) => (
								<Form.FormItem>
									<Form.FormLabel>Description</Form.FormLabel>
									<Form.FormControl>
										<Input {...field} />
									</Form.FormControl>
								</Form.FormItem>
							)}
						/>
						<Form.FormField
							control={control}
							name={`countUnits.add.${index}.to_unit_id`}
							render={({ field }) => (
								<Form.FormItem>
									<Form.FormLabel>To Unit ID</Form.FormLabel>
									<Form.FormControl>
										<Input {...field} />
									</Form.FormControl>
								</Form.FormItem>
							)}
						/>
						<Form.FormField
							control={control}
							name={`countUnits.add.${index}.to_unit_quantity`}
							render={({ field }) => (
								<Form.FormItem>
									<Form.FormLabel>To Unit Quantity</Form.FormLabel>
									<Form.FormControl>
										<Input type="number" {...field} />
									</Form.FormControl>
								</Form.FormItem>
							)}
						/>
						<Button
							type="button"
							variant="destructive"
							size="icon"
							className="mt-8"
							onClick={() => remove(index)}
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
				))}
			</CardContent>
		</Card>
	);
};

export default CountUnits;
