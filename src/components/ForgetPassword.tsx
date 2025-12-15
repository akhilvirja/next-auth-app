import React, { useState } from 'react'
import Input from './ui/Input'
import Button from './ui/Button';
import toast from 'react-hot-toast';
import { Mail } from 'lucide-react';
import { axiosInstance } from '@/lib/axios';

interface forgetPasswordProps{
    changePage: React.Dispatch<React.SetStateAction<"forget_password" | "reset_password" | "verify_code">>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
}

function ForgetPassword({changePage, email, setEmail} : forgetPasswordProps) {
    const [emailInput, setEmailInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await axiosInstance.post("/api/forget-password", {email: emailInput})
            if(response.data.success){
                toast.success(response.data.message)
                setEmail(emailInput) 
                changePage("verify_code")
            } 
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        } finally{
            setIsLoading(false)
        }
    }
    return (
        <>
            <div className='h-screen flex justify-center items-center bg-primary'>
                <form onSubmit={handleSubmit} className='p-8 w-full max-w-md'>
                    <h3 className='text-4xl font-bold text-center text-heading mb-3'>
                        Forgot Password?
                    </h3>
                    <p className='text-center text-gray-600 mb-8'>
                        Enter your email to receive a verification code
                    </p>

                    <div className='flex flex-col gap-6'>
                        <Input
                            label='Email'
                            type='email'
                            icon={<Mail />}
                            placeholder='email@gmail.com'
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                        />

                        <Button type="submit" isLoading={isLoading}>
                            Send Code
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ForgetPassword