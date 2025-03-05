import { API_URL } from "@/lib/api-url"

export const fetchUserPlatform = async () => {
    'use server';

    const url = `${API_URL}/api/user/platform`;
    const options = {
        method: 'GET',
        cache: 'no-store' as RequestCache
    };
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error('Failed to fetch user platform');
    }
    return response.json();
}


