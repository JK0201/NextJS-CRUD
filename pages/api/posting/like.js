import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ msg: '로그인이 필요한 서비스입니다' });
    }

    const db = (await connectDB).db('next');
    let postingId = new ObjectId(req.query.parent);
    let likeData = {
      parent: postingId,
      email: session.user.email,
    };

    try {
      let likeExist = await db.collection('like').findOne(likeData);
      let dislikeExist = await db.collection('dislike').findOne(likeData);

      if (likeExist && !dislikeExist) {
        return res.status(400).json({ msg: '이미 좋아요를 눌렀습니다' });
      }
      if (!likeExist && !dislikeExist) {
        await db.collection('like').insertOne(likeData);
        await db.collection('posting').updateOne({ _id: postingId }, { $inc: { likes: 1 } });
        return res.status(200).json({ msg: '좋아요를 눌렀습니다' });
      } else if (!likeExist && dislikeExist) {
        await db.collection('dislike').deleteOne(likeData);
        await db.collection('posting').updateOne({ _id: postingId }, { $inc: { likes: 1 } });
        return res.status(200).json({ msg: '싫어요를 취소했습니다' });
      }
    } catch (err) {
      return res.status(500).json({ msg: 'Unexpected error occurred' });
    }
  }
}
