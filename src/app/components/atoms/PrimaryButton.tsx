import React, { PropsWithChildren } from "react";

type Props = {
  type: "button" | "submit" | "reset";
  disabled: boolean;
};

const PrimaryButton = ({
  children,
  type,
  disabled,
}: PropsWithChildren<Props>) => {
  return (
    <button
      type={type}
      className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
