"use client"

import React, { useState } from 'react'
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from '@/lib/i18n';
import { useForm } from 'react-hook-form';
import { SignInSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui-custom/FormCustom';
import { InputCustom } from '@/components/ui-custom/InputCustom';
import * as m from '@/paraglide/messages.js';
import { PasswordInput } from '@/components/ui-custom/PasswordInput';
import { CustomButton } from '@/components/ui-custom/CustomButton';

const SignInForm = () => {
    const { handleLogin } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
        setLoading(true)
        try {
            console.log("Form data:", data);
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),

            });

            const result = await response.json();
            if (!response.ok) {
                console.error('Signin failed:', result);
                return;
            }
            await handleLogin(
                {
                    user: {
                        id: result.id,
                        username: result.username
                    },
                    refresh_token: result.refresh_token,
                },
                result.access_token
            );
            router.push('/dashboard');
        } catch (error) {
            console.error('Error during signin:', error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{m.username()}</FormLabel>
                            <FormControl>
                                <InputCustom
                                    placeholder={m.username()}
                                    error={!!form.formState.errors.username}
                                    {...field}
                                    className='h-9'
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
                            <FormLabel>{m.password()}</FormLabel>
                            <FormControl>
                                <PasswordInput
                                    placeholder={m.password()}
                                    error={!!form.formState.errors.password}
                                    {...field}
                                    className='h-9'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    required
                />
                <CustomButton type="submit" className="w-full mt-4 h-10" loading={loading}>
                    {m.signIn_title()}
                </CustomButton>
            </form>
        </Form>
    )
}

export default SignInForm