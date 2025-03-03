'use client';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Form from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WorkflowGeneral from './WorkflowGeneral';
import WorkflowStages from './WorkflowStages';
import WorkflowRouting from './WorkflowRouting';
import WorkflowProducts from '../../components/WorkflowProducts';
import { ArrowLeft, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
	WfFormType,
	Workflow,
	enum_sla_unit,
	enum_workflow_type,
	wfFormSchema,
} from '@/dtos/workflow.dto';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createWorkflow } from '../../actions/workflow';
import { useAuth } from '@/app/context/AuthContext';
import { toastSuccess } from '@/components/ui-custom/Toast';
import { useRouter } from '@/lib/i18n';

const WorkflowForm = () => {
	const { accessToken, tenantId } = useAuth();
	const token = accessToken || '';
	const router = useRouter();
	const form = useForm<WfFormType>({
		resolver: zodResolver(wfFormSchema),
		defaultValues: {
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
	});

	const [initForm, setInitForm] = useState<Workflow>({
		id: '0',
		name: '',
		workflow_type: enum_workflow_type.purchase_request,
		data: {
			document_reference_pattern: '',
			stages: [],
			routing_rules: [],
			notifications: [],
			notification_templates: [],
			products: [],
		},
		description: '',
		is_active: true,
	});

	const stageNames =
		form.getValues('data')?.stages?.map((stage) => stage?.name) || [];

	const handleSave = (updatedWorkflow: Workflow) => {
		console.log(updatedWorkflow);
		setInitForm(updatedWorkflow);
	};

	const onSubmit = async (data: WfFormType) => {
		console.log('Form submitted with data:', data);
		const result = await createWorkflow(data, token, tenantId);
		if (result) {
			form.reset();
			toastSuccess({
				message: 'Workflow created successfully',
			});

			router.replace(`/system-administration/workflow-management/${result.id}`);
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
				<form onSubmit={form.handleSubmit(onSubmit)}>
					{/* Header */}
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 py-4">
							<div>
								<div className="flex items-center space-x-2">
									<CardTitle className="text-2xl font-bold">
										Create Workflow
									</CardTitle>
								</div>
							</div>
							<div className="flex space-x-2">
								<Button
									variant="ghost"
									onClick={() => console.log('clearForm')}
								>
									<X className="mr-2 h-4 w-4" />
									Cancel
								</Button>

								<Button type="submit" variant="default">
									<Save className="mr-2 h-4 w-4" />
									Save Changes
								</Button>
							</div>
						</CardHeader>
						<CardContent className="px-6 py-4">
							<p className="text-sm text-muted-foreground">
								{form.getValues('description')}
							</p>
						</CardContent>
					</Card>
					<Tabs defaultValue="general">
						<TabsList className="mt-2">
							<TabsTrigger value="general">General</TabsTrigger>
							<TabsTrigger value="stages">Stages</TabsTrigger>
							<TabsTrigger value="routing">Routing</TabsTrigger>
							<TabsTrigger value="products">Products</TabsTrigger>
						</TabsList>
						<TabsContent value="general">
							<WorkflowGeneral control={form.control} />
						</TabsContent>
						<TabsContent value="stages">
							<WorkflowStages form={form} control={form.control} />
						</TabsContent>
						<TabsContent value="routing">
							<WorkflowRouting
								form={form}
								control={form.control}
								stagesName={stageNames}
							/>
						</TabsContent>
						<TabsContent value="products">
							<WorkflowProducts
								products={initForm.data.products || []}
								isEditing={true}
								onSave={(products) =>
									handleSave({
										...initForm,
										data: { ...initForm.data, products },
									})
								}
							/>
						</TabsContent>
					</Tabs>
				</form>
			</Form.Form>
		</div>
	);
};

export default WorkflowForm;
