'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from '@/lib/i18n';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');

		try {
			// Here you would typically make an API call to your authentication endpoint
			// For this example, we'll just simulate a successful login
			if (email === 'user@example.com' && password === 'password') {
				// Redirect to dashboard or home page after successful login
				router.push('/dashboard');
			} else {
				setError('Invalid email or password');
			}
		} catch (err) {
			setError('An error occurred. Please try again.');
			console.log(err);
		}
	};

	return (
		<div className='h-auto flex pt-20 justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
			<Card className='w-full max-w-md'>
				<CardHeader>
					<CardTitle className='text-2xl font-bold text-center'>Sign in to your account</CardTitle>
					<CardDescription className='text-center'>
						Enter your email and password to access your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									type='email'
									placeholder='Enter your email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='password'>Password</Label>
								<Input
									id='password'
									type='password'
									placeholder='Enter your password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
						</div>
						{error && (
							<Alert variant='destructive' className='mt-4'>
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}
						<Button type='submit' className='w-full mt-6'>
							Sign in
						</Button>
					</form>
				</CardContent>
				<CardFooter className='flex justify-center'>
					<p className='text-sm text-gray-600'>
						Don&#39;t have an account?{' '}
						<a href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
							Sign up
						</a>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
};

export default LoginPage;
