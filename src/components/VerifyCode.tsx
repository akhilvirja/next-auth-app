"use client"
import React, { useState } from 'react'
import Input from './ui/Input'
import Button from './ui/Button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { KeyRound } from 'lucide-react';

interface verifyCodeProps{
    changePage: React.Dispatch<React.SetStateAction<"forget_password" | "reset_password" | "verify_code">>;
    email: string;
}

function VerifyCode({changePage, email} : verifyCodeProps) {
    const [verifyCode, setVerifyCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await axios.post("https://next-auth-app-six-alpha.vercel.app/api/verify-code", {email, verifyCode})
            if(response.data.success){
                toast.success(response.data.message)
                changePage("reset_password")
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
                <form onSubmit={handleSubmit} className="p-8 w-full max-w-md">
                    <h3 className='text-4xl font-bold text-center text-heading mb-3'>
                        Verify Code
                    </h3>
                    <p className='text-center text-gray-600 mb-8'>
                        Enter the code sent to {email}
                    </p>

                    <div className='flex flex-col gap-6'>
                        <Input
                            label='Verification Code'
                            type='text'
                            icon={<KeyRound />}
                            placeholder='Enter code'
                            value={verifyCode}
                            onChange={(e) => setVerifyCode(e.target.value)}
                        />

                        <Button type='submit' isLoading={isLoading}>
                            Verify
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default VerifyCode