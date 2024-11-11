'use client';

import React, { useEffect, useState } from 'react';
import microgen from '../../lib/microgen';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaSearch } from 'react-icons/fa';
import { MdOutlineDeleteForever } from 'react-icons/md';
import ModalDelete from '@/components/ModalDelete';
import useAuth from '@/components/checkAuth';

type Message = {
  _id: string;
  firstName: string;
  lastName : string;
  email: string;
  message: string;
  phone:number;
};

const MessagesPage = () => {
  useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteMessageId, setDeleteMessageId] = useState<string | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await microgen.service('Contact').find();
      if (error) {
        throw new Error(`Error fetching messages: ${error.message}`);
      }
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    setDeleteMessageId(messageId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (!deleteMessageId) {
        throw new Error('No message ID to delete.');
      }

      await microgen.service('Contact').deleteById(deleteMessageId);
      await fetchMessages();
      setIsDeleteModalOpen(false);
      setDeleteMessageId(null);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDeleteMessageId(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(messages.length / itemsPerPage);
  const filteredMessages = messages.filter(message =>
    message.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const displayedMessages = filteredMessages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-white text-black min-h-screen flex">
      <div className="container mx-auto flex-grow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Messages</h1>
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
        {messages.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="bg-[#D4D4D4] text-center text-[#262626] font-bold">
                  <th>No</th>
                  <th>Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedMessages.map((message, index) => (
                  <tr key={message._id}>
                    <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                    <td>{message.firstName}</td>
                    <td>{message.lastName}</td>
                    <td>{message.email}</td>
                    <td>{message.phone}</td>
                    <td>{message.message}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteMessage(message._id)}
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
        itemType="message"
      />
    </div>
  );
};

export default MessagesPage;
