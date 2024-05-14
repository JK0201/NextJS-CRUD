'use client';

import { useRouter } from 'next/navigation';

export default function DarkMode({ mode }) {
  const router = useRouter();

  const darkModeHandler = () => {
    if (mode === 'light') {
      document.cookie = 'mode=dark; path=/; max-age=' + 3600 * 24 * 400;
    } else {
      document.cookie = 'mode=light; path=/; max-age=' + 3600 * 24 * 400;
    }
    router.refresh();
  };

  return (
    <div className="navbar-btn-box" onClick={darkModeHandler}>
      <div className="navbar-btn">
        <span>{mode === 'light' ? '☀️' : '🌙'}</span>
        <span className="navbar-btn-text"> {mode === 'light' ? ' LIGHT' : ' DARK'}</span>
      </div>
    </div>
  );
}
