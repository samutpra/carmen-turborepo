import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const location_user_item_schema = z.object({
  location_id: z.string().uuid(),
});

export type location_user_item_model = z.infer<
  typeof location_user_item_schema
>;
export class location_user_item implements location_user_item_model {
  location_id!: string;
}

export const location_user_item_schema_remove = z.object({
  user_location_id: z.string().uuid(),
});

export type location_user_item_model_remove = z.infer<
  typeof location_user_item_schema_remove
>;

export class location_user_item_remove
  implements location_user_item_model_remove
{
  user_location_id!: string;
}

export const UpdateLocationUserSchema = z.object({
  locations: z.object({
    add: z.array(location_user_item_schema).optional(),
    remove: z.array(location_user_item_schema_remove).optional(),
  }),
});

export type IUpdateLocationUser = z.infer<typeof UpdateLocationUserSchema>;

export class UpdateLocationUserDto extends createZodDto(
  UpdateLocationUserSchema,
) {}
// export class UpdateLocationUserDto implements UpdateLocationUserModel {
//   locations?: {
//     add?: location_user_item[];
//     remove?: location_user_item_remove[];
//   };
// }
