import React, { PropsWithChildren } from "react";

const Head1 = ({ children }: PropsWithChildren) => {
  return <h1 className="text-2xl font-bold text-center">{children}</h1>;
};

export default Head1;
