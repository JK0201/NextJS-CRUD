import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import Likes from './Likes';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Comment from './Comment';
import Delete from './Delete';

export default async function Detail({ params }) {
  const session = await getServerSession(authOptions);
  const db = (await connectDB).db('next');
  let detailData;
  let commentData;
  try {
    let postingId = new ObjectId(params.id);
    detailData = await db.collection('posting').findOne({ _id: postingId });
    commentData = await db.collection('comment').find({ parent: postingId }).toArray();
  } catch (err) {
    console.log(err.message);
  }

  return (
    <div className="list-box">
      <h1>DETAIL</h1>
      <div className="posting-display">
        <div className="posting-box detail-box">
          <div className="detail-item">
            <div>
              <h3>{detailData.title}</h3>
              <h5>{detailData.writer}</h5>
            </div>
            <div style={{ width: '2rem' }}></div>
            <div className="posting-info">
              <div>
                ❤️{' '}
                {detailData.likes >= 0 ? (
                  <span>{detailData.likes}</span>
                ) : (
                  <span className="c-red">{Math.abs(detailData.likes)}</span>
                )}
              </div>
              <div>🗨️ {detailData.comments}</div>
            </div>
          </div>
          <div className="detail-body">
            <p>{detailData.content}</p>
            <div className="detial-img-display">
              {detailData.image.length > 0
                ? detailData?.image.map((item, idx) => {
                    return (
                      <div key={idx} className="detail-img-box">
                        <img src={process.env.IMAGE_URL + item} className="detail-img" />
                      </div>
                    );
                  })
                : ''}
            </div>
            <Likes parent={JSON.stringify(detailData._id)} likes={detailData.likes} />
          </div>
          {(session && session.user.email === detailData.email) || session.user.role === 'admin' ? (
            <div className="detail-footer">
              <div className="footer-btn-box">
                <Link href="/posting/list">
                  <div className="footer-btn">
                    <span>📑</span>
                    <span className="footer-btn-text"> LIST</span>
                  </div>
                </Link>
              </div>
              <div className="footer-right-btn">
                <div className="footer-btn-box">
                  <Link href={`/posting/update/${detailData._id}`}>
                    <div className="footer-btn">
                      <span>✏️</span>
                      <span className="footer-btn-text"> UPDATE</span>
                    </div>
                  </Link>
                </div>
                <Delete detailData={JSON.stringify(detailData)} />
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <Comment postingId={params} commentData={JSON.stringify(commentData)} />
    </div>
  );
}
