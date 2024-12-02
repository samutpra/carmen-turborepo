import { z } from 'zod';

export const VendorSchema = z.object({
	id: z.string(),
	company_name: z.string().min(1, 'Company name is required'),
	business_registration_number: z.string().min(1, 'Business registration number is required'),
	tax_id: z.string().min(1, 'Tax ID is required'),
	establishment_date: z.date().optional(),
	business_type: z.object({
		id: z.string().min(1, 'Business type ID is required'),
		name: z.string().min(1, 'Business type name is required'),
	}),
	is_active: z.boolean().optional(),
	addresses: z
		.array(
			z.object({
				id: z.string().optional(),
				address_type: z.string().min(1, 'Address type is required'),
				address_line: z.string().min(1, 'Address is required'),
				sub_district_id: z.string().optional(),
				district_id: z.string().optional(),
				province_id: z.string().optional(),
				postal_code: z.string().optional(),
				is_primary: z.boolean(),
			})
		)
		.nonempty('At least one address is required'),
	contacts: z
		.array(
			z.object({
				id: z.string().optional(),
				name: z.string().min(1, 'Contact name is required'),
				position: z.string().optional(),
				phone: z.string().min(1, 'Contact phone is required'),
				email: z.string().email('Invalid email format').optional(),
				department: z.string().optional(),
				is_primary: z.boolean(),
			})
		)
		.nonempty('At least one contact is required'),
	rating: z.number().min(0, 'Rating must be at least 0').max(5, 'Rating must not exceed 5').optional(),
	business_type_name: z.string().optional(),
	primary_address: z.string().optional(),
	primary_contact: z.string().optional(),
});

export type VendorType = z.infer<typeof VendorSchema>;

