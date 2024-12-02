import React, { useState } from 'react';
import {
	FormAction,
	PRType,
	PurchaseRequest,
	Status,
	WorkflowStatus,
	WorkflowStage,
} from '@/lib/types';
import { useRouter } from '@/lib/i18n';
import { formSchema, FormValues } from '../../type/purchaseRequestType';
import { submitForm } from '../../lib/action';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	ArrowLeft,
	FileIcon,
	PrinterIcon,
	DownloadIcon,
	HashIcon,
	BuildingIcon,
	MapPinIcon,
	UserIcon,
	ShareIcon,
	PencilIcon,
	CheckCircleIcon,
	XCircleIcon,
	RotateCcwIcon,
	CheckCircle,
	X,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import StatusBadge from '@/components/ui-custom/custom-status-badge';

const initialData = {
	id: '',
	ref: '',
	date: new Date(),
	type: PRType.GeneralPurchase,
	deliveryDate: new Date(),
	description: '',
	requestorId: '',
	requestor: {
		name: '',
		id: '',
		department: '',
	},
	status: Status.Draft,
	workflowStatus: WorkflowStatus.pending,
	currentWorkflowStage: WorkflowStage.requester,
	location: '',
	department: '',
	jobCode: '',
	estimatedTotal: 0,
	currency: '',
	baseCurrencyCode: '',
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

const emptyPurchaseRequest: PurchaseRequest = {
	id: '',
	ref: '',
	date: new Date(),
	type: PRType.GeneralPurchase,
	deliveryDate: new Date(),
	description: 'test',
	requestorId: '',
	requestor: {
		name: '',
		id: '',
		department: '',
	},
	status: Status.Draft,
	workflowStatus: WorkflowStatus.pending,
	currentWorkflowStage: WorkflowStage.requester,
	location: '',
	department: '',
	jobCode: '',
	estimatedTotal: 0,
	currency: '',
	baseCurrencyCode: '',
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
	prMode?: FormAction;
}

const PurchaseRequestComponent: React.FC<Props> = ({
	id,
	prMode = FormAction.VIEW,
}) => {
	const router = useRouter();
	const [mode, setMode] = useState(prMode);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState<PurchaseRequest>(
		initialData || emptyPurchaseRequest
	);
	const [formDataToSubmit, setFormDataToSubmit] = useState<FormValues | null>(
		null
	);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData,
	});

	const isEditable = mode !== FormAction.VIEW;

	const onBack = () => {
		if (form.formState.isDirty && isEditable) {
			setIsDialogOpen(true);
			return;
		}
		router.push('/procurement/purchase-requests');
	};

	const handleSaveClick = (data: FormValues) => {
		setFormDataToSubmit(data);
		setIsSaveDialogOpen(true);
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
			router.push(`/procurement/purchase-requests/${id}/edit`);
		}
	};

	const resetForm = () => {
		form.reset();
		setMode(FormAction.VIEW);
		setError(null);
		router.push('/procurement/purchase-requests');
	};

	return (
		<>
			<div className="flex flex-col space-y-4 p-4">
				<div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
					<div className="flex-grow space-y-4 w-full">
						<Card className="p-6">
							<Form {...form}>
								<form onSubmit={form.handleSubmit(handleSaveClick)}>
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
												{mode === FormAction.CREATE
													? 'Create New Purchase Request'
													: 'Purchase Request Details'}
											</CardTitle>
										</div>
										<div className="flex items-center gap-2">
											{!isEditable ? (
												<>
													<Button onClick={handleEdit}>
														<PencilIcon className="h-4 w-4" />
														Edit
													</Button>
												</>
											) : (
												<>
													<Button
														variant="default"
														disabled={!form.formState.isValid || isSubmitting}
													>
														<CheckCircle className="h-4 w-4" />
														{isSubmitting ? 'Saving...' : 'Save'}
													</Button>
													<Button
														variant="outline"
														onClick={handleCancel}
														disabled={isSubmitting}
													>
														<X className="h-4 w-4" />
														Cancel
													</Button>
												</>
											)}

											<div className="w-px h-6 bg-border mx-2" />

											<Button
												variant="outline"
												size="sm"
												disabled={isSubmitting}
											>
												<PrinterIcon className="h-4 w-4" />
												Print
											</Button>
											<Button
												variant="outline"
												size="sm"
												disabled={isSubmitting}
											>
												<DownloadIcon className="h-4 w-4" />
												Export
											</Button>
											<Button
												variant="outline"
												size="sm"
												disabled={isSubmitting}
											>
												<ShareIcon className=" h-4 w-4" />
												Share
											</Button>
										</div>
									</div>
									<div className="px-2">
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
														<FormLabel className="font-semibold text-xs">
															Ref #
														</FormLabel>
														<FormControl>
															<Input
																className="w-full text-left h-9"
																{...field}
																disabled={!isEditable || isSubmitting}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="date"
												render={({ field }) => (
													<FormItem>
														<FormLabel className="font-semibold text-xs">
															Date
														</FormLabel>
														<FormControl>
															<Popover>
																<PopoverTrigger asChild>
																	<Button
																		variant="outline"
																		className="w-full text-left"
																	>
																		{field.value
																			? format(field.value, 'dd/MM/yyyy')
																			: 'Pick a date'}
																	</Button>
																</PopoverTrigger>
																<PopoverContent align="start">
																	<Calendar
																		className="w-full text-left"
																		selected={field.value}
																		onSelect={(date) => field.onChange(date)}
																		mode="single"
																	/>
																</PopoverContent>
															</Popover>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="type"
												render={({ field }) => (
													<FormItem>
														<FormLabel className="font-semibold text-xs">
															PR Type
														</FormLabel>
														<FormControl>
															<Select
																// onValueChange={field.onChange}
																// value={field.value}
																{...field}
																disabled={!isEditable || isSubmitting}
															>
																<SelectTrigger>
																	<SelectValue placeholder="Select PR Type" />
																</SelectTrigger>
																<SelectContent>
																	{Object.values(PRType).map((type) => (
																		<SelectItem key={type} value={type}>
																			{type}
																		</SelectItem>
																	))}
																</SelectContent>
															</Select>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="requestor"
												render={({ field }) => (
													<FormItem>
														<FormLabel className="font-semibold text-xs">
															Requestor
														</FormLabel>
														<FormControl>
															<Input
																className="w-full text-left h-9"
																{...field}
																value={field.value?.name}
																disabled={!isEditable || isSubmitting}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="department"
												render={({ field }) => (
													<FormItem>
														<FormLabel className="font-semibold text-xs">
															Department
														</FormLabel>
														<FormControl>
															<Input
																className="w-full text-left h-9"
																{...field}
																disabled={!isEditable || isSubmitting}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
											<FormField
												control={form.control}
												name="description"
												render={({ field }) => (
													<FormItem>
														<FormLabel className="font-semibold text-xs">
															Description
														</FormLabel>
														<FormControl>
															<Textarea
																className="w-full text-left h-9"
																{...field}
																disabled={!isEditable || isSubmitting}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<div className="bg-muted p-4 rounded-lg">
												<div className="flex justify-between items-start">
													{[
														'currentWorkflowStage',
														'workflowStatus',
														'status',
													].map((key) => (
														<div key={key} className="space-y-2 text-center">
															<label className="text-sm font-medium block">
																{key
																	.replace(/([A-Z])/g, ' $1')
																	.replace(/^./, (str) => str.toUpperCase())}
															</label>
															<StatusBadge status={form.getValues(key)} />
														</div>
													))}
												</div>
											</div>
										</div>
									</div>
								</form>
							</Form>

							{/* <GoodsReceiveNoteForm
                                form={form}
                                onBack={() => console.log("Go Back")}
                                handleSaveClick={handleSaveClick}
                                isSubmitting={false}
                                isEditable={true}
                                handleEdit={() => console.log("Edit Clicked")}
                                handleCancel={() => console.log("Cancel Clicked")}
                                error={null}
                            /> */}
						</Card>
					</div>
				</div>
			</div>
		</>
	);
};

export default PurchaseRequestComponent;
