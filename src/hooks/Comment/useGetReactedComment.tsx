import { useEffect, useState } from "react";
import { ReactedCommentTypes } from "../../types/ReactedCommentTypes";
import { getReactedCommentByUserIdCommentId } from "../../features/Shop/SingleItemPage/Comment/commentQueries";

export default function useGetReactedComment({
  commentId,
  userId,
}: {
  commentId: string;
  userId: string;
}) {
  const [reactedComment, setReactedComment] =
    useState<ReactedCommentTypes | null>(null);

  useEffect(() => {
    getReactedCommentByUserIdCommentId({ commentId, userId }).then((r) => {
      if (r) {
        setReactedComment(r);
      }
    });
  }, [commentId, userId]);

  return reactedComment;
}
