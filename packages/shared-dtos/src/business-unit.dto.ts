import { z } from 'zod';

//#region  Zod Create
export const BusinessUnitCreateSchema = z
	.object({
		cluster_id: z
			.string({
				required_error: 'cluster_id field is required',
			})
			.min(1, 'cluster_id must be at least 1 characters'),
		code: z
			.string({
				required_error: 'code field is required',
			})
			.min(3, 'code must be at least 3 characters'),
		name: z
			.string({
				required_error: 'name field is required',
			})
			.min(3, 'name must be at least 3 characters'),
		is_hq: z.boolean({
			required_error: 'is_hq field is required',
		}),
		is_active: z.boolean({
			required_error: 'is_active field is required',
		}),
	})
	.required();

export type BusinessUnitCreateModel = z.infer<typeof BusinessUnitCreateSchema>;

export class BusinessUnitCreateDto implements BusinessUnitCreateModel {
	cluster_id!: string;
	code!: string;
	name!: string;
	is_hq!: boolean;
	is_active!: boolean;
}

//#endregion Zod Create

//#region  Zod Update

export const BusinessUnitUpdateSchema = z.object({
	id: z.string().optional(),
	cluster_id: z
		.string({
			required_error: 'cluster_id field is required',
		})
		.min(1, 'cluster_id must be at least 1 characters')
		.optional(),
	code: z
		.string({
			required_error: 'code field is required',
		})
		.min(3, 'code must be at least 3 characters')
		.optional(),
	name: z
		.string({
			required_error: 'name field is required',
		})
		.min(3, 'name must be at least 3 characters')
		.optional(),
	is_hq: z
		.boolean({
			required_error: 'is_hq field is required',
		})
		.optional(),
	is_active: z
		.boolean({
			required_error: 'is_active field is required',
		})
		.optional(),
});

export type BusinessUnitUpdateModel = z.infer<typeof BusinessUnitUpdateSchema>;

export class BusinessUnitUpdateDto implements BusinessUnitUpdateModel {
	id?: string;
	cluster_id?: string;
	code?: string;
	name?: string;
	is_hq?: boolean;
	is_active?: boolean;
}

//#endregion Zod Update
