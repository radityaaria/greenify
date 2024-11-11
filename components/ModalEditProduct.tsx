import React, { useState, useEffect, useRef } from 'react';
import microgen from '../lib/microgen'; // Import Microgen SDK yang sudah diinisialisasi
import { Product } from '../lib/types';

interface Props {
  productId: string;
  onCancel: () => void;
  onProductUpdated: () => void;
}

const ModalEditProduct: React.FC<Props> = ({ productId, onCancel, onProductUpdated }) => {
  const [name, setName] = useState('');
  const [Desk, setDescription] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);

  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.showModal();
    }
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(`Fetching product with ID: ${productId}`);
        const { data, error } = await microgen.service('Product').find({ where: { _id: productId } });
        if (error) {
          throw new Error(`Error fetching product: ${error.message}`);
        }
        if (data && data.length > 0) {
          setName(data[0].name);
          setDescription(data[0].Desk);
          setLink(data[0].link);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleEditProduct = async () => {
    setLoading(true);
    try {
      let logoData = null;

      if (logoFile) {
        // Mengunggah gambar (logo) ke Microgen Storage
        const { data } = await microgen.storage.upload(logoFile); // Mengirimkan file langsung ke fungsi upload

        if (!data || !data.url || !data.fileName) {
          throw new Error('Failed to upload image or get necessary data');
        }

        logoData = {
          url: data.url,
          fileName: data.fileName,
        };
      }

      const updateData = {
        name,
        Desk,
        link,
        logo: logoData ? [logoData] : null, // Mengirim logo sebagai array seperti yang diharapkan oleh Microgen
      };

      console.log(`Updating product with ID: ${productId}`);
      const { data: updateResponse, error: updateError } = await microgen.service('Product').updateById(productId, updateData);

      if (updateError) {
        console.error('Fetch error response text:', updateError);
        throw new Error(`Failed to update product: ${updateError.message}`);
      }

      onProductUpdated();
      onCancel();
    } catch (error: any) {
      console.error('Error updating product:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogoFile(event.target.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setLogoFile(event.dataTransfer.files[0]);
    }
  };

  return (
    <dialog ref={ref} id="my_modal_1" className="modal">
      <form
        className="modal-box max-w-lg p-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleEditProduct();
        }}
      >
        <h3 className="font-bold text-xl mb-4">Edit Product</h3>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Product Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2">Description Product</label>
            <textarea
              className="input input-bordered w-full"
              value={Desk}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2">Link Product</label>
            <input
              type="url"
              className="input input-bordered w-full"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2">Image</label>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer"
              onClick={() => document.getElementById('logoFileInput')?.click()}
            >
              {logoFile ? (
                <p>{logoFile.name}</p>
              ) : (
                <p>Drag & Drop your logo here or click to select file</p>
              )}
              <input
                type="file"
                id="logoFileInput"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
          </div>
        </div>
        <div className="modal-action flex justify-between mt-6">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading && <span className="loading loading-spinner" />}
            Confirm
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default ModalEditProduct;
