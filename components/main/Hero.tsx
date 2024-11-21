import React from "react";

import Image from "next/image";

export const Hero = () => {
  return (
    <div className="min-h-screen bg-[#016A70] flex justify-center items-center flex-row px-24 py-8">
      <div className="flex flex-col text-left text-white w-1/2 space-y-2">
        <p className="font-bold text-xl">Hi Folks!</p>
        <p className="text-[#FFFFDD] text-4xl font-bold">Inovation Dedication and</p>
        <p className="text-[#FFFFDD] text-4xl font-bold">and Sustainable Solution</p>
        <p className="text-normal">
          Lorem ipsum dolor sit amet consectetur. Nisl donec tortor volutpat id
          pharetra ultricies mauris. Eget augue at egestas et consequat quis
          ultricies. At vel aenean posuere neque a fermentum donec eros ut. Nullam
          mi egestas sed facilisis.
        </p>
        <button className="border p-2 rounded-lg w-28 mt-6 text-center text-sm">View Details</button>
      </div>
      <div className="w-1/2 flex justify-center ml-8">
        <Image
          src="/orang2.svg"
          alt="orang"
          width={506}
          height={488}
          layout="intrinsic"
        />
      </div>
    </div>
  );
};
