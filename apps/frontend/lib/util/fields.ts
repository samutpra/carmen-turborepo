import { enum_location_type } from '@/dtos/location.dto';
import { enum_workflow_type } from '@/dtos/workflow.dto';

export const locationField = [
	{ label: 'Inventory', value: enum_location_type.inventory },
	{ label: 'Direct', value: enum_location_type.direct },
	{ label: 'Consignment', value: enum_location_type.consignment },
];

export const workflowTypeField = [
	{ label: 'Purchase Request', value: enum_workflow_type.purchase_request },
	{ label: 'Purchase Order', value: enum_workflow_type.purchase_order },
	{ label: 'Store Requisition', value: enum_workflow_type.store_requisition },
];
