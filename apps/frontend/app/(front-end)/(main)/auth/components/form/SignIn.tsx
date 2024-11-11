"use client"

import { AuthFormType } from '@/lib/types';
import React from 'react'
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui-custom/FormCustom';
// import { CustomButton } from '@/components/ui-custom/CustomButton';
// import GoogleIcon from '@/components/icons/GoogleIcon';
import { Separator } from '@/components/ui/separator';

interface Props {
    handleForm: (form: AuthFormType) => void;
}

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});


const SignIn: React.FC<Props> = ({ handleForm }) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log("Form data:", data);
        // handleForm(data); Uncomment this line to use handleForm when ready
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
                                    <Input placeholder="Username" {...field} />
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
                                    <Input type="password" placeholder="Password" {...field} />
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
