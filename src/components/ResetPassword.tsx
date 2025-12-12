import React, { useState } from 'react'
import Input from './ui/Input'
import { LockIcon, LockKeyhole, UserLock } from 'lucide-react'
import Button from './ui/Button'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from 'axios'

function ResetPassword({email}: {email: string}) {
    const router = useRouter()
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        if(password !== confirmPassword){
            toast.error("Passwords do not match")
            return
        }

        setIsLoading(true)

        try {
            const response = await axios.post("https://next-auth-app-six-alpha.vercel.app/api/reset-password", {email, password})

            if(response.data.success){
                toast.success("Password reset successfully")
                router.push("/login")
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        } finally{
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className='h-screen bg-primary flex justify-center items-center'>
                <form onSubmit={handleSubmit} className='p-8 w-full max-w-md'>
                    <h3 className='text-4xl font-bold text-center text-heading mb-3'>
                        Reset Password
                    </h3>
                    <p className='text-center text-gray-600 mb-8'>
                        Enter your new password
                    </p>

                    <div className='flex flex-col gap-4'>
                        <Input
                            label='New Password'
                            type='password'
                            icon={<LockKeyhole />}
                            placeholder='Enter new password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Input
                            label='Confirm Password'
                            type='password'
                            icon={<LockKeyhole />}
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <div className='mt-4'>
                            <Button type='submit' isLoading={isLoading}>
                                Reset Password
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ResetPassword