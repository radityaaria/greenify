import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import microgen from '../lib/microgen';

interface ModalAddProductProps {
  onCancel: () => void;
  onProductAdded: () => void;
}

const ModalAddProduct: React.FC<ModalAddProductProps> = ({ onCancel, onProductAdded }) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleAddProduct = async () => {
    if (!productName || !description || !link || !image) {
      alert('All fields are required');
      return;
    }

    setUploading(true);

    try {
      const { data: uploadData, error: uploadError } = await microgen.storage.upload(image);

      if (uploadError) {
        throw new Error(`Error uploading image: ${uploadError.message}`);
      }
      const newProduct = {
        name: productName,
        Desk: description,
        link: link,
        logo: [uploadData]
      };

      const { data: createData, error: createError } = await microgen.service('Product').create(newProduct);

      if (createError) {
        throw new Error(`Error creating product: ${createError.message}`);
      }

      onProductAdded();
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Product</h2>
          <button onClick={onCancel}>
            <FaTimes />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Product Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Description Product</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Link Product</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm  mb-1">Image</label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-md w-full max-w-xs"
              onChange={handleImageChange}
            />
            {image && (
              <div className="mt-2">
                <Image
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-full h-32 object-contain mb-4"
                  width={320}
                  height={320}
                />
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleAddProduct}
              className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Add Product'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddProduct;
