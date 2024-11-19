import React, { useState } from 'react'
import { Item, stockReplenishmentData } from './mockData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Filter, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const StockTable = () => {
    const [items, setItems] = useState<Item[]>(stockReplenishmentData)

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col gap-4">
                    {/* First Row - Title and Create Button */}
                    <div className="flex justify-between items-center">
                        <CardTitle>Inventory Status</CardTitle>
                        <Button>Create Requisition</Button>
                    </div>

                    {/* Second Row - Search and Filters with justify-between */}
                    <div className="flex items-center justify-between">
                        <div className="relative w-1/2">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                            <Input className="pl-8 w-full" placeholder="Search items..." />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="flex items-center gap-2">
                                <Filter className="h-4 w-4" />
                                Filters
                            </Button>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300"
                                        onChange={(e) => {
                                            const checked = e.target.checked
                                            setItems(items.map(item => ({
                                                ...item,
                                                selected: checked
                                            })))
                                        }}
                                    />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">PAR Level</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Reorder Point</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">On Order</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Order Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Unit</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {items.map((item) => {
                                const suggestedOrder = Math.max(0, item.parLevel - (item.currentStock + item.onOrder));

                                return (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300"
                                                checked={item.selected}
                                                onChange={(e) => {
                                                    setItems(items.map(i =>
                                                        i.id === item.id ? { ...i, selected: e.target.checked } : i
                                                    ))
                                                }}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="space-y-1">
                                                <div className="font-medium text-gray-900">{item.location}</div>
                                                <div className="text-sm text-gray-500">{item.locationCode}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <div className="font-medium text-gray-900">{item.name}</div>
                                                    <div className="text-sm text-gray-500">({item.sku})</div>
                                                </div>
                                                <div className="text-sm text-gray-500">{item.description}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                                            <span className={`${item.currentStock < item.reorderPoint ? 'text-red-500 font-medium' : ''}`}>
                                                {item.currentStock}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{item.parLevel}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{item.reorderPoint}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                                            <span className="text-gray-500">{item.onOrder}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                                            <Input
                                                type="number"
                                                defaultValue={suggestedOrder}
                                                className="w-20 text-right"
                                                onChange={(e) => {
                                                    const newItems = items.map(i =>
                                                        i.id === item.id ? { ...i, orderAmount: parseInt(e.target.value) } : i
                                                    );
                                                    setItems(newItems);
                                                }}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <Select defaultValue={item.unit}>
                                                <SelectTrigger className="w-[100px]">
                                                    <SelectValue placeholder="Select unit" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Box">Box</SelectItem>
                                                    <SelectItem value="Bag">Bag</SelectItem>
                                                    <SelectItem value="Pack">Pack</SelectItem>
                                                    <SelectItem value="Piece">Piece</SelectItem>
                                                    <SelectItem value="Kg">Kg</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${item.status === 'low'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-green-100 text-green-700'
                                                }`}>
                                                {item.status.toUpperCase()}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}

export default StockTable