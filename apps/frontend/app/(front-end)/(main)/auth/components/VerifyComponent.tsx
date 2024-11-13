"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { VerifySchema, VerifyType } from '@/lib/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui-custom/FormCustom';
import { InputCustom } from '@/components/ui-custom/InputCustom';
import { PasswordInput } from '@/components/ui-custom/PasswordInput';
import { CustomButton } from '@/components/ui-custom/CustomButton';
import { Checkbox } from '@/components/ui/checkbox';

interface Props {
    token: string;
    email: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VerifyComponent: React.FC<Props> = ({ token, email }) => {
    const [loading, setLoading] = useState(false);

    const form = useForm<VerifyType>({
        resolver: zodResolver(VerifySchema),
        defaultValues: {
            userName: "",
            firstName: "",
            lastName: "",
            middleName: "",
            password: "",
            confirmPassword: "",
            terms: false
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
        <div className='flex flex-col justify-center items-center'>
            <div className='my-auto mb-auto mt-8 flex flex-col max-w-[450px]'>
                <div className='my-2'>
                    <h2 className="text-2xl font-bold">Verify Your Account</h2>
                    <p className="text-gray-600 mt-2 text-xs">
                        Please fill out the form below to verify your account information and complete the registration process.
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField
                            control={form.control}
                            name="userName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <InputCustom
                                            placeholder="Username"
                                            error={!!form.formState.errors.userName}
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
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First name</FormLabel>
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
                            name="middleName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Middle Name</FormLabel>
                                    <FormControl>
                                        <InputCustom
                                            placeholder="Last Name"
                                            error={!!form.formState.errors.middleName}
                                            {...field}
                                        />
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
                                    <FormLabel>Last name</FormLabel>
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

                        <FormField
                            control={form.control}
                            name="terms"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-start">
                                            <Checkbox
                                                id="terms"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                                                I agree to the <a href="#" className="text-blue-500 underline">terms and conditions</a>.
                                            </label>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
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