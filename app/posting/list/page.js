import { connectDB } from '@/util/database';
import Posting from './Posting';

export default async function List() {
  const db = (await connectDB).db('next');
  let postingData = [];
  try {
    postingData = await db.collection('posting').find().toArray();
  } catch (err) {
    console.log(err.message);
  }

  return (
    <div className="list-box">
      <h1>POSTING LIST</h1>
      <Posting postingData={JSON.stringify(postingData)} />
    </div>
  );
}
