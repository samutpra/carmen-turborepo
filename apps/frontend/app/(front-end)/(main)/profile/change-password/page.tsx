'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
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
import {
	changePasswordSchema,
	ChangePasswordType,
} from '@carmensoftware/shared-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ChangePasswordPage: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<ChangePasswordType>({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			old_password: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (data: ChangePasswordType) => {
		setIsLoading(true);
		try {
			const response = await fetch('/api/auth/change-password', {
				method: 'POST',
				body: JSON.stringify(data),
			});
			const result = await response.json();
			console.log(result);
			form.reset();
		} catch (error) {
			console.error('Password change error:', error);
			alert('Failed to change password');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="p-6">
			<Card className="w-full max-w-md mx-auto">
				<CardHeader>
					<CardTitle>Change Password</CardTitle>
				</CardHeader>
				<CardContent>
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

							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Changing Password...
									</>
								) : (
									'Change Password'
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default ChangePasswordPage;
