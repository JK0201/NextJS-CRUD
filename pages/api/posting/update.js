import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    const db = (await connectDB).db('next');
    if (!session) {
      return res.status(401).json({ msg: '로그인이 필요한 서비스입니다' });
    } else if (session.user.email !== req.body.email && session.user.role === 'norm') {
      return res.status(400).json({ msg: '해당 글에 대한 수정 권한이 없습니다' });
    }

    if (!req.body.title || !req.body.content) {
      return res.status(400).json({ msg: '제목과 내용을 입력해주세요' });
    }

    if (session.user.email === req.body.email || session.user.role === 'admin') {
      let postingId = { _id: new ObjectId(req.body._id) };
      let updateData = {
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        size: req.body.size,
      };
      try {
        await db.collection('posting').updateOne(postingId, { $set: updateData });
        return res.status(200).json({ msg: '게시글을 수정했습니다' });
      } catch (err) {
        return res.status(500).json({ msg: 'Unexpected error occurred' });
      }
    }
  }
}
