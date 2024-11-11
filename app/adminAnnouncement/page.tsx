'use client';

import React, { useEffect, useState } from 'react';
import microgen from '../../lib/microgen';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaSearch } from 'react-icons/fa';
import { MdOutlineDeleteForever } from 'react-icons/md';
import ModalDelete from '@/components/ModalDelete';
import useAuth from '@/components/checkAuth';


type Announcement = {
  _id: string;
  email: string;
};

const AnnouncementsPage = () => {
  useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteAnnouncementId, setDeleteAnnouncementId] = useState<string | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await microgen.service('Announcement').find();
      if (error) {
        throw new Error(`Error fetching announcements: ${error.message}`);
      }
      setAnnouncements(data || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const handleDeleteAnnouncement = (announcementId: string) => {
    setDeleteAnnouncementId(announcementId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (!deleteAnnouncementId) {
        throw new Error('No announcement ID to delete.');
      }

      await microgen.service('Announcement').deleteById(deleteAnnouncementId);
      await fetchAnnouncements();
      setIsDeleteModalOpen(false);
      setDeleteAnnouncementId(null);
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDeleteAnnouncementId(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(announcements.length / itemsPerPage);
  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const displayedAnnouncements = filteredAnnouncements.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-white text-black min-h-screen flex">
      <div className="container mx-auto flex-grow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Announcements</h1>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="input input-bordered input-primary w-full max-w-xs pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        </div>
        {announcements.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="bg-[#D4D4D4] text-center text-[#262626] font-bold">
                  <th>No</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedAnnouncements.map((announcement, index) => (
                  <tr key={announcement._id}>
                    <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                    <td>{announcement.email}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteAnnouncement(announcement._id)}
                        className="bg-[#FA2626] text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300 flex items-center"
                      >
                        <MdOutlineDeleteForever className="mr-1" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center items-center mt-4 space-x-4">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2"
              >
                <FaAngleDoubleLeft />
              </button>
              <div className="join">
                {Array.from({ length: totalPages }, (_, i) => (
                  <input
                    key={i + 1}
                    type="radio"
                    name="pagination"
                    className="join-item btn btn-square"
                    checked={currentPage === i + 1}
                    onChange={() => handlePageChange(i + 1)}
                    aria-label={`${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2"
              >
                <FaAngleDoubleRight />
              </button>
            </div>
          </div>
        ) : (
          <span className="loading loading-dots loading-md"></span>
        )}
      </div>

      <ModalDelete
        isOpen={isDeleteModalOpen}
        onCancel={handleCancelDelete}
        onDelete={handleConfirmDelete}
        itemType="announcement"
      />
    </div>
  );
};

export default AnnouncementsPage;
