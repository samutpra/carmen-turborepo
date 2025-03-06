import { z } from "zod";

export const UnitCreateSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "name must be at least 1 character"),
  description: z.string().nullable().optional(),
  is_active: z.boolean().default(true).nullable().optional(),
});

export type UnitCreateModel = z.infer<typeof UnitCreateSchema>;

export class UnitCreateDto implements UnitCreateModel {
  id?: string;
  name!: string;
  description?: string | null;
  is_active?: boolean | null;
}

export const UnitUpdateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "name must be at least 1 character").optional(),
  description: z.string().nullable().optional(),
  is_active: z.boolean().default(true).nullable().optional(),
});

export type UnitUpdateModel = z.infer<typeof UnitUpdateSchema>;

export class UnitUpdateDto implements UnitUpdateModel {
  id!: string;
  name?: string;
  description?: string | null;
  is_active?: boolean | null;
}

export enum enum_unit_comment_type {
  user = "user",
  system = "system",
}

export const UnitCommentCreateSchema = z.object({
  type: z
    .enum(Object.values(enum_unit_comment_type) as [string, ...string[]])
    .optional(),
  user_id: z.string().uuid().optional(),
  message: z.string().optional(),
  attachments: z.array(z.object({})).optional(),
});

export type UnitCommentCreateModel = z.infer<typeof UnitCommentCreateSchema>;

export class UnitCommentCreateDto implements UnitCommentCreateModel {
  type?: enum_unit_comment_type;
  user_id?: string;
  message?: string | null;
  attachments?: object[] | null;
}

export const UnitCommentUpdateSchema = z.object({
  type: z
    .enum(Object.values(enum_unit_comment_type) as [string, ...string[]])
    .optional(),
  user_id: z.string().uuid().optional(),
  message: z.string().optional(),
  attachments: z.object({}).optional(),
});

export type UnitCommentUpdateModel = z.infer<typeof UnitCommentUpdateSchema>;

export class UnitCommentUpdateDto implements UnitCommentUpdateModel {
  type?: enum_unit_comment_type;
  user_id?: string;
  message?: string | null;
  attachments?: object;
}

export const mockUnits: UnitCreateDto[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440030",
    name: "ชิ้น",
    description: "หน่วยนับเป็นชิ้น",
    is_active: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440031",
    name: "กล่อง",
    description: "หน่วยนับเป็นกล่อง",
    is_active: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440032",
    name: "แพ็ค",
    description: "หน่วยนับเป็นแพ็ค",
    is_active: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440033",
    name: "ลัง",
    description: "หน่วยนับเป็นลัง",
    is_active: false,
  },
];
