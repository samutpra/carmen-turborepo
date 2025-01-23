import { z } from 'zod';

export const MenuCreateSchema = z.object({
  id: z.string().uuid(),
  name: z
    .string()
    .min(1, 'name must be at least 1 character')
    .max(5, 'name must be at most 5 characters'),
  description: z.string().optional(),
  is_active: z.boolean().default(true),
  is_visible: z.boolean().default(true),
  is_lock: z.boolean().default(true),
});

export type MenuCreateModel = z.infer<typeof MenuCreateSchema>;

export class MenuCreateDto implements MenuCreateModel {
  id!: string;
  name!: string;
  description?: string;
  is_active!: boolean;
  is_visible!: boolean;
  is_lock!: boolean;
}

export const MenuUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  name: z
    .string()
    .min(1, 'name must be at least 1 character')
    .max(5, 'name must be at most 5 characters')
    .optional(),
  description: z.string().optional(),
  is_active: z.boolean().default(true).optional(),
  is_visible: z.boolean().default(true).optional(),
  is_lock: z.boolean().default(true).optional(),
});

export type MenuUpdateModel = z.infer<typeof MenuUpdateSchema>;

export class MenuUpdateDto implements MenuUpdateModel {
  id?: string;
  name?: string;
  description?: string;
  is_active?: boolean;
  is_visible?: boolean;
  is_lock?: boolean;
}

export const mockMenu: MenuCreateDto = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  name: 'Menu1',
  description: 'เมนูตัวอย่าง',
  is_active: true,
  is_visible: true,
  is_lock: true,
};

export const mockMenus: MenuCreateDto[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    name: 'Menu1',
    description: 'เมนูตัวอย่างที่ 1',
    is_active: true,
    is_visible: true,
    is_lock: true,
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174002',
    name: 'Menu2',
    description: 'เมนูตัวอย่างที่ 2',
    is_active: false,
    is_visible: true,
    is_lock: false,
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174003',
    name: 'Menu3',
    description: 'เมนูตัวอย่างที่ 3',
    is_active: true,
    is_visible: false,
    is_lock: true,
  },
];
