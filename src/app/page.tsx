"use client";

import React from "react";
import MemoLists from "./organisms/MemoLists";
import CreateMemo from "./organisms/CreateMemo";
import Head1 from "./atoms/Head1";

const Page = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen pt-10">
      <Head1>Share Memo App</Head1>
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
