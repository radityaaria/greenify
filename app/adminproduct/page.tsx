'use client';
import React, { useEffect, useState } from 'react';
import microgen from '../../lib/microgen';
import { Product } from '../../lib/types';
import ModalEditProduct from '@/components/ModalEditProduct';
import ModalViewImage from '@/components/ModalViewImage';
import { MdOutlineDeleteForever, MdOutlineVisibility } from "react-icons/md";
import { FaPlus, FaAngleDoubleLeft, FaAngleDoubleRight, FaSearch } from 'react-icons/fa';
import { LiaSave } from 'react-icons/lia';
import ModalAddProduct from '@/components/ModalAddProduct';
import ModalDelete from '@/components/ModalDelete';
import useAuth from '@/components/checkAuth';

const DashboardAdmin = () => {
  useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [showModalImage, setShowModalImage] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');
  const itemsPerPage = 10; // Jumlah item per halaman

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await microgen.service('Product').find();
        if (error) {
          throw new Error(`Error fetching products: ${error.message}`);
        }
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await microgen.service('Product').find();
      if (response.error) {
        throw new Error(`Error fetching products: ${response.error.message}`);
      }
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = () => {
    setIsAddModalOpen(true);
  };

  const handleEditProduct = (productId: string) => {
    setSelectedProductId(productId);
  };

  const handleDeleteProduct = (productId: string) => {
    setDeleteProductId(productId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (!deleteProductId) {
        throw new Error('No product ID to delete.');
      }

      await microgen.service('Product').deleteById(deleteProductId);
      console.log(`Deleting product with ID: ${deleteProductId}`);
      
      await fetchProducts();
      setIsDeleteModalOpen(false);
      setDeleteProductId(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDeleteProductId(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleProductAdded = async () => {
    await fetchProducts();
    setIsAddModalOpen(false);
  };

  const handleProductUpdated = async () => {
    await fetchProducts();
    setSelectedProductId(null);
  };

  const handleCancelEdit = () => {
    setSelectedProductId(null);
  };

  const handleViewImage = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setShowModalImage(true);
  };

  const handleCloseModalImage = () => {
    setShowModalImage(false);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <div className="container mx-auto p-4 flex-grow">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold">Project</h1>
            <button
              onClick={handleAddProduct}
              className="bg-[#0B77B5] text-white px-1 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center"
            >
              <FaPlus className="mr-2" />
              Add Project
            </button>
          </div>
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
        {products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="bg-[#D4D4D4] text-center text-[#262626] font-bold">
                  <th>No</th>
                  <th>Project Name</th>
                  <th>Description</th>
                  <th>Link</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedProducts.map((product, index) => (
                  <tr key={product._id}>
                    <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                    <td>{product.name}</td>
                    <td>{product.Desk}</td>
                    <td>{product.link}</td>
                    <td>
                      {product.logo && product.logo.length > 0 ? (
                        <button
                          onClick={() => handleViewImage(product.logo[0].url)}
                          className="bg-[#0B77B5] text-white px-2 py-1 rounded hover:bg-[#1E90FF] transition duration-300 flex items-center"
                        >
                          <MdOutlineVisibility className="mr-1 size-5" />
                          View Image
                        </button>
                      ) : (
                        <span>No Image Available</span>
                      )}
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditProduct(product._id)}
                          className="bg-[#F6C13F] text-white px-2 py-1 rounded hover:bg-yellow-600 transition duration-300 flex items-center"
                        >
                          <LiaSave className="mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="bg-[#FA2626] text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300 flex items-center"
                        >
                          <MdOutlineDeleteForever className="mr-1" />
                          Delete
                        </button>
                      </div>
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

      {isAddModalOpen && (
        <ModalAddProduct
          onCancel={() => setIsAddModalOpen(false)}
          onProductAdded={handleProductAdded}
        />
      )}

      {selectedProductId && (
        <ModalEditProduct
          productId={selectedProductId}
          onCancel={handleCancelEdit}
          onProductUpdated={handleProductUpdated}
        />
      )}

      {showModalImage && (
        <ModalViewImage
          imageUrl={selectedImageUrl}
          onClose={handleCloseModalImage}
        />
      )}

      <ModalDelete
        isOpen={isDeleteModalOpen}
        onCancel={handleCancelDelete}
        onDelete={handleConfirmDelete}
        itemType="product"
      />
    </div>
  );
};

export default DashboardAdmin;
