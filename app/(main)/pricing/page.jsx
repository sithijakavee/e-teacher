import Image from "next/image";
import Link from "next/link";
import React from "react";

const Pricing = () => {
  return (
    <div className="landingImg h-screen w-screen">
      <div className="w-ful h-full flex flex-col lg:flex-row items-center justify-around overflow-hidden">
        <div className=" pt-[100px]">
          <Image
            src={"/homeDevices.png"}
            className=""
            width={350}
            height={500}
            alt=""
          />
        </div>

        
      </div>
    </div>
  );
};

export default Pricing;
