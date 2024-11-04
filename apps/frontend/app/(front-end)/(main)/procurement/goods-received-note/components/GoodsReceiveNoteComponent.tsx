import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { useRouter } from '@/lib/i18n';
import { ArrowLeft, CheckSquare, Edit, Plus, Printer, Save, Trash2, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import ToggleSidebarButton from '@/components/ui-custom/ButtonToggleSidebar';
import StatusBadge from '@/components/ui-custom/custom-status-badge';
import ConfirmDialog from '@/components/ui-custom/ConfirmDialog';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui-custom/dialog';
import { BulkActions } from './tabs/BulkActions';
import { FormAction, GoodsReceiveNote, GoodsReceiveNoteItem } from '@/lib/types';
import { ExtraCostsTab } from './tabs/ExtraCostsTab';
import { StockMovementTab } from './tabs/StockMovementTab';
import { TaxTab } from './tabs/TaxTab';
import { FinancialSummaryTab } from './tabs/FinancialSummaryTab';
import SummaryTotal from './SummaryTotal';
import { formSchema, FormValues } from '../../type/type';
import { submitForm } from '../../lib/action';
import ItemDetailForm from './tabs/ItemDetailForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui-custom/CustomTabs';
import RippleButton from '@/components/ui-custom/RippleButton';
import { CustomButton } from '@/components/ui-custom/CustomButton';


const initialData = {
    id: '0',
    ref: '',
    date: new Date(),
    invoiceDate: new Date(),
    invoiceNumber: '',
    taxInvoiceDate: undefined,
    taxInvoiceNumber: '',
    description: '',
    receiver: '',
    vendor: '',
    vendorId: '',
    location: '',
    currency: '',
    exchangeRate: 1,
    baseCurrency: '',
    status: 'Pending',
    isConsignment: false,
    isCash: false,
    cashBook: '',
    items: [],
    selectedItems: [],
    stockMovements: [],
    extraCosts: [],
    comments: [],
    attachments: [],
    activityLog: [],
    baseSubTotalPrice: 0,
    subTotalPrice: 0,
    baseNetAmount: 0,
    netAmount: 0,
    baseDiscAmount: 0,
    discountAmount: 0,
    baseTaxAmount: 0,
    taxAmount: 0,
    baseTotalAmount: 0,
    totalAmount: 0,

}

const emptyGoodsReceiveNote: GoodsReceiveNote = {
    id: '',
    ref: '',
    selectedItems: [],
    date: new Date(),
    invoiceDate: new Date(),
    invoiceNumber: '',
    description: '',
    receiver: '',
    vendor: '',
    vendorId: '',
    location: '',
    currency: '',
    status: 'Pending',
    cashBook: '',
    items: [],
    stockMovements: [],
    isConsignment: false,
    isCash: false,
    extraCosts: [],
    comments: [],
    attachments: [],
    activityLog: [],
    financialSummary: null,
    exchangeRate: 0,
    baseCurrency: '',
    baseSubTotalPrice: 0,
    subTotalPrice: 0,
    baseNetAmount: 0,
    netAmount: 0,
    baseDiscAmount: 0,
    discountAmount: 0,
    baseTaxAmount: 0,
    taxAmount: 0,
    baseTotalAmount: 0,
    totalAmount: 0,
};
interface Props {
    id?: string;
    grnMode?: FormAction;
}

const GoodsReceiveNoteComponent: React.FC<Props> = ({ id, grnMode = FormAction.VIEW }) => {
    const router = useRouter();
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [mode, setMode] = useState(grnMode);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<GoodsReceiveNote>(initialData || emptyGoodsReceiveNote);
    const [formDataToSubmit, setFormDataToSubmit] = useState<FormValues | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ref: '',
        },
    });

    const isEditable = mode !== FormAction.VIEW;

    const onBack = () => {
        if (form.formState.isDirty && isEditable) {
            setIsDialogOpen(true);
            return;
        }
        router.push("/procurement/goods-received-note");
    };

    const toggleSidebar = () => {
        setIsSidebarVisible((prev) => !prev);
    };

    const handleSaveClick = (data: FormValues) => {
        setFormDataToSubmit(data);
        setIsSaveDialogOpen(true);
    };

    const handleConfirmSave = async () => {
        if (!formDataToSubmit) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const result = await submitForm(formDataToSubmit);

            if (result.error) {
                setError(result.error);
                return;
            }
            console.log('result', result);
            form.reset()
            router.push("/procurement/goods-received-note");
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
            setIsSaveDialogOpen(false);
            setFormDataToSubmit(null);
        }
    };

    const handleCancel = () => {
        if (form.formState.isDirty) {
            setIsDialogOpen(true);
            return;
        }
        resetForm();
    };

    const handleEdit = () => {
        if (id) {
            setMode(FormAction.EDIT);
            router.push(`/procurement/goods-received-note/${id}/edit`);
        }
    };

    const resetForm = () => {
        form.reset();
        setMode(FormAction.VIEW);
        setError(null);
        router.push("/procurement/goods-received-note");
    };

    const handleConfirmCancel = () => {
        resetForm();
        setIsDialogOpen(false);
    };

    const handleAddItem = (newItem: GoodsReceiveNoteItem) => {
        setFormData((prev) => ({
            ...prev,
            items: [...prev.items, newItem],
        }));
        setIsAddDialogOpen(false);
    };

    const handleBulkAction = (action: string) => {
        console.log(`Applying ${action} to items:`, selectedItems);
        if (action === "delete") {
            setFormData((prev) => ({
                ...prev,
                items: prev.items.filter((item) => !selectedItems.includes(item.id)),
            }));
        }
        setSelectedItems([]);
    };

    const calculateDocumentTotals = () => {
        const netAmount = formData.items.reduce((sum, item) => sum + item.netAmount, 0);
        const taxAmount = formData.items.reduce((sum, item) => sum + item.taxAmount, 0);
        const totalAmount = netAmount + taxAmount;

        return {
            currency: {
                netAmount,
                taxAmount,
                totalAmount,
            },
            baseCurrency: {
                netAmount: netAmount * formData.exchangeRate,
                taxAmount: taxAmount * formData.exchangeRate,
                totalAmount: totalAmount * formData.exchangeRate,
            },
        };
    };

    const documentTotals = calculateDocumentTotals();

    return (
        <>
            <div className="p-4">
                <CustomButton variant="default" size="lg" onClick={() => console.log("Ripple Button Clicked!")}>
                    Ripple Button
                </CustomButton>
            </div>
            <div className='flex flex-col space-y-4 p-4'>

                <div className='fixed right-0 top-[30rem] transform -translate-y-1/2 z-50'>
                    <ToggleSidebarButton
                        toggleSidebar={toggleSidebar}
                        label='Comment & Activity Log'
                    />
                </div>
                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                    <div className={`flex-grow space-y-4 ${isSidebarVisible ? 'lg:w-3/4' : 'w-full'}`}>
                        <Card>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleSaveClick)}>
                                    <CardHeader className="flex flex-col space-y-4 pb-6">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                                            <div className="flex items-center">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={onBack}
                                                    disabled={isSubmitting}
                                                >
                                                    <ArrowLeft className="h-4 w-4" />
                                                </Button>
                                                <CardTitle className="text-lg">
                                                    Goods Receive Note
                                                </CardTitle>
                                            </div>
                                            {/* <StatusBadge status="Pending" /> */}
                                            <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
                                                {!isEditable ? (
                                                    <>
                                                        <Button
                                                            type="button"
                                                            variant="default"
                                                            size="sm"
                                                            onClick={handleEdit}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            Delete
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button
                                                            type="submit"
                                                            variant="outline"
                                                            size="sm"
                                                            disabled={!form.formState.isValid || isSubmitting}
                                                        >
                                                            <Save className="h-4 w-4" />
                                                            {isSubmitting ? 'Saving...' : 'Save'}
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={handleCancel}
                                                            disabled={isSubmitting}
                                                        >
                                                            <X className="h-4 w-4" />
                                                            Cancel
                                                        </Button>
                                                    </>
                                                )}
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    disabled={isSubmitting}
                                                >
                                                    <Printer className="h-4 w-4" />
                                                    Print
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    disabled={isSubmitting}
                                                >
                                                    <CheckSquare className="h-4 w-4" />
                                                    Commit
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {error && (
                                            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
                                                {error}
                                            </div>
                                        )}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
                                            <FormField
                                                control={form.control}
                                                name="ref"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className='font-semibold text-xs'>GRN #</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                disabled={!isEditable || isSubmitting}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </CardContent>
                                </form>
                            </Form>
                        </Card>

                        <Card>
                            <CardContent>
                                <Tabs defaultValue="items" className="w-full">
                                    <TabsList>
                                        <TabsTrigger value="items">Items</TabsTrigger>
                                        <TabsTrigger disabled value="extra-costs">Extra Costs</TabsTrigger>
                                        <TabsTrigger value="stock-movement">Stock Movement</TabsTrigger>
                                        <TabsTrigger value="tax">Tax</TabsTrigger>
                                        <TabsTrigger value="transaction-summary">Transaction Summary</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="items">
                                        <div className="mb-4 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                                                    <DialogTrigger asChild>
                                                        <Button size="sm">
                                                            <Plus className="h-4 w-4" />
                                                            Add Item
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-5xl">
                                                        <ItemDetailForm
                                                            mode={FormAction.CREATE}
                                                            item={null}
                                                            onSave={handleAddItem}
                                                            onClose={() => setIsAddDialogOpen(false)}
                                                        />
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                            {isEditable && selectedItems.length > 0 && (
                                                <BulkActions
                                                    selectedItems={selectedItems}
                                                    onAction={handleBulkAction}
                                                />
                                            )}
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="extra-costs">
                                        <ExtraCostsTab
                                            mode={mode}
                                            initialCosts={formData.extraCosts}
                                            onCostsChange={(newCosts) => {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    extraCosts: newCosts,
                                                }));
                                            }}
                                        />
                                    </TabsContent>
                                    <TabsContent value="stock-movement">
                                        <StockMovementTab
                                            mode={mode}
                                            movements={formData.stockMovements || []}
                                        />
                                    </TabsContent>

                                    <TabsContent value="tax">
                                        <TaxTab
                                            mode={mode}
                                            taxInvoiceNumber={formData.taxInvoiceNumber}
                                            taxInvoiceDate={formData.taxInvoiceDate}
                                            onTaxInvoiceChange={(field, value) => {
                                                setFormData(prev => ({ ...prev, [field]: value }));
                                            }}
                                            documentTotals={documentTotals}
                                            currency={formData.currency}
                                            baseCurrency={formData.baseCurrency}
                                        />
                                    </TabsContent>
                                    <TabsContent value="transaction-summary">
                                        <FinancialSummaryTab
                                            mode={mode}
                                            summary={formData.financialSummary || null}
                                            currency={formData.currency}
                                            baseCurrency={formData.baseCurrency}
                                        />
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Transaction Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <SummaryTotal poData={formData} />

                            </CardContent>
                        </Card>
                    </div>
                    <div className={`space-y-4 ${isSidebarVisible ? 'lg:w-1/4' : 'w-0 opacity-0 overflow-hidden'} transition-all duration-300`}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Comments & Attachments</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Activity Log</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>

            <ConfirmDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                title="Unsaved Changes"
                description="You have unsaved changes. Are you sure you want to discard them?"
                onConfirm={handleConfirmCancel}
                isLoading={isSubmitting}
                confirmText="Discard"
                cancelText="Continue Editing"
                confirmVariant="destructive"
            />

            <ConfirmDialog
                isOpen={isSaveDialogOpen}
                onOpenChange={setIsSaveDialogOpen}
                title="Save Changes"
                description="Are you sure you want to save these changes?"
                onConfirm={handleConfirmSave}
                isLoading={isSubmitting}
                confirmText="Save"
                cancelText="Cancel"
                confirmVariant="default"
            />
        </>
    );
};

export default GoodsReceiveNoteComponent;