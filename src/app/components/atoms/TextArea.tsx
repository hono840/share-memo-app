import React, { FC } from "react";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
};

const TextArea: FC<Props> = ({ value, onChange, rows = 5 }) => {
  return (
    <textarea
      rows={rows}
      className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="メモ内容を入力してください"
      value={value}
      onChange={onChange}
    />
  );
};

export default TextArea;
