import React, { FC } from "react";
type Props = {
  onClick: () => void;
};

const CancelButton: FC<Props> = ({ onClick }) => {
  return (
    <button
      className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg transition duration-200"
      onClick={onClick}
    >
      キャンセル
    </button>
  );
};

export default CancelButton;
