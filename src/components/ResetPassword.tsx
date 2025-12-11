import React, { useState } from 'react'
import Input from './ui/Input'
import { LockIcon, UserLock } from 'lucide-react'
import Button from './ui/Button'
import { useRouter } from 'next/navigation'

function ResetPassword() {
    const router = useRouter()
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    function handleSubmit(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        router.push("/login")
    }

    return (
        <>
            <div className='h-screen w-full bg-primary flex justify-center items-center'>
                <form onSubmit={handleSubmit}>
                    <Input
                        label='Password'
                        type='text'
                        icon={<LockIcon />}
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                    <Input
                        label='Confirm Password'
                        type='text'
                        icon={<UserLock />}
                        placeholder='Enter Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => {setConfirmPassword(e.target.value)}}
                    />

                    <Button
                        type='submit'
                        isLoading={isLoading}
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </>
    )
}

export default ResetPassword