import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ClipboardMinus, TicketCheck, View } from 'lucide-react'
import OverviewTab from './tabs/OverviewTab'
import TicketTab from './tabs/TicketTab'
import ReportTab from './tabs/ReportTab'

const SupportList = () => {
    return (
        <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
                <TabsTrigger value="overview" className="flex items-center gap-2">
                    <View className="h-4 w-4" />
                    Overview
                </TabsTrigger>
                <TabsTrigger value="tickets" className="flex items-center gap-2">
                    <TicketCheck className="h-4 w-4" />
                    Tickets
                </TabsTrigger>
                <TabsTrigger value="reports" className="flex items-center gap-2">
                    <ClipboardMinus className="h-4 w-4" />
                    Reports
                </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
                <OverviewTab />
            </TabsContent>

            <TabsContent value="tickets">
                <TicketTab />
            </TabsContent>

            <TabsContent value="reports">
                <ReportTab />
            </TabsContent>
        </Tabs>
    )
}

export default SupportList