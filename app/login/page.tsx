'use client'
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Register = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Password:', password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex-1 flex justify-center flex-col">
            <Image src="/logo.svg" alt="Logo" width={100} height={100} className="mb-4 absolute top-10 left-8" />
            <Image src="/orang.svg" alt="Orang" width={600} height={600} className="absolute bottom-0" />
        </div>
        <div className="flex-1 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-black">Login</h2>
            <form onSubmit={handleSubmit} className="bg-white px-8 py-6 border rounded shadow-md" style={{ width: "80%" }}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-bold mb-3 text-gray-700">Email</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full border border-black bg-white rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-bold mb-3 text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full border border-black bg-white rounded-md p-2"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-[#016A70] font-bold text-white p-2 mt-4 rounded-md hover:bg-[#184c4e]">
                    Login
                </button>
                <p className="text-sm text-black mt-3">New user? <span className='text-[#016A70] font-bold underline'><Link href="/register">Register</Link></span></p>
            </form>
        </div>
    </div>
  );
};

export default Register;
