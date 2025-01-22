"use client";

import React, { useState, useEffect } from "react";
import Head1 from "./components/atoms/Head1";
import { useAuth } from "./context/AuthContext";
import LinkButton from "./components/atoms/LinkButton";
import CreateMemo from "./components/organisms/CreateMemo";
import MemoLists from "./components/organisms/MemoLists";
import { supabase } from "../../utils/supabaseClient";

const Page = () => {
  const { isLoggedIn } = useAuth();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const user = data.session?.user;
      const username = user?.user_metadata?.username;
      setUsername(username);
    });
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-10">
      <div className="max-w-3xl mx-auto flex flex-col">
        <div className="flex flex-col">
          <div className="w-full flex justify-between items-center py-4">
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
          <p className="mb-2">ようこそ{username}さん</p>
        </div>
        <div className="w-full max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md flex flex-col gap-10">
          {/* メモ作成エリア */}
          <CreateMemo />
          {/* メモ一覧エリア */}
          <MemoLists />
        </div>
      </div>
    </div>
  );
};

export default Page;
