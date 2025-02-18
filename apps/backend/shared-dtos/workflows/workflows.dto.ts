import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";
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
  // id: z.string().uuid(),
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
  // id?: string;
  name?: string;
  workflow_type?: enum_workflow_type;
  description?: string;
  data?: object;
  is_active?: boolean;
}

export class workflowDTO {
  @ApiProperty({
    type: String,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    enum: enum_workflow_type,
    nullable: false,
    default: enum_workflow_type.purchase_request,
  })
  @IsString()
  @IsNotEmpty()
  workflow_type: enum_workflow_type;

  @ApiPropertyOptional({ type: String, nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ type: Object, nullable: true })
  @IsObject()
  @IsOptional()
  data?: object;

  @ApiPropertyOptional({ type: Boolean, nullable: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

export class workflowUpdateDTO {
  @ApiPropertyOptional({
    type: String,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional({
    enum: enum_workflow_type,
    nullable: true,
    default: enum_workflow_type.purchase_request,
  })
  @IsEnum(enum_workflow_type)
  @IsOptional()
  workflow_type: enum_workflow_type;

  @ApiPropertyOptional({ type: String, nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ type: Object, nullable: true })
  @IsObject()
  @IsOptional()
  data?: object;

  @ApiPropertyOptional({ type: Boolean, nullable: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
