"use client"
import ForgetPassword from '@/components/ForgetPassword'
import ResetPassword from '@/components/ResetPassword'
import VerifyCode from '@/components/VerifyCode'
import React, { useState } from 'react'

function page() {
    const [currentPage, setCurrentPage] = useState<"forget_password" | "reset_password" | "verify_code">("forget_password")
    const [email, setEmail] = useState("")
    
    if(currentPage === "reset_password"){
        return(<ResetPassword email={email} />)
    }else if(currentPage === "verify_code"){
        return (<VerifyCode changePage={setCurrentPage} email={email} />)
    }else{
        return(<ForgetPassword changePage={setCurrentPage} email={email} setEmail={setEmail} />)
    }
}

export default page