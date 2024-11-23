"use client";
import React from "react";
import Image from "next/image";
import Service2 from "./Service2";

const Service = () => {
  return (
    <div
      id="service"
      className="flex flex-col items-center bg-[#016A70] justify-start w-full h-auto"
    >
      <div className="min-h-screen flex justify-center items-center flex-row px-24 py-8">
        <div className="flex flex-col text-left text-white w-3/5 space-y-3">
          <p className="font-bold text-2xl">Buanglah Sampah Anda</p>
          <p className="text-[#FFFFDD] text-5xl font-bold mb-6">
            Kami melakukan Pengumpulan dan Pendaurulangan
          </p>
          <p className="text-normal">
            Kami memprioritaskan pemenuhan kebutuhan pelanggan akan produk dan
            layanan, daripada hanya berfokus pada penciptaan “produk ramah
            lingkungan” yang mungkin tidak memiliki permintaan, sehingga
            memungkinkan kekuatan pasar biasa untuk berperan, beroperasi
            berdasarkan prinsip penawaran dan permintaan.
          </p>
        </div>
        <div className="w-2/5 flex justify-center ml-8">
          <Image
            src="/orang3.svg"
            alt="orang"
            width={506}
            height={488}
            layout="intrinsic"
          />
        </div>
      </div>
      <Service2 />
    </div>
  );
};

export default Service;
