import React, { FC } from "react";

type Props = {
  onClick: () => void;
};

const SignoutButton: FC<Props> = ({ onClick }) => {

  return (
    <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200" onClick={onClick}>
      サインアウト
    </button>
  );
};

export default SignoutButton;
