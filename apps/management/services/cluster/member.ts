import { API_URL } from "@/lib/api-url"

export const fetchMembers = async () => {
    const url = `${API_URL}/api/member`
    const options = {
        method: 'GET',
        cache: 'no-store' as RequestCache
    }
    const response = await fetch(url, options)
    if (!response.ok) {
        throw new Error('Failed to fetch members')
    }
    return response.json()
}


