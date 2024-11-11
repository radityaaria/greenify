// components/ModalLogout.tsx
import React, { useRef, useEffect } from 'react';

interface Props {
  onCancel: () => void;
  onLogout: () => void;
}

const ModalLogout: React.FC<Props> = ({ onCancel, onLogout }) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.showModal();
    }
  }, []);

  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem('token');
    onLogout();
    onCancel();
  };

  return (
    <dialog ref={ref} id="my_modal_logout" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Logout</h3>
        <p className="py-4">Are you sure you want to logout?</p>
        <div className="modal-action">
          <button className="btn btn-primary" onClick={handleLogout}>Yes, Logout</button>
          <button className="btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </dialog>
  );
};

export default ModalLogout;
