'use client';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Form from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WorkflowHeader from './WorkflowHeader';
import WorkflowGeneral from '../new/components/WorkflowGeneral';
import WorkflowStages from '../new/components/WorkflowStages';
import WorkflowRouting from '../new/components/WorkflowRouting';
import WorkflowProducts from './WorkflowProducts';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { deleteWorkflow, handleSubmit } from '@/services/workflow';
import { useAuth } from '@/app/context/AuthContext';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { useRouter } from '@/lib/i18n';
import { wfFormSchema, WorkflowCreateModel } from '@/dtos/workflow.dto';
import { enum_sla_unit, enum_workflow_type, formType } from '@/constants/enums';

interface WorkflowDetailProps {
	wfData: WorkflowCreateModel | null;
	mode: formType;
	isRefresh: boolean;
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const WorkflowDetail: React.FC<WorkflowDetailProps> = ({
	wfData,
	mode,
	isRefresh,
	setRefresh,
}) => {
	const { accessToken, tenantId } = useAuth();
	const token = accessToken || '';
	const router = useRouter();
	const [isEditing, setIsEditing] = useState(false);

	const form = useForm<WorkflowCreateModel>({
		resolver: zodResolver(wfFormSchema),
		defaultValues:
			mode === formType.EDIT && wfData
				? { ...wfData }
				: {
						name: '',
						workflow_type: enum_workflow_type.purchase_request,
						data: {
							document_reference_pattern: '',
							stages: [
								{
									name: 'Request Creation',
									description: '',
									sla: '24',
									sla_unit: enum_sla_unit.hours,
									available_actions: {
										submit: {
											is_active: true,
											recipients: {
												requestor: false,
												current_approve: false,
												next_step: false,
											},
										},
										approve: {
											is_active: false,
											recipients: {
												requestor: false,
												current_approve: false,
												next_step: false,
											},
										},
										reject: {
											is_active: false,
											recipients: {
												requestor: false,
												current_approve: false,
												next_step: false,
											},
										},
										sendback: {
											is_active: false,
											recipients: {
												requestor: false,
												current_approve: false,
												next_step: false,
											},
										},
									},
									hide_fields: {
										price_per_unit: false,
										total_price: false,
									},
									assigned_users: [],
								},
								{
									name: 'Completed',
									description: '',
									sla: '0',
									sla_unit: enum_sla_unit.hours,
									available_actions: {
										submit: {
											is_active: false,
											recipients: {
												requestor: false,
												current_approve: false,
												next_step: false,
											},
										},
										approve: {
											is_active: false,
											recipients: {
												requestor: false,
												current_approve: false,
												next_step: false,
											},
										},
										reject: {
											is_active: false,
											recipients: {
												requestor: false,
												current_approve: false,
												next_step: false,
											},
										},
										sendback: {
											is_active: false,
											recipients: {
												requestor: false,
												current_approve: false,
												next_step: false,
											},
										},
									},
									hide_fields: {
										price_per_unit: false,
										total_price: false,
									},
									assigned_users: [],
								},
							],
							routing_rules: [],
							notifications: [],
							notification_templates: [],
							products: [],
						},
						description: '',
						is_active: true,
					},
		mode: 'onSubmit',
	});

	useEffect(() => {
		if (wfData) {
			form.reset({
				...wfData,
			});
		}
	}, [isRefresh]);

	const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsEditing(!isEditing);
	};

	const handleCancelEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsEditing(false);
		if (wfData) {
			form.reset({ ...wfData });
		}
	};

	// const handleSave = (updatedWorkflow: WorkflowCreateModel | undefined) => {
	// 	console.log(updatedWorkflow);
	// 	//setWorkflow(updatedWorkflow);
	// 	setIsEditing(false);
	// };

	const handleDelete = async (
		e: React.MouseEvent<HTMLButtonElement>,
		id: string
	) => {
		e.preventDefault();
		try {
			const response = await deleteWorkflow(token, tenantId, id);
			if (response.ok) {
				toastSuccess({ message: 'Successfully' });
				router.back();
			}
		} catch (error) {
			console.error('Error deleting workflow:', error);
			toastError({ message: 'Failed to delete' });
		}
		setIsEditing(false);
	};

	const stageNames =
		form.getValues('data')?.stages?.map((stage) => stage?.name) || [];

	const onSubmit = async (values: WorkflowCreateModel) => {
		try {
			const result = await handleSubmit(values, token, tenantId, mode);
			if (result) {
				form.reset();
				toastSuccess({
					message:
						mode === formType.ADD
							? 'Workflow created successfully'
							: 'Workflow updated successfully',
				});

				if (mode === formType.ADD && result.id) {
					router.replace(
						`/system-administration/workflow-management/${result.id}`
					);
					setIsEditing(true);
				} else {
					setRefresh(true);
					setIsEditing(false);
				}
			}
		} catch (error) {
			console.error('Error saving vendor:', error);
			toastError({ message: 'Failed to save vendor' });
		}
	};

	return (
		<div className="container mx-auto py-6">
			<Button variant="ghost" asChild className="mb-4">
				<Link href="/system-administration/workflow-management">
					<ArrowLeft className="mr-2 h-4 w-4" /> Back to Workflows
				</Link>
			</Button>

			<Form.Form {...form}>
				<form>
					<WorkflowHeader
						form={form}
						mode={mode}
						isEditing={isEditing}
						onEdit={handleEdit}
						onCancelEdit={handleCancelEdit}
						onDelete={handleDelete}
						onSubmit={onSubmit}
					/>

					<Tabs defaultValue="general">
						<TabsList className="mt-2">
							<TabsTrigger value="general">General</TabsTrigger>
							<TabsTrigger value="stages">Stages</TabsTrigger>
							<TabsTrigger value="routing">Routing</TabsTrigger>
							<TabsTrigger value="products">Products</TabsTrigger>
						</TabsList>
						<TabsContent value="general">
							<WorkflowGeneral control={form.control} isEditing={isEditing} />
						</TabsContent>
						<TabsContent value="stages">
							<WorkflowStages
								form={form}
								control={form.control}
								isEditing={isEditing}
							/>
						</TabsContent>
						<TabsContent value="routing">
							<WorkflowRouting
								form={form}
								control={form.control}
								stagesName={stageNames}
								isEditing={isEditing}
							/>
						</TabsContent>

						<TabsContent value="products">
							<WorkflowProducts
								products={form.getValues('data')?.products || []}
								isEditing={isEditing}
								onSave={(products) => {
									console.log(products);
									// handleSave({
									// 	...wfData,
									// 	data: { ...form.getValues('data'), products },
									// })
								}}
							/>
						</TabsContent>
					</Tabs>
				</form>
			</Form.Form>
		</div>
	);
};

export default WorkflowDetail;
