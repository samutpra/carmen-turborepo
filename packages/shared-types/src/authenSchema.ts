import { z } from 'zod';

export const login_user = z.object({
	username: z.string().min(3),
	password: z.string().min(3),
});

export type LoginUserInput = z.infer<typeof login_user>;

export enum RecoveryPasswordForm {
	RESET = 1,
	FORGOT,
}

export const changePasswordSchema = z
	.object({
		old_password: z.string().min(8, 'Old Password must be at least 8 characters'),
		password: z.string().min(8, 'Password must be at least 8 characters'),
		confirmPassword: z.string().min(8, 'Confirm Password must be at least 8 characters'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;