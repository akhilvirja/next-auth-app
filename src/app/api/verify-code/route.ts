import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";

export async function POST(req:NextRequest) {
    await dbConnect()

    try {
        const {email, verifyCode} = await req.json()

        if(!email || !verifyCode){
            return NextResponse.json({
                success: false,
                message: "All fields are required",
            }, {status: 400})
        }

        const user = await UserModel.findOne({email})

        if(!user){
            return NextResponse.json({
                success: false,
                message: "Enterd email is not found. please enter valid email"
            }, {status: 404})
        }

        if(!user.verifyCode){
            return NextResponse.json({
                success: false,
                message: "Verify code not found. please try again"
            }, {status: 404})
        }

        if(new Date() > user.verifyCodeExpiry!){
            return NextResponse.json({
                success: false,
                message: "Verify code has been expired please try again"
            }, {status: 400})
        }

        console.log(typeof(user.verifyCode))
        console.log(typeof(verifyCode))
        console.log(verifyCode !== user.verifyCode)

        if(Number(verifyCode) != Number(user.verifyCode)){
            return NextResponse.json({
                success: false,
                message: "Invalid Code"
            }, {status: 400})
        }

        return NextResponse.json({
            success: true,
            message: "verify code matched successfully"
        }, {status: 200})
        
    } catch (error) {
        console.log("Error in verfy code ", error)
        return NextResponse.json({
            success: false,
            message: "Internal Server Error"
        }, {status: 500})
    }
}