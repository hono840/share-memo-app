import React, { PropsWithChildren } from "react";

const Head2 = ({ children }: PropsWithChildren) => {
  return <h2 className="text-center text-xl font-semibold mb-4">{children}</h2>;
};

export default Head2;
