"use client";

import React, { useEffect } from "react";
import { supabase } from "../../../utils/supabaseClient";
import Head2 from "../atoms/Head2";
import EditButton from "../atoms/EditButton";
import DeleteButton from "../atoms/DeleteButton";

const fetchMemos = async () => {
  try {
    const { data, error } = await supabase
      .from("share-memo-app")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error(error.message);
      return [];
    }
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const MemoLists = () => {
  // 初期マウント時にメモ一覧を取得
  useEffect(() => {
    fetchMemos();
  }, []);

  return (
    <section className="p-6 bg-gray-700 rounded-lg shadow-inner">
      <Head2>メモ一覧</Head2>
      <ul className="space-y-4">
        <li className="bg-gray-600 p-4 rounded-lg shadow-md flex flex-col gap-4">
          {/* メモ情報 */}
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-300">投稿者名：山田 太郎</span>
            <span className="text-sm text-gray-300">
              投稿日時：2025-01-21 12:00
            </span>
            <div className="text-white">
              これはサンプルメモの内容です。これはサンプルメモの内容です。これはサンプルメモの内容です。これはサンプルメモの内容です。
              これはサンプルメモの内容です。これはサンプルメモの内容です。これはサンプルメモの内容です。これはサンプルメモの内容です。
              これはサンプルメモの内容です。これはサンプルメモの内容です。これはサンプルメモの内容です。これはサンプルメモの内容です。
              これはサンプルメモの内容です。これはサンプルメモの内容です。これはサンプルメモの内容です。これはサンプルメモの内容です。
            </div>
          </div>
          {/* 編集&削除ボタン */}
          <div className="flex gap-2">
            <EditButton />
            <DeleteButton />
          </div>
        </li>
      </ul>
    </section>
  );
};

export default MemoLists;
