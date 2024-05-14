import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      const session = await getServerSession(req, res, authOptions);
      const db = (await connectDB).db('next');

      if (!session) {
        return res.status(401).json({ msg: '로그인이 필요한 서비스입니다' });
      }

      if (!req.body.comment) {
        return res.status(400).json({ msg: '댓글 내용을 작성해주세요' });
      }

      let commentData = {
        parent: new ObjectId(req.body.parent),
        name: session.user.name,
        comment: req.body.comment,
      };
 
      await db.collection('comment').insertOne(commentData);
      await db.collection('posting').updateOne({ _id: new ObjectId(req.body.parent) }, { $inc: { comments: 1 } });
      res.status(200).json({ msg: '댓글을 등록했습니다' });
      break;

    default:
      return res.status(405).json({ msg: 'Method not allowed' });
  }
}
