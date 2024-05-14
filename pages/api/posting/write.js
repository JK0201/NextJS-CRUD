import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { connectDB } from '@/util/database';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ msg: '로그인이 필요한 서비스입니다' });
    }

    if (!req.body.title || !req.body.content) {
      return res.status(400).json({ msg: '제목과 내용을 입력해주세요' });
    }

    const db = (await connectDB).db('next');
    try {
      let counter = await db.collection('counter').findOne({ name: 'posting' });
      const postingData = {
        posting_num: counter.count + 1,
        writer: session.user.name,
        email: session.user.email,
        ...req.body,
        likes: 0,
        comments: 0,
      };
      await db.collection('posting').insertOne(postingData);
      await db.collection('counter').updateOne({ name: 'posting' }, { $inc: { count: 1 } });
      res.status(200).json({ msg: '게시글을 등록했습니다' });
    } catch (err) {
      return res.status(500).json({ msg: 'Unexpected error occurred' });
    }
  }
}
