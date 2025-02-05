'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PrType } from '@/lib/types';
import { FieldConfig } from '@/lib/util/uiConfig';
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
import { sortFields } from '../../components/PurchaseRequestList';

interface Props {
    id: string
}

const PrDetail = ({ id }: Props) => {
    const [prDetail, setPrDetail] = useState<PrType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm<PrType>({
        defaultValues: prDetail || {},
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

                const data = await response.json();
                setPrDetail(data);
                form.reset(data);
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
    }, [id]);

    const handleSubmit = async (data: PrType) => {
        try {
            const response = await fetch(`/api/procurement/purchase-requests/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to update PR');
            }

            const updatedData = await response.json();
            setPrDetail(updatedData);
            setIsEditing(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while updating PR');
        }
    };

    const renderFormField = (field: FieldConfig<PrType>) => {
        return (
            <FormField
                key={String(field.key)}
                control={form.control}
                name={field.key as keyof PrType}
                render={({ field: formField }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>{field.label}</FormLabel>
                        <FormControl>
                            {field.type === 'date' ? (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !formField.value && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {formField.value ? format(new Date(formField.value), 'PPP') : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={formField.value ? new Date(formField.value) : undefined}
                                            onSelect={formField.onChange}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            ) : field.type === 'amount' ? (
                                <Input
                                    {...formField}
                                    type="number"
                                    step="0.01"
                                    className="font-mono"
                                    disabled={!isEditing}
                                    value={formField.value instanceof Date ? formField.value.toISOString() : formField.value}
                                />
                            ) : (
                                <Input
                                    {...formField}
                                    disabled={!isEditing}
                                    value={formField.value instanceof Date ? formField.value.toISOString() : formField.value}
                                />
                            )}
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        );
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

    if (!prDetail) {
        return (
            <Alert>
                <AlertDescription>No purchase request found</AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="p-6">
            <Card>
                <CardHeader className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">Purchase Request Details</h1>
                        <div className="flex items-center space-x-2">
                            {!isEditing ? (
                                <Button size="sm" onClick={() => setIsEditing(true)}>
                                    <PencilIcon className="w-4 h-4 mr-2" />
                                    Edit
                                </Button>
                            ) : (
                                <>
                                    <Button size="sm" onClick={form.handleSubmit(handleSubmit)}>
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Save
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={() => {
                                        setIsEditing(false);
                                        form.reset(prDetail);
                                    }}>
                                        <X className="w-4 h-4 mr-2" />
                                        Cancel
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form className="space-y-4">
                            {sortFields.map(renderFormField)}
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default PrDetail;