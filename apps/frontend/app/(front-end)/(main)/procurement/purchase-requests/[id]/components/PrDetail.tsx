'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CalendarIcon, CheckCircle, PencilIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { PrType } from '@/lib/types';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PrItem from './tabs/PrItem';
import PrBudget from './tabs/PrBudget';
import PrWorkFlow from './tabs/PrWorkFlow';
import PrAttachment from './tabs/PrAttachment';
import PrActivity from './tabs/PrActivity';
import TransactionSummary from './TransactionSummary';

export const INITIAL_PR_VALUES: PrType = {
    id: '',
    type: '',
    description: '',
    requestor: '',
    department: '',
    amount: 0,
    date: new Date(),
    currentStage: '',
    status: 'Draft'
};

interface Props {
    id: string
}

const PrDetail = ({ id }: Props) => {
    const [prDetail, setPrDetail] = useState<PrType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm<PrType>({
        defaultValues: INITIAL_PR_VALUES,
    });

    useEffect(() => {
        const fetchPrDetail = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(`/api/procurement/purchase-requests/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch PR detail: ${response.statusText}`);
                }

                const responseData = await response.json();

                const transformedData: PrType = {
                    id: responseData.id || responseData.data?.id || '',
                    type: responseData.type || responseData.data?.type || '',
                    description: responseData.description || responseData.data?.description || '',
                    requestor: responseData.requestor || responseData.data?.requestor || '',
                    department: responseData.department || responseData.data?.department || '',
                    amount: responseData.amount || responseData.data?.amount || 0,
                    date: responseData.date ? new Date(responseData.date) : responseData.data?.date ? new Date(responseData.data.date) : new Date(),
                    currentStage: responseData.currentStage || responseData.data?.currentStage || '',
                    status: responseData.status || responseData.data?.status || 'Draft'
                };

                setPrDetail(transformedData);
                form.reset(transformedData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred while fetching PR detail');
                console.error('Error fetching PR detail:', err);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchPrDetail();
        }
    }, [id, form]);

    const handleSubmit = async (data: PrType) => {
        try {
            setIsLoading(true);
            // API call here
            console.log('Submitting data:', data);
            // After successful save
            setPrDetail(data);
            setIsEditing(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while saving');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-8 w-[200px]" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="p-6 space-y-4">
            <div className="flex flex-col">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">Purchase Request Details</h1>
                    <div className="flex items-center space-x-2">
                        {!isEditing ? (
                            <Button size="sm" variant={'outline'} onClick={() => setIsEditing(true)}>
                                <PencilIcon />
                            </Button>
                        ) : (
                            <>
                                <Button size="sm" onClick={form.handleSubmit(handleSubmit)}>
                                    <CheckCircle />
                                    Save
                                </Button>
                                <Button size="sm" variant={'outline'} onClick={() => {
                                    setIsEditing(false);
                                    if (prDetail) {
                                        form.reset(prDetail);
                                    }
                                }}>
                                    <X />
                                    Cancel
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <Card className='p-4'>
                <Form {...form}>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                            <FormField
                                control={form.control}
                                name="id"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="mb-2">PR ID</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled
                                                className="w-full"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Type */}
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="mb-2">Type</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={!isEditing}
                                                className="w-full text-xs"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Requestor */}
                            <FormField
                                control={form.control}
                                name="requestor"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="mb-2">Requestor</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={!isEditing}
                                                className="w-full text-xs"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Department */}
                            <FormField
                                control={form.control}
                                name="department"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="mb-2">Department</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={!isEditing}
                                                className="w-full text-xs"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Amount */}
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="mb-2">Amount</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                step="0.01"
                                                className="font-mono w-full text-xs"
                                                disabled={!isEditing}
                                                value={field.value ? parseFloat(String(field.value)) : ''}
                                                onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : '')}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Date */}
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="mb-2">Date</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            'w-full justify-start text-left font-normal h-7 text-xs',
                                                            !field.value && 'text-muted-foreground'
                                                        )}
                                                    >
                                                        <CalendarIcon />
                                                        {field.value
                                                            ? format(new Date(field.value), 'PPP')
                                                            : 'Pick a date'}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value ? new Date(field.value) : undefined}
                                                        onSelect={(date) => field.onChange(date ? date.toISOString() : '')}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Current Stage */}
                            <FormField
                                control={form.control}
                                name="currentStage"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="mb-2">Current Stage</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={!isEditing}
                                                className="w-full text-xs"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Status */}
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="mb-2">Status</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={!isEditing}
                                                className="w-full text-xs"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="mb-2">Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                disabled={!isEditing}
                                                className="w-full text-xs"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>
            </Card>

            <Card className='p-4'>
                <Tabs defaultValue="items" className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                        {["items", "budgets", "workflow", "attachments", "activity"].map(
                            (tab) => (
                                <TabsTrigger key={tab} value={tab} className='text-xs'>
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </TabsTrigger>
                            )
                        )}
                    </TabsList>
                    <TabsContent value="items">
                        <PrItem />
                    </TabsContent>
                    <TabsContent value="budgets">
                        <PrBudget />
                    </TabsContent>
                    <TabsContent value="workflow">
                        <PrWorkFlow />
                    </TabsContent>
                    <TabsContent value="attachments">
                        <PrAttachment />
                    </TabsContent>
                    <TabsContent value="activity">
                        <PrActivity />
                    </TabsContent>
                </Tabs>
            </Card>

            <Card className='p-4 space-y-2'>
                <CardTitle>Transaction Summary</CardTitle>
                <TransactionSummary />
            </Card>

        </div>
    )
}

export default PrDetail;