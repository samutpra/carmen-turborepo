export interface IUnitCreate {
  name: string;
  description?: string;
  is_active?: boolean;
}

export interface IUnitUpdate {
  id?: string;
  name?: string;
  description?: string;
  is_active?: boolean;
}
