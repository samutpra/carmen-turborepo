import { z } from 'zod';

//#region  Zod Create
export const UserBusinessUnitCreateSchema = z
	.object({
		user_id: z
			.string({
				required_error: 'user_id field is required',
			})
			.min(3, 'user_id must be at least 3 characters'),
		business_unit_id: z
			.string({
				required_error: 'business_unit_id field is required',
			})
			.min(3, 'business_unit_id must be at least 3 characters'),
	})
	.strict();

export type UserBusinessUnitCreateModel = z.infer<typeof UserBusinessUnitCreateSchema>;

export class UserBusinessUnitCreateDto implements UserBusinessUnitCreateModel {
	id?: string;
	user_id!: string;
	business_unit_id!: string;
}

//#endregion Zod Create

//#region  Zod Update

export const UserBusinessUnitUpdateSchema = z
	.object({
		id: z.string().optional(),
		user_id: z.string({ required_error: 'user_id field is required' }).optional(),
		business_unit_id: z.string({ required_error: 'business_unit_id field is required' }).optional(),
	})
	.strict();

export type UserBusinessUnitUpdateModel = z.infer<typeof UserBusinessUnitUpdateSchema>;

export class UserBusinessUnitUpdateDto implements UserBusinessUnitUpdateModel {
	id?: string;
	user_id?: string;
	business_unit_id?: string;
}

//#endregion Zod Update

export const mockUserBusinessUnits: UserBusinessUnitCreateDto[] = [
	{
		id: '550e8400-e29b-41d4-a716-446655440030',
		user_id: '550e8400-e29b-41d4-a716-446655440001',
		business_unit_id: '550e8400-e29b-41d4-a716-446655440040'
	},
	{
		id: '550e8400-e29b-41d4-a716-446655440031', 
		user_id: '550e8400-e29b-41d4-a716-446655440002',
		business_unit_id: '550e8400-e29b-41d4-a716-446655440041'
	},
	{
		id: '550e8400-e29b-41d4-a716-446655440032',
		user_id: '550e8400-e29b-41d4-a716-446655440003',
		business_unit_id: '550e8400-e29b-41d4-a716-446655440042'
	},
	{
		id: '550e8400-e29b-41d4-a716-446655440033',
		user_id: '550e8400-e29b-41d4-a716-446655440004',
		business_unit_id: '550e8400-e29b-41d4-a716-446655440043'
	}
];
