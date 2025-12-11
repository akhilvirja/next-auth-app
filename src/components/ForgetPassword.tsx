import React, { useState } from 'react'
import Input from './ui/Input'
import Button from './ui/Button';

interface forgetPasswordProps{
    changePage: React.Dispatch<React.SetStateAction<"forget_password" | "reset_password" | "verify_code">>;
}

function ForgetPassword({changePage} : forgetPasswordProps) {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    function handleSubmit(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        changePage("verify_code")
    }
    return (
        <>
            <div className='h-screen w-full flex justify-center items-center bg-primary'>
                <form onSubmit={handleSubmit}>
                    <Input
                        label='Email'
                        type='text'
                        icon = {<></>}
                        placeholder='Enter Verify Code'
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                    />

                    <Button type="submit" isLoading={isLoading}>
                        Submit
                    </Button>
                </form>
            </div>
        </>
    )
}

export default ForgetPassword