import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  switch (req.method) {
    case 'DELETE':
      const session = await getServerSession(req, res, authOptions);
      const db = (await connectDB).db('next');

      if (!session) {
        return res.status(401).json({ msg: '로그인이 필요한 서비스입니다' });
      } else if (req.body.email !== session.user.email && session.user.role === 'norm') {
        return res.status(400).json({ msg: '해당 글에 대한 삭제 권한이 없습니다' });
      }

      if (req.body.email === session.user.email || session.user.role === 'admin') {
        let postingId = new ObjectId(req.body._id);
        await db.collection('comment').deleteMany({ parent: postingId });
        await db.collection('like').deleteMany({ parent: postingId });
        await db.collection('dislike').deleteMany({ parent: postingId });
        await db.collection('posting').deleteOne({ _id: postingId });
        res.status(200).json({ msg: '게시글을 삭제했습니다' });
      }
      break;
    default:
      return res.status(405).json({ msg: 'Method not allowed' });
  }
}
