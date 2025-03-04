import React from 'react'
import { cookies } from 'next/headers'

// Artificial delay function to simulate loading
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Server action to fetch status data
async function fetchAdminStatus() {
    'use server'

    const cookieStore = cookies()
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/admin/status`, {
        headers: {
            Cookie: cookieStore.toString(),
        },
        cache: 'no-store'
    })

    if (!response.ok) {
        throw new Error('Failed to fetch admin status')
    }

    return response.json()
}

export default async function AdminDashboardPage() {
    // Simulate a delay of 3 seconds to demonstrate loading
    await delay(3000);

    // Fetch status data
    const statusData = await fetchAdminStatus()

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">
                    Platform overview and key metrics
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border p-4 shadow-sm">
                    <h3 className="text-lg font-medium">System Status</h3>
                    <div className="mt-2">
                        <pre className="rounded bg-muted p-2 text-sm">
                            {JSON.stringify(statusData, null, 2)}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
}