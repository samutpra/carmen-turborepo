"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { VerifySchema, VerifyType } from '@/lib/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui-custom/FormCustom';
import { InputCustom } from '@/components/ui-custom/InputCustom';
import { PasswordInput } from '@/components/ui-custom/PasswordInput';
import { CustomButton } from '@/components/ui-custom/CustomButton';

const VerifyComponent = () => {
    const [loading, setLoading] = useState(false);

    const form = useForm<VerifyType>({
        resolver: zodResolver(VerifySchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: ""
        },
    });


    const onSubmit = async (data: VerifyType) => {
        setLoading(true)
        try {
            console.log(data);

        } catch (error) {
            console.error('Error during signin:', error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex flex-col justify-center items-center h-[100vh]'>
            <div className='my-auto mb-auto mt-8 flex flex-col md:mt-[70px] w-[350px] max-w-[450px] mx-auto md:max-w-[450px] lg:mt-[130px] lg:max-w-[450px]'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <InputCustom
                                            placeholder="First Name"
                                            error={!!form.formState.errors.firstName}
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
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <InputCustom
                                            placeholder="Last Name"
                                            error={!!form.formState.errors.lastName}
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

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            placeholder="Confirm Password"
                                            error={!!form.formState.errors.confirmPassword}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            required
                        />


                        <CustomButton type="submit" className="w-full mt-4" loading={loading}>
                            Sign up
                        </CustomButton>
                    </form>
                </Form>
            </div>

        </div>
    )
}

export default VerifyComponent