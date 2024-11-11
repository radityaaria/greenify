'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import Image from 'next/image';
import microgen from '../../lib/microgen';

interface Product {
  _id: string;
  name: string;
  Desk: string;
  logo: { url: string }[];
  link: string;
}

const Product = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const fetchAndShuffleProducts = async () => {
      try {
        const { data, error } = await microgen.service('Product').find();
        if (error) {
          throw new Error(`Error fetching products: ${error.message}`);
        }
        if (data) {
          const shuffledProducts = shuffleArray([...data]);
          setSelectedProducts(shuffledProducts.slice(0, 3)); // Show up to 3 products
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchAndShuffleProducts();
  }, []);

  return (
    <div id='product' className='bg-product min-h-screen w-full'>
      <p className='text-2xl sm:text-3xl lg:text-6xl mt-10 sm:mt-20 ml-5 sm:ml-20 text-white'>
        Our <span className='text-[#F6C13F]'>Product</span>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 m-5 sm:m-10">
        {selectedProducts.map((product, index) => (
          <motion.div
            key={index}
            className="relative bg-[#686868] border border-[#9E9D9D] group bg-opacity-50 backdrop-blur-sm rounded-xl sm:rounded-3xl flex flex-col justify-between transition-all duration-300 hover:bg-[#F6C13F] sm:hover:bg-[#F6C13F] sm:hover:scale-105 sm:hover:-translate-y-2 sm:hover:shadow-xl max-w-xs sm:max-w-xl mx-auto sm:mx-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.05 }}
          >
            <div className='p-3 sm:p-4'>
              <h2 className="text-lg sm:text-xl text-white mb-1 sm:mb-2">{product.name}</h2>
              <p className="text-sm sm:text-base text-white">{product.Desk}</p>
            </div>
            <div className="w-full flex bg-[#9E9D9D] rounded-lg sm:rounded-2xl h-32 sm:h-56 items-center justify-center p-2 sm:p-4">
              <Image 
                height={120} 
                width={120} 
                src={product.logo[0].url} 
                alt={product.name} 
                className="object-contain sm:h-48 sm:w-48" 
              />
            </div>
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4">
              <a
                href={product.link}
                className="text-[#ffffff] font-semibold py-1 sm:py-2 px-2 rounded-full bg-[#1D2939] group-hover:bg-[#FD853A] transition duration-300 flex items-center"
              >
                <FiArrowUpRight className="h-8 sm:h-10 w-8 sm:w-10" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Product;
