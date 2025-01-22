import Link from "next/link";
import React, { FC } from "react";

type Props = {
  href: string;
};

const LinkButton: FC<Props> = ({ href }) => {
  let className = "";

  let value = "";
  switch (href) {
    case "/signup":
      className =
        "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200";
      value = "サインアップ";
      break;
    case "/signin":
      className =
        "px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition duration-200";
      value = "サインイン";
      break;
    case "/signout":
      className =
        "px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200";
      value = "サインアウト";
      break;
    default:
      className = "px-4 py-2 text-white rounded transition duration-200";
      value = "";
      break;
  }
  return (
    <Link href={href} className={className}>
      {value}
    </Link>
  );
};

export default LinkButton;
