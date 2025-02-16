import React from 'react';
import * as Form from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';
import { Control, useFieldArray } from 'react-hook-form';
import { ProductFormType } from '@/dtos/product.dto';

interface LocationsProps {
	control: Control<ProductFormType>;
}

const Locations = ({ control }: LocationsProps) => {
	const { fields, append, remove } = useFieldArray({
		name: 'locations.add',
		control: control,
	});

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Locations</CardTitle>
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={() => append({ location_id: '' })}
				>
					<Plus className="h-4 w-4 mr-2" />
					Add Location
				</Button>
			</CardHeader>
			<CardContent className="space-y-4">
				{fields.map((field, index) => (
					<div key={field.id} className="flex gap-4 items-start">
						<Form.FormField
							control={control}
							name={`locations.add.${index}.location_id`}
							render={({ field }) => (
								<Form.FormItem className="flex-1">
									<Form.FormLabel>Location ID</Form.FormLabel>
									<Form.FormControl>
										<Input {...field} />
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

export default Locations;
