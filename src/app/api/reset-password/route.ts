import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function POST(req:NextRequest) {
    await dbConnect()

    try {
        const {email, password} = await req.json()

        if(!email || !password){
            return NextResponse.json({
                success: false,
                message: "all fields are required"
            })
        }

        if(password.length < 6){
            return NextResponse.json({
                success: false,
                message: "Password length must be atleast 6 character",
            }, {status: 400})
        }

        const user = await UserModel.findOne({email})

        if(!user){
            return NextResponse.json({
                success: false,
                message: "user not found",
            }, {status: 404})
        }

        const hasedPassword = await bcrypt.hash(password, 10)

        user.password = hasedPassword
        user.verifyCode = undefined
        user.verifyCodeExpiry = undefined

        await user.save()

        return NextResponse.json({
            success: true,
            message: "Password reseted successfully"
        })
    } catch (error) {
        console.log("Error in reset password", error)
        return NextResponse.json({
            success: false,
            message: "Internal server Error"
        }, {status: 500})
    }
}