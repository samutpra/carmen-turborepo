import { AuthFormType, EmailType } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui-custom/FormCustom';
import { InputCustom } from '@/components/ui-custom/InputCustom';
import { sendRecoverPasswordEmail } from '../../actions/actions';

interface Props {
    handleForm: (form: AuthFormType) => void;
}

const ForgotPasswordSchema = z.object({
    email: z.string().email(),
});

const ForgotPassword: React.FC<Props> = ({ handleForm }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const form = useForm<EmailType>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });


    const handleResendEmail = async () => {

    };

    const onSubmit = async (data: EmailType) => {
        setIsLoading(true);

        try {
            const emailResult = await sendRecoverPasswordEmail(data.email);
            if (emailResult.error) {
                console.log(emailResult.error);
                return;
            }
            setUserEmail(data.email);
            setIsEmailSent(true);
            console.log('Verification email sent successfully!');

        } catch (error) {
            console.log(error instanceof Error ? error.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false)
        }
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
                                    <InputCustom
                                        type='email'
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
