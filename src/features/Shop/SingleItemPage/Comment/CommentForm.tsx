import { Search } from "lucide-react";
import { useState } from "react";
import { createComment } from "./commentQueries";

export default function CommentForm({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) {
  const [comment, setComment] = useState("");

  const handleAddingComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createComment({ productId, text: comment, userId });
  };

  return (
    <form
      onSubmit={(e) => {
        handleAddingComment(e);
        setComment("");
      }}
      className="flex justify-center h-[5rem] items-center w-full border-[1px] relative bg-white rounded-lg"
    >
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border-primary-pastel-blue w-full outline-none border-[3px] border-dotted bg-transparent rounded-lg py-[1.15rem] px-[1rem] font-bold text-neutral-dark-grayish-blue"
      />
      <button
        type="submit"
        className="hover:z-[3] hover:scale-[1.1] cursor-pointer absolute right-[3rem]"
      >
        <Search className="text-primary-pastel-blue" />
      </button>
    </form>
  );
}
