import { useEffect } from 'react';
import { redirect } from 'next/navigation';

const useAuth = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      redirect('/adminlogin');
    }
  }, []);
};

export default useAuth;
