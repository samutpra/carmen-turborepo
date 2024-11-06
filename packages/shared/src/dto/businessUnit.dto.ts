export class BusinessUnitCreateDto {
	clusterId!: string;
	code!: string;
	name!: string;
}

export class BusinessUnitUpdateDto extends BusinessUnitCreateDto {
	id!: string;
}
