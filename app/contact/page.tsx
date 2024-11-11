"use client";
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { FaPhoneVolume, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Image from 'next/image';
import microgen from '../../lib/microgen';
import { motion } from 'framer-motion'; 

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const countWords = (str: string) => {
    return str.trim().split(/\s+/).length;
  };

  const validateEmail = (email: string) => {
    return email.includes("@");
  };

  const validatePhone = (phone: string) => {
    return /^\d{10,15}$/.test(phone);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (id === 'message') {
      const words = countWords(value);
      if (words > 200) {
        setError('Message cannot exceed 200 words.');
        setSuccess('');
      } else {
        setError('');
        setFormData({ ...formData, [id]: value });
      }
      setWordCount(words);
    } else if (id === 'phone') {
      const numericValue = value.replace(/\D/g, ''); 
      setFormData({ ...formData, [id]: numericValue });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
    const { firstName, lastName, email, phone, message } = formData;
    if (!firstName || !lastName || !email || !phone || !message) {
      setError('Please fill in all fields.');
      setSuccess('');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email address. Please include an "@" in the email address.');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
      return;
    }

    if (!validatePhone(phone)) {
      setError('Invalid phone number');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
      return;
    }

    if (countWords(message) > 200) {
      setError('Message cannot exceed 200 words.');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
      return;
    }

    try {
      const { data, error } = await microgen.service('Contact').create({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      });

      if (error) {
        setError('Failed to submit form.');
       
      } else {
        setSuccess('Form submitted successfully!');
        
       
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        });
        setWordCount(0);
      }
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to submit form.');
      setSuccess('');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    }
  };

  return (
    <div className="relative p-6 md:mt-10 md:p-24 custom-font">
      {showNotification && (error || success) && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.0 }} 
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
                  transition={{ duration: 0.0 }}
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
                  transition={{ duration: 0.0 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </motion.svg>
              <span>{success}</span>
            </div>
          )}
        </motion.div>
      )}
      <h1 className="text-3xl font-bold mb-4 text-[#F6AF03] text-center mt-20 md:mt-0">Contact Us</h1>
      <p className="mb-12 text-[#717171] text-center mx-auto w-full md:w-[603px] font-semibold custom-font">
        We believe in the power of brainstorming and teamwork. Let us know what you need, and the challenge you’re facing in your IT system. Let us find a way to make things better for you.
      </p>
      <div className="flex flex-col md:flex-row bg-white rounded-lg p-3 shadow-xl">
        <div className="order-2 md:order-1 md:w-1/3 bg-[#F6C13F] text-[#000000] p-8 rounded-lg mt-8 md:mt-0 md:mr-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#000000]">Contact Information</h2>
          <p className="mb-16 text-[#626262] text-sm font-semibold">Any question or remarks? Just write us a message!</p>
          <div className="mb-4">
            <p className="flex items-center mb-8">
              <FaPhoneVolume className="mr-4" /> +1012 3456 789
            </p>
          </div>
          <div className="mb-4">
            <p className="flex items-center mb-8">
              <MdEmail className="mr-4" /> contact@carakan.id
            </p>
          </div>
          <div>
            <p className="flex mb-20">
              <FaLocationDot className="mr-4 size-12" />
              Jl. Palagan Tentara Pelajar Blok B No.6, Sariharjo, Ngaglik, Tambak Rejo, Sariharjo, Kec. Ngaglik, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55581
            </p>
          </div>
        </div>
        <div className="order-1 md:order-2 md:w-2/3">
          <form className="flex flex-wrap" onSubmit={handleSubmit}>
            <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-4">
              <label className="block text-[#8D8D8D] text-sm font-bold mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="appearance-none bg-transparent border-b border-[#8D8D8D] w-full text-[#8D8D8D] py-2 leading-tight focus:outline-none mb-8"
                placeholder="Jane Doe" 
              />
            </div>
            <div className="w-full md:w-1/2 pl-0 md:pl-4 mb-4">
              <label className="block text-[#8D8D8D] text-sm font-bold mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="appearance-none bg-transparent border-b border-[#8D8D8D] w-full text-[#8D8D8D] py-2 leading-tight focus:outline-none mb-8"
                placeholder="Doe"
              />
            </div>
            <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-4">
              <label className="block text-[#8D8D8D] text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="appearance-none bg-transparent border-b border-[#8D8D8D] w-full text-[#8D8D8D] py-2 leading-tight focus:outline-none mb-8"
                placeholder="example@example.com"
              />
            </div>
            <div className="w-full md:w-1/2 pl-0 md:pl-4 mb-4">
              <label className="block text-[#8D8D8D] text-sm font-bold mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="appearance-none bg-transparent border-b border-[#8D8D8D] w-full text-[#8D8D8D] py-2 leading-tight focus:outline-none mb-8"
                placeholder="123-456-7890"
              />
            </div>
            <div className="w-full mb-4">
              <label className="block text-[#8D8D8D] text-sm font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                className="appearance-none bg-transparent border-b border-[#8D8D8D] w-full text-[#8D8D8D] py-2 leading-tight focus:outline-none mb-2"
                placeholder="Your message here..."
              />
              <p className="text-sm text-[#8D8D8D]">{wordCount} / 200</p>
            </div>
            <div className="flex items-center justify-between w-full">
              <Image src="/contact.svg" alt="Paper Plane" width={150} height={150} />
              <button
                type="submit"
                className="bg-[#F6C13F] text-[#000000] font-semibold py-2 px-3 md:py-3 md:px-9 rounded focus:outline-none focus:shadow-outline"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
