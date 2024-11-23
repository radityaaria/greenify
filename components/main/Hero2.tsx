import Image from 'next/image'
import React from 'react'
import { BsHeartPulse } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FaPlusMinus } from "react-icons/fa6";

const Hero2 = () => {
  return (
    <div className='min-h-screen bg-white text-black flex flex-col justify-center items-center text-center px-24 py-20'>
        <div className='flex flex-row space-x-20 font-bold'>
            <div className='flex items-center flex-col'>
                <p className='text-4xl'>200+</p>
                <p className='mt-4'>Pelanggan</p>    
            </div>
            <div className='flex items-center flex-col'>
                <p className='text-4xl'>20</p>
                <p className='mt-4'>Agen</p>    
            </div>
            <div className='flex items-center flex-col'>
                <p className='text-4xl'>50</p>
                <p className='mt-4'>Tempat Sampah</p>    
            </div>
            <div className='flex items-center flex-col'>
                <p className='text-4xl flex flex-row'><FaPlusMinus className='mt-2 text-2xl'/>150 ton</p>
                <p className='mt-4'>Limbah Daur Ulang</p>    
            </div>
        </div>
        <div className='mt-20 text-black'>
            <p className='font-bold text-2xl'>Layanan Terbaik Kami</p>
        </div>
        <div className='flex flex-row space-x-10 mt-6'>
            <div className='bg-white shadow-xl p-8 rounded-lg w-64 flex flex-col items-center'> 
            <BsHeartPulse className='text-6xl'/>
            <p className='font-semibold mt-3'>Informasi & Edukasi</p>
            <p className='mt-1'>Sosialisasi dan edukasi terhapat seluruh masyarakat tentang pentingnya pengelolaan sampah</p>
            </div>
            <div className='bg-white shadow-xl p-8 rounded-lg w-64 flex flex-col items-center'> 
            <FaTrash className='text-6xl'/>
            <p className='font-semibold mt-3'>Zero Waste</p>
            <p className='mt-1'>Pengeloalaan sampah tanpa sisa dari organik hingga non organik</p>
            </div>
        </div>
        <div className='flex flex-row mt-20'>
            <Image src="jogja.svg" alt='jogja' width={300} height={300} className='w-full h-full' />
        </div>
    </div>
  )
}

export default Hero2