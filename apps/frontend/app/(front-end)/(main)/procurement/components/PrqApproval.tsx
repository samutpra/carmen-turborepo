import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FLAGGED_REQUESTS, PENDING_REQUESTS } from './types_data'
import RequestList from './RequestList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const PrqApproval = () => {
    return (
        <Card className="lg:col-span-2 shadow-sm">
            <CardHeader className='border-b'>
                <CardTitle>Procurement Request Queue</CardTitle>
                <CardDescription>Staff requests awaiting your approval</CardDescription>
            </CardHeader>
            <CardContent className='p-0'>
                <Tabs defaultValue="pending-approval" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="pending-approval">Pending Approval</TabsTrigger>
                        <TabsTrigger value="flagged">Flagged for Review</TabsTrigger>
                    </TabsList>
                    <TabsContent value="pending-approval" className="p-4">
                        <ScrollArea className="h-[500px] pr-4">
                            <RequestList requests={PENDING_REQUESTS} variant="pending" />
                        </ScrollArea>
                    </TabsContent>
                    <TabsContent value="flagged" className="p-4">
                        <ScrollArea className="h-[500px] pr-4">
                            <RequestList requests={FLAGGED_REQUESTS} variant="flagged" />
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}

export default PrqApproval