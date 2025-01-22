"use client";

import React from "react";
import Head1 from "./components/atoms/Head1";
import { useAuth } from "./context/AuthContext";
import LinkButton from "./components/atoms/LinkButton";
import CreateMemo from "./components/organisms/CreateMemo";
import MemoLists from "./components/organisms/MemoLists";

const Page = () => {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-10">
      <div className="w-full max-w-3xl mx-auto flex justify-between items-center py-4">
        <Head1>Share Memo App</Head1>
        {isLoggedIn ? (
          <LinkButton href="/signout" />
        ) : (
          <div className="flex gap-4">
            <LinkButton href="/signin" />
            <LinkButton href="/signup" />
          </div>
        )}
      </div>
      <div className="w-full max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md flex flex-col gap-10">
        {/* メモ作成エリア */}
        <CreateMemo />
        {/* メモ一覧エリア */}
        <MemoLists />
      </div>
    </div>
  );
};

export default Page;
