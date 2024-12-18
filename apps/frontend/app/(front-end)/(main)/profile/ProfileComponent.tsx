'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera as CameraIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Form schema
const profileFormSchema = z.object({
	username: z.string(),
	email: z.string().email(),
	firstName: z.string().min(2),
	lastName: z.string().min(2),
	language: z.string(),
	timezone: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfileComponent = () => {
	// Initialize form with react-hook-form and zod validation
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: {
			username: 'johndoe',
			email: 'johndoe@example.com',
			firstName: 'John',
			lastName: 'Doe',
			language: 'English',
			timezone: 'UTC',
		},
	});

	const roles = ['User', 'Manager'];
	const businessUnits = ['HQ', 'Branch 1', 'Branch 2'];

	const onSubmit = (data: ProfileFormValues) => {
		console.log(data);
		// Handle form submission
	};

	return (
		<Card className="p-4 bg-background m-6">
			<CardHeader>
				<CardTitle className="text-3xl font-bold">Edit Profile</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="flex items-center space-x-4">
							<Avatar className="w-24 h-24">
								<AvatarImage src="" alt={form.getValues('username')} />
								<AvatarFallback>
									{form.getValues('firstName')[0]}
									{form.getValues('lastName')[0]}
								</AvatarFallback>
							</Avatar>
							<Button
								type="button"
								variant="secondary"
								className="bg-blue-500 text-white hover:bg-blue-600"
							>
								<CameraIcon className="w-4 h-4 mr-2" />
								Change Picture
							</Button>
							<Button asChild>
								<Link href="/profile/change-password">Change Password</Link>
							</Button>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input {...field} disabled className="bg-gray-100" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input {...field} type="email" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>First Name</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="lastName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Last Name</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="space-y-2">
								<Label>Roles</Label>
								<div className="flex flex-wrap gap-2">
									{roles.map((role) => (
										<Badge
											key={role}
											variant="secondary"
											className="bg-blue-100 text-blue-800"
										>
											{role}
										</Badge>
									))}
								</div>
							</div>

							<div className="space-y-2">
								<Label>Business Units</Label>
								<div className="flex flex-wrap gap-2">
									{businessUnits.map((unit) => (
										<Badge
											key={unit}
											variant="secondary"
											className="bg-blue-100 text-blue-800"
										>
											{unit}
										</Badge>
									))}
								</div>
							</div>

							<FormField
								control={form.control}
								name="language"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Language</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a language" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="English">English</SelectItem>
												<SelectItem value="Spanish">Spanish</SelectItem>
												<SelectItem value="French">French</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="timezone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Time Zone</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a timezone" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="UTC">UTC</SelectItem>
												<SelectItem value="EST">EST</SelectItem>
												<SelectItem value="PST">PST</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="flex justify-end">
							<Button type="submit">Save Changes</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default ProfileComponent;
