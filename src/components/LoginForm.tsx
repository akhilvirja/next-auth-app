"use client"
import React, { useState } from 'react'
import Input from './ui/Input'
import Button from './ui/Button'
import { LockKeyhole, Mail } from 'lucide-react'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function LoginForm() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e:  React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setIsLoading(true)

        if(!email || !password){
            setIsLoading(false)
            toast.error("All fields are required")
            return
        }

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            if(result?.error){
                toast.error(result.error)
                setIsLoading(false)
            }
            else if(result?.ok){
                toast.success("Login Successfull! Redirecting....")
                setIsLoading(false)
                router.push("/dashboard")
            }
            
        } catch (error) {
            console.log(error)
            toast.error("Something Went Wrong. please try again")
        }
        finally{
            setIsLoading(false)
        }
    }
    return (
        <div className='w-full mx-5 p-5 lg:mx-20 lg:p-20'>
            <h3 className='text-4xl text-center font-bold mb-3 text-heading'>Welcome Back!!</h3>

            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                <Input 
                    label='Email' 
                    icon={<Mail />} 
                    placeholder='email@gmail.com' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value) } 
                />
                <div>
                    <Input 
                        label='Password' 
                        icon={<LockKeyhole />} 
                        placeholder='Enter Your Password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <Link href="/forget-password" className='w-full block text-end font-semibold p-3 text-sm text-[#616161]'>Forget Password?</Link>
                </div>

                <div className='mt-6'>
                    <Button type="submit" isLoading={isLoading}>
                        Login
                    </Button>
                </div>

                <div className='text-center mt-3 text-sm text-[#553922] opacity-40'>
                    <p>- or -</p>
                </div>

                <div className=' flex justify-between my-3 px-25'>
                    <img width="24" height="24" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/>
                    <img width="24" height="24" src="https://img.icons8.com/fluency/48/facebook.png" alt="facebook"/>
                    <img width="25" height="25" src="https://img.icons8.com/ios-filled/50/mac-os.png" alt="mac-os"/>
                </div>

                <div className='flex gap-2 justify-center mt-3 text-sm'>
                    <p className='text-[#757575]'>Dont't have an account?</p><Link href='/signup' className='text-[#C8A882] font-semibold hover:underline'>Sign up</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginForm