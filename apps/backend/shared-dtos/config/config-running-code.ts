import { z } from "zod";

export type ConfigRunningCode = {
  A?: string;
  B?: string;
  C?: string;
  D?: string;
  format?: object;
};

export const ConfigRunningCodeCreateSchema = z.object({
  type: z.string().optional(),
  config: z
    .object({
      A: z.string().optional(),
      B: z.string().optional(),
      C: z.string().optional(),
      D: z.string().optional(),
      format: z.object({}).optional(),
    })
    .optional(),
});

export type ConfigRunningCodeCreateModel = z.infer<
  typeof ConfigRunningCodeCreateSchema
>;

export class ConfigRunningCodeCreateDto
  implements ConfigRunningCodeCreateModel
{
  type?: string;
  config?: ConfigRunningCode;
}

export const ConfigRunningCodeUpdateSchema = z.object({
  type: z.string().optional(),
  config: z
    .object({
      A: z.string().optional(),
      B: z.string().optional(),
      C: z.string().optional(),
      D: z.string().optional(),
      format: z.object({}).optional(),
    })
    .optional(),
});

export type ConfigRunningCodeUpdateModel = z.infer<
  typeof ConfigRunningCodeUpdateSchema
>;

export class ConfigRunningCodeUpdateDto
  implements ConfigRunningCodeUpdateModel
{
  type?: string;
  config?: ConfigRunningCode;
}
