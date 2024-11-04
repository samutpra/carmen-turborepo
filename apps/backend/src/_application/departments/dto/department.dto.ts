export class DepartmentCreateDto {
  id?: string;
  name: string;
  isActive?: boolean | null;
}

export class DepartmentUpdateDto extends DepartmentCreateDto {
  id: string;
}

export class DepartmentDto {
  id: number;
  name: string;
  description: string;
}
