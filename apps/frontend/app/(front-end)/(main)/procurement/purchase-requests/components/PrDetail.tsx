'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { formType } from '@/constants/enums';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import PrHeader from './PrHeader';

const purchaseRequestSchema = z.object({
	id: z.string().optional(),
	type: z.string().min(1, { message: 'Type is required' }),
	description: z.string().min(1, { message: 'Description is required' }),
	requestor: z.string().min(1, { message: 'Requestor is required' }),
	department: z.string().min(1, { message: 'Department is required' }),
	date: z.string().optional(),
	status: z.string().optional(),
	amount: z.coerce
		.number()
		.min(0, { message: 'Amount must be a positive number' }),
	currentStage: z.string().optional(),
});

export type PurchaseRequestData = z.infer<typeof purchaseRequestSchema>;

interface PrDetailProps {
	prData?: PurchaseRequestData | null;
	'data-id'?: string;
	formType: formType;
}

const PrDetail: React.FC<PrDetailProps> = ({
	prData,
	'data-id': dataId,
	formType: initialFormType,
}) => {
	// Add state to track current form type
	const [currentFormType, setCurrentFormType] =
		useState<formType>(initialFormType);

	// Add state to track submission status
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Add state to store the updated data after submission
	const [updatedData, setUpdatedData] = useState<PurchaseRequestData | null>(
		prData || null
	);

	// Use the most up-to-date data for display
	const displayData = updatedData || prData;

	// Use the current form type for all checks
	const isReadOnly = currentFormType === formType.VIEW;
	const isCreate = currentFormType === formType.ADD;
	const isViewMode = currentFormType === formType.VIEW;
	const isEditMode = currentFormType === formType.EDIT;

	const form = useForm<PurchaseRequestData>({
		resolver: zodResolver(purchaseRequestSchema),
		defaultValues: displayData
			? {
					...displayData,
					date: displayData.date
						? format(new Date(displayData.date), 'yyyy-MM-dd')
						: '',
				}
			: {
					id: '',
					type: '',
					description: '',
					requestor: '',
					department: '',
					date: '',
					status: isCreate ? 'Draft' : '',
					amount: 0,
					currentStage: isCreate ? 'Initial' : '',
				},
		mode: 'onChange',
	});

	// Get form state to track validity
	const { isValid, isDirty } = form.formState;

	useEffect(() => {
		if (displayData) {
			form.reset({
				...displayData,
				date: displayData.date
					? format(new Date(displayData.date), 'yyyy-MM-dd')
					: '',
			});
		}
	}, [displayData, form]);

	const handleEditMode = () => {
		setCurrentFormType(formType.EDIT);
	};

	const handleCancelEdit = () => {
		if (prData) {
			form.reset({
				...prData,
				date: prData.date ? format(new Date(prData.date), 'yyyy-MM-dd') : '',
			});
		}
		setCurrentFormType(formType.VIEW);
	};

	const handleSubmit = async (data: PurchaseRequestData) => {
		try {
			setIsSubmitting(true);

			console.log('Submitting data:', data);

			setUpdatedData({
				...data,
				status: data.status || (isCreate ? 'Draft' : updatedData?.status || ''),
				currentStage:
					data.currentStage ||
					(isCreate ? 'Initial' : updatedData?.currentStage || ''),
				date: data.date || format(new Date(), 'yyyy-MM-dd'),
			});

			setCurrentFormType(formType.VIEW);
			toastSuccess({
				message: isCreate
					? 'Purchase Request Created'
					: 'Purchase Request Updated',
			});
		} catch (error) {
			console.error('Error submitting form:', error);

			toastError({
				message: `Failed to ${isCreate ? 'create' : 'update'} the purchase request. Please try again.`,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Card data-id={dataId} className="m-3">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
					<PrHeader
						control={form.control}
						isCreate={isCreate}
						isViewMode={isViewMode}
						isReadOnly={isReadOnly}
						isSubmitting={isSubmitting}
						handleCancelEdit={handleCancelEdit}
						isEditMode={isEditMode}
						handleEditMode={handleEditMode}
						isFormValid={isValid && isDirty}
					/>
				</form>
			</Form>
		</Card>
	);
};

export default PrDetail;
