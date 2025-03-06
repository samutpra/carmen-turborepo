import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
const Assignments = () => {
    return (
        <div className='space-y-4'>
            <div className='flex items-center justify-between'>
                <h2 className='text-xl font-bold tracking-tight'>Assignments Reports</h2>
                <div className='flex items-center gap-2'>
                    <Input placeholder='Search' className='h-8 w-64' />
                    <Button size={'sm'}>
                        <Plus className='h-4 w-4' />
                        Add Assignment
                    </Button>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Assignment 1
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Assignment 1</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default Assignments