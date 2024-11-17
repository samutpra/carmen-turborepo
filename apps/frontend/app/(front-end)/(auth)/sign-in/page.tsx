import React from 'react'
import SignInForm from "../components/SignInForm"
import { Separator } from '@/components/ui/separator'
import * as m from '@/paraglide/messages.js';

const SignInPage = () => {
    return (

        <div className='my-auto mb-auto mt-8 flex flex-col md:mt-[70px] w-[350px] max-w-[450px] mx-auto md:max-w-[450px] lg:mt-[130px] lg:max-w-[450px]'>
            <p className="text-[32px] font-bold">{m.signIn_title()}</p>
            <p className="mb-2.5 mt-2.5 font-normal">{m.des_signIn()}</p>
            <Separator className="my-4" />
            <SignInForm />
            <Separator className="my-6" />
        </div>

    )
}

export default SignInPage