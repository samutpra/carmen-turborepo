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
		old_password: z
			.string()
			.min(8, 'Old Password must be at least 8 characters')
			.max(100, 'Old Password must not exceed 100 characters'),
		// .regex(
		// 	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
		// 	'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
		// ),
		password: z
			.string()
			.min(8, 'Password must be at least 8 characters')
			.max(100, 'Password must not exceed 100 characters'),
		// .regex(
		// 	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
		// 	'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
		// ),
		confirmPassword: z
			.string()
			.min(8, 'Confirm Password must be at least 8 characters')
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	})
	.refine((data) => data.old_password !== data.password, {
		message: 'New password must not be the same as the old password',
		path: ['password'],
	})
	.refine(
		(data) => {
			const commonPasswords = ['password123', 'admin123', '12345678'];
			return !commonPasswords.includes(data.password.toLowerCase());
		},
		{
			message: 'Password is too common. Please choose a stronger password',
			path: ['password'],
		}
	);

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;