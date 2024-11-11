import React, { useEffect, useRef } from 'react';

interface ModalViewImageProps {
  imageUrl: string;
  onClose: () => void;
}

const ModalViewImage: React.FC<ModalViewImageProps> = ({ imageUrl, onClose }) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.showModal();
    }
  }, []);

  return (
    <dialog ref={ref} id="modal_view_image" className="modal">
      <div className="modal-box max-w-1xl max-h-1xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xl text-center">View Image</h3>
          <button type="button" className="btn" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="flex justify-center items-center">
          <img src={imageUrl} alt="Product Image" className="max-w-full max-h-full" />
        </div>
      </div>
    </dialog>
  );
};

export default ModalViewImage;
