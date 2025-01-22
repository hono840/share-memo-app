"use client";

import React, { useState } from "react";
import Head2 from "../components/atoms/Head2";
import { supabase } from "../../../utils/supabaseClient";
import Link from "next/link";
import PrimaryButton from "../components/atoms/PrimaryButton";
import Input from "../components/atoms/Input";
import Label from "../components/atoms/Label";
import AccountGuide from "../components/molecules/AccountGuide";
import TextLink from "../components/atoms/TextLink";

const Page = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
        },
      });
      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setMessage({
          type: "success",
          text: "サインアップに成功しました！確認メールをご確認ください。",
        });
      }
    } catch (err) {
      setMessage({ type: "error", text: "予期せぬエラーが発生しました。" });
    }
  };

  return (

    <div className="w-full max-w-3xl bg-gray-800 p-8 rounded-lg shadow-lg">
      <Head2>サインアップ</Head2>
      {/* メッセージ表示 */}
      {message.text && (
        <p
          className={`text-sm mt-4 ${message.type === "success" ? "text-green-500" : "text-red-500"
            }`}
        >
          {message.text}
        </p>
      )}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* ユーザーネーム */}
        <div>
          <Label htmlfor="username">ユーザー名</Label>
          <Input
            id="username"
            type="text"
            placeholder="ユーザー名を入力"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {/* メールアドレス */}
        <div>
          <Label htmlfor="email">メールアドレス</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* パスワード */}
        <div>
          <Label htmlfor="password">パスワード</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* ボタン */}
        <PrimaryButton
          type="submit"
          disabled={!username || !email || !password}
        >
          サインアップ
        </PrimaryButton>
      </form>
      {/* ガイド */}
      <AccountGuide>
        アカウントをお持ちの方は
        <TextLink href="/signin">サインイン</TextLink>
      </AccountGuide>
      <Link
        href="/"
        className="text-blue-500 underline hover:text-blue-600 transition duration-200 text-center block mt-4"
      >
        ホームへ戻る
      </Link>
    </div>

  );
};

export default Page;
