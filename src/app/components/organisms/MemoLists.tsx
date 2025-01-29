"use client";

import React, { useEffect, useState } from "react";
import Head2 from "../atoms/Head2";
import EditButton from "../atoms/EditButton";
import DeleteButton from "../atoms/DeleteButton";
import { supabase } from "../../../../utils/supabaseClient";
import TextArea from "../atoms/TextArea";
import CancelButton from "../atoms/CancelButton";

type Memo = {
  id: string;
  contents: string;
  created_at: string;
  user: string;
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
  const [isEdit, setIsEdit] = useState<{ [id: string]: boolean }>({});
  const [editValues, setEditValues] = useState<{ [id: string]: string }>({});

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
          loadMemos(); // 新しい変更があった場合にリストを更新
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

  // 編集状態の切り替え
  const toggleEdit = (id: string, currentContent: string) => {
    setIsEdit((prev) => ({ ...prev, [id]: !prev[id] }));
    setEditValues((prev) => ({ ...prev, [id]: currentContent }));
  };

  // 編集内容更新
  const onChangeMemo = (id: string, value: string) => {
    setEditValues((prev) => ({ ...prev, [id]: value }));
  };

  // メモ編集を確定
  const editMemo = async (id: string) => {
    try {
      const { error } = await supabase
        .from("share-memo-app")
        .update({ contents: editValues[id] })
        .eq("id", id);

      if (error) {
        setError("メモの更新に失敗しました");
        return;
      }

      setMemos((prevMemos) =>
        prevMemos.map((memo) =>
          memo.id === id ? { ...memo, contents: editValues[id] } : memo
        )
      );

      setIsEdit((prev) => ({ ...prev, [id]: false }));
    } catch {
      setError("メモの更新に失敗しました");
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
                <span className="text-sm text-gray-300">
                  投稿者：{memo.user ? memo.user : "名無し"}
                </span>
                <span className="text-sm text-gray-300">
                  投稿日時: {new Date(memo.created_at).toLocaleString()}
                </span>
                {isEdit[memo.id] ? (
                  <TextArea
                    rows={1}
                    value={editValues[memo.id]}
                    onChange={(e) => onChangeMemo(memo.id, e.target.value)}
                  />
                ) : (
                  <div className="text-white">{memo.contents}</div>
                )}
              </div>

              {/* 編集&削除ボタン */}
              <div className="flex gap-2">
                {isEdit[memo.id] ? (
                  <>
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => editMemo(memo.id)}
                    >
                      更新
                    </button>
                    <CancelButton
                      onClick={() => toggleEdit(memo.id, memo.contents)}
                    />
                  </>
                ) : (
                  <EditButton
                    onClick={() => toggleEdit(memo.id, memo.contents)}
                  />
                )}
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
