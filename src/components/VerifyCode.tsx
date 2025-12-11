"use client"
import React, { useState } from 'react'
import Input from './ui/Input'
import Button from './ui/Button';

interface verifyCodeProps{
    changePage: React.Dispatch<React.SetStateAction<"forget_password" | "reset_password" | "verify_code">>;
}

function VerifyCode({changePage} : verifyCodeProps) {
    const [verifyCode, setIsVerifyCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    function handleSubmit(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        changePage("reset_password")
    }

    return (
        <>
            <div className='h-screen w-full flex justify-center items-center bg-primary'>
                <form onSubmit={handleSubmit}>
                    <Input 
                        label='Verify Code'
                        type='text'
                        icon = {<></>}
                        placeholder='Enter Verify Code'
                        value={verifyCode}
                        onChange={(e) => {setIsVerifyCode(e.target.value)}}
                    />

                    <Button type='submit' isLoading={isLoading}>
                        Verify
                    </Button>
                </form>
            </div>
        </>
    )
}

export default VerifyCode