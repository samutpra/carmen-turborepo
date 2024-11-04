export class StoreLocationCreateDto {
  id?: string;
  name: string;
  description?: string | null;
  isActive?: boolean | null;
}

export class StoreLocationUpdateDto extends StoreLocationCreateDto {
  id: string;
}
