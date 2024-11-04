export class UserTenantCreateDto {
  id?: string;
  userId?: string | null;
  tenantId?: string | null;
}

export class UserTenantUpdateDto extends UserTenantCreateDto {
  id: string;
}
