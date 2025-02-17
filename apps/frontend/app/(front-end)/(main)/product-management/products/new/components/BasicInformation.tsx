import React from 'react';
import * as Form from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Control } from 'react-hook-form';
import { ProductFormType } from '@/dtos/product.dto';
import { PRODUCT_STATUS_FILTER } from '@/lib/util/status';
import {
	status_active,
	status_discontinued,
	status_inactive,
} from '@/paraglide/messages';

interface BasicInformationProps {
	control: Control<ProductFormType>;
	token: string;
	tenantId: string;
}

const statusOptions = [
	{ label: `${status_active()}`, value: PRODUCT_STATUS_FILTER.ACTIVE },
	{ label: `${status_inactive()}`, value: PRODUCT_STATUS_FILTER.IN_ACTIVE },
	{
		label: `${status_discontinued()}`,
		value: PRODUCT_STATUS_FILTER.DISCONTINUED,
	},
];

const BasicInformation = ({ control }: BasicInformationProps) => {
	return (
		<Card>
			<CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{/* <Form.FormField
					control={control}
					name="code"
					render={({ field }) => (
						<Form.FormItem>
							<Form.FormLabel>Product Code</Form.FormLabel>
							<Form.FormControl>
								<Input
									{...field}
									value={String(field.value || '')}
									placeholder="Enter product code"
								/>
							</Form.FormControl>
							<Form.FormMessage />
						</Form.FormItem>
					)}
				/> */}

				<Form.FormField
					control={control}
					name="name"
					render={({ field }) => (
						<Form.FormItem>
							<Form.FormLabel>Product Name</Form.FormLabel>
							<Form.FormControl>
								<Input
									{...field}
									value={String(field.value || '')}
									placeholder="Enter product name"
								/>
							</Form.FormControl>
							<Form.FormMessage />
						</Form.FormItem>
					)}
				/>

				<Form.FormField
					control={control}
					name="local_name"
					render={({ field }) => (
						<Form.FormItem>
							<Form.FormLabel>Local Name</Form.FormLabel>
							<Form.FormControl>
								<Input
									{...field}
									value={String(field.value || '')}
									placeholder="Enter local name"
								/>
							</Form.FormControl>
							<Form.FormMessage />
						</Form.FormItem>
					)}
				/>

				<Form.FormField
					control={control}
					name="primary_unit_id"
					render={({ field }) => (
						<Form.FormItem>
							<Form.FormLabel>Inventory Unit</Form.FormLabel>
							<Form.FormControl>
								<Input
									{...field}
									value={String(field.value || '')}
									placeholder="Enter primary unit ID"
								/>
							</Form.FormControl>
							<Form.FormMessage />
						</Form.FormItem>
					)}
				/>

				<Form.FormField
					control={control}
					name="product_item_group_id"
					render={({ field }) => (
						<Form.FormItem>
							<Form.FormLabel>Product Group ID มีอีก 3 select</Form.FormLabel>
							<Form.FormControl>
								<Input
									{...field}
									value={String(field.value || '')}
									placeholder="Enter product group ID"
								/>
							</Form.FormControl>
							<Form.FormMessage />
						</Form.FormItem>
					)}
				/>

				<Form.FormField
					control={control}
					name="price"
					render={({ field }) => (
						<Form.FormItem>
							<Form.FormLabel>Price</Form.FormLabel>
							<Form.FormControl>
								<Input
									{...field}
									type="number"
									value={String(field.value || '')}
									placeholder="Enter price"
								/>
							</Form.FormControl>
							<Form.FormMessage />
						</Form.FormItem>
					)}
				/>

				<Form.FormField
					control={control}
					name="tax_type"
					render={({ field }) => (
						<Form.FormItem>
							<Form.FormLabel>Tax Type</Form.FormLabel>
							<Form.FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value || '')}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select tax type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="vat">VAT</SelectItem>
										<SelectItem value="non_vat">Non-VAT</SelectItem>
									</SelectContent>
								</Select>
							</Form.FormControl>
							<Form.FormMessage />
						</Form.FormItem>
					)}
				/>

				<Form.FormField
					control={control}
					name="tax_rate"
					render={({ field }) => (
						<Form.FormItem>
							<Form.FormLabel>Tax Rate</Form.FormLabel>
							<Form.FormControl>
								<Input
									{...field}
									type="number"
									value={String(field.value || '')}
									placeholder="Enter tax rate"
								/>
							</Form.FormControl>
							<Form.FormMessage />
						</Form.FormItem>
					)}
				/>



				<Form.FormField
					control={control}
					name="price_deviation_limit"
					render={({ field }) => (
						<Form.FormItem>
							<Form.FormLabel>Price Deviation Limit</Form.FormLabel>
							<Form.FormControl>
								<Input
									{...field}
									type="number"
									value={String(field.value || '')}
									placeholder="Enter price deviation limit"
								/>
							</Form.FormControl>
							<Form.FormMessage />
						</Form.FormItem>
					)}
				/>

				<Form.FormField
					control={control}
					name="product_status_type"
					render={({ field }) => (
						<Form.FormItem>
							<Form.FormLabel>Status</Form.FormLabel>
							<Form.FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={String(field.value || '')}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select status" />
									</SelectTrigger>
									<SelectContent>
										{statusOptions.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</Form.FormControl>
							<Form.FormMessage />
						</Form.FormItem>
					)}
				/>

				<Form.FormField
					control={control}
					name="description"
					render={({ field }) => (
						<Form.FormItem>
							<Form.FormLabel>Description</Form.FormLabel>
							<Form.FormControl>
								<Textarea
									{...field}
									value={String(field.value || '')}
									placeholder="Enter description"
								/>
							</Form.FormControl>
							<Form.FormMessage />
						</Form.FormItem>
					)}
				/>
				<Form.FormField
					control={control}
					name="is_ingredients"
					render={({ field }) => (
						<Form.FormItem className='flex flex-col mt-4'>
							<Form.FormLabel>Is Ingredient</Form.FormLabel>
							<Form.FormControl>
								<Switch
									checked={Boolean(field.value)}
									onCheckedChange={field.onChange}
								/>
							</Form.FormControl>
							<Form.FormMessage />
						</Form.FormItem>
					)}
				/>
			</CardContent>
		</Card>
	);
};

export default BasicInformation;
