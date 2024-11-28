import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const PrqApproval = () => {
    return (
        <Card className="lg:col-span-2 shadow-sm">
            <CardHeader className='border-b'>
                <CardTitle>Procurement Request Queue</CardTitle>
                <CardDescription>Staff requests awaiting your approval</CardDescription>
            </CardHeader>
            <CardContent>

            </CardContent>
        </Card>
    )
}

export default PrqApproval