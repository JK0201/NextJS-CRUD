'use client';

import { useEffect } from 'react';

export default function Delete({
  idx,
  oriIdx,
  uploadImg,
  setUploadImg,
  fileArray,
  setFileArray,
  totalSize,
  setTotalSize,
  previewImg,
  setPreviewImg,
  originalImg,
  setOriginalImg,
  originalSize,
  setOriginalSize,
  delOriginalImg,
  setDelOriginalImg,
}) {
  const deleteHandler = async () => {
    setUploadImg(
      uploadImg.filter((item, i) => {
        return idx !== i;
      })
    );

    setFileArray(
      fileArray.filter((item, i) => {
        if (idx === i) {
          setTotalSize(totalSize - item.size);
        }
        return idx !== i;
      })
    );

    setPreviewImg(
      previewImg.filter((item, i) => {
        return idx !== i;
      })
    );

    setOriginalImg(
      originalImg.filter((item, i) => {
        if (oriIdx === i) {
          setDelOriginalImg([...delOriginalImg, item]);
        }
        return oriIdx !== i;
      })
    );

    setOriginalSize(
      originalSize.filter((item, i) => {
        if (oriIdx === i) {
          setTotalSize(totalSize - item);
        }
        return oriIdx !== i;
      })
    );
  };

  return (
    <span className="del-btn" onClick={deleteHandler}>
      ❌
    </span>
  );
}
