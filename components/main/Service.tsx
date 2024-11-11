"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const Service = () => {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowImage(window.innerWidth > 700);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="service" className="flex flex-col items-center justify-start w-full h-auto pb-10 px-4 sm:px-8">
      <div className="text-center mb-8">
        <p className="text-3xl sm:text-4xl lg:text-6xl text-[#344054] mt-20">
          Our <span className="text-[#F6C13F]">Service</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="flex flex-col justify-center text-center md:text-left max-w-lg">
          <p className="text-lg sm:text-xl lg:text-2xl text-[#344054] font-semibold">
            Ready to Use Platform
          </p>
          <p className="text-[#98A2B3] text-sm sm:text-base mt-2">
            We provide ready-to-use platforms that can be customized according to partners' needs.
          </p>
          <p className="text-lg sm:text-xl lg:text-2xl text-[#344054] font-semibold mt-4 md:mt-44">
            Improving Existing Platform
          </p>
          <p className="text-[#98A2B3] text-sm sm:text-base mt-2">
            If a business already has a digital platform but needs improvement and maintenance, we provide services to meet those needs.
          </p>
        </div>
        {showImage && (
          <div className="flex w-full justify-center items-center md:w-1/3">
              <Image
                src="/service-img.svg"
                alt="Service Image"
                width={40}  // Adjust width for better visibility
                height={200} // Adjust height to maintain aspect ratio
                className="object-contain" 
              />
          </div>
        )}
        <div className="flex flex-col justify-center text-center md:text-left max-w-lg">
          <p className="text-lg sm:text-xl lg:text-2xl text-[#344054] font-semibold">
            Infrastructure
          </p>
          <p className="text-[#98A2B3] text-sm sm:text-base mt-2">
            Apart from software, we also provide infrastructure services where businesses can host their digital platforms securely.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Service;
