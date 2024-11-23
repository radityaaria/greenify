import Image from 'next/image';
import React from 'react'
import { FaPlusMinus } from "react-icons/fa6";

function Service2() {
  const items = [
    {
      title: "Botol PETE / PET Plastik",
      description: "Dapat di daur ulang",
      imageUrl: "/path/to/bottle.png", // ganti dengan URL gambar
    },
    {
      title: "Botol Kaca",
      description: "Dapat di daur ulang",
      imageUrl: "/path/to/glass-bottle.png", // ganti dengan URL gambar
    },
    {
      title: "Plastik Polypropylene",
      description: "Dapat di daur ulang",
      imageUrl: "/path/to/polypropylene.png", // ganti dengan URL gambar
    },
    {
      title: "Tas Plastik",
      description: "Dapat di daur ulang",
      imageUrl: "/path/to/plastic-bag.png", // ganti dengan URL gambar
    },
    {
      title: "Limbah Kertas/Karton",
      description: "Dapat di daur ulang",
      imageUrl: "/path/to/paper.png", // ganti dengan URL gambar
    },
    {
      title: "Segala Jenis Limbah Organik",
      description: "Dapat di daur ulang",
      imageUrl: "/sayur.png", // ganti dengan URL gambar
    },
  ];
  
  return (
    <div className='bg-white min-h-screen items-center text-black p-10 flex flex-col rounded-[45px] w-full'>
        <div className='flex flex-row space-x-6'>
            <div className='bg-white shadow-lg rounded-lg py-6 px-12 flex flex-col items-center justify-center'>
                <p className='text-3xl flex flex-row font-bold text-[#016A70]'><FaPlusMinus className='mt-2 mr-2 text-xl'/>50 Kilos</p>
                <p className='mt-3 font-semibold'>Limbah Plastik Setiap Hari</p>
            </div>
            <div className='bg-white shadow-lg rounded-lg py-6 px-12 flex flex-col items-center justify-center'>
                <p className='text-3xl flex flex-row font-bold text-[#016A70]'><FaPlusMinus className='mt-2 mr-2 text-xl'/>10 Kilos</p>
                <p className='mt-3 font-semibold'>Daur Ulang Botol Plastik</p>
            </div>
        </div>
        <div className='font-bold mt-14 flex items-center flex-col space-y-5'>
          <p className='text-lg'>Zero Waste Organic Dan Non Organic</p>
          <p className='text-3xl text-[#016A70]'>Sampah Juga Berharga!!!</p>
          <p className='font-light text-md text-center px-60'>Kami ingin memulihkan dan mendistribusikan limbah plastik berkualitas tinggi pada saat yang sama membangun ekonomi sirkular yang memastikan pemulihan material untuk masuk kembali ke dalam rantai pasokan sistem pengelolaan limbah yang baik</p>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-20">
          {items.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg flex items-center flex-col">
              <Image src={item.imageUrl} alt={item.title} height={140} width={140}/>
              <p className='text-md font-semibold mt-2'>{item.title}</p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Service2