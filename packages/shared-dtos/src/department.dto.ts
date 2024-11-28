export class DepartmentCreateDto {
	id?: string;
	name!: string;
	is_active?: boolean | null;
}

export class DepartmentUpdateDto extends DepartmentCreateDto {
	override id!: string;
}

export class DepartmentDto {
	id!: number;
	name!: string;
	description!: string;
}
