import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PurchaseRequestItem } from '@/lib/types';
import { CheckCircle, Edit2Icon, Eye, ImageIcon, Plus, RotateCcw, Split, Trash2Icon, X, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import ItemDetailsEditForm from './ItemDetailsEditForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const PrItem = () => {
    const [items, setItems] = useState<PurchaseRequestItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState<PurchaseRequestItem | null>(
        null
    );
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [formMode, setFormMode] = useState<"view" | "edit" | "add">("view");
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    useEffect(() => {
        const fetchTransactionSummary = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/procurement/purchase-requests/item-detail');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setItems(result.data);
            } catch (err) {
                console.error('Error fetching transaction summary:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactionSummary();
    }, []);

    const handleSelectItem = (itemId: string) => {
        setSelectedItems((prev) =>
            prev.includes(itemId)
                ? prev.filter((id) => id !== itemId)
                : [...prev, itemId]
        );
    }

    const handleSelectAllItems = () => {
        setSelectedItems((prev) =>
            prev.length === items.length ? [] : items.map((item) => item.id ?? "")
        );
    }

    const openItemForm = (item: PurchaseRequestItem | null, mode: "view" | "edit" | "add") => {
        setSelectedItem(item);
        setFormMode(mode);
        setIsEditFormOpen(true);
    }

    const closeItemForm = () => {
        setSelectedItem(null);
        setIsEditFormOpen(false);
        setFormMode("view");
    }

    const handleSave = (formData: PurchaseRequestItem) => {
        closeItemForm();
        setItems(prevItems => {
            if (formData.id) {
                // Update existing item
                return prevItems.map(item => item.id === formData.id ? formData : item);
            } else {
                // Add new item
                return [...prevItems, { ...formData, id: Date.now().toString() }];
            }
        });
    }

    const handleModeChange = (mode: "view" | "edit" | "add") => {
        setFormMode(mode);
    }

    const handleBulkAction = (action: "Accepted" | "Rejected" | "Review") => {
        console.log(`Bulk ${action} for items:`, selectedItems);
        const updatedItems = items.map((item) =>
            selectedItems.includes(item.id ?? "") ? { ...item, status: action } : item
        );
        setItems(updatedItems);
        setSelectedItems([]);
    }

    const handleSplitItems = () => {
        console.log("Splitting items:", selectedItems);
    }

    if (isLoading) {
        return (
            <div className="space-y-3">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
            </div>
        )
    }

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Item Details</h2>
                <Button onClick={() => openItemForm(null, "add")}>
                    <Plus />
                    Add Item
                </Button>
            </div>

            {selectedItems.length > 0 && (
                <div className="flex space-x-2 mt-4">
                    <Button onClick={() => handleBulkAction("Accepted")}>
                        <CheckCircle />
                        Accept Selected
                    </Button>
                    <Button onClick={() => handleBulkAction("Rejected")}>
                        <XCircle />
                        Reject Selected
                    </Button>
                    <Button onClick={() => handleBulkAction("Review")}>
                        <RotateCcw />
                        Review Selected
                    </Button>
                    <Button onClick={handleSplitItems}>
                        <Split />
                        Split Selected
                    </Button>
                </div>
            )}
            <Table>
                <TableHeader>
                    <TableRow className="h-6">
                        <TableHead className="w-[40px] h-fit align-center">
                            <Checkbox
                                checked={selectedItems.length === items.length}
                                onCheckedChange={handleSelectAllItems}
                            />
                        </TableHead>
                        <TableHead className="align-center">Location</TableHead>
                        <TableHead className="align-center">Product</TableHead>
                        <TableHead className="text-xs flex-col gap-2 justify-between items-center">
                            <div className="text-center">Order Unit</div>
                            <Separator />
                            <div className="text-nowrap text-center">Inv. Unit</div>
                        </TableHead>
                        <TableHead className="text-xs flex-col gap-2 justify-between items-center">
                            <div className="text-center">Request</div>
                            <Separator /> <div className="text-center">On Order</div>
                        </TableHead>
                        <TableHead className="text-xs flex-col gap-2 justify-between items-center">
                            <div className="text-center">Approve</div>
                            <Separator />
                            <div className="text-nowrap text-center">On Hand</div>
                        </TableHead>
                        <TableHead className="text-xs flex-col gap-2 justify-between items-center">
                            <div className="text-center">Curr.</div>
                            <Separator />
                            <div className="text-nowrap text-center">Base</div>
                        </TableHead>
                        <TableHead className="text-xs flex-col gap-2 justify-between items-center">
                            <div className="text-center">Price</div>
                            <Separator />
                            <div className="text-nowrap text-center">Last Price</div>
                        </TableHead>
                        <TableHead className="align-center">Total</TableHead>
                        <TableHead className="align-center">Status</TableHead>
                        <TableHead className="text-right align-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <Checkbox
                                    checked={selectedItems.includes(item.id ?? "")}
                                    onCheckedChange={() => handleSelectItem(item.id ?? "")}
                                />
                            </TableCell>
                            <TableCell>{item.location}</TableCell>
                            <TableCell>
                                <div>{item.name}</div>
                                <div className="text-sm text-muted-foreground mt-1">
                                    {item.description}
                                </div>
                            </TableCell>
                            <TableCell className="text-right align-top">
                                <div>{item.unit}</div>
                                <div className="text-xs text-muted-foreground">
                                    {item.inventoryInfo?.inventoryUnit || item.unit}
                                </div>
                            </TableCell>
                            <TableCell className="text-right align-top">
                                <div>{item.quantityRequested.toLocaleString()}</div>
                                <div className="text-xs text-muted-foreground">
                                    {item.inventoryInfo.onOrdered.toLocaleString()}
                                </div>
                            </TableCell>
                            <TableCell className="text-right align-top">
                                <div>{item.quantityApproved.toLocaleString()}</div>
                                <div className="text-xs text-muted-foreground">
                                    {item.inventoryInfo.onHand.toLocaleString()}
                                </div>
                            </TableCell>
                            <TableCell className="text-right align-top">
                                <div>{item.currency}</div>
                                <div className="text-xs text-muted-foreground">
                                    {item.currency || "THB"}
                                </div>
                            </TableCell>
                            <TableCell className="text-right align-top">
                                <div>{item.price.toFixed(2)}</div>
                                <div className="text-xs text-muted-foreground">
                                    {item.inventoryInfo.lastPrice.toFixed(2)}
                                </div>
                            </TableCell>
                            <TableCell className="text-right align-top">
                                <div>
                                    {item.totalAmount.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {item.baseTotalAmount.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge>{item.status ?? ""}</Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-end space-x-2">
                                    {formMode === 'edit' && selectedItem?.id === item.id ? (
                                        <>
                                            <Button
                                                variant="default"
                                                size="icon"
                                                onClick={() => {
                                                    if (selectedItem) handleSave(selectedItem)
                                                }}
                                            >
                                                <CheckCircle />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={closeItemForm}
                                            >
                                                <X />
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => openItemForm(item, "edit")}
                                            >
                                                <Edit2Icon />
                                            </Button>
                                            <Button variant="outline" size="icon">
                                                <Trash2Icon />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => openItemForm(item, "view")}
                                            >
                                                <Eye />
                                            </Button>
                                            <Button variant="outline" size="icon">
                                                <ImageIcon />
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={isEditFormOpen} onOpenChange={setIsEditFormOpen} >
                <DialogContent className="sm:max-w-[80vw] max-w-[80vw] p-0 border-none overflow-y-auto [&>button]:hidden ">
                    <div className="rounded-lg overflow-y-auto">
                        <ItemDetailsEditForm
                            onSave={handleSave}
                            onCancel={closeItemForm}
                            initialData={selectedItem || undefined}
                            mode={formMode}
                            onModeChange={handleModeChange}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default PrItem;