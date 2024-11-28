"use client";

import React, { useState } from 'react'
import { CountDetailData, itemsToCount } from '../types_data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Calendar, Check, Package, User, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface Props {
    onClose: () => void;
    onSubmit: (data: CountDetailData) => void;
}
const CountDetailForm: React.FC<Props> = ({ onClose, onSubmit }) => {

    const [formData, setFormData] = useState<CountDetailData>({
        items: itemsToCount.map(item => ({
            ...item,
            actualQuantity: 0,
            unit: 'pcs',
            isSubmitted: false,
            sku: item.sku || '',
            description: item.description || ''
        })),
        notes: '',
    });

    const handleQuantityChange = (id: string, value: number) => {
        setFormData(prevData => ({
            ...prevData,
            items: prevData.items.map(item =>
                item.id === id ? { ...item, actualQuantity: value } : item
            ),
        }));
    };

    const handleSubmitItem = (id: string) => {
        setFormData(prevData => ({
            ...prevData,
            items: prevData.items.map(item =>
                item.id === id ? { ...item, isSubmitted: true } : item
            ),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleNotesChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            notes: value
        }));
    };

    return (
        <Card className="w-full max-w-4xl mx-4 flex flex-col h-[calc(100vh-8rem)]">
            <CardHeader className="space-y-4 border-b">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-2xl font-bold">Count Details</CardTitle>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* Header Information */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium">Store Location:</span>
                            <span className="text-sm">Main Kitchen Store</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium">Counter:</span>
                            <span className="text-sm">John Doe</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium">Count Date:</span>
                            <span className="text-sm">2024-03-25</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium">Reference:</span>
                            <span className="text-sm">PC-2024-001</span>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                <CardContent className="space-y-6 overflow-y-auto flex-1 p-4">
                    <div className="rounded-md border">
                        <table className="w-full">
                            <thead className="bg-muted/50 sticky top-0">
                                <tr className="border-b">
                                    <th className="h-10 px-4 text-left align-middle font-medium">Item Details</th>
                                    <th className="h-10 px-4 text-right align-middle font-medium w-32">Expected</th>
                                    <th className="h-10 px-4 text-right align-middle font-medium w-32">Actual</th>
                                    <th className="h-10 px-4 text-center align-middle font-medium w-24">Unit</th>
                                    <th className="h-10 px-4 text-center align-middle font-medium w-24">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData.items.map(item => (
                                    <tr key={item.id} className="border-b">
                                        <td className="p-4">
                                            <div>
                                                <div className="font-medium">
                                                    {item.name}
                                                    <span className="ml-2 text-sm text-muted-foreground">
                                                        [{item.sku}]
                                                    </span>
                                                </div>
                                                {item.description && (
                                                    <div className="text-sm text-muted-foreground mt-1">
                                                        {item.description}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-right">{item.expectedQuantity}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-end">
                                                <Input
                                                    type="number"
                                                    value={item.actualQuantity}
                                                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                                                    className="w-24 text-right"
                                                    disabled={item.isSubmitted}
                                                />
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            {item.unit}
                                        </td>
                                        <td className="p-4 text-center">
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant={item.isSubmitted ? "ghost" : "outline"}
                                                onClick={() => handleSubmitItem(item.id)}
                                                disabled={item.isSubmitted}
                                            >
                                                <Check className={`h-4 w-4 ${item.isSubmitted ? "text-green-500" : ""}`} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Notes Section */}
                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <textarea
                            id="notes"
                            value={formData.notes}
                            onChange={(e) => handleNotesChange(e.target.value)}
                            className="w-full min-h-[100px] p-2 border rounded-md"
                            placeholder="Enter any additional notes here..."
                        />
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between border-t p-4">
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="submit">Complete Count</Button>
                </CardFooter>
            </form>
        </Card>
    )
}

export default CountDetailForm