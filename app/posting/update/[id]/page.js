import Form from './Form';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function Update({ params }) {
  const postingId = new ObjectId(params.id);
  const db = (await connectDB).db('next');
  let postingData = await db.collection('posting').findOne({ _id: postingId });
  
  return (
    <div className="write-box">
      <h1>UPDATE</h1>
      <Form data={JSON.stringify(postingData)} />
    </div>
  );
}
