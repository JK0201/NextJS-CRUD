'use client';

import { useRouter } from 'next/navigation';

export default function Delete({ detailData }) {
  const router = useRouter();
  let deleteData = JSON.parse(detailData);
  let deleteImg;

  const deleteHandler = async () => {
    try {
      if (deleteData.image.length > 0) {
        console.log('zz');
        deleteImg = await fetch(`/api/posting/upload?image=${JSON.stringify(deleteData.image)}`, {
          method: 'DELETE',
        });

        if (!deleteImg.ok) {
          let err = await deleteImg.json();
          throw new Error(err.msg);
        }
      }

      let deleteRes = await fetch('/api/posting/delete', {
        method: 'DELETE',
        body: detailData,
        headers: { 'Content-Type': 'application/json' },
      });

      if (deleteRes.ok) {
        let data = await deleteRes.json();
        alert(data.msg);
        window.location.replace('/posting/list');
      } else {
        let err = await deleteRes.json();
        throw new Error(err.msg);
      }
    } catch (err) {
      alert(err.message);
      return;
    }
  };

  return (
    <div className="footer-btn-box">
      <div className="footer-btn" onClick={deleteHandler}>
        <span>🗑️</span>
        <span className="footer-btn-text"> DELETE</span>
      </div>
    </div>
  );
}
