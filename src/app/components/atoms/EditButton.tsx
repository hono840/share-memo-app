import React, { FC } from "react";
type Props = {
  onClick: () => void;
};

const EditButton: FC<Props> = ({ onClick }) => {
  return (
    <button
      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition duration-200"
      onClick={onClick}
    >
      編集
    </button>
  );
};

export default EditButton;
