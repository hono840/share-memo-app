"use client";

import React, { useState } from "react";
import Head2 from "../components/atoms/Head2";
import { supabase } from "../../../utils/supabaseClient";
import Link from "next/link";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <Head2>サインアップ</Head2>
        {/* メッセージ表示 */}
        {message.text && (
          <p
            className={`text-sm mt-4 ${
              message.type === "success" ? "text-green-500" : "text-red-500"
            }`}
          >
            {message.text}
          </p>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              ユーザー名
            </label>
            <input
              id="username"
              type="text"
              placeholder="ユーザー名を入力"
              className="w-full px-4 py-2 border border-gray-700 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@example.com"
              className="w-full px-4 py-2 border border-gray-700 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              パスワード
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              className="w-full px-4 py-2 border border-gray-700 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            サインアップ
          </button>
        </form>
        {/* Footer Links */}
        <div className="mt-6 text-center text-sm text-gray-400">
          すでにアカウントをお持ちですか？
          <a href="/signin" className="text-blue-500 hover:underline ml-1">
            サインイン
          </a>
        </div>
        <Link
          href="/"
          className="text-blue-500 underline hover:text-blue-600 transition duration-200 text-center block mt-4"
        >
          ホームへ戻る
        </Link>
      </div>
    </div>
  );
};

export default Page;
