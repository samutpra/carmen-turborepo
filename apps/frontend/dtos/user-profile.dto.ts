import { z } from 'zod';

//#region  Zod Create
export const UserProfileCreateSchema = z
  .object({
    user_id: z
      .string({
        required_error: 'user_id field is required',
      })
      .min(3, 'user_id must be at least 3 characters'),
    firstname: z
      .string({
        required_error: 'firstname field is required',
      })
      .min(3, 'firstname must be at least 3 characters'),
    middlename: z
      .string({
        required_error: 'middlename field is required',
      })
      .optional(),
    lastname: z
      .string({
        required_error: 'lastname field is required',
      })
      .optional(),
    bio: z
      .object({
        age: z.number().optional(),
        occupation: z.string().optional(),
        education: z.string().optional(),
        contact: z.string().optional(),
        address: z.string().optional(),
        other: z.string().optional(),
      })
      .optional(),
  })
  .strict();

export type UserProfileCreateModel = z.infer<typeof UserProfileCreateSchema>;

export class UserProfileCreateDto implements UserProfileCreateModel {
  id?: string;
  user_id!: string;
  firstname!: string;
  middlename?: string;
  lastname?: string;
  bio?: {
    age?: number;
    occupation?: string;
    education?: string;
    contact?: string;
    address?: string;
    other?: string;
  };
}

//#endregion Zod Create

//#region  Zod Update

export const UserProfileUpdateSchema = z.object({
  id: z.string().optional(),
  user_id: z
    .string({
      required_error: 'user_id field is required',
    })
    .min(3, 'user_id must be at least 3 characters'),
  firstname: z
    .string({
      required_error: 'firstname field is required',
    })
    .min(3, 'firstname must be at least 3 characters'),
  middlename: z
    .string({
      required_error: 'middlename field is required',
    })
    .optional(),
  lastname: z
    .string({
      required_error: 'lastname field is required',
    })
    .optional(),
  bio: z
    .object({
      age: z.number().optional(),
      occupation: z.string().optional(),
      education: z.string().optional(),
      contact: z.string().optional(),
      address: z.string().optional(),
      other: z.string().optional(),
    })
    .optional(),
});

export type UserProfileUpdateModel = z.infer<typeof UserProfileUpdateSchema>;

export class UserProfileUpdateDto implements UserProfileUpdateModel {
  id?: string;
  user_id!: string;
  firstname!: string;
  middlename?: string;
  lastname?: string;
  bio?: {
    age?: number;
    occupation?: string;
    education?: string;
    contact?: string;
    address?: string;
    other?: string;
  };
}

//#endregion Zod Update
export const mockUserProfiles: UserProfileUpdateDto[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440011',
    user_id: '550e8400-e29b-41d4-a716-446655440001',
    firstname: 'จอห์น',
    lastname: 'โด',
    bio: {
      age: 30,
      occupation: 'โปรแกรมเมอร์',
      education: 'ปริญญาตรี วิศวกรรมคอมพิวเตอร์',
      contact: '081-234-5678',
      address: '123 ถนนสุขุมวิท กรุงเทพฯ 10110',
    },
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440012',
    user_id: '550e8400-e29b-41d4-a716-446655440002',
    firstname: 'เจน',
    middlename: 'แมรี่',
    lastname: 'สมิธ',
    bio: {
      age: 25,
      occupation: 'นักการตลาด',
      education: 'ปริญญาโท บริหารธุรกิจ',
      contact: '089-876-5432',
      address: '456 ถนนสีลม กรุงเทพฯ 10500',
    },
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440013',
    user_id: '550e8400-e29b-41d4-a716-446655440003',
    firstname: 'บ๊อบ',
    lastname: 'วิลสัน',
    bio: {
      age: 35,
      occupation: 'ที่ปรึกษาด้านการเงิน',
      education: 'ปริญญาตรี เศรษฐศาสตร์',
      contact: '062-345-6789',
      address: '789 ถนนเพชรบุรี กรุงเทพฯ 10400',
    },
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440014',
    user_id: '550e8400-e29b-41d4-a716-446655440004',
    firstname: 'แอลิซ',
    lastname: 'จอห์นสัน',
    bio: {
      age: 28,
      occupation: 'นักออกแบบกราฟิก',
      education: 'ปริญญาตรี ศิลปกรรมศาสตร์',
      contact: '095-678-9012',
      address: '321 ถนนรัชดาภิเษก กรุงเทพฯ 10310',
      other: 'รับงานฟรีแลนซ์',
    },
  },
];
