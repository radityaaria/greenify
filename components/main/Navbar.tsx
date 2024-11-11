"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { TfiAlignJustify } from "react-icons/tfi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState("Home");
  const [isNotAdminPage, setIsNotAdminPage] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (pathname) {
      setIsNotAdminPage(!pathname.startsWith("/admin"));
    }
  }, [pathname]);

  const menuItems = [
    { name: "Logo", href: "/", isLogo: true },
    { name: "Home", href: "#about-me" },
    { name: "Service", href: "#service" },
    { name: "Information", href: "#vision" },
    { name: "About", href: "#contact" },
  ];

  const handleClick = async (href: string) => {
    const isHomePage = pathname === "/";
    if (!isHomePage) {
      await router.push("/");
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setActive(href);
    setMenuOpen(false);
  };

  if (!isNotAdminPage) {
    return null;
  }

  return (
    <div className="w-full h-[65px] fixed top-6 z-50 bg-white lg:bg-transparent">
      <div className="md:bg-transparent lg:bg-transparent">
        <div className="w-full h-full flex justify-between items-center px-4">
          <div className="flex items-center">
            <a href="/" className="flex items-center cursor-pointer">
              <Image
                src="/logo.png"
                alt="Logo"
                width={24}
                height={24}
                className="mr-1 lg:hidden xl:hidden"
              />
            </a>
          </div>
          <div className="lg:hidden flex items-center justify-end w-full">
            <TfiAlignJustify
              className={`text-2xl cursor-pointer ${menuOpen ? "text-[#F6C13F]" : "text-white"}`}
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </div>
          <div className="hidden  md:flex items-center justify-center w-full">
            <div className="w-auto h-full flex flex-row items-center justify-center">
              <div className="flex items-center justify-center w-full h-full bg-white px-5 py-3 rounded-full text-black space-x-12">
                {menuItems.map((item) =>
                  item.isLogo ? (
                    <a key={item.name} href={item.href} className="flex items-center cursor-pointer">
                      <Image src="/carakan.png" alt="Carakan Logo" width={24} height={24} />
                      <span className="ml-1 font-bold">CARAKAN</span>
                    </a>
                  ) : (
                    <motion.a
                      key={item.name}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleClick(item.href)}
                      className={`cursor-pointer transition-colors duration-300 ${
                        active === item.href ? "bg-[#F6C13F] text-black" : ""
                      } px-4 py-1 rounded-full `}
                    >
                      {item.name}
                    </motion.a>
                  )
                )}
                <motion.a
                  href="/register"
                  onClick={() => handleClick("/register")}
                  className="cursor-pointer transition-colors duration-300 bg-[#016A70] text-white px-4 py-1 rounded-full"
                >
                  Register
                </motion.a>
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "40vh" }}
              exit={{ height: 0 }}
              className="md:hidden fixed top-[65px] left-0 right-0 bottom-0 text-white bg-gray-900 flex flex-col items-center overflow-hidden"
            >
              <div className="flex flex-col items-center w-full space-y-2 p-4">
                {menuItems
                  .filter((item) => !item.isLogo)
                  .map((item) => (
                    <motion.a
                      key={item.name}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleClick(item.href)}
                      className={`w-full text-center cursor-pointer transition-colors duration-300 ${
                        active === item.href ? "bg-[#F6C13F] text-black" : ""
                      } px-4 py-2 rounded-full`}
                    >
                      {item.name}
                    </motion.a>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
