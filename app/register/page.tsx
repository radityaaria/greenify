'use client'
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex-1 flex justify-center flex-col">
            <Image src="/logo.svg" alt="Logo" width={100} height={100} className="mb-4 absolute top-10 left-8" />
            <Image src="/orang.svg" alt="Orang" width={600} height={600} className="absolute bottom-0" />
        </div>
        <div className="flex-1 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <div className="flex mb-4">
                    <div className="mr-4 flex-1">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-[#016A70] text-white text-center p-2 rounded-md hover:bg-[#184c4e]">
                    Register
                </button>
                <p className="text-sm text-black mt-2 w-full">Already have an account? <span className='text-[#016A70] font-bold underline'><Link href="/login">Sign In</Link></span></p>
            </form>
        </div>
    </div>
  );
};

export default Register;
