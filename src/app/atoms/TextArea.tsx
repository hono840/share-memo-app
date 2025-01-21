import React from "react";

const TextArea = () => {
  return (
    <textarea
      rows={5}
      className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="メモ内容を入力してください"
    />
  );
};

export default TextArea;
