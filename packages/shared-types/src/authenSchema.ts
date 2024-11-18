import { z } from "zod";

export const login_user = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

export type LoginUserInput = z.infer<typeof login_user>;

export enum RecoveryPasswordForm {
  RESET = 1,
  FORGOT
}