import React from "react";
import Head2 from "../atoms/Head2";
import TextArea from "../atoms/TextArea";
import PrimaryButton from "../atoms/PrimaryButton";

const CreateMemo = () => {
  return (
    <section className="p-6 bg-gray-700 rounded-lg shadow-inner">
      <Head2>メモ作成</Head2>
      <form className="flex flex-col gap-4">
        <TextArea />
        <PrimaryButton>メモ作成</PrimaryButton>
      </form>
    </section>
  );
};

export default CreateMemo;
