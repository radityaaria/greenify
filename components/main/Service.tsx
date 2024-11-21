"use client";
import React from "react";
import Image from "next/image";

const Service = () => {
  return (
    <div id="service" className="flex flex-col items-center bg-[#016A70] justify-start w-full h-auto pb-10 px-4 sm:px-8">
      <div className="min-h-screen flex justify-center items-center flex-row px-24 py-8">
      <div className="flex flex-col text-left text-white w-1/2 space-y-2">
        <p className="font-bold text-2xl">Put Your Trash</p>
        <p className="text-[#FFFFDD] text-5xl font-bold mb-6">We do Collect and Recycle</p>
        <p className="text-normal">
        We do prioritize the fulfillment of customer needs for a product and service, rather than solely focusing on the creation of a new
"eco-product" that may not have a demand, enabling the regular market forces to come into play, operating based on the principles of
supply and demand.
        </p>
      </div>
      <div className="w-1/2 flex justify-center ml-8">
        <Image
          src="/orang3.svg"
          alt="orang"
          width={506}
          height={488}
          layout="intrinsic"
        />
      </div>
    </div>
    </div>
  );
};

export default Service;
