import { z } from "zod";

export enum enum_workflow_type {
  purchase_request = "purchase_request",
  purchase_order = "purchase_order",
  store_requisition = "store_requisition",
}

export const WorkflowCreateSchema = z.object({
  name: z.string(),
  workflow_type: z.enum(
    Object.values(enum_workflow_type) as [string, ...string[]],
  ),
  description: z.string().optional(),
  data: z.object({}).optional(),
  is_active: z.boolean().optional().default(true),
});

export type WorkflowCreateModel = z.infer<typeof WorkflowCreateSchema>;

export class WorkflowCreateDto implements WorkflowCreateModel {
  name!: string;
  workflow_type!: enum_workflow_type;
  description?: string;
  data?: object;
  is_active?: boolean;
}

export const WorkflowUpdateSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  workflow_type: z
    .enum(Object.values(enum_workflow_type) as [string, ...string[]])
    .optional(),
  description: z.string().optional(),
  data: z.object({}).optional(),
  is_active: z.boolean().optional(),
});

export type WorkflowUpdateModel = z.infer<typeof WorkflowUpdateSchema>;

export class WorkflowUpdateDto implements WorkflowUpdateModel {
  id?: string;
  name?: string;
  workflow_type?: enum_workflow_type;
  description?: string;
  data?: object;
  is_active?: boolean;
}
