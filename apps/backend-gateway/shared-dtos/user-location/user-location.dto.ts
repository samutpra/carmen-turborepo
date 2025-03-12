import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const user_location_item_schema = z.object({
  user_id: z.string().uuid(),
});

export type user_location_item_model = z.infer<
  typeof user_location_item_schema
>;
export class user_location_item implements user_location_item_model {
  user_id!: string;
}

export const user_location_item_schema_remove = z.object({
  user_location_id: z.string().uuid(),
});

export type user_location_item_model_remove = z.infer<
  typeof user_location_item_schema_remove
>;

export class user_location_item_remove
  implements user_location_item_model_remove
{
  user_location_id!: string;
}

export const UpdateUserLocationSchema = z.object({
  users: z.object({
    add: z.array(user_location_item_schema).optional(),
    remove: z.array(user_location_item_schema_remove).optional(),
  }),
});

export type IUpdateUserLocation = z.infer<typeof UpdateUserLocationSchema>;

export class UpdateUserLocationDto extends createZodDto(
  UpdateUserLocationSchema,
) {}
// export class UpdateUserLocationDto implements UpdateUserLocationModel {
//   users?: {
//     add?: user_location_item[];
//     remove?: user_location_item_remove[];
//   };
// }
