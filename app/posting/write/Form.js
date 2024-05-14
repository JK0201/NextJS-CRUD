'use client';

import { useRef, useState } from 'react';
import Upload from './Upload';
import { useRouter } from 'next/navigation';

export default function Form() {
  const router = useRouter();
  const titleRef = useRef('');
  const contentRef = useRef('');
  const [fileArray, setFileArray] = useState([]);
  const [uploadImg, setUploadImg] = useState([]);
  let imageName = [];
  let imageSize = [];

  const submitHandler = async () => {
    let title = titleRef.current;
    let content = contentRef.current;

    if (!title || !content) {
      alert('제목과 내용을 입력해주세요');
      return;
    }

    if (uploadImg.length > 0 && title && content) {
      const uploadPromise = uploadImg.map(async (item, idx) => {
        const formData = new FormData();
        Object.entries({ ...item.fields, file: fileArray[idx] }).forEach(([key, value]) => {
          formData.append(key, value);
        });

        try {
          let bucketRes = await fetch(item.url, {
            method: 'POST',
            body: formData,
          });

          if (bucketRes.ok) {
            imageName.push(item.fields.key);
            imageSize.push(fileArray[idx].size);
          } else {
            throw new Error('Unexpected error occurred');
          }
        } catch (err) {
          console.log(err.message);
          return;
        }
      });
      await Promise.all(uploadPromise);
    }

    let postingData = {
      title: title,
      content: content,
      image: imageName,
      size: imageSize,
    };

    try {
      let postingRes = await fetch('/api/posting/write', {
        method: 'POST',
        body: JSON.stringify(postingData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!postingRes.ok) {
        if (postingRes.status === 401) {
          router.push('/api/auth/signin');
        } else {
          let err = await postingRes.json();
          throw new Error(err.msg);
        }
      } else {
        let data = await postingRes.json();
        alert(data.msg);
        window.location.href = '/posting/list';
      }
    } catch (err) {
      alert(err.message);
      return;
    }
  };

  return (
    <div className="write-box-elements">
      <div className="write-input-box">
        <p>Title</p>
        <input
          type="text"
          className="write-input"
          onChange={(e) => {
            titleRef.current = e.target.value;
          }}
        ></input>
      </div>
      <div className="write-input-box">
        <p>Content</p>
        <textarea
          className="write-input-textarea"
          onChange={(e) => {
            contentRef.current = e.target.value;
          }}
        ></textarea>
      </div>
      <Upload uploadImg={uploadImg} setUploadImg={setUploadImg} fileArray={fileArray} setFileArray={setFileArray} />
      <div className="posting-div">
        <div className="posting-div-line"></div>
      </div>
      <div className="write-btn-box">
        <div
          type="button"
          className="cancle-btn"
          onClick={() => {
            router.back();
          }}
        >
          <span className="c-white">취소</span>
        </div>
        <div type="button" className="write-btn" onClick={submitHandler}>
          <span className="c-white">게시글등록</span>
        </div>
      </div>
    </div>
  );
}
