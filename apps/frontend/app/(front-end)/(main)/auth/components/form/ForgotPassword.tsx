import { AuthFormType } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui-custom/FormCustom';

interface Props {
    handleForm: (form: AuthFormType) => void;
}

const ForgotPasswordSchema = z.object({
    email: z.string().email(),
});

const ForgotPassword: React.FC<Props> = ({ handleForm }) => {
    const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (data: z.infer<typeof ForgotPasswordSchema>) => {
        console.log("Forgot Password data:", data);
        // Add the forgot password handling logic here
    }

    const onSignIn = () => {
        handleForm(AuthFormType.SignIn)
    }
    return (
        <>
            <p className="text-[32px] font-bold">Forgot Password</p>
            <p className="mb-2.5 mt-2.5 font-normal">Enter your email to receive reset instructions</p>
            <Separator className="my-4" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="name@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        required
                    />
                    <Button type="submit" className="w-full mt-4">
                        Send Reset Instructions
                    </Button>
                    <Separator className="my-4" />
                    <p className='font-medium text-xs cursor-pointer' onClick={onSignIn}>Back to Sign in</p>
                </form>
            </Form>
        </>
    );
}

export default ForgotPassword;