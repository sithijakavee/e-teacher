

import { signIn } from '@/auth'
import Image from 'next/image'
import React from 'react'

const SignInBtn = () => {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit" className='flex items-center gap-2 bg-secondary'>
        <Image src={"/google.png"} width={30} height={30}/>
        <span className='text-primary font-semibold'>Google account</span>
      </button>
    </form>
  )
}

export default SignInBtn