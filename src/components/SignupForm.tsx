"use client"
import React, { useState } from 'react'
import Input from './ui/Input'
import Button from './ui/Button'
import { LockKeyhole, Mail, Phone } from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from "axios"
import toast from 'react-hot-toast'
import Link from 'next/link'

function SignupForm() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<Array<string> | string >([])

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) =>{
        setErrors([])
        e.preventDefault()
        setIsLoading(true)

        if (!email || !password || !phoneNo){   
            setIsLoading(false)
            setErrors(["All fields are required",])
            return
        }

        try {
            const response = await axios.post("http://localhost:3000/api/signup", {email: email, phone_no:phoneNo, password})

            toast.success(response.data.message)
            setEmail("")
            setPhoneNo("")
            setPassword("")
            router.push("/login")
            router.refresh()
        } catch (error: any) {
            console.log(error)
            setErrors(error.response.data.message)
        } finally{
            setIsLoading(false)
        }
    }

    return (
        <div className='flex flex-col mx-5 p-5 lg:mx-20 lg:p-20 w-full'>
            <h3 className='text-4xl text-center font-extrabold text-heading mb-10'>Create Account</h3>

            <form action="" onSubmit={handleSubmit} className='flex flex-col gap-2  '>
                <Input 
                    label='Email' 
                    icon={<Mail />} 
                    placeholder='email@gmail.com' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value) } 
                />

                <Input 
                    label='Phone no' 
                    icon={<Phone />} 
                    placeholder='Enter Your Phone No' 
                    value={phoneNo} 
                    onChange={(e) => setPhoneNo(e.target.value)} 
                />

                <Input 
                    label='Password'
                    type='password'
                    icon={<LockKeyhole />} 
                    placeholder='Enter Your Password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />

                {errors && Array.isArray(errors) ? errors.length > 0 &&
                    <div className='text-white bg-red-600 m-1 rounded-2xl p-3'>
                        {
                            errors.map((error, idx) => (
                                <p  key={idx}>{error}</p>
                            ) )
                        }
                    </div>
                    :
                    <div className='text-white bg-red-600 m-1 rounded-2xl p-3'>
                        {
                            <p>{errors}</p>
                        }
                    </div>
                }
                
                <div className='mt-10'>
                    <Button type='submit' isLoading={isLoading}>
                        Create Account
                    </Button>
                </div>

                <div className='text-center mt-3 text-sm text-[#553922] opacity-40'>
                    <p>- or -</p>
                </div>

                <div className='flex gap-2 justify-center mt-3 text-sm'>
                    <p className='text-[#757575]'>Already have an account?</p><Link href='/login' className='text-[#C8A882] font-semibold hover:underline' >Sign in</Link>
                </div>
            </form>

        </div>
    )
}

export default SignupForm