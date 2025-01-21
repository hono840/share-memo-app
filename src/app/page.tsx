"use client";

import React from "react";
import MemoLists from "./organisms/MemoLists";
import CreateMemo from "./organisms/CreateMemo";
import Head1 from "./atoms/Head1";
import Link from "next/link";
import { supabase } from "../../utils/supabaseClient";

// サインインしていたらコンソールにユーザー情報を表示
supabase.auth.getUser().then(({ data: { user } }) => {
  console.log('ログインしています')
  console.log(user?.email);
});

const Page = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen pt-10">
      <div className="w-full max-w-3xl mx-auto flex justify-between items-center py-4">
        <Head1>Share Memo App</Head1>
        <div className="flex gap-4">
          <Link
            href="/signup"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
          >
            サインアップ
          </Link>
          <Link
            href="/signin"
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition duration-200"
          >
            サインイン
          </Link>
        </div>
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
