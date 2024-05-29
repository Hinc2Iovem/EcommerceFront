import CommentForm from "./CommentForm";
import useGetAllComments from "../../../../hooks/Comment/useGetAllComments";
import CommentItem from "./CommentItem";

export default function Comment({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}) {
  const comments = useGetAllComments({ productId });

  return (
    <section className="bg-white flex flex-col gap-[2rem] rounded-lg max-w-[1110px] mx-auto p-[3rem] relative w-full">
      <CommentForm productId={productId} userId={userId} />
      {typeof comments === "object" ? (
        <div className="w-full flex flex-col gap-[1.5rem]">
          {comments.map((c) => (
            <CommentItem key={c._id} {...c} />
          ))}
        </div>
      ) : (
        <div className="w-fit text-[5rem] text-gray-500">......</div>
      )}
    </section>
  );
}
