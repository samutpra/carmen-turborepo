export class ClusterCreateDto {
	clusterId!: string;
	code!: string;
	name!: string;
}

export class ClusterUpdateDto extends ClusterCreateDto {
	id!: string;
}
