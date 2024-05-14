'use client';

import { useEffect, useRef, useState } from 'react';
import Upload from './Upload';
import { useRouter } from 'next/navigation';

export default function Form({ data }) {
  const postingData = JSON.parse(data);
  const router = useRouter();
  const titleRef = useRef('');
  const contentRef = useRef('');
  const [fileArray, setFileArray] = useState([]);
  const [uploadImg, setUploadImg] = useState([]);
  const [totalSize, setTotalSize] = useState(0);
  const [originalImg, setOriginalImg] = useState([]);
  const [origianlSize, setOriginalSize] = useState([]);
  const [delOriginalImg, setDelOriginalImg] = useState([]);

  useEffect(() => {
    let originalSize = 0;
    postingData.size.map((item, idx) => {
      originalSize += item;
    });
    setTotalSize(originalSize);
    setOriginalImg([...postingData.image]);
    setOriginalSize([...postingData.size]);
    titleRef.current = postingData.title;
    contentRef.current = postingData.content;
  }, []);

  const submitHandler = async () => {
    let title = titleRef.current;
    let content = contentRef.current;

    if (!title || !content) {
      alert('제목과 내용을 입력해주세요');
      return;
    }

    let imageName = [...originalImg];
    let imageSize = [...origianlSize];

    if (delOriginalImg.length > 0 && title && content) {
      try {
        let delBucketRes = await fetch(`/api/posting/upload?image=${JSON.stringify(delOriginalImg)}`, {
          method: 'DELETE',
        });

        if (!delBucketRes.ok) {
          let err = await delBucketRes.json();
          throw new Error(err.msg);
        }
      } catch (err) {
        console.log(err.message);
        return;
      }
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

    let updateData = {
      _id: postingData._id,
      email: postingData.email,
      title: title,
      content: content,
      image: imageName,
      size: imageSize,
    };

    try {
      let updateRes = await fetch('/api/posting/update', {
        method: 'POST',
        body: JSON.stringify(updateData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!updateRes.ok) {
        if (updateRes.status === 401) {
          router.push('/api/auth/signin');
        } else {
          let err = await updateRes.json();
          throw new Error(err.msg);
        }
      } else {
        let data = await updateRes.json();
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
          defaultValue={titleRef.current}
          onChange={(e) => {
            titleRef.current = e.target.value;
          }}
        ></input>
      </div>
      <div className="write-input-box">
        <p>Content</p>
        <textarea
          className="write-input-textarea"
          defaultValue={contentRef.current}
          onChange={(e) => {
            contentRef.current = e.target.value;
          }}
        ></textarea>
      </div>
      <Upload
        uploadImg={uploadImg}
        setUploadImg={setUploadImg}
        fileArray={fileArray}
        setFileArray={setFileArray}
        originalImg={originalImg}
        setOriginalImg={setOriginalImg}
        originalSize={origianlSize}
        setOriginalSize={setOriginalSize}
        totalSize={totalSize}
        setTotalSize={setTotalSize}
        delOriginalImg={delOriginalImg}
        setDelOriginalImg={setDelOriginalImg}
      />
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
          <span className="c-white">게시글수정</span>
        </div>
      </div>
    </div>
  );
}
