import { z } from 'zod';

export enum enum_workflow_type {
	purchase_request = 'purchase_request',
	purchase_order = 'purchase_order',
	store_requisition = 'store_requisition',
}

export enum enum_available_actions {
	submit = 'submit',
	approve = 'approve',
	reject = 'reject',
	send_back = 'send_back',
}

export type OperatorType = 'eq' | 'lt' | 'gt' | 'lte' | 'gte';
export type ActionType = 'SKIP_STAGE' | 'NEXT_STAGE';
export type NotificationChannel = 'Email' | 'System';
export type NotificationEventTrigger =
	| 'onSubmit'
	| 'onApprove'
	| 'onReject'
	| 'onSendBack'
	| 'onSLA';

export type AvailableActions = 'submit' | 'approve' | 'reject' | 'send_back';

export type PageMode = 'add' | 'edit' | 'view';

export interface Product {
	id: number;
	name: string;
	code: string;
	category: string;
	subCategory?: string;
	itemGroup?: string;
}

export interface Stage {
	id: number;
	name: string;
	description: string;
	sla: string;
	slaUnit: string;
	availableActions: AvailableActions[];
	hideFields: {
		pricePerUnit: boolean;
		totalPrice: boolean;
	};
	assignedUsers: {
		id: number;
		name: string;
		department: string;
		location: string;
	}[];
}

export interface RoutingCondition {
	field: string;
	operator: OperatorType;
	value: string;
}

export interface RoutingAction {
	type: ActionType;
	parameters: {
		targetStage: string;
	};
}

export interface RoutingRule {
	id: number;
	name: string;
	description: string;
	triggerStage: string;
	condition: RoutingCondition;
	action: RoutingAction;
}

export interface WorkflowNotification {
	id: number;
	event?: string;
	eventTrigger?: NotificationEventTrigger;
	description?: string;
	recipients?: string[];
	channels?: NotificationChannel[];
}

export interface Template {
	id: number;
	name: string;
	eventTrigger: NotificationEventTrigger;
	description?: string;
	subjectLine: string;
	content: string;
}

export interface WorkflowData {
	document_reference_pattern: string;
	stages: Stage[];
	routing_rules: RoutingRule[];
	notifications: WorkflowNotification[];
	notification_templates: Template[];
	products: Product[];
}

export interface Workflow {
	id: string;
	name: string;
	workflow_type: string;
	data: WorkflowData;
	description: string;
	is_active: boolean;
}

export const wfFormSchema = z.object({
	name: z.string().min(1).max(50),
	workflow_type: z.enum([
		enum_workflow_type.purchase_request,
		enum_workflow_type.purchase_order,
		enum_workflow_type.store_requisition,
	]),
	data: z
		.object({
			document_reference_pattern: z.string(),
			stages: z.array(
				z.object({
					name: z.string(),
					description: z.string(),
					sla: z.string(),
					slaUnit: z.string(),
					availableActions: z.array(z.string()),
					hideFields: z.object({
						pricePerUnit: z.boolean(),
						totalPrice: z.boolean(),
					}),
					assignedUsers: z.object({
						name: z.string(),
						department: z.string(),
						location: z.string(),
					}),
				})
			),
			routing_rules: z.array(z.object({})),
			notifications: z.array(z.object({})),
			notification_templates: z.array(z.object({})),
			products: z.array(z.object({})),
		})
		.optional(),
	description: z.string(),
	is_active: z.boolean(),
});

export type WfFormType = z.infer<typeof wfFormSchema>;
