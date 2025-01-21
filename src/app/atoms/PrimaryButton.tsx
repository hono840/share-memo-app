import React, { PropsWithChildren } from "react";

const PrimaryButton = ({ children }: PropsWithChildren) => {
  return (
    <button
      type="submit"
      className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition duration-200"
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
