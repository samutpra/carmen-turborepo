import { Separator } from '@/components/ui/separator'
import React from 'react'
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui-custom/FormCustom';
import { AuthFormType } from '@/lib/types';
import { InputCustom } from '@/components/ui-custom/InputCustom';

interface Props {
    handleForm: (form: AuthFormType) => void;
}

const SignUpSchema = z.object({
    email: z.string().email()
});

const SignUp: React.FC<Props> = ({ handleForm }) => {

    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (data: z.infer<typeof SignUpSchema>) => {
        console.log("Form data:", data);
        // handleForm(data); Uncomment this line to use handleForm when ready
    }

    const onSignIn = () => {
        handleForm(AuthFormType.SignIn)
    }
    return <>
        <p className="text-[32px] font-bold">Create an account</p>
        <p className="mb-2.5 mt-2.5 font-normal">Enter your email below to create your account
        </p>
        <Separator className="my-4" />
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <InputCustom
                                    placeholder="Email"
                                    error={!!form.formState.errors.email}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    required
                />

                <Button type="submit" className="w-full mt-4">
                    Sign Up
                </Button>
                <Separator className="my-4" />
                <p className='font-medium text-xs cursor-pointer' onClick={onSignIn}>Have Account Already? Back to Sign in</p>
            </form>
        </Form>
    </>
}

export default SignUp