import React from "react";

const ErrorToast = () => {
  return (
    <div
      className={`fixed top-7 left-1/2 transform -translate-x-1/2 p-4 bg-red-500 text-white rounded-lg shadow-md `}
    >
      <div>メモを作成しました！</div>
    </div>
  );
};

export default ErrorToast;
