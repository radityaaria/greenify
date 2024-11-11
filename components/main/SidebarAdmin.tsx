"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { LuMail, LuLogOut } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import Image from 'next/image';
import ModalLogout from '@/components/ModalLogout';
import { GrAnnounce } from "react-icons/gr";


const SidebarAdmin: React.FC = () => {
  const pathname = usePathname();
  const [isAdminPage, setIsAdminPage] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (pathname) {
      setIsAdminPage(pathname.startsWith("/admin"));
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/adminlogin');
  };

  if (!isAdminPage) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <div className="bg-[#262626] text-white w-64 space-y-6 py-7 px-7">
        <div className="flex items-center space-x-2">
          <Image src="/carakan.png" alt="Carakan Logo" width={50} height={50} className="" />
          <span className="text-xl font-bold mr-4">Carakan</span>
        </div>
        <div className="divider divider-neutral"></div>
        <nav className="mt-20"> {/* Add margin-top to push down the menu */}
          <ul className="space-y-2">
            <li className={`flex items-center space-x-4 ${pathname === '/adminproduct' ? 'bg-gray-700' : ''} p-2 rounded-md`}>
              <RxDashboard className="ml-2 size-5"/>
              <Link href="/adminproduct" className="w-full">
                Project
              </Link>
            </li>
            <li className={`flex items-center space-x-4 ${pathname === '/adminMessage' ? 'bg-gray-700' : ''} p-2 rounded-md`}>
              <LuMail className="ml-2 size-5"/>
              <Link href="/adminMessage" className="w-full">
                Message
              </Link>
            </li>
            <li className={`flex items-center space-x-4 ${pathname === '/adminAnnouncement' ? 'bg-gray-700' : ''} p-2 rounded-md`}>
              <GrAnnounce className="ml-2 size-5"/>
              <Link href="/adminAnnouncement" className="w-full">
                Announcement
              </Link>
            </li>
          </ul>
        </nav>
        <div className="divider divider-neutral"></div>
        <div className="mt-40"> {/* Add more margin-top to separate from the menu */}
          <button
            className="flex items-center space-x-2 p-2 w-full rounded-md hover:bg-gray-700"
            onClick={() => setShowLogoutModal(true)}
          >
            <LuLogOut className="ml-2 mr-1" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      <div className="flex-1 bg-white p-4">
        <div className="container mx-auto">
          {/* Main content or children */}
        </div>
      </div>
      {showLogoutModal && (
        <ModalLogout
          onCancel={() => setShowLogoutModal(false)}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default SidebarAdmin;
