import { z } from 'zod';

export const VendorSchema = z.object({
    id: z.string(),
    companyName: z.string().min(1, "Company name is required"),
    businessRegistrationNumber: z.string().min(1, "Business registration number is required"),
    taxId: z.string().min(1, "Tax ID is required"),
    establishmentDate: z.date().optional(),
    businessType: z.object({
        id: z.string().min(1, "Business type ID is required"),
        name: z.string().min(1, "Business type name is required")
    }),
    isActive: z.boolean().optional(),
    addresses: z.array(
        z.object({
            id: z.string().optional(),
            addressType: z.string().min(1, "Address type is required"),
            addressLine: z.string().min(1, "Address is required"),
            subDistrictId: z.string().optional(),
            districtId: z.string().optional(),
            provinceId: z.string().optional(),
            postalCode: z.string().optional(),
            isPrimary: z.boolean()
        })
    ).nonempty("At least one address is required"),
    contacts: z.array(
        z.object({
            id: z.string().optional(),
            name: z.string().min(1, "Contact name is required"),
            position: z.string().optional(),
            phone: z.string().min(1, "Contact phone is required"),
            email: z.string().email("Invalid email format").optional(),
            department: z.string().optional(),
            isPrimary: z.boolean()
        })
    ).nonempty("At least one contact is required"),
    rating: z.number().min(0, "Rating must be at least 0").max(5, "Rating must not exceed 5").optional(),
    businessTypeName: z.string().optional(),
    primaryAddress: z.string().optional(),
    primaryContact: z.string().optional(),
});

export type VendorType = z.infer<typeof VendorSchema>;

