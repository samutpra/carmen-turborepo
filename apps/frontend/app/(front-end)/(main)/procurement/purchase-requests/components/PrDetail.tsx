'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { formType } from '@/constants/enums';
// Define the schema for the purchase request data
const purchaseRequestSchema = z.object({
	id: z.string().optional(),
	type: z.string().min(1, { message: 'Type is required' }),
	description: z.string().min(1, { message: 'Description is required' }),
	requestor: z.string().min(1, { message: 'Requestor is required' }),
	department: z.string().min(1, { message: 'Department is required' }),
	date: z.string().optional(),
	status: z.string().optional(),
	amount: z.coerce
		.number()
		.min(0, { message: 'Amount must be a positive number' }),
	currentStage: z.string().optional(),
});

export type PurchaseRequestData = z.infer<typeof purchaseRequestSchema>;

interface PrDetailProps {
	id?: string;
	prData?: PurchaseRequestData | null;
	'data-id'?: string;
	formType: formType;
}

const PrDetail: React.FC<PrDetailProps> = ({
	id,
	prData,
	'data-id': dataId,
	formType: formTypeValue,
}) => {
	const isReadOnly = formTypeValue === formType.VIEW;
	const isCreate = formTypeValue === formType.ADD;

	const form = useForm<PurchaseRequestData>({
		resolver: zodResolver(purchaseRequestSchema),
		defaultValues: prData
			? {
					...prData,
					date: prData.date ? format(new Date(prData.date), 'yyyy-MM-dd') : '',
				}
			: {
					id: '',
					type: '',
					description: '',
					requestor: '',
					department: '',
					date: '',
					status: isCreate ? 'Draft' : '',
					amount: 0,
					currentStage: isCreate ? 'Initial' : '',
				},
	});

	useEffect(() => {
		if (prData) {
			form.reset({
				...prData,
				date: prData.date ? format(new Date(prData.date), 'yyyy-MM-dd') : '',
			});
		}
	}, [prData, form]);

	const handleSubmit = async (data: PurchaseRequestData) => {
		try {
			const endpoint = isCreate
				? '/api/procurement/purchase-requests'
				: `/api/procurement/purchase-requests/${id}`;

			const method = isCreate ? 'POST' : 'PUT';

			const response = await fetch(endpoint, {
				method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error(
					`Failed to ${isCreate ? 'create' : 'update'} purchase request`
				);
			}

			// Handle successful submission
			// Could redirect or show success message
		} catch (error) {
			console.error('Error submitting form:', error);
			// Handle error - could show error message to user
		}
	};

	return (
		<div className="container mx-auto py-6" data-id={dataId}>
			<Card>
				<CardHeader>
					<CardTitle>
						{isCreate
							? 'Create New Purchase Request'
							: 'Purchase Request Details'}
					</CardTitle>
					<CardDescription>
						{isCreate
							? 'Fill in the details to create a new purchase request'
							: `View details for purchase request ${id}`}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSubmit)}
							className="space-y-6"
						>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{!isCreate && (
									<FormField
										control={form.control}
										name="id"
										render={({ field }) => (
											<FormItem>
												<FormLabel>PR ID</FormLabel>
												<FormControl>
													<Input {...field} readOnly aria-readonly="true" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}

								<FormField
									control={form.control}
									name="type"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Type</FormLabel>
											<FormControl>
												<Input
													{...field}
													readOnly={isReadOnly}
													aria-readonly={isReadOnly ? 'true' : 'false'}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="requestor"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Requestor</FormLabel>
											<FormControl>
												<Input
													{...field}
													readOnly={isReadOnly}
													aria-readonly={isReadOnly ? 'true' : 'false'}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="department"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Department</FormLabel>
											<FormControl>
												<Input
													{...field}
													readOnly={isReadOnly}
													aria-readonly={isReadOnly ? 'true' : 'false'}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{!isCreate && (
									<FormField
										control={form.control}
										name="date"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Date</FormLabel>
												<FormControl>
													<Input {...field} readOnly aria-readonly="true" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}

								{!isCreate && (
									<FormField
										control={form.control}
										name="status"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Status</FormLabel>
												<FormControl>
													<Input {...field} readOnly aria-readonly="true" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}

								<FormField
									control={form.control}
									name="amount"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Amount</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="number"
													step="0.01"
													readOnly={isReadOnly}
													aria-readonly={isReadOnly ? 'true' : 'false'}
													value={
														isReadOnly
															? `$${field.value.toFixed(2)}`
															: field.value
													}
													onChange={isReadOnly ? undefined : field.onChange}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{!isCreate && (
									<FormField
										control={form.control}
										name="currentStage"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Current Stage</FormLabel>
												<FormControl>
													<Input {...field} readOnly aria-readonly="true" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}

								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem className="col-span-1 md:col-span-2">
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea
													{...field}
													readOnly={isReadOnly}
													aria-readonly={isReadOnly ? 'true' : 'false'}
													className="min-h-[100px]"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{!isReadOnly && (
								<div className="flex justify-end space-x-2">
									<Button type="submit">
										{isCreate
											? 'Create Purchase Request'
											: 'Update Purchase Request'}
									</Button>
								</div>
							)}
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default PrDetail;
