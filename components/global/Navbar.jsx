import { auth } from "@/auth";
import Link from "next/link";
import SignOutBtn from "../SignOutBtn";
import Image from "next/image";

const Navbar = async ({active}) => {
  const session = await auth();

  console.log(session);


  const links = [
    {
      label: "Learn with AI",
      href: "/chat",
    },
    {
      label: "Pricing",
      href: "/pricing",
    }
    ,
    
  ]
  return (
    <div className="flex items-center justify-between w-full bg-primary text-white h-[70px] p-3 fixed top-0 left-0 right-0">
      <div>
        <Link href={"/"} className="font-bold text-[25px] text-secondary">Talakative</Link>
      </div>

      <div className="flex items-center gap-10">
       {
        links.map((link, i) => (
          <Link href={link.href} key={i} className="font-light text-[25px] text-secondary">
            {link.label}
          </Link>
        ))
       }
      </div>

      <div>
        <div className="">
          {session ? (
            <div className="flex items-center gap-3">
              <Image src={session?.user?.image} width={35} height={35} alt="user" className="rounded-full"/>
              <SignOutBtn />
            </div>
          ) : (
            <Link href={"/sign-in"} className="bg-secondary px-4 py-2 text-primary font-bold rounded-md">Sign In</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
