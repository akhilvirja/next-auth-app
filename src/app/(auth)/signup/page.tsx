import SignupForm from '@/components/SignupForm'
import Image from 'next/image'
import photo from "@/../public/Gemini_Generated_Image_7r3ln07r3ln07r3l-Photoroom.png"

function signup() {
  return (
    <div className='bg-primary h-screen w-full  flex lg:grid lg:grid-cols-2'>
        <div className='lg:flex hidden justify-center items-center overflow-hidden col-span-2 lg:col-span-1'>
          <div className='bg-secondary h-0 w-0 lg:h-full lg:w-full rounded-t-full ml-20 mr-65 mt-75'>
          </div>
          <div className='absolute'>
            <Image
              src={photo}
              alt='Young man with laptop'
              className='h-0 w-full lg:h-120 lg:w-full'
            />
          </div>
        </div>
        <div className='flex justify-center items-center col-span-2 lg:col-span-1'>
          <SignupForm />
        </div>
    </div>
  )
}

export default signup