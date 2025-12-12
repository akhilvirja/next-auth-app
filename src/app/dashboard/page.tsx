"use client"
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function page() {
    const {data, status} = useSession()
    const router = useRouter()

    useEffect(() =>{
        if(status === "unauthenticated"){
            router.push("/login")
        }
    }, [])
    
    return (
        <div className="min-h-screen bg-primary p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-heading">
                            Dashboard
                        </h1>

                        <button
                            onClick={() => signOut({ callbackUrl: '/login' })}
                            className="px-4 py-2 sm:px-6 bg-secondary text-[#92613A] rounded-full font-semibold hover:opacity-90 transition-opacity"
                        >
                            Logout
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 sm:p-6 bg-secondary/20 flex flex-col gap-2 sm:gap-3 rounded-xl">
                            <h2 className="text-lg sm:text-xl font-semibold text-heading mb-1 sm:mb-2">
                                Welcome!
                            </h2>

                            <p className="text-gray-600 text-sm sm:text-base">
                                Email: {data?.user.email}
                            </p>

                            <p className="text-gray-600 text-sm sm:text-base">
                                Phone No: {data?.user.phone_no}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default page