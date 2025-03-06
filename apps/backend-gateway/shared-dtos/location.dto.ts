import { z } from "zod";

export enum enum_location_type {
  inventory = "inventory",
  direct = "direct",
  consignment = "consignment",
}

export type location_info = {
  floor?: number;
  building?: string;
  capacity?: number;
  responsibleDepartment?: string;
  itemCount?: number;
  lastCount?: string;
};

export const location_user_schema = z.object({
  user_id: z.string().uuid(),
});

export type location_user = z.infer<typeof location_user_schema>;
export class location_user_item implements location_user {
  user_id!: string;
}

export const LocationCreateSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "name must be at least 1 character"),
  description: z.string().nullable().optional(),
  is_active: z.boolean().default(true).nullable().optional(),
  location_type: z.enum(
    Object.values(enum_location_type) as [string, ...string[]],
  ),
  deliveryPointId: z.string().uuid().nullable().optional(),
  info: z
    .object({
      floor: z.number().optional(),
      building: z.string().optional(),
      capacity: z.number().optional(),
      responsibleDepartment: z.string().optional(),
      itemCount: z.number().optional(),
      lastCount: z.string().optional(),
    })
    .optional(),
});

export type LocationCreateModel = z.infer<typeof LocationCreateSchema>;

export class LocationCreateDto implements LocationCreateModel {
  id?: string;
  name!: string;
  description?: string | null;
  is_active?: boolean | null;
  location_type!: enum_location_type;
  deliveryPointId?: string | null;
  info?: location_info;
  user?: {
    add?: location_user_item[];
  };
}

export const LocationUpdateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "name must be at least 1 character").optional(),
  description: z.string().nullable().optional(),
  is_active: z.boolean().default(true).nullable().optional(),
  location_type: z
    .enum(Object.values(enum_location_type) as [string, ...string[]])
    .optional(),
  deliveryPointId: z.string().uuid().nullable().optional(),
  info: z
    .object({
      floor: z.number().optional(),
      building: z.string().optional(),
      capacity: z.number().optional(),
      responsibleDepartment: z.string().optional(),
      itemCount: z.number().optional(),
      lastCount: z.string().optional(),
    })
    .optional(),
});

export type LocationUpdateModel = z.infer<typeof LocationUpdateSchema>;

export class LocationUpdateDto implements LocationUpdateModel {
  id!: string;
  name!: string;
  description?: string | null;
  is_active?: boolean | null;
  location_type!: enum_location_type;
  deliveryPointId?: string | null;
  info?: location_info;
  user?: {
    add?: location_user_item[];
    remove?: location_user_item[];
  };
}

export const mockLocations: LocationCreateDto[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "คลังสินค้าหลัก",
    description: "คลังสินค้าหลักสำหรับจัดเก็บสินค้าทั่วไป",
    is_active: true,
    location_type: enum_location_type.inventory,
    deliveryPointId: "550e8400-e29b-41d4-a716-446655440010",
    info: {
      floor: 1,
      building: "Building A",
      capacity: 1000,
      responsibleDepartment: "Inventory Department",
      itemCount: 500,
      lastCount: "2023-01-01",
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "คลังสินค้าฝากขาย",
    description: "คลังสินค้าสำหรับสินค้าฝากขาย",
    is_active: true,
    location_type: enum_location_type.consignment,
    deliveryPointId: "550e8400-e29b-41d4-a716-446655440011",
    info: {
      floor: 2,
      building: "Building B",
      capacity: 500,
      responsibleDepartment: "Consignment Department",
      itemCount: 200,
      lastCount: "2023-01-02",
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "คลังสินค้าส่งตรง",
    description: "คลังสินค้าสำหรับการส่งตรงถึงลูกค้า",
    is_active: true,
    location_type: enum_location_type.direct,
    deliveryPointId: "550e8400-e29b-41d4-a716-446655440012",
    info: {
      floor: 3,
      building: "Building C",
      capacity: 200,
      responsibleDepartment: "Direct Department",
      itemCount: 100,
      lastCount: "2023-01-03",
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    name: "คลังสินค้าสำรอง",
    description: "คลังสินค้าสำรองสำหรับสินค้าคงคลัง",
    is_active: false,
    location_type: enum_location_type.inventory,
    deliveryPointId: "550e8400-e29b-41d4-a716-446655440013",
    info: {
      floor: 4,
      building: "Building D",
      capacity: 300,
      responsibleDepartment: "Inventory Department",
      itemCount: 150,
      lastCount: "2023-01-04",
    },
  },
];
