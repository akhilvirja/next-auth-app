"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()

  useEffect(() =>{
    setTimeout(()=>{
      router.push("/login")
    }, 3000)
  }, [])

  return (
    <div className="bg-primary flex flex-col gap-5 h-screen w-full justify-center items-center">
      <h1 className="text-4xl font-bold text-heading">Welcome</h1>
        
      <p>You will be redirected to login or dashboard</p>
    </div>
  );
}
