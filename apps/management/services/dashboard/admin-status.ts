import { API_URL } from "@/lib/api-url"

export const fetchAdminStatus = async () => {
    'use server'

    const url = `${API_URL}/api/admin/status`

    const options = {
        method: 'GET',
        cache: 'no-store' as RequestCache
    }
    const response = await fetch(url, options)

    console.log('response', response)
    if (!response.ok) {
        throw new Error('Failed to fetch admin status')
    }

    return response.json()
}