import React, { useState } from 'react';
import {
	FormAction,
	PRType,
	PurchaseRequest,
	DocumentStatus,
	WorkflowStatus,
	WorkflowStage,
} from '@/lib/types';
import { useRouter } from '@/lib/i18n';
import { formSchema, FormValues } from '../../type/type';
import { submitForm } from '../../lib/action';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const initialData = {
	id: 0,
	refNumber: '',
	date: new Date(),
	vendor: '',
	vendorId: '',
	type: PRType.GeneralPurchase,
	deliveryDate: new Date(),
	description: '',
	requestorId: '',
	requestor: {
		name: '',
		id: '',
		department: '',
	},
	status: DocumentStatus.Draft,
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
	refNumber: '',
	date: new Date(),
	vendor: '',
	vendorId: '',
	type: PRType.GeneralPurchase,
	deliveryDate: new Date(),
	description: '',
	requestorId: '',
	requestor: {
		name: '',
		id: '',
		department: '',
	},
	status: DocumentStatus.Draft,
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
		defaultValues: {
			ref: '',
			date: new Date(),
			vendor: '',
			invoiceNumber: '',
		},
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
			form.reset();
			router.push('/procurement/purchase-requests');
		} catch (error) {
			setError(
				error instanceof Error ? error.message : 'An unexpected error occurred'
			);
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
			router.push(`/procurement/purchase-requests/${id}/edit`);
		}
	};

	const resetForm = () => {
		form.reset();
		setMode(FormAction.VIEW);
		setError(null);
		router.push('/procurement/purchase-requests');
	};

	const handleConfirmCancel = () => {
		resetForm();
		setIsDialogOpen(false);
	};

	return <div>PurchaseRequestComponent</div>;
};

export default PurchaseRequestComponent;
