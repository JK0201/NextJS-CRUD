'use client';

import Link from 'next/link';

export default function MenuModal({ openModal, setOpenModal }) {
  const modalHandler = () => {
    setOpenModal(false);
  };

  return (
    <div className={`menu-modal ${openModal ? 'show-modal' : ''}`}>
      <Link href="/">
        <div className="navbar-btn" onClick={modalHandler}>
          <span>🏠</span>
          <span> HOME</span>
        </div>
      </Link>
      <Link href="/posting/list">
        <div className="navbar-btn" onClick={modalHandler}>
          <span>📑</span>
          <span> LIST</span>
        </div>
      </Link>
      <Link href="/posting/write">
        <div className="navbar-btn" onClick={modalHandler}>
          <span>✏️</span>
          <span> WRITE</span>
        </div>
      </Link>
    </div>
  );
}
