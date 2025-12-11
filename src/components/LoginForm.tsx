"use client"
import React, { useState } from 'react'
import Input from './ui/Input'
import Button from './ui/Button'
import { LockKeyhole, Mail } from 'lucide-react'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

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
        <div>
            <h3 className='text-3xl font-extrabold text-heading'>Welcome Back</h3>

            <form action="" onSubmit={handleSubmit}>
                <Input 
                    label='Email' 
                    icon={<Mail />} 
                    placeholder='email@gmail.com' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value) } 
                />
                
                <Input 
                    label='Password' 
                    icon={<LockKeyhole />} 
                    placeholder='Enter Your Password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />

                <Button type="submit" isLoading={isLoading}>
                    Login
                </Button>
            </form>
        </div>
    )
}

export default LoginForm