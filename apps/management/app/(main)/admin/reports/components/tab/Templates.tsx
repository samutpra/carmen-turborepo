import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

const Templates = () => {
    return (
        <div className='space-y-4'>
            <div className='flex items-center justify-between'>
                <h2 className='text-xl font-bold tracking-tight'>Report Templates</h2>
                <div className='flex items-center gap-2'>
                    <Input placeholder='Search' className='h-8 w-64' />
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Available Templates</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>                                <TableHead>Status</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Schedule</TableHead>
                                <TableHead>Data Points</TableHead>
                                <TableHead>Assigned To</TableHead>
                                <TableHead>Last Updated</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>Template 1</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default Templates