'use client';

import { useState } from 'react';
import MenuModal from './MenuModal';

export default function MenuMobile({ mode }) {
  const [openModal, setOpenModal] = useState(false);

  const modalHandler = () => {
    if (!openModal) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  };

  return (
    <div className="navbar-menu-mobile">
      <div className="navbar-btn-box" onClick={modalHandler}>
        <div className="navbar-btn">
          <span>🗂️</span>
        </div>
      </div>
      <MenuModal openModal={openModal} setOpenModal={setOpenModal} mode={mode} />
    </div>
  );
}
