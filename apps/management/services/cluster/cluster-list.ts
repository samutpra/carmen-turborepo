import { API_URL } from "@/lib/api-url"

export const fetchClusters = async () => {
    'use server'
    const url = `${API_URL}/api/cluster`

    const options = {
        method: 'GET',
        cache: 'no-store' as RequestCache
    }
    const response = await fetch(url, options)
    if (!response.ok) {
        throw new Error('Failed to fetch clusters')
    }
    return response.json();
};
