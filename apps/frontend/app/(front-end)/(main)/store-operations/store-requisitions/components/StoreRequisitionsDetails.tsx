"use client";
import React, { useState } from 'react'
import { formType } from '@/types/form_type';
import { mockApprovalLogs, mockRequisition, movements, RequisitionType } from '../data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/lib/i18n';
import { History, ArrowLeft, Box, Building2, Calculator, Calendar, Check, Edit2, FileText, Hash, ListTodo, MessageSquare, Paperclip, Printer, Store, X, XCircle, Plus, AlertCircle, Split, Trash2, Filter, PlusIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ApprovalLogDialog from './ApprovalLogDialog';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import JournalEntriesTab from './tabs/JournalEntriesTab';

interface Props {
    storeRequisition: RequisitionType[] | null;
    mode: formType;
}

const StoreRequisitionsDetails: React.FC<Props> = ({ storeRequisition, mode }) => {
    const router = useRouter();
    const [items, setItems] = useState(mockRequisition.items)
    const [selectedItems, setSelectedItems] = useState<number[]>([])
    const [isEditMode, setIsEditMode] = useState(false)

    console.log('storeRequisition', storeRequisition);
    console.log('mode', mode);

    const handleBulkAction = (action: 'Accept' | 'Reject' | 'Review' | 'Delete' | 'Split') => {
        if (!selectedItems.length) return

        switch (action) {
            case 'Accept':
            case 'Reject':
            case 'Review':
                setItems(items.map(item =>
                    selectedItems.includes(item.id)
                        ? { ...item, approvalStatus: action }
                        : item
                ))
                break
            case 'Delete':
                setItems(items.filter(item => !selectedItems.includes(item.id)))
                break
            case 'Split':
                console.log('Splitting items:', selectedItems)
                break
        }
        setSelectedItems([]) // Clear selection after action
    }

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedItems(items.map(item => item.id))
        } else {
            setSelectedItems([])
        }
    }

    const handleSelectItem = (itemId: number, checked: boolean) => {
        if (checked) {
            setSelectedItems([...selectedItems, itemId])
        } else {
            setSelectedItems(selectedItems.filter(id => id !== itemId))
        }
    }

    const handleHeaderUpdate = (field: string, value: string) => {
        console.log('Updating header field:', field, value)
    }

    const handleQuantityUpdate = (itemId: number, field: 'qtyRequired' | 'qtyApproved' | 'qtyIssued', value: number) => {
        setItems(items.map(item =>
            item.id === itemId
                ? { ...item, [field]: value }
                : item
        ))
    }

    return (
        <div className='p-6'>
            <Card className="w-full">
                <CardHeader className="flex flex-col gap-6">
                    {/* Top Actions */}
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex items-center">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => router.back()}
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                            <div className="flex items-center gap-2">
                                <CardTitle>Store Requisition Details</CardTitle>
                                <span className="inline-flex px-3 rounded-full py-1 text-xs font-medium bg-blue-100 text-blue-800">
                                    {mockRequisition.status}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {isEditMode ? (
                                <>
                                    <Button
                                        variant="outline"
                                        className="flex items-center gap-2"
                                        onClick={() => setIsEditMode(false)}
                                        size={'sm'}
                                    >
                                        <X className="h-4 w-4" />
                                        Cancel
                                    </Button>
                                    <Button
                                        className="flex items-center gap-2"
                                        onClick={() => {
                                            // Save changes
                                            setIsEditMode(false)
                                        }}
                                        size={'sm'}
                                    >
                                        <Check className="h-4 w-4" />
                                        Save Changes
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        className="flex items-center gap-2"
                                        onClick={() => setIsEditMode(true)}
                                        size={'sm'}
                                    >
                                        <Edit2 className="h-4 w-4" />
                                        Edit
                                    </Button>
                                    <Button
                                        className="flex items-center gap-2"
                                        onClick={() => console.log('Submit')}
                                        size={'sm'}
                                    >
                                        Submit
                                    </Button>
                                </>
                            )}
                            <Button
                                variant="outline"
                                className="flex items-center gap-2"
                                onClick={() => console.log('Print requisition')}
                                size={'sm'}
                            >
                                <Printer className="h-4 w-4" />
                                Print
                            </Button>
                            <Button
                                variant="outline"
                                className="flex items-center gap-2 text-red-600 hover:text-red-600"
                                onClick={() => console.log('Void requisition')}
                                size={'sm'}
                            >
                                <XCircle className="h-4 w-4" />
                                Void
                            </Button>
                        </div>
                    </div>
                    {/* Updated Header Information with 6 columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                        {/* Column 1 */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Hash className="h-4 w-4" />
                                <span>Reference Number</span>
                            </div>
                            <p className="font-medium text-xs">{mockRequisition.refNo}</p>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Calendar className="h-4 w-4" />
                                <span>Date</span>
                            </div>
                            <p className="font-medium text-xs">{mockRequisition.date}</p>
                        </div>

                        {/* Column 3 */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Calendar className="h-4 w-4" />
                                <span>Expected Delivery</span>
                            </div>
                            {isEditMode ? (
                                <Input
                                    type="date"
                                    value={mockRequisition.expectedDeliveryDate}
                                    onChange={(e) => handleHeaderUpdate('expectedDeliveryDate', e.target.value)}
                                    className="h-8"
                                />
                            ) : (
                                <p className="font-medium text-xs">{mockRequisition.expectedDeliveryDate}</p>
                            )}
                        </div>

                        {/* Column 4 */}

                        {/* Column 5 */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Store className="h-4 w-4" />
                                <span>Requested From</span>
                            </div>
                            <p className="font-medium text-xs">{mockRequisition.requestedFrom}</p>
                        </div>

                        {/* Column 6 */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <FileText className="h-4 w-4" />
                                <span>Job Code</span>
                            </div>
                            <p className="font-medium text-xs">{mockRequisition.jobCode}</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Building2 className="h-4 w-4" />
                                <span>Department</span>
                            </div>
                            <p className="font-medium text-xs">{mockRequisition.department}</p>
                        </div>

                        {/* Description - Spans full width */}
                        <div className="xl:col-span-6 space-y-2">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <FileText className="h-4 w-4" />
                                <span>Description</span>
                            </div>
                            <p className="font-medium text-xs">{mockRequisition.description}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="items" className="w-full">
                        <TabsList className="w-full justify-start border-b mb-4">
                            <TabsTrigger value="items" className="flex items-center gap-2 px-6 text-xs">
                                <ListTodo className="h-4 w-4" />
                                Items
                            </TabsTrigger>
                            <TabsTrigger value="stock-movements" className="flex items-center gap-2 px-6 text-xs">
                                <Box className="h-4 w-4" />
                                Stock Movements
                            </TabsTrigger>
                            <TabsTrigger value="journal-entries" className="flex items-center gap-2 px-6 text-xs">
                                <Calculator className="h-4 w-4" />
                                Journal Entries
                            </TabsTrigger>
                            <TabsTrigger value="comments" className="flex items-center gap-2 px-6 text-xs">
                                <MessageSquare className="h-4 w-4" />
                                Comments
                            </TabsTrigger>
                            <TabsTrigger value="attachments" className="flex items-center gap-2 px-6 text-xs">
                                <Paperclip className="h-4 w-4" />
                                Attachments
                            </TabsTrigger>
                            <TabsTrigger value="activity" className="flex items-center gap-2 px-6 text-xs">
                                <History className="h-4 w-4" />
                                Activity Log
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="items" className="mt-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-semibold">Items Details</h3>
                                    <Button
                                        className="flex items-center"
                                        size={'sm'}
                                        variant={'outline'}
                                        onClick={() => console.log('Add new item')}
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add Item
                                    </Button>
                                </div>

                                {/* Add bulk actions buttons below the title */}
                                {selectedItems.length > 0 && (
                                    <div className="flex gap-2">
                                        <Button
                                            className="bg-green-100 text-green-700 hover:bg-green-200 flex items-center gap-2"
                                            onClick={() => handleBulkAction('Accept')}
                                            size={'sm'}
                                        >
                                            <Check className="h-4 w-4" />
                                            Accept Selected ({selectedItems.length})
                                        </Button>
                                        <Button
                                            className="bg-red-100 text-red-700 hover:bg-red-200 flex items-center gap-2"
                                            onClick={() => handleBulkAction('Reject')}
                                            size={'sm'}
                                        >
                                            <XCircle className="h-4 w-4" />
                                            Reject Selected ({selectedItems.length})
                                        </Button>
                                        <Button
                                            className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 flex items-center gap-2"
                                            onClick={() => handleBulkAction('Review')}
                                            size={'sm'}
                                        >
                                            <AlertCircle className="h-4 w-4" />
                                            Review Selected ({selectedItems.length})
                                        </Button>
                                        <Button
                                            className="bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center gap-2"
                                            onClick={() => handleBulkAction('Split')}
                                            size={'sm'}
                                        >
                                            <Split className="h-4 w-4" />
                                            Split Selected ({selectedItems.length})
                                        </Button>
                                    </div>
                                )}

                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow className="border-b bg-gray-50">
                                            <TableHead className="text-left p-4 text-xs font-medium text-gray-500">
                                                <Checkbox
                                                    id="select-all"
                                                    checked={selectedItems.length === items.length}
                                                    onCheckedChange={handleSelectAll}
                                                    className='h-3 w-3'
                                                />
                                            </TableHead>
                                            <TableHead className="text-left p-4 text-xs font-medium text-gray-500">
                                                Location
                                            </TableHead>
                                            <TableHead className="text-left p-4 text-xs font-medium text-gray-500">
                                                Product
                                            </TableHead>
                                            <TableHead className="text-left p-4 text-xs font-medium text-gray-500">
                                                Unit
                                            </TableHead>
                                            <TableHead className="text-right p-4 text-xs font-medium text-gray-500">
                                                Required
                                            </TableHead>
                                            <TableHead className="text-right p-4 text-xs font-medium text-gray-500">
                                                Approved
                                            </TableHead>
                                            <TableHead className="text-right p-4 text-xs font-medium text-gray-500">
                                                Issued
                                            </TableHead>
                                            <TableHead className="text-right p-4 text-xs font-medium text-gray-500">
                                                Total
                                            </TableHead>
                                            <TableHead className="text-center p-4 text-xs font-medium text-gray-500">
                                                Status
                                            </TableHead>
                                            <TableHead className="text-right p-4 text-xs font-medium text-gray-500 w-[100px]">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {items.map((item) => (
                                            <>
                                                <TableRow
                                                    key={item.id}
                                                    className="group hover:bg-gray-50"
                                                >
                                                    <TableCell className="p-4">
                                                        <Checkbox
                                                            id={`select-${item.id}`}
                                                            checked={selectedItems.includes(item.id)}
                                                            onCheckedChange={(checked) => handleSelectItem(item.id, Boolean(checked))}
                                                            className='h-3 w-3'
                                                        />
                                                    </TableCell>
                                                    <TableCell className="p-4">
                                                        <div className="space-y-1">
                                                            <p className="font-medium text-xs">
                                                                {item.itemInfo.location}
                                                            </p>
                                                            <div className="flex flex-col gap-0.5">
                                                                <p className="text-xs text-gray-500">
                                                                    {item.itemInfo.locationCode} •{" "}
                                                                    {item.itemInfo.locationType === "inventory"
                                                                        ? "Inventory"
                                                                        : "Direct"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="p-4">
                                                        <div className="space-y-1">
                                                            <p className="font-medium text-gray-600">
                                                                {item.itemInfo.itemName}
                                                            </p>
                                                            <p className="text-xs text-gray-500">{item.description}</p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="p-4">
                                                        <p className="text-xs">{item.unit}</p>
                                                    </TableCell>
                                                    <TableCell className="p-4 text-right">
                                                        {isEditMode ? (
                                                            <Input
                                                                type="number"
                                                                value={item.qtyRequired}
                                                                onChange={(e) =>
                                                                    handleQuantityUpdate(
                                                                        item.id,
                                                                        "qtyRequired",
                                                                        parseInt(e.target.value)
                                                                    )
                                                                }
                                                                className="w-20 h-8 text-right"
                                                            />
                                                        ) : (
                                                            <p>{item.qtyRequired}</p>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="p-4 text-right">
                                                        {isEditMode ? (
                                                            <Input
                                                                type="number"
                                                                value={item.qtyApproved}
                                                                onChange={(e) =>
                                                                    handleQuantityUpdate(
                                                                        item.id,
                                                                        "qtyApproved",
                                                                        parseInt(e.target.value)
                                                                    )
                                                                }
                                                                className="w-20 h-8 text-right"
                                                            />
                                                        ) : (
                                                            <p>{item.qtyApproved}</p>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="p-4 text-right">
                                                        {isEditMode ? (
                                                            <Input
                                                                type="number"
                                                                value={item.qtyIssued || 0}
                                                                onChange={(e) =>
                                                                    handleQuantityUpdate(
                                                                        item.id,
                                                                        "qtyIssued",
                                                                        parseInt(e.target.value)
                                                                    )
                                                                }
                                                                className="w-20 h-8 text-right"
                                                            />
                                                        ) : (
                                                            <p>{item.qtyIssued || 0}</p>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="p-4 text-right">
                                                        <p className="font-medium text-xs">
                                                            {item.total.toFixed(2)}
                                                        </p>
                                                    </TableCell>
                                                    <TableCell className="p-4 text-center">
                                                        <ApprovalLogDialog
                                                            itemId={item.id}
                                                            itemName={item.itemInfo.itemName}
                                                            logs={mockApprovalLogs[item.id] || []}
                                                        >
                                                            <div className="cursor-pointer">
                                                                <Badge>{item.approvalStatus}</Badge>
                                                            </div>
                                                        </ApprovalLogDialog>
                                                    </TableCell>
                                                    <TableCell className="p-4">
                                                        <div className="flex justify-end">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => console.log("Edit item", item.id)}
                                                            >
                                                                <Edit2 className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => {
                                                                    setItems(items.filter((i) => i.id !== item.id));
                                                                }}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                                {/* Secondary Information Row */}
                                                <TableRow className="bg-gray-50 border-b">
                                                    <TableCell colSpan={9} className="px-4 py-2">
                                                        <div className="flex items-center gap-6 text-xs">
                                                            <div className="flex items-center gap-1">
                                                                <span className="text-gray-400">On Hand:</span>
                                                                <span className="text-gray-600">
                                                                    {item.inventory.onHand}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <span className="text-gray-400">On Order:</span>
                                                                <span className="text-gray-600">
                                                                    {item.inventory.onOrder}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <span className="text-gray-400">Last Price:</span>
                                                                <span className="text-gray-600">
                                                                    {item.inventory.lastPrice.toFixed(2)}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <span className="text-gray-400">Last Vendor:</span>
                                                                <span className="text-gray-600 truncate max-w-[300px]">
                                                                    {item.inventory.lastVendor}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            </>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        <TabsContent value="stock-movements" className="mt-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <h1 className="font-bold">Stock Movements</h1>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                <Filter />
                                                Filter
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Printer />
                                                Print
                                            </Button>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" >
                                        <PlusIcon />
                                        Add Item
                                    </Button>
                                </div>

                                {/* Search Bar */}
                                <div className="flex items-center gap-4">
                                    <div className="w-1/2">
                                        <Input
                                            placeholder="Search by location, product name, or lot number..."
                                            className="w-full h-8"
                                        />
                                    </div>
                                </div>

                                {/* Movements Table */}
                                <Card>
                                    <CardContent>
                                        <div className="overflow-x-auto">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow className='text-xs'>
                                                        <TableHead>Location</TableHead>
                                                        <TableHead>Product</TableHead>
                                                        <TableHead>Lot No.</TableHead>
                                                        <TableHead>Unit</TableHead>
                                                        <TableHead className="text-center w-40">
                                                            <span>STOCK</span>
                                                            <div className="flex justify-center gap-4 border-t pt-1">
                                                                <div className="w-16 text-center">In</div>
                                                                <div className="w-16 text-center">Out</div>
                                                            </div>
                                                        </TableHead>
                                                        <TableHead className="text-right">Unit Cost</TableHead>
                                                        <TableHead className="text-right">Total Cost</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {movements.map(movement => {
                                                        const inventoryItems = movement.items.filter(item => item.location.type === 'INV');

                                                        // Only render movement if it has inventory items
                                                        if (inventoryItems.length === 0) return null;
                                                        return (
                                                            <React.Fragment key={movement.id}>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        <div className="flex justify-between items-center">
                                                                            <div className="flex items-center gap-2 text-xs">
                                                                                <span className="text-blue-600">{movement.sourceDocument}</span>
                                                                                <span className="text-gray-400">|</span>
                                                                                <span className="text-gray-500">{movement.commitDate}</span>
                                                                            </div>
                                                                            <div className="text-xs text-gray-500">
                                                                                {movement.movement.source} → {movement.movement.destination}
                                                                            </div>
                                                                        </div>
                                                                    </TableCell>
                                                                </TableRow>
                                                                {inventoryItems.map(item =>
                                                                    item.lots.map((lot, index) => (
                                                                        <TableRow key={item.id} className='text-xs'>
                                                                            <TableCell>
                                                                                {index === 0 && (
                                                                                    <div className="flex flex-col gap-1">
                                                                                        <div className="font-medium text-gray-900">{item.location.name}</div>
                                                                                        <div className="flex items-center gap-1 text-gray-500">
                                                                                            <span>{item.location.code}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </TableCell>
                                                                            <TableCell className="px-6 py-4 whitespace-nowrap">
                                                                                {index === 0 && (
                                                                                    <div className="flex flex-col gap-1">
                                                                                        <div className="font-medium text-gray-900">{item.productName}</div>
                                                                                        <div className="text-gray-500">{item.sku}</div>
                                                                                    </div>
                                                                                )}
                                                                            </TableCell>
                                                                            <TableCell className='py-4 whitespace-nowrap'>{lot.lotNo}</TableCell>
                                                                            <TableCell className='py-4 whitespace-nowrap'>{lot.uom}</TableCell>
                                                                            <TableCell className='py-4 whitespace-nowrap'>{lot.quantity > 0 ? lot.quantity.toLocaleString() : ''}</TableCell>
                                                                            <TableCell className='py-4 whitespace-nowrap'>{lot.quantity < 0 ? Math.abs(lot.quantity).toLocaleString() : ''}</TableCell>
                                                                            <TableCell className='py-4 whitespace-nowrap'>{item.unitCost.toLocaleString()}</TableCell>
                                                                            <TableCell className='py-4 whitespace-nowrap'> {(item.unitCost * Math.abs(lot.quantity)).toLocaleString()}</TableCell>
                                                                        </TableRow>
                                                                    ))
                                                                )}
                                                            </React.Fragment>
                                                        )
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="journal-entries" className="mt-6">
                            <JournalEntriesTab
                                refNo={mockRequisition.refNo}
                                date={mockRequisition.date}
                                description={mockRequisition.description}
                            />
                        </TabsContent>

                        <TabsContent value="comments" className="mt-4">
                            <div className="space-y-4">
                                {mockRequisition.comments.map((comment) => (
                                    <div key={comment.id} className="border rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">{comment.by}</span>
                                                <span className="text-gray-500 text-xs">{comment.date}</span>
                                            </div>
                                        </div>
                                        <p className="text-xs">{comment.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="attachments" className="mt-4">
                            <div className="space-y-4">
                                {mockRequisition.attachments.map((attachment) => (
                                    <div key={attachment.id} className="border rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <Paperclip className="h-4 w-4 text-gray-500" />
                                                <div>
                                                    <p className="font-semibold">{attachment.fileName}</p>
                                                    <p className="text-xs text-gray-500">{attachment.description}</p>
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                <p>{attachment.date}</p>
                                                <p>By: {attachment.by}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="activity" className="mt-4">
                            <div className="space-y-4">
                                {mockRequisition.activityLog.map((activity) => (
                                    <div key={activity.id} className="border rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">{activity.by}</span>
                                                <span className="text-gray-500 text-xs">{activity.date}</span>
                                            </div>
                                            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                                                {activity.action}
                                            </span>
                                        </div>
                                        <p className="text-xs">{activity.log}</p>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
                {/* Transaction Summary */}
                <div className="border-t">
                    <div className="p-6">
                        <h3 className="text-xs font-semibold mb-4">Transaction Summary</h3>
                        <div className="grid grid-cols-5 gap-8">
                            <div>
                                <div className="text-xs text-gray-500 mb-1">Total Items</div>
                                <div className="text-lg font-medium">{items.length}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 mb-1">Total Quantity</div>
                                <div className="text-lg font-medium">
                                    {items.reduce((sum, item) => sum + item.qtyRequired, 0)}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 mb-1">Total Approved</div>
                                <div className="text-lg font-medium">
                                    {items.reduce((sum, item) => sum + item.qtyApproved, 0)}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 mb-1">Total Issued</div>
                                <div className="text-lg font-medium">
                                    {items.reduce((sum, item) => sum + (item.qtyIssued || 0), 0)}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 mb-1">Total Amount</div>
                                <div className="text-lg font-medium">
                                    {items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Workflow Actions */}
                <div className="border-t bg-gray-50/50">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>Last updated by John Doe on 15 Jan 2024 10:30 AM</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                                onClick={() => console.log('Approve')}
                                size={'sm'}
                            >
                                <Check className="h-4 w-4" />
                                Approve
                            </Button>
                            <Button
                                variant="outline"
                                className="flex items-center gap-2 text-red-600 hover:bg-red-50"
                                onClick={() => console.log('Reject')}
                                size={'sm'}
                            >
                                <XCircle className="h-4 w-4" />
                                Reject
                            </Button>
                            <Button
                                variant="outline"
                                className="flex items-center gap-2 text-orange-600 hover:bg-orange-50"
                                onClick={() => console.log('Send Back')}
                                size={'sm'}
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Send Back
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default StoreRequisitionsDetails