"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromTop } from "@/utils/motion";
import Image from "next/image";

const HeroContent = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        className={`flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 lg:px-20 mt-10 md:mt-28 w-full z-[20] transition-all duration-300 ${
          isHovered ? "opacity-0 translate-y-20" : "opacity-100 translate-y-0"
        }`}
      >
        <div id='about-me' className="mt-8 md:mt-1 scale-75 lg:scale-90 h-full flex flex-col gap-5 items-center justify-center m-auto text-start sm:mt-20">
          <motion.div variants={slideInFromTop}>
            <Image src="/hello.png" height={90} width={90} alt="hello" />
          </motion.div>
        </div>

        <motion.div variants={slideInFromLeft(0.5)} className="text-center mt-4">
          <p className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl">Carakan</p>
          <p className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl mt-2">Sadhana Dirgantara</p>
        </motion.div>
      </motion.div>

      <div className="relative mt-4 flex items-center justify-center">
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image src="/globe1.png" width={1400} height={1400} alt="globe" className="w-full h-auto max-w-[600px] sm:max-w-[800px] md:max-w-[1000px] lg:max-w-[1200px]" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="relative">
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: isHovered ? 8.2 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute top-10 sm:top-20 md:top-24 right-20 sm:right-40 md:right-32 lg:top-16 lg:right-48 z-[10]"
                >
                  <Image
                    src="/partikel.svg"
                    width={100}
                    height={100}
                    alt="partikel"
                    className="w-10 h-10 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
                  />
                </motion.div>
                <Image
                  src="/globe-top.svg"
                  width={420}
                  height={420}
                  alt="globe-top"
                  className="relative scale-90 top-4 sm:top-8 md:top-6 lg:top-6 sm:scale-90 md:scale-100 lg:scale-125 xl:scale-125 z-[20]"
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            className={`absolute transition-all duration-300 ${
              isHovered ? "bottom-full mb-4" : "bottom-8 sm:bottom-24 md:bottom-24 lg:bottom-44"
            } right-2 sm:right-4 md:right-8 flex items-center`}
            animate={{ scale: isHovered ? 1.2 : 1 }}
          >
            <Image
              src="/5-y.svg"
              width={100}
              height={100}
              className="w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
              alt="5 years"
            />
          </motion.div>

          <motion.div
            className={`absolute transition-all duration-300 ${
              isHovered ? "bottom-full mb:-4" : "bottom-4 sm:bottom-16 md:bottom-24 lg:bottom-32"
            } left-2 sm:left-4 md:left-6`}
            animate={{ scale: isHovered ? 1.2 : 1 }}
          >
            <Image
              src="/aksara.svg"
              width={200}
              height={252}
              className="w-20 h-20 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
              alt="aksara"
            />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default HeroContent;
