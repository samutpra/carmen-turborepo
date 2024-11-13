'use client'
import { AuthFormType } from '@/lib/types';
import React, { useState } from 'react'
import SignIn from './form/SignIn';
import SignUp from './form/SignUp';
import ForgotPassword from './form/ForgotPassword';
import ResetPassword from './form/ResetPassword';

const AuthList = () => {
    const [formType, setFormType] = useState<AuthFormType>(AuthFormType.SignIn);
    const handleForm = (formType: AuthFormType) => {
        setFormType(formType);
    };
    return (
        <div className='flex flex-col justify-center items-center h-[100vh]'>
            <div className='my-auto mb-auto mt-8 flex flex-col md:mt-[70px] w-[350px] max-w-[450px] mx-auto md:max-w-[450px] lg:mt-[130px] lg:max-w-[450px]'>
                {formType === AuthFormType.SignIn && (
                    <SignIn handleForm={handleForm} />
                )}
                {formType === AuthFormType.SignUp && (
                    <SignUp handleForm={handleForm} />
                )}
                {formType === AuthFormType.ForgotPassword && (
                    <ForgotPassword handleForm={handleForm} />
                )}
                {formType === AuthFormType.ResetPassword && (
                    <ResetPassword handleForm={handleForm} />
                )}
            </div>

        </div>

    )
}

export default AuthList