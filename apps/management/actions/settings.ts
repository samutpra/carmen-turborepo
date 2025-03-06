'use server';

import { SettingsFormValues } from "@/types/form/form";

export const updateSettings = async (data: SettingsFormValues) => {
    console.log(JSON.stringify(data, null, 2));
    return { success: true };
} 