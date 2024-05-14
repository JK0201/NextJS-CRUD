'use client';

import { useRef, useState } from 'react';
import Delete from './Delete';

export default function Upload({ uploadImg, setUploadImg, fileArray, setFileArray }) {
  const uploadRef = useRef(null);
  const [totalSize, setTotalSize] = useState(0);
  const [previewImg, setPreviewImg] = useState([]);

  const presignedHandler = async (e) => {
    let file = e.target.files;
    let fileArr = Array.from(file);

    if (!imageValid(file, totalSize, uploadImg)) {
      e.target.value = '';
      return;
    } else {
      let uploadSize = sizeHandler(fileArr);
      setTotalSize(totalSize + uploadSize);
      setFileArray((item) => [...item, ...fileArr]);
      e.target.value = '';
    }

    if (fileArr.length > 0) {
      let objectUrl = [];
      fileArr.map((item, idx) => {
        objectUrl.push(URL.createObjectURL(item));
      });
      setPreviewImg([...previewImg, ...objectUrl]);
    }

    let fileName = fileArr.map((item, idx) => {
      return encodeURIComponent(item.name);
    });

    try {
      let res = await fetch(`/api/posting/upload?image=${JSON.stringify(fileName)}`);
      if (res.ok) {
        res = await res.json();
        setUploadImg([...uploadImg, ...res]);
      } else {
        let err = await res.json();
        throw new Error(err.msg);
      }
    } catch (err) {
      console.log(err.message);
      return;
    }
  };

  function sizeHandler(file) {
    let uploadSize = 0;
    for (let i = 0; i < file.length; i++) {
      uploadSize += file[i].size;
    }
    return uploadSize;
  }

  function extHandler(file) {
    for (let i = 0; i < file.length; i++) {
      let ext = file[i].name.split('.').pop();
      if (ext !== 'jpg' && ext !== 'jpeg' && ext !== 'png') {
        return false;
      }
    }
    return true;
  }

  function imageValid(file, totalSize, uploadImg) {
    let uploadSize = sizeHandler(file);

    if (uploadImg.length + file.length > 3) {
      alert('최대 업로드 갯수는 3장입니다');
      return false;
    } else if (uploadSize + totalSize > 1024 * 1024 * 5) {
      alert('최대 업로드 용량은 5MB입니다');
      return false;
    } else if (!extHandler(file)) {
      alert('이미지 파일만 업로드 가능합니다\n( .JPG .JPEG .PNG )');
      return false;
    }
    return true;
  }

  return (
    <div className="write-input-box pb-2">
      <p>Upload</p>
      <input type="file" multiple accept=".jpg,.jpeg,.png" hidden ref={uploadRef} onChange={presignedHandler} />
      <div className="upload-btn-box">
        <div
          type="button"
          className="upload-btn"
          onClick={() => {
            uploadRef.current.click();
          }}
        >
          <span className="c-white f-24">📷</span>
        </div>
      </div>
      {previewImg?.map((item, idx) => {
        return (
          <div className="write-img-box" key={idx}>
            <img className="write-img" src={item} />
            <Delete
              idx={idx}
              uploadImg={uploadImg}
              setUploadImg={setUploadImg}
              fileArray={fileArray}
              setFileArray={setFileArray}
              totalSize={totalSize}
              setTotalSize={setTotalSize}
              previewImg={previewImg}
              setPreviewImg={setPreviewImg}
            />
          </div>
        );
      })}
    </div>
  );
}
