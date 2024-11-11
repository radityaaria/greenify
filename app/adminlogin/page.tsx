'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import microgen from '../../lib/microgen';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    console.log('Current error state:', error);
  }, [error]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    console.log('Submitting login form with:', { email, password });
  
    try {
      const response = await microgen.auth.login({ email, password });
      console.log('Login response:', response);
  
      if (response.token) {
        localStorage.setItem('token', response.token);
        router.push('/adminproduct');
      } else {
        console.error('Login failed:', response);
        setError('Login gagal. Tidak ada token diterima.');
      }
    } catch (err) {
      console.error('Error during login:', err);
  
      if (err instanceof Error) {
        console.log('Error name:', err.name);
        console.log('Error message:', err.message);
        
        if (err.name === 'MicrogenError') {
          const microgenError = err as any;
          switch (microgenError.code) {
            case 'auth/user-not-found':
              setError('Email tidak ditemukan. Silakan periksa kembali email Anda.');
              break;
            case 'auth/wrong-password':
              setError('Password salah. Silakan coba lagi.');
              break;
            case 'auth/invalid-email':
              setError('Format email tidak valid. Silakan periksa kembali email Anda.');
              break;
            default:
              setError(`Error login: ${microgenError.message || 'Terjadi kesalahan yang tidak diketahui'}`);
          }
        } else {
          setError(`Error login: ${err.message}`);
        }
      } else if (typeof err === 'object' && err !== null) {
        setError(`Error login: ${JSON.stringify(err)}`);
      } else {
        setError('Terjadi kesalahan yang tidak diketahui. Silakan coba lagi nanti.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-login">
      <motion.div
        className="bg-white shadow-lg rounded-lg p-8 w-96"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: '#333333' }}>Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium" style={{ color: '#555555' }}>Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#808080]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input input-bordered w-full pl-10"
                style={{ borderColor: '#CCCCCC', color: '#333333' }}
                placeholder='Enter your email'
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 font-medium" style={{ color: '#555555' }}>Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#808080]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input input-bordered w-full pl-10"
                style={{ borderColor: '#CCCCCC', color: '#333333' }}
                placeholder='Enter your password'
              />
            </div>
          </div>
          <div className="min-h-6">
            {error ? (
              <p className="text-[#FF0000]">{error}</p>
            ) : (
              <p className="text-[#008000]">Ready to login</p>
            )}
          </div>
          <div>
            <motion.button
              type="submit"
              className="btn btn-primary w-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Login
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;