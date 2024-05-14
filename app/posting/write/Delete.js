'use client';

export default function Delete({
  idx,
  uploadImg,
  setUploadImg,
  fileArray,
  setFileArray,
  totalSize,
  setTotalSize,
  previewImg,
  setPreviewImg,
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
  };

  return (
    <span className="del-btn" onClick={deleteHandler}>
      ❌
    </span>
  );
}
