'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import microgen from '../../lib/microgen';

interface Product {
  _id: string;
  name: string;
  Desk: string;
  logo: { url: string }[];
  link: string;
}

interface ButtonProps {
  label: string;
  href: string;
}

const Button: React.FC<ButtonProps> = ({ label, href }) => (
  <Link href={href}>
    <button className="bg-[#F2F4F7] text-[#000000] font-semibold py-2 px-4 rounded-full text-sm sm:text-base">
      {label}
    </button>
  </Link>
);

const OtherProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [index, setIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setIndex((prevIndex) =>
      (prevIndex + 1) % Math.ceil(products.length / (window.innerWidth >= 640 ? 2 : 1))
    );
  }, [products.length]);

  const prevSlide = useCallback(() => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? Math.ceil(products.length / (window.innerWidth >= 640 ? 2 : 1)) - 1 : prevIndex - 1
    );
  }, [products.length]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    trackMouse: true,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await microgen.service('Product').find();
        if (error) {
          throw new Error(`Error fetching products: ${error.message}`);
        }
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Head>
        <title>Product Showcase</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="projects" className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h1 className="text-3xl lg:text-6xl font-bold mb-4 lg:mb-8 text-center sm:text-left sm:mb-0">
            Lets take a look at <br className="hidden sm:inline" />
            our other <span className="text-[#F6C13F]">Products</span>
          </h1>
          <Link href="/projects">
            <button className="bg-[#F6C13F] text-white hover:bg-[#FD853A] px-6 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base">
              See All
            </button>
          </Link>
        </div>
        <div className="relative mt-8" {...swipeHandlers}>
          <div className="flex overflow-hidden">
            <motion.div
              className="flex"
              initial={{ x: 0 }}
              animate={{ x: -index * 100 + "%" }}
              transition={{ duration: 0.5 }}
              style={{ width: `${products.length * 100}%` }}
            >
              {products.map((product) => (
                <div key={product._id} className="flex-none w-full sm:w-1/2 px-1">
                  <motion.div
                    className="p-4 sm:p-6 bg-white rounded-lg shadow-lg"
                    initial={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
                    whileHover={{ boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)" }}
                    whileTap={{ boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)" }}
                  >
                    <div className="relative h-48 sm:h-64 w-full bg-white rounded-md overflow-hidden group bg-gradient-to-tr from-[#585757] from-0% to-80% bg-opacity-70">
                      <motion.div
                        className="absolute inset-0"
                        initial={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
                        whileHover={{
                          boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
                        }}
                        whileTap={{
                          boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        {product.logo && product.logo[0] && (
                          <Image
                            src={product.logo[0].url}
                            alt={product.name}
                            layout="fill"
                            objectFit="contain"
                            className="rounded-md"
                          />
                        )}
                      </motion.div>
                      <div>
                        <motion.div
                          className="absolute inset-0 bg-[#000000] bg-opacity-[0%] ml-4 mr-4 rounded-3xl hover:backdrop-blur-sm justify-end p-4 hover:bg-opacity-[30%] text-white"
                          initial={{ y: "70%" }}
                          whileHover={{ y: 80 }}
                          whileTap={{ y: 80 }}
                          transition={{ duration: 0.5 }}
                        >
                          <h2 className="text-3xl sm:text-5xl font-bold text-[#FFFAF5] mb-2">
                            {product.name}
                          </h2>
                          <p className="text-sm sm:text-base text-[#FFEAD5]">
                            {product.Desk}
                          </p>
                        </motion.div>
                      </div>
                      <Link href={product.link}>
                        <button className="absolute top-2 right-2 w-9 h-9 flex items-center justify-center text-[#FD853A] border-2 border-[#FD853A] rounded-full transition-all duration-300 group-hover:bg-[#FD853A] group-hover:text-white focus:outline-none focus:ring-2 focus:ring-[#FD853A] focus:ring-opacity-50">
                          <FiArrowUpRight className="w-5 h-5" />
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex overflow-hidden space-x-2 mt-4 translate-y-5">
            {Array(Math.ceil(products.length / (window.innerWidth >= 720 ? 2 : 1)))
              .fill(undefined)
              .map((_, i) => (
                <button
                  key={i}
                  className={`h-2 w-2 rounded-full ${
                    index === i ? "bg-[#F6C13F]" : "bg-[#F2F4F7]"
                  }`}
                  onClick={() => setIndex(i)}
                ></button>
              ))}
          </div>
        </div>
      </div>
      <div className="min-h-screen pt-9">
        <main id="resume" className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
          <div className="flex items-center justify-center flex-wrap">
            <div className="space-x-2 mb-6 sm:space-x-4 flex flex-wrap justify-center">
              {products.map((product) => (
                <Button
                  key={product._id}
                  label={product.name}
                  href={product.link}
                />
              ))}
            </div>
          </div>
          <section className="text-center m-4 my-10">
            <div className="text-2xl sm:text-3xl font-bold">
              <p>Carakan Sadhana Dirgantara</p>
              <span className="text-[#F6C13F] gap-10">ꦕꦫꦏꦤ꧀ꦱꦝꦤꦢꦶꦂꦒꦤ꧀ꦠꦫ</span>
            </div>
            <p className="mt-4 text-base sm:text-lg text-[#344054]">
              In today&apos;s interconnected business landscape, where constant
              connectivity is the norm, it becomes imperative for your business
              network—comprising essential components such as infrastructure,
              servers, software, communication devices, and data—to remain
              consistently up-to-date. By assessing and addressing core issues
              within your IT infrastructure, we collaborate closely with our
              clients to provide cutting-edge solutions that enhance their
              business operations.
            </p>
          </section>
        </main>
      </div>
    </>
  );
};

export default OtherProduct;
