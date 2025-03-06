import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input'
import React from 'react'

const BusinessReport = () => {
    return (
        <div className='space-y-4'>
            <div className='flex items-center justify-between'>
                <h2 className='text-xl font-bold tracking-tight'>Business Unit Reports</h2>
                <div className='flex items-center gap-2'>
                    <Input placeholder='Search' className='h-8 w-64' />
                </div>
            </div>
            <Card>

            </Card>
        </div>
    )
}

export default BusinessReport;