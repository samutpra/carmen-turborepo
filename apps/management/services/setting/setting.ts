'use server';

import { API_URL } from "@/lib/api-url";

export const getSettings = async () => {
    const url = `${API_URL}/api/setting`;
    const options = {
        method: 'GET',
        cache: 'no-store' as RequestCache
    };
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error('Failed to fetch settings');
    }
    return response.json();
}
