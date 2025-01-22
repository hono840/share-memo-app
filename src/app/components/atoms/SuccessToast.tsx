import React from "react";

const SuccessToast = () => {
  return (
    <div
      className={`fixed top-7 left-1/2 transform -translate-x-1/2 p-4 bg-green-500 text-white rounded-lg shadow-md `}
    >
      <div>メモを作成しました！</div>
    </div>
  );
};

export default SuccessToast;
