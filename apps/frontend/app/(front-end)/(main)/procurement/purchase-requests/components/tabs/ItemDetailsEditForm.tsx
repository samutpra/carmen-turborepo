import { Dialog } from '@/components/ui-custom/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { PurchaseRequestItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Edit, Package, TruckIcon, X, XIcon } from 'lucide-react';
import React, { useState } from 'react'
import PendingPurchaseOrders from './PendingPurchaseOrders';
import InventoryBreakdown from './InventoryBreakdown';
import { formType } from '@/constants/enums';

interface ItemDetailsFormProps {
	onSave: (formData: PurchaseRequestItem) => void;
	onCancel: () => void;
	onDelete?: () => void;
	initialData?: Partial<PurchaseRequestItem>;
	mode: formType;
}

const defaultValue: PurchaseRequestItem = {
	id: '',
	status: 'Pending',
	location: '',
	name: '',
	description: '',
	unit: '',
	quantityRequested: 0,
	quantityApproved: 0,
	deliveryDate: new Date(),
	deliveryPoint: '',
	currency: '',
	currencyRate: 1,
	price: 0,
	foc: 0,
	netAmount: 0,
	adjustments: {
		discount: false,
		tax: false,
	},
	taxIncluded: false,
	discountRate: 0,
	discountAmount: 0,
	taxRate: 0,
	taxAmount: 0,
	totalAmount: 0,
	vendor: '',
	pricelistNumber: '',
	comment: '',
	createdBy: '',
	createdDate: new Date(),
	updatedBy: '',
	updatedDate: new Date(),
	itemCategory: '',
	itemSubcategory: '',
	inventoryInfo: {
		onHand: 0,
		onOrdered: 0,
		reorderLevel: 0,
		restockLevel: 0,
		averageMonthlyUsage: 0,
		lastPrice: 0,
		lastOrderDate: new Date(),
		lastVendor: '',
		inventoryUnit: '',
	},
	accountCode: '',
	jobCode: '',
	baseSubTotalPrice: 0,
	subTotalPrice: 0,
	baseNetAmount: 0,
	baseDiscAmount: 0,
	baseTaxAmount: 0,
	baseTotalAmount: 0,
};

const ItemDetailsEditForm: React.FC<ItemDetailsFormProps> = ({
	onSave,
	onCancel,
	initialData,
	mode,
}) => {
	const [formData, setFormData] = useState<PurchaseRequestItem>(
		initialData ? { ...defaultValue, ...initialData } : defaultValue
	);
	const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(
		formData.deliveryDate
	);
	const [isInventoryBreakdownOpen, setIsInventoryBreakdownOpen] =
		useState(false);
	const [isOnOrderOpen, setIsOnOrderOpen] = useState(false);

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value, type } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: type === 'number' ? parseFloat(value) : value,
		}));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSave(formData);
	};
	const FormField = ({
		id,
		label,
		required = false,
		children,
		smallText,
		baseValue,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	}: any) => (
		<div>
			<div className="flex items-center space-x-2">
				<Label
					htmlFor={id}
					className={cn(
						'text-xs text-muted-foreground',
						required && "after:content-['*'] after:ml-0.5 after:text-red-500"
					)}
				>
					{label}
				</Label>
			</div>
			{mode === formType.VIEW ? (
				<div className="mt-1 text-sm">
					{(() => {
						const value = formData[id as keyof PurchaseRequestItem];
						if (value instanceof Date) {
							return value.toLocaleDateString();
						} else if (value === null || value === undefined) {
							return 'N/A';
						} else {
							return String(value);
						}
					})()}
				</div>
			) : (
				children
			)}
			{smallText && (
				<div className="text-xs text-muted-foreground mt-1">{smallText}</div>
			)}
			{baseValue && (
				<div className="text-xs text-muted-foreground mt-1">
					Base: {baseValue}
				</div>
			)}
		</div>
	);

	return (
		<div className="w-full max-w-full mx-auto p-6">
			<div className="flex flex-row items-center justify-between mb-4">
				<h2 className="text-xl sm:text-2xl font-bold">
					{mode === formType.ADD ? 'Add New Item' : 'Item Details'}
				</h2>
				<div className="flex items-center gap-2">
					{mode === formType.VIEW && (
						<Button variant="outline">
							<Edit />
							Edit
						</Button>
					)}
					<div className="flex flex-wrap justify-end gap-2 mt-4">
						{mode === formType.VIEW ? (
							<>
								<Button variant="outline" onClick={onCancel}>
									Close
								</Button>
							</>
						) : (
							<>
								<Button variant="outline" onClick={onCancel}>
									Cancel
								</Button>
								<Button type="submit" form="itemForm">
									Save
								</Button>
							</>
						)}
					</div>
					<Button variant="ghost" size="icon" onClick={onCancel}>
						<X />
					</Button>
				</div>
			</div>
			<ScrollArea className="h-[calc(100vh-200px)]">
				<form onSubmit={handleSubmit} className="space-y-4 p-4">
					{/* Basic Item Information */}
					<div>
						<div className="flex justify-between items-center mb-2">
							<h3 className="text-lg font-semibold">Basic Information</h3>
							<Badge>{formData.status}</Badge>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-7 gap-2">
							<FormField id="location" label="Location" required>
								<Input
									id="location"
									name="location"
									value={formData.location}
									onChange={handleInputChange}
									required
									disabled={mode === formType.VIEW}
									className="h-8 text-sm"
								/>
							</FormField>
							<div className="sm:col-span-2">
								<FormField id="name" label="Product name" required>
									<Input
										id="name"
										name="Product name"
										value={formData.name}
										onChange={handleInputChange}
										required
										disabled={mode === formType.VIEW}
										className="h-8 text-sm"
									/>
								</FormField>
							</div>
							<div className="sm:col-span-3">
								<FormField id="description" label="Description" readOnly>
									<Input
										id="description"
										name="description"
										value={formData.description}
										onChange={handleInputChange}
										readOnly={true}
										className="h-8 text-sm"
									/>
								</FormField>
							</div>
							<div className="sm:col-span-1">
								<FormField id="jobcode" label="Job code">
									<Input
										id="jobcode"
										name="jobcode"
										value={formData.jobCode}
										onChange={handleInputChange}
										required
										disabled={mode === formType.VIEW}
										className="h-8 text-sm"
									/>
								</FormField>
							</div>
						</div>
						<div className="w-full">
							<FormField id="comment" label="Comment">
								{mode === formType.VIEW ? (
									<div className="mt-1 text-sm">{formData.comment}</div>
								) : (
									<Textarea
										id="comment"
										name="comment"
										value={formData.comment}
										onChange={handleInputChange}
										placeholder="Add any additional notes here"
										className="text-sm h-8"
									/>
								)}
							</FormField>
						</div>
					</div>

					<Separator className="my-2" />

					{/* Quantity and Delivery Section */}
					<div>
						<div className="flex justify-between items-center mb-2">
							<h3 className="text-lg font-semibold">Quantity and Delivery</h3>
							<div className="flex gap-2">
								<Dialog
									open={isInventoryBreakdownOpen}
									onOpenChange={setIsInventoryBreakdownOpen}
								>
									<DialogTrigger asChild>
										<Button type="button" variant="outline" size="sm">
											<Package />
											On Hand
										</Button>
									</DialogTrigger>
									<DialogContent className="sm:max-w-[60vw] w-[80vw] overflow-y-auto [&>button]:hidden">
										<DialogHeader>
											<div className="flex justify-between w-full items-center">
												<DialogTitle>On Hand by Location</DialogTitle>
												<DialogClose asChild>
													<Button
														variant="ghost"
														size="sm"
														onClick={() => setIsInventoryBreakdownOpen(false)}
													>
														<XIcon />
													</Button>
												</DialogClose>
											</div>
										</DialogHeader>
										<InventoryBreakdown />
									</DialogContent>
								</Dialog>

								<Dialog open={isOnOrderOpen} onOpenChange={setIsOnOrderOpen}>
									<DialogTrigger asChild>
										<Button type="button" variant="outline" size="sm">
											<TruckIcon className="mr-2 h-4 w-4" />
											On Order
										</Button>
									</DialogTrigger>
									<DialogContent className="sm:max-w-[60vw] overflow-y-auto [&>button]:hidden">
										<DialogHeader>
											<div className="flex justify-between w-full items-center">
												<DialogTitle>Pending Purchase Order</DialogTitle>
												<DialogClose asChild>
													<Button
														variant="ghost"
														size="sm"
														onClick={() => setIsOnOrderOpen(false)}
													>
														<XIcon className="h-4 w-4" />
													</Button>
												</DialogClose>
											</div>
										</DialogHeader>
										<PendingPurchaseOrders />
									</DialogContent>
								</Dialog>
							</div>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2">
							<FormField
								id="unit"
								label="Order Unit"
								required
								smallText="Base: Kg | 1 Bag = 0.5 Kg"
							>
								<Input
									id="unit"
									name="unit"
									value={formData.unit}
									onChange={handleInputChange}
									required
									disabled={mode === formType.VIEW}
									className="h-8 text-sm"
								/>
							</FormField>
							<FormField
								id="quantityRequested"
								label="Quantity Requested"
								required
								smallText="5 Kg"
							>
								<Input
									id="quantityRequested"
									name="quantityRequested"
									type="number"
									min="0"
									step="1"
									value={formData.quantityRequested}
									onChange={handleInputChange}
									required
									disabled={mode === formType.VIEW}
									className="h-8 text-sm"
								/>
							</FormField>
							<FormField
								id="quantityApproved"
								label="Quantity Approved"
								smallText="4.5 Kg"
							>
								<Input
									id="quantityApproved"
									name="quantityApproved"
									type="number"
									min="0"
									step="1"
									value={formData.quantityApproved}
									onChange={handleInputChange}
									disabled={mode === formType.VIEW}
									className="h-8 text-sm"
								/>
							</FormField>
							<FormField id="foc" label="FOC Qty" baseValue="0">
								<Input
									id="foc"
									name="foc"
									type="number"
									min="0"
									step="1"
									value={formData.foc}
									onChange={handleInputChange}
									disabled={mode === formType.VIEW}
									className="h-8 text-sm"
								/>
							</FormField>
							<FormField id="deliveryDate" label="Delivery Date" required>
								{mode === formType.VIEW ? (
									<div>
										{deliveryDate ? format(deliveryDate, 'PPP') : 'Not set'}
									</div>
								) : (
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant={'outline'}
												className={cn(
													'w-full justify-start text-left font-normal h-8 text-sm',
													!deliveryDate && 'text-muted-foreground'
												)}
											>
												<CalendarIcon />
												{deliveryDate ? (
													format(deliveryDate, 'PPP')
												) : (
													<span>Pick a date</span>
												)}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0">
											<Calendar
												mode="single"
												selected={deliveryDate}
												onSelect={(date) => {
													setDeliveryDate(date);
													setFormData((prevData) => ({
														...prevData,
														deliveryDate: date ? date : new Date(),
													}));
												}}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								)}
							</FormField>
							<FormField id="deliveryPoint" label="Delivery Point">
								<Input
									id="deliveryPoint"
									name="deliveryPoint"
									value={formData.deliveryPoint}
									onChange={handleInputChange}
									disabled={mode === formType.VIEW}
									className="h-8 text-sm"
								/>
							</FormField>
						</div>

						{/* Inventory Information Section */}
						<div className="mt-2">
							<div className="bg-muted p-2 rounded-md">
								<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
									<div>
										<p className="font-medium">On Hand</p>
										<p className="text-muted-foreground">
											{formData.inventoryInfo?.onHand} Kg
										</p>
									</div>
									<div>
										<p className="font-medium">On Ordered</p>
										<p className="text-muted-foreground">
											{formData.inventoryInfo?.onOrdered} Kg
										</p>
									</div>
									<div>
										<p className="font-medium">Reorder Level</p>
										<p className="text-muted-foreground">
											{formData.inventoryInfo?.reorderLevel} Kg
										</p>
									</div>
									<div>
										<p className="font-medium">Restock Level</p>
										<p className="text-muted-foreground">
											{formData.inventoryInfo?.restockLevel} Kg
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-2">
							Vendor and Additional Information
						</h3>
						<div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
							<FormField id="vendor" label="Vendor">
								<Input
									id="vendor"
									name="vendor"
									value={formData.vendor}
									onChange={handleInputChange}
									placeholder="Vendor name"
									disabled={mode === formType.VIEW}
									className="h-8 text-sm"
								/>
							</FormField>
							<FormField id="pricelistNumber" label="Pricelist Number">
								<Input
									id="pricelistNumber"
									name="pricelistNumber"
									value={formData.pricelistNumber}
									onChange={handleInputChange}
									placeholder="Pricelist #"
									disabled={mode === formType.VIEW}
									className="h-8 text-sm"
								/>
							</FormField>
						</div>
					</div>
					<Separator className="my-2" />

					{/* Pricing Section */}
					<div>
						{/* <PricingFormComponent
                            initialMode={mode}
                            data={formData}
                        /> */}
					</div>

					<Separator className="my-2" />

					{/* Vendor and Additional Information Section */}

					<Separator className="my-2" />
				</form>
			</ScrollArea>
		</div>
	);
};

export default ItemDetailsEditForm;