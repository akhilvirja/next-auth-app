import LoginForm from '@/components/LoginForm'
import Image from 'next/image'
import photo from "@/../public/Gemini_Generated_Image_2r8w6a2r8w6a2r8w-Photoroom.png"

function login() {
  return (
    <div className='bg-primary h-screen w-full grid grid-cols-2'>
        <div className='flex justify-center items-center col-span-2 lg:col-span-1'>
          <LoginForm />
        </div>
        <div className='hidden lg:flex justify-center items-center overflow-hidden'>
          <div className='bg-secondary h-0 w-0 lg:h-full lg:w-full rounded-t-full mr-20 ml-65 mt-75'>
          </div>
          <div className='absolute'>
            <Image
              src={photo}
              alt='Young man with laptop'
              className='h-0 w-0 lg:h-120 lg:w-full'
            />
          </div>
        </div>
    </div>
  )
}

export default login