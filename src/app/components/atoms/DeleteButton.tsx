import React from "react";
type Props = {
  memoId: string;
  onDelete: (id: string) => void;
};

const DeleteButton = ({ memoId, onDelete }: Props) => {
  const handleClick = () => {
    if (confirm("削除しますか？")) {
      onDelete(memoId);
    }
  };
  return (
    <button
      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition duration-200"
      onClick={handleClick}
    >
      削除
    </button>
  );
};

export default DeleteButton;
