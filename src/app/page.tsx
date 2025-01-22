"use client";

import React, { useState, useEffect } from "react";
import Head1 from "./components/atoms/Head1";
import { useAuth } from "./context/AuthContext";
import LinkButton from "./components/atoms/LinkButton";
import CreateMemo from "./components/organisms/CreateMemo";
import MemoLists from "./components/organisms/MemoLists";
import { supabase } from "../../utils/supabaseClient";
import SignoutButton from "./components/atoms/SignoutButton";

const Page = () => {
  const { isLoggedIn, setLoggedIn } = useAuth();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const user = data.session?.user;
      const username = user?.user_metadata?.username;
      setUsername(username);
    });
  }, []);

  // サインアウト処理
  const signout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("サインアウトエラー:", error.message);
        alert("サインアウトに失敗しました。もう一度お試しください。");
        return;
      }
      setLoggedIn(false);
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      alert("予期せぬエラーが発生しました。");
    }
  }

  return (
    <div className="w-full max-w-3xl bg-gray-800 p-8 rounded-lg shadow-lg">
      <div className="flex flex-col">
        <div className="w-full flex justify-between items-center py-4">
          <Head1>Share Memo App</Head1>
          {isLoggedIn ? (
            <SignoutButton onClick={signout} />
          ) : (
            <div className="flex gap-4">
              <LinkButton href="/signin" />
              <LinkButton href="/signup" />
            </div>
          )}
        </div>
        <p className="mb-2">ようこそ{username}さん</p>
      </div>
      <div className="w-full py-6 bg-gray-800 rounded-lg shadow-sm flex flex-col gap-10">
        {/* メモ作成エリア */}
        <CreateMemo />
        {/* メモ一覧エリア */}
        <MemoLists />
      </div>
    </div>

  );
};

export default Page;
