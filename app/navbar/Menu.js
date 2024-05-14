import Link from 'next/link';

export default function Menu() {
  return (
    <div className="navbar-menu">
      <div className="navbar-btn-box">
        <Link href="/">
          <div className="navbar-btn">
            <span>🏠</span>
            <span className="navbar-btn-text"> HOME</span>
          </div>
        </Link>
      </div>
      <div className="navbar-btn-box">
        <Link href="/posting/list">
          <div className="navbar-btn">
            <span>📑</span>
            <span className="navbar-btn-text"> LIST</span>
          </div>
        </Link>
      </div>
      <div className="navbar-btn-box">
        <Link href="/posting/write">
          <div className="navbar-btn">
            <span>✏️</span>
            <span className="navbar-btn-text"> WRITE</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
