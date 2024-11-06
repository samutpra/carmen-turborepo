import { z } from "zod";

export const formSchema = z.object({
    ref: z.string().min(1, "Reference is required"),
});

export type FormValues = z.infer<typeof formSchema>;
