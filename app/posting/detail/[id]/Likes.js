'use client';

import { useRouter } from 'next/navigation';

export default function Likes({ parent, likes }) {
  const router = useRouter();

  const upBtn = () => {
    likeHandler('like');
  };
  const downBtn = () => {
    likeHandler('dislike');
  };

  async function likeHandler(url) {
    let postingId = JSON.parse(parent);
    try {
      let likeRes = await fetch(`/api/posting/${url}?parent=${postingId}`);
      if (!likeRes.ok) {
        let err = await likeRes.json();
        if (likeRes.status === 401) {
          router.push('/api/auth/signin');
        } else {
          throw new Error(err.msg);
        }
      } else {
        router.refresh();
      }
    } catch (err) {
      alert(err.message);
      return;
    }
  }
  return (
    <div className="like-box">
      <div className="like-btn-left" onClick={downBtn}>
        ➖
      </div>
      <div className="like-counter">
        <span className="like-counter-text">{likes}</span>
      </div>
      <div className="like-btn-right" onClick={upBtn}>
        ➕
      </div>
    </div>
  );
}
