'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Form from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { productFormSchema, ProductFormType } from '@/dtos/product.dto';
import BasicInformation from './BasicInformation';
import Attributes from './Attributes';
import Locations from './Locations';
import OrderUnits from './OrderUnits';
import CountUnits from './CountUnits';
import { Save } from 'lucide-react';

export default function ProductForm() {
	const form = useForm<ProductFormType>({
		resolver: zodResolver(productFormSchema),
		defaultValues: {
			code: '',
			name: '',
			local_name: '',
			description: '',
			primary_unit_id: '',
			product_item_group_id: '',
			price: 0,
			tax_type: 'vat',
			tax_rate: 7,
			is_ingredients: false,
			price_deviation_limit: 20,
			product_status_type: 'active',
			info: [{ attribute: [] }],
			locations: { add: [] },
			orderUnits: { add: [] },
			recipeUnits: { add: [] },
			countUnits: { add: [] },
		},
	});

	const onSubmit = (data: ProductFormType) => {
		console.log('Form submitted with data:', data);
	};

	return (
		<Form.Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 container mx-auto p-6"
			>
				<div className="flex items-center justify-between">
					<h1 className="font-semibold">Products Infomation</h1>
					<Button type="submit" size={'sm'} variant={'ghost'}>
						<Save /> Save
					</Button>
				</div>

				<BasicInformation control={form.control} />
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Attributes control={form.control} />
					<Locations control={form.control} />
					<OrderUnits control={form.control} />
					<CountUnits control={form.control} />
				</div>
			</form>
		</Form.Form>
	);
}
