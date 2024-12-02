import { z } from 'zod';

export const formSchema = z.object({
	id: z.string().uuid('Invalid ID format'),
	ref: z.string().min(1, 'Reference is required'),
	date: z.date().optional(),
	type: z.string().optional(),
	description: z.string().optional(),
	requestorId: z.string().uuid('Invalid Requestor ID format'),
	requestor: z.object({
		id: z.string().uuid('Invalid Requestor ID format'),
		name: z.string().min(1, 'Requestor name is required'),
		department: z.string().optional(),
	}),
	department: z.string().optional(),
	items: z.array(z.object({})).nonempty('At least one item is required'),
	selectedItems: z.array(z.string()).optional(),
	budget: z.array(z.object({})).optional(),
	workflow: z.array(z.object({})).optional(),
	comments: z.array(z.object({})).optional(),
	attachments: z.array(z.object({})).optional(),
	activityLog: z.array(z.object({})).optional(),
	baseSubTotalPrice: z
		.number()
		.min(0, 'Base subtotal price must be a positive number'),
	subTotalPrice: z.number().min(0, 'Subtotal price must be a positive number'),
	baseNetAmount: z.number().min(0, 'Base net amount must be a positive number'),
	netAmount: z.number().min(0, 'Net amount must be a positive number'),
	baseDiscAmount: z
		.number()
		.min(0, 'Base discount amount must be a positive number'),
	discountAmount: z
		.number()
		.min(0, 'Discount amount must be a positive number'),
	baseTaxAmount: z.number().min(0, 'Base tax amount must be a positive number'),
	taxAmount: z.number().min(0, 'Tax amount must be a positive number'),
	baseTotalAmount: z
		.number()
		.min(0, 'Base total amount must be a positive number'),
	totalAmount: z.number().min(0, 'Total amount must be a positive number'),
});

export type FormValues = z.infer<typeof formSchema>;
