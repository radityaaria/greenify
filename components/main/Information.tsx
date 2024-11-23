'use client';
import React from 'react';
import Info2 from './Info2';

const Information = () => {

  return (
    <div id='information' className='min-h-screen w-full bg-[#016A70] flex flex-col items-center justify-center'>
      <div className="text-white p-4 mt-20 flex items-center flex-col font-bold">
        <p className='text-2xl tracking-wide'>Information & Education</p>
        <p className='text-[#FFFFDD] text-4xl mt-5'>Waste Flow</p>
      </div>
      <Info2 />
    </div>
  );
};

export default Information;
