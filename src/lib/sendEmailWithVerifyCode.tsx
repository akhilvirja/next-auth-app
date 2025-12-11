import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
})

function emailTemplate(verifyCode: string): string{
    return (`
        Your Verify code is : ${verifyCode}
        
        Your Code will expire in 10 minutes
    `)
}

export const sendEmailWithVerifyCode = async (email: string, verifyCode: string) => {
    try {
        const data = await transporter.sendMail({
            from: `Next Auth App | ${process.env.EMAIL_USER}`,
            to: email,
            subject: "Password Reset Verify code",
            html: emailTemplate(verifyCode)
        })

        return {
            success: true,
            message: data.response
        }
    } catch (error) {
        console.log("Error in send email with verify code",error)

        return {
            success: false,
            message: "Failed to send email"
        }
    }
}