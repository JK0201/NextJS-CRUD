'use client';

import { useRouter } from 'next/navigation';

export default function Posting({ postingData }) {
  const router = useRouter();
  const detailHandler = async (id) => {
    router.push(`/posting/detail/${id}`);
  };

  return (
    <div className="posting-display">
      {JSON.parse(postingData)?.map((item, idx) => {
        return (
          <div
            key={idx}
            className="posting-box"
            onClick={() => {
              detailHandler(item._id);
            }}
          >
            <div className="posting-items">
              <div>
                <h3>{item.title}</h3>
                <h5>{item.writer}</h5>
              </div>
              <div style={{ width: '2rem' }}></div>
              <div className="posting-info">
                <div>
                  ❤️{' '}
                  {item.likes >= 0 ? (
                    <span>{item.likes}</span>
                  ) : (
                    <span className="c-red">{Math.abs(item.likes)}</span>
                  )}
                </div>
                <div>🗨️ {item.comments}</div>
                <div>{item.image.length > 0 ? <span>📷 {item.image.length}</span> : ''} </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
