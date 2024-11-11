'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const VissionAndMission = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div id='vision' className='min-h-screen w-full p-4 bg-[#F2F4F7] rounded-[45px] flex items-center'>
      <div className='flex flex-col justify-center items-center max-w-[1440px] h-auto lg:h-[806px] bg-[#F2F4F7] rounded-[50px] mx-auto'>
        <div className='flex flex-col items-center lg:flex-row lg:items-start justify-between w-full px-4 lg:px-[71px] py-4 lg:py-[122px] gap-4 lg:gap-[48px]'>
          <div
            className="relative w-40 h-40 lg:w-60 lg:h-60 mt-4 lg:mt-0 mb-24 lg:mr-8 "  
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              className="absolute w-full h-full"
              initial={{ scale: 1.5, y: 18 }}
              animate={{ scale: isHovered ? 2.0 : 1 }}
              transition={{ duration: 0.2 }}
              style={{ zIndex: isHovered ? 1 : 0 }}
            >
              <Image
                src="/logohover.svg"
                alt="Logo 2"
                layout="fill"
                objectFit="contain"
              />
            </motion.div>

            <motion.div
              className="absolute w-full h-full"
              initial={{ scale: 1.5, y: 0 }}
              animate={{ y: isHovered ? 60 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ zIndex: isHovered ? 2 : 0 }}
            >
              <Image
                src="/logo.svg"
                alt="Logo 1"
                layout="fill"
                objectFit="contain"
              />
            </motion.div>
          </div>

          <div className='flex flex-col items-center lg:items-start w-full lg:w-[653px] text-center lg:text-left'>
            <h1 className='text-3xl lg:text-6xl font-bold mb-4 lg:mb-8'>
              <span className='text-[#344054]'>VISION AND</span> <span className='text-[#F6C13F]'>MISSION</span>
            </h1>
            <p className='w-full lg:w-[653px] font-inter font-normal text-sm lg:text-[15px] leading-6 lg:leading-[24px] tracking-tight text-[#98A2B3] mb-4'>
              To embrace the era of digital technologies with the vision to innovate, maintain and expand digital technology
              based on our cultural identity, tradition and values as Indonesian next generation.
            </p>
            <p className='w-full lg:w-[653px] font-inter font-normal text-sm lg:text-[15px] leading-6 lg:leading-[24px] tracking-tight text-[#98A2B3] mb-8 lg:mb-8'>
              To decentralize and balance out digital technology in Indonesia and to spread technology equally in nusantara.
            </p>
            <div className='flex justify-center lg:justify-start'>
              <Link href="/contact" passHref>
                <button className='font-bold flex flex-row justify-center items-center py-2 lg:py-[33px] px-4 lg:px-[49px] gap-2 lg:gap-[10px] w-full lg:w-[220px] h-12 lg:h-[50px] border border-solid border-black rounded-full lg:rounded-[32px] bg-[#ffffff] text-[#151515] transition duration-300 ease-out hover:bg-[#151515] hover:text-[#ffffff]'>
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VissionAndMission;
