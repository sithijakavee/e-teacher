
import { signOut } from '@/auth'
import React from 'react'

const SignOutBtn = () => {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit" className="bg-secondary px-3 py-2 text-primary font-bold rounded-md">Logout</button>
    </form>
  )
}

export default SignOutBtn