import React from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const changePasswordSchema = z
	.object({
		old_password: z
			.string()
			.min(8, 'Old Password must be at least 8 characters'),
		password: z.string().min(8, 'Password must be at least 8 characters'),
		confirmPassword: z
			.string()
			.min(8, 'Confirm Password must be at least 8 characters'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

type ChangePasswordType = z.infer<typeof changePasswordSchema>;

const ChangePasswordPage: React.FC = () => {
	// Define the form
	const form = useForm<ChangePasswordType>({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			old_password: '',
			password: '',
			confirmPassword: '',
		},
	});

	// Handle form submission
	const onSubmit = async (data: ChangePasswordType) => {
		try {
			// TODO: Implement actual password change logic
			console.log('Password change data:', data);
			// Typically you would call an API endpoint here
			alert('Password change submitted successfully!');
		} catch (error) {
			console.error('Password change error:', error);
			alert('Failed to change password');
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
			<h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="old_password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Current Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="Enter current password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>New Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="Enter new password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm New Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="Confirm new password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-full">
						Change Password
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default ChangePasswordPage;
