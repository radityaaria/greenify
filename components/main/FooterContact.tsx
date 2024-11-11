'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { GrYoutube } from 'react-icons/gr';
import { PiTwitterLogoFill, PiInstagramLogoFill } from "react-icons/pi";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { BiSolidSend } from "react-icons/bi";
import { GoArrowUpRight } from "react-icons/go";
import Image from 'next/image';
import microgen from '../../lib/microgen';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError('Please fill in the email field.');
      setSuccess('');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
      return;
    } else if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      setSuccess('');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
      return;
    }

    try {
      const { data, error } = await microgen.service('Announcement').create({ email });

      if (error) {
        setError('Failed to submit email.');
        setSuccess('');
      } else {
        setSuccess('Email submitted successfully!');
        setError('');
        setEmail('');
      }
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    } catch (error) {
      console.error('Error submitting email:', error);
      setError('Failed to submit email.');
      setSuccess('');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    }
  };

  return (
    <footer id="contact" className="bg-[#272727] text-[#FCFCFD] py-12 rounded-t-[25px]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-center lg:text-left">Let&apos;s Connect there</h2>
          <Link href="/contact">
            <button className="bg-[#F6C13F] text-[#ffffff] py-2 px-4 rounded-full w-full lg:w-[170px] h-[50px] text-lg flex items-center justify-center mt-4 lg:mt-0 group">
              <span className="hover:cursor-pointer group-hover:none">
                Contact Us
              </span>
              <div className="ml-1 transition-transform duration-300 group-hover:rotate-45">
                <GoArrowUpRight className="w-7 h-7" />
              </div>
            </button>
          </Link>
        </div>

        <div className="border-t border-[#475467] mb-8"></div>

        <div className="flex flex-col lg:flex-row justify-between items-start p-0 gap-8 lg:gap-16">
          <div className="flex flex-col items-start mb-8 lg:mb-0">
            <div className="flex items-center mb-4">
              <Image src="/carakan.png" alt="Carakan Logo" width={50} height={50} />
              <span className="ml-4 text-xl font-urbanist font-bold">CARAKAN</span>
            </div>
            <p className="mb-8 text-center lg:text-left">
              Jl. Palagan Tentara Pelajar Blok B No.6 Sariharjo, Ngaglik, Tambak Rejo, Sariharjo, Kec. Ngaglik, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55581
            </p>
            <div className="flex space-x-4 justify-center lg:justify-start">
              <FaFacebookSquare className="w-6 h-6" />
              <GrYoutube className="w-6 h-6" />
              <IoLogoWhatsapp className="w-6 h-6" />
              <a href="https://www.instagram.com/carakan.tech/" target="_blank" rel="noopener noreferrer"><PiInstagramLogoFill className="w-6 h-6" /></a>
              <PiTwitterLogoFill className="w-6 h-6" />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16">
            <div>
              <h4 className="font-semibold mb-4 text-[#F6C13F]">Navigation</h4>
              <ul className="space-y-4">
                <li><a href="#about-me" className="hover:underline">Home</a></li>
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#service" className="hover:underline">Service</a></li>
                <li><a href="#resume" className="hover:underline">Resume</a></li>
                <li><a href="#projects" className="hover:underline">Project</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[#F6C13F]">Contact</h4>
              <ul className="space-y-4">
                <li><p className="hover:underline">contact@carakan.id</p></li>
                <li><p className="hover:underline">www.carakan.id</p></li>
                <li><p className="hover:underline">@carakan.id</p></li>
              </ul>
            </div>
            <div className="flex flex-col items-start w-full lg:w-auto">
              <h4 className="font-semibold mb-4 text-[#F6C13F]">Get the latest information</h4>
              <form className="flex w-full lg:w-auto" onSubmit={handleEmailSubmit}>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="p-2 rounded-l-lg text-[#000000] w-full lg:w-64"
                  value={email}
                  onChange={handleEmailChange}
                />
                <button className="bg-[#F6C13F] p-2.5 rounded-r-lg flex items-center justify-center" type="submit">
                  <BiSolidSend className="w-6 h-6" />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-[#475467] mt-8 mb-4"></div>

        <div className="flex flex-col lg:flex-row justify-between items-center">
          <p className="text-center lg:text-left">Copyright© 2024 Carakan. All Rights Reserved.</p>
          <div className="flex space-x-4 justify-center lg:justify-start mt-4 lg:mt-0">
            <p className="hover:underline">User Terms & Conditions | Privacy Policy</p>
          </div>
        </div>
      </div>
      {showNotification && (error || success) && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.5 }}
          className={`fixed top-20 right-0 left-0 sm:right-5 sm:left-5 md:right-40 md:left-40 lg:right-80 lg:left-80 xl:right-80 xl:left-80 duration-500 ${showNotification ? 'translate-y-0' : '-translate-y-full'}`}
        >
          {error && (
            <div role="alert" className="alert alert-error">
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current right-0 left-0"
                fill="none"
                viewBox="0 0 24 24"
              >
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </motion.svg>
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div role="alert" className="alert alert-success">
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current left-0 right-0"
                fill="none"
                viewBox="0 0 24 24"
              >
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
              <span>{success}</span>
            </div>
          )}
        </motion.div>
      )}
    </footer>
  );
};

export default Footer;
