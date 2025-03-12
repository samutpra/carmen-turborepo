import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const ClusterUserCreateSchema = z.object({
  user_id: z.string().uuid(),
  cluster_id: z.string().uuid(),
  is_active: z.boolean().optional().default(true),
});

export type IClusterUserCreate = z.infer<typeof ClusterUserCreateSchema>;

export class ClusterUserCreateDto extends createZodDto(
  ClusterUserCreateSchema,
) {}
// export class ClusterUserCreateDto implements ClusterUserCreateModel {
//   user_id!: string;
//   cluster_id!: string;
//   is_active?: boolean;
// }

export const ClusterUserUpdateSchema = z.object({
  //   id: z.string().uuid(),
  user_id: z.string().uuid(),
  cluster_id: z.string().uuid(),
  is_active: z.boolean().optional(),
});

export type IClusterUserUpdate = z.infer<typeof ClusterUserUpdateSchema>;

export class ClusterUserUpdateDto extends createZodDto(
  ClusterUserUpdateSchema,
) {}
// export class ClusterUserUpdateDto implements ClusterUserUpdateModel {
//   //   id!: string;
//   user_id!: string;
//   cluster_id!: string;
//   is_active?: boolean;
// }
