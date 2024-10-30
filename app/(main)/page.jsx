import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="landingImg h-screen w-screen pb-3">
      <div className="w-ful h-full flex flex-col lg:flex-row items-center justify-around overflow-x-hidden lg:overflow-hidden">
        <div className="pt-[100px]">
          <Image
            src={"/homeDevices.png"}
            className=""
            width={350}
            height={500}
            alt=""
          />
        </div>

        <div className="text-center lg:text-left">
          <h1 className="text-[70px] font-bold text-primary">Learn English</h1>
          
          <h1 className="text-[70px] font-extrabold text-secondary">With AI</h1>
          <br />
          <br />
          <Link href={"/chat"} className="bg-secondary px-5 py-3 text-dark font-bold rounded-md text-3xl">Start Learning</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
