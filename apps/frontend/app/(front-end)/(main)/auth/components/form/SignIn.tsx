"use client"

import { AuthFormType, SignInSchema } from '@/lib/types';
import React from 'react'
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui-custom/FormCustom';
// import { CustomButton } from '@/components/ui-custom/CustomButton';
// import GoogleIcon from '@/components/icons/GoogleIcon';
import { Separator } from '@/components/ui/separator';
import { InputCustom } from '@/components/ui-custom/InputCustom';
import { PasswordInput } from '@/components/ui-custom/PasswordInput';
import { useAuth } from '@/app/context/AuthContext';

interface Props {
    handleForm: (form: AuthFormType) => void;
}


const SignIn: React.FC<Props> = ({ handleForm }) => {
    const { handleLogin } = useAuth();

    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
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
        } catch (error) {
            console.error('Error during signin:', error);
        }
    }

    const onForgotPassword = () => {
        handleForm(AuthFormType.ForgotPassword)
    }

    const onResetPassword = () => {
        handleForm(AuthFormType.ResetPassword)
    }

    const onSignUp = () => {
        handleForm(AuthFormType.SignUp)
    }

    return (

        <>
            <p className="text-[32px] font-bold">Sign In</p>
            <p className="mb-2.5 mt-2.5 font-normal">Enter your email and password to sign in!</p>
            {/* 
            <CustomButton
                className='w-full'
                prefixIcon={<GoogleIcon />}
                variant='outline'
            >
                Google
            </CustomButton>*/}
            <Separator className="my-4" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <InputCustom
                                        placeholder="Username"
                                        error={!!form.formState.errors.username}
                                        {...field}
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <PasswordInput
                                        placeholder="Password"
                                        error={!!form.formState.errors.password}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        required
                    />
                    <Button type="submit" className="w-full mt-4">
                        Sign in
                    </Button>
                    <Separator className="my-4" />
                    <p className='font-medium text-xs cursor-pointer' onClick={onForgotPassword}>Forgot your password?</p>
                    <p className='font-medium text-xs cursor-pointer' onClick={onResetPassword}>Reset your password</p>
                    <p className='font-medium text-xs cursor-pointer' onClick={onSignUp}>Don&apos;t have an account? Sign up</p>
                </form>
            </Form>
        </>

    )
}

export default SignIn
