import { dbConnect } from "@/lib/dbConnect";
import { sendEmailWithVerifyCode } from "@/lib/sendEmailWithVerifyCode";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    await dbConnect()

    try {
        const { email } = await req.json()

        if(!email){
            return NextResponse.json({
                success: false,
                message: "Email is required"
            }, {status: 400})
        }

        const user = await UserModel.findOne({email})

        if(!user){
            return NextResponse.json({
                success: false,
                message: "No account found with this email"
            }, {status: 404})
        }

        const verifyCode = Math.floor(100000 + Math.random()*900000).toString()
        const verifyCodeExpiry = new Date(Date.now() + 10*60*1000)

        user.verifyCode = verifyCode;
        user.verifyCodeExpiry = verifyCodeExpiry
        await user.save()

        const emailData = await sendEmailWithVerifyCode(email, verifyCode)

        if(!emailData.success){
            return NextResponse.json({
                success: false,
                message: "Failed to send email"
            }, {status: 500})
        }

        return NextResponse.json({
            success: true,
            message: "Verify Code sent Successfully"
        }, {status: 200})
    } catch (error) {
        console.log("Error in forget password", error)
        return NextResponse.json({
            success: false,
            message: "Internal Server Error"
        }, {status: 500})
    }

}