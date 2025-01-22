"use client";

import React, { useEffect, useState } from "react";
import Head2 from "../atoms/Head2";
import EditButton from "../atoms/EditButton";
import DeleteButton from "../atoms/DeleteButton";
import { supabase } from "../../../../utils/supabaseClient";

type Memo = {
  id: string;
  contents: string;
  created_at: string;
};

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
    return data || [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

const MemoLists = () => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // メモ一覧を取得
  const loadMemos = async () => {
    try {
      setLoading(true);
      const data = await fetchMemos();
      setMemos(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("メモの取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  // 初期マウント時にメモ一覧を取得
  useEffect(() => {
    loadMemos();
    const channel = supabase
      .channel("memos")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "share-memo-app" },
        () => {
          // 新しい変更があった場合にリストを更新
          loadMemos();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel); // コンポーネントのアンマウント時に購読解除
    };
  }, []);

  // メモ削除
  const deleteMemo = async (id: string) => {
    try {
      const { error } = await supabase
        .from("share-memo-app")
        .delete()
        .eq("id", id);
      if (error) {
        console.error(error.message);
        return;
      }
      setMemos((prevMemos) => prevMemos.filter((memo) => memo.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="p-6 bg-gray-700 rounded-lg shadow-inner">
      <Head2>メモ一覧</Head2>
      {loading ? (
        <p className="text-gray-300">メモを読み込んでいます...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : memos.length === 0 ? (
        <p className="text-gray-300">現在メモがありません。</p>
      ) : (
        <ul className="space-y-4">
          {memos.map((memo) => (
            <li
              className="bg-gray-600 p-4 rounded-lg shadow-md flex flex-col gap-4"
              key={memo.id}
            >
              {/* メモ情報 */}
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-300">投稿者：山田太郎</span>
                <span className="text-sm text-gray-300">
                  投稿日時: {new Date(memo.created_at).toLocaleString()}
                </span>
                <div className="text-white">{memo.contents}</div>
              </div>
              {/* 編集&削除ボタン */}
              <div className="flex gap-2">
                <EditButton />
                <DeleteButton memoId={memo.id} onDelete={deleteMemo} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default MemoLists;
