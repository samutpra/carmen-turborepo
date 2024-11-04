export class TenantCreateDto {
  code: string;
  name: string;
  companyId: string;
}

export class TenantUpdateDto extends TenantCreateDto {
  id: string;
}
