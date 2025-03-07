import { z } from "zod";

export const settingsFormSchema = z.object({
    general: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        phone: z.string().min(1, "Phone is required"),
        address: z.object({
            house_number: z.string().min(1, "House number is required"),
            road: z.string().min(1, "Road is required"),
            sub_district: z.string().min(1, "Sub-district is required"),
            district: z.string().min(1, "District is required"),
            province: z.string().min(1, "Province is required"),
            postal_code: z.string().min(1, "Postal code is required"),
        })
    }),
    localization: z.object({
        language: z.string().min(1, "Language is required"),
        timezone: z.string().min(1, "Timezone is required"),
    }),
    maintenance: z.object({
        enabled: z.boolean(),
        message: z.string().min(1, "Message is required"),
    })
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;


export const clusterMemberFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    platform: z.string().describe("Platform is required"),
    role: z.string().describe("Role is required"),
    business_unit: z.array(
        z.object({
            id: z.string().optional(),
            name: z.string().min(2, "Business unit name must be at least 2 characters"),
            role: z.string().min(2, "Role must be at least 2 characters"),
            department: z.string().min(2, "Department must be at least 2 characters"),
        })
    ).min(1, "At least one business unit is required"),
});

export type ClusterMemberFormValues = z.infer<typeof clusterMemberFormSchema>;
