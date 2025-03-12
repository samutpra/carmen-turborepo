import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const DepartmentUserCreateSchema = z.object({
  department_id: z.string().uuid(),
  user_id: z.string().uuid(),
  hod: z.boolean().optional().default(false),
});

export type IDepartmentUserCreate = z.infer<typeof DepartmentUserCreateSchema>;

export class DepartmentUserCreateDto extends createZodDto(
  DepartmentUserCreateSchema,
) {}
// export class DepartmentUserCreateDto implements DepartmentUserCreateModel {
//   department_id!: string;
//   user_id!: string;
//   hod?: boolean;
// }

export const DepartmentUserUpdateSchema = z.object({
  department_id: z.string().uuid(),
  user_id: z.string().uuid(),
  hod: z.boolean().optional(),
});

export type IDepartmentUserUpdate = z.infer<typeof DepartmentUserUpdateSchema>;

export class DepartmentUserUpdateDto extends createZodDto(
  DepartmentUserUpdateSchema,
) {}
// export class DepartmentUserUpdateDto implements DepartmentUserUpdateModel {
//   department_id!: string;
//   user_id!: string;
//   hod?: boolean;
// }
