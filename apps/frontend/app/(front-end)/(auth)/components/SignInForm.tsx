"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SignInSchema, SignInType } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui-custom/FormCustom';
import { InputCustom } from '@/components/ui-custom/InputCustom';
import { PasswordInput } from '@/components/ui-custom/PasswordInput';
import { CustomButton } from '@/components/ui-custom/CustomButton';
import {
	handleSignInException,
	processLogin,
	signInAction,
} from '../action/sign-in';
import { toastError } from '@/components/ui-custom/Toast';
import { useAuth } from '@/app/context/AuthContext';
import {
	des_signIn,
	password,
	signIn_title,
	username,
} from '@/paraglide/messages';

const SignInForm = () => {
	const [loading, setLoading] = useState(false);
	const { handleLogin } = useAuth();

	const form = useForm<SignInType>({
		resolver: zodResolver(SignInSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const onSubmit = async (data: SignInType) => {
		setLoading(true);
		try {
			const result = await signInAction(data);
			if (!result) {
				toastError({ message: 'Sign in failed' });
			} else {
				await processLogin(result, handleLogin);
			}
		} catch (error) {
			handleSignInException(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 auth-container"
				data-id="sign-in-form"
			>
				<p className="text-[32px] font-bold" data-id="sign-in-title">
					{signIn_title()}
				</p>
				<p className="mb-2.5 mt-2.5 font-normal" data-id="sign-in-description">
					{des_signIn()}
				</p>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{username()}</FormLabel>
							<FormControl>
								<InputCustom
									placeholder={username()}
									error={!!form.formState.errors.username}
									{...field}
									className="h-9"
									disabled={loading}
									aria-label={username()}
									data-id="username-input"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
					required
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{password()}</FormLabel>
							<FormControl>
								<PasswordInput
									placeholder={password()}
									error={!!form.formState.errors.password}
									{...field}
									className="h-9"
									disabled={loading}
									aria-label={password()}
									data-id="password-input"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
					required
				/>
				<CustomButton
					type="submit"
					className="w-full mt-4 h-10"
					loading={loading}
					disabled={loading}
					data-id="sign-in-button"
				>
					{signIn_title()}
				</CustomButton>
			</form>
		</Form>
	);
};

export default SignInForm