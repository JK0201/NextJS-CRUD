'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function Comment({ postingId, commentData }) {
  const router = useRouter();
  const commentRef = useRef('');

  const commentHandler = async () => {
    let comment = commentRef.current;
    let commentData = {
      parent: postingId.id,
      comment: comment,
    };

    if (!comment) {
      alert('댓글 내용을 작성해주세요');
      return;
    }

    try {
      let commentRes = await fetch('/api/posting/comment', {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!commentRes.ok) {
        let err = await commentRes.json();
        throw new Error(err.msg);
      } else {
        router.refresh();
      }
    } catch (err) {
      alert(err.message);
      return;
    }
  };

  return (
    <div>
      <h1>Comment</h1>
      <div className="comment-input-box">
        <input
          type="text"
          className="comment-input"
          onChange={(e) => {
            commentRef.current = e.target.value;
          }}
        />
        <div type="button" className="comment-btn" onClick={commentHandler}>
          <span className="c-white">등록</span>
        </div>
      </div>
      {JSON.parse(commentData)?.map((item, idx) => {
        return (
          <div key={idx} className="comment-item">
            <h3>{item.comment}</h3>
            <h5>by. {item.name}</h5>
          </div>
        );
      })}
    </div>
  );
}
