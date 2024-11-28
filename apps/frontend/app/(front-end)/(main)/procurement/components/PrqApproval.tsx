import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui-custom/CustomTabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Eye, ThumbsUp, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/lib/i18n'

const PrqApproval = () => {
    return (
        <Card className="lg:col-span-2 shadow-sm">
            <CardHeader className='border-b'>
                <CardTitle>Procurement Request Queue</CardTitle>
                <CardDescription>Staff requests awaiting your approval</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="pending-approval" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="pending-approval">Pending Approval</TabsTrigger>
                        <TabsTrigger value="flagged">Flagged for Review</TabsTrigger>
                    </TabsList>
                    <TabsContent value="pending-approval" className="p-4">
                        <ScrollArea className="h-[500px] pr-4">
                            <ul className="space-y-4">
                                {[
                                    { id: 1, item: "Bed Linens", quantity: 200, urgency: "Medium", total: 5000, requester: "Alice Johnson", department: "Housekeeping" },
                                    { id: 2, item: "Coffee Makers", quantity: 50, urgency: "Low", total: 2500, requester: "Bob Smith", department: "F&B" },
                                    { id: 3, item: "Desk Chairs", quantity: 30, urgency: "Medium", total: 4500, requester: "Carol Davis", department: "Admin" },
                                ].map((request) => (
                                    <li key={request.id} className="bg-white p-4 rounded-md border">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-medium text-lg text-gray-800">{request.item}</h3>
                                            <Badge variant="outline" className={`
                                                ${request.urgency === 'High' ? 'border-red-500 text-red-700' :
                                                    request.urgency === 'Medium' ? 'border-yellow-500 text-yellow-700' :
                                                        'border-green-500 text-green-700'}
                                            `}>
                                                {request.urgency}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">
                                            {request.quantity} units, ${request.total.toLocaleString()} - Requested by {request.requester}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                                                <Users className="w-3 h-3 mr-1" />
                                                {request.department}
                                            </Badge>
                                            <div className="space-x-2">
                                                <Button size="sm" variant="outline" asChild>
                                                    <Link href={`/procurement/purchase-request/${request.id}`}>
                                                        <Eye className="w-4 h-4 mr-2" />
                                                        Details
                                                    </Link>
                                                </Button>
                                                <Button size="sm">
                                                    <ThumbsUp className="w-4 h-4 mr-2" />
                                                    Approve
                                                </Button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </ScrollArea>
                    </TabsContent>
                    <TabsContent value="flagged" className="p-4">
                        <ScrollArea className="h-[500px] pr-4">
                            <ul className="space-y-4">
                                {[
                                    { id: 4, item: "Smart TVs", quantity: 100, urgency: "High", total: 50000, requester: "David Brown", department: "IT", flag: "High value request" },
                                    { id: 5, item: "Luxury Toiletries", quantity: 1000, urgency: "Medium", total: 15000, requester: "Eva Prince", department: "Housekeeping", flag: "Exceeds usual quantity" },
                                ].map((request) => (
                                    <li key={request.id} className="bg-white p-4 rounded-md border">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-medium text-lg text-gray-800">{request.item}</h3>
                                            <Badge variant="outline" className="border-red-500 text-red-700">
                                                {request.urgency}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">
                                            {request.quantity} units, ${request.total.toLocaleString()} - Requested by {request.requester}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <Badge variant="secondary" className="bg-gray-100 text-gray-800 mr-2">
                                                    <Users className="w-3 h-3 mr-1" />
                                                    {request.department}
                                                </Badge>
                                                <Badge variant="destructive" className="bg-red-100 text-red-800 border border-red-200">
                                                    {request.flag}
                                                </Badge>
                                            </div>
                                            <div className="space-x-2">
                                                <Button size="sm" variant="outline">
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    Details
                                                </Button>
                                                <Button size="sm" variant="secondary">
                                                    <AlertCircle className="w-4 h-4 mr-2" />
                                                    Review
                                                </Button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}

export default PrqApproval