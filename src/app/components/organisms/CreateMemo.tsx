import React, { useState } from "react";
import Head2 from "../atoms/Head2";
import TextArea from "../atoms/TextArea";
import PrimaryButton from "../atoms/PrimaryButton";
import SuccessToast from "../atoms/SuccessToast";
import { supabase } from "../../../../utils/supabaseClient";

const CreateMemo = () => {
  const [textValue, setTextValue] = useState("");
  const [successCreateMemo, setSuccessCreateMemo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  const handleCreateMemo = async () => {
    try {
      const { error } = await supabase
        .from("share-memo-app")
        .insert([{ contents: textValue }]);
      if (error) {
        console.error(error);
        setErrorMessage("メモの作成に失敗しました");
        setTimeout(() => setErrorMessage(""), 3000);
        return;
      }
      setSuccessCreateMemo(true);
      setTimeout(() => setSuccessCreateMemo(false), 3000);
      setTextValue("");
    } catch (err) {
      console.error(err);
      setErrorMessage("予期せぬエラーが発生しました");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    handleCreateMemo();
  };

  return (
    <section className="p-6 bg-gray-700 rounded-lg shadow-inner">
      <Head2>メモ作成</Head2>
      {successCreateMemo && <SuccessToast />}
      {errorMessage && (
        <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
      )}
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <TextArea value={textValue} onChange={onChangeText} />
        <PrimaryButton type="submit" disabled={!textValue}>
          メモ作成
        </PrimaryButton>
      </form>
    </section>
  );
};

export default CreateMemo;
