import aws from 'aws-sdk';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: 'ap-northeast-2',
    signatureVersion: 'v4',
  });

  const s3 = new aws.S3();

  let fileName = JSON.parse(req.query.image);
  switch (req.method) {
    case 'GET':
      let fileUrl = [];
      try {
        fileName.map((item, idx) => {
          let ext = path.extname(item);
          let fileId = uuidv4(item.name) + ext;

          let url = s3.createPresignedPost({
            Bucket: process.env.BUCKET_NAME,
            Fields: { key: fileId },
            Expires: 60,
            Conditions: [['content-length-range', 0, 1048576]],
          });
          fileUrl.push(url);
        });
        res.status(200).json(fileUrl);
      } catch (err) {
        res.status(500).json({ msg: 'Unexpected error occurred' });
      }
      break;

    case 'DELETE':
      try {
        const deleteBucket = fileName.map(async (item, idx) => {
          const deleteData = {
            Bucket: process.env.BUCKET_NAME,
            Key: item,
          };
          return s3.deleteObject(deleteData).promise();
        });
        await Promise.all(deleteBucket);
        res.status(200).json({ msg: 'Images removed from Bucket' });
      } catch (err) {
        res.status(500).json({ msg: 'Unexpected error occurred' });
      }
      break;

    default:
      return res.status(405).json({ msg: 'Method not allowed' });
  }
}
