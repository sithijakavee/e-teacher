import { auth, signIn, signOut } from "@/auth";
import SignInBtn from "@/components/SignInBtn";
import SignOutBtn from "@/components/SignOutBtn";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await auth();

  if(session?.user){
    redirect("/")
    return null
  }
  // console.log(session.user);

  return (
    <div className="landingImg flex items-center justify-center m-auto w-full h-screen bg-slate-500">
      <div className="w-[300px] bg-primary flex flex-col items-center justify-center p-10 rounded-md gap-8">
        <h1 className="text-2xl text-secondary font-bold">Sign In With</h1>
        <SignInBtn />
      </div>
      
    </div>
  )
}
