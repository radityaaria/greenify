import React from "react";
import Hero2 from "./Hero2";
import Image from "next/image";

export const Hero = () => {
  return (
    <div>
      <div id="hero" className="min-h-screen bg-[#016A70] flex justify-center items-center flex-row px-24 py-8">
        <div className="flex flex-col text-left text-white w-1/2 space-y-2">
          <p className="font-bold text-xl">Hi Folks!</p>
          <p className="text-[#FFFFDD] text-4xl font-bold">
          Dedikasi Inovasi
          </p>
          <p className="text-[#FFFFDD] text-4xl font-bold">
          dan Solusi Berkelanjutan
          </p>
          <p className="text-normal">
            Selamat datang di Greenify, tempat kami mengubah limbah menjadi
            peluang berkelanjutan. Di Greenify, kami memiliki misi yang jelas:
            merevolusi pengelolaan sampah dengan menawarkan solusi zero waste
            untuk semua jenis sampah. Dedikasi kami didasarkan pada keyakinan
            akan inovasi, tanggung jawab, dan masa depan yang lebih hijau untuk
            semua.
          </p>
          <button className="border p-2 rounded-lg w-28 mt-6 text-center text-sm">
            View Details
          </button>
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
      <Hero2 />
    </div>
  );
};
