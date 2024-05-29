import { useEffect, useState } from "react";
import { ReactedCommentTypes } from "../../types/ReactedCommentTypes";
import { getReactedSubCommentByUserIdSubCommentId } from "../../features/Shop/SingleItemPage/Comment/SubComment/subCommentQueries";

export default function useGetReactedSubComment({
  subCommentId,
  userId,
}: {
  subCommentId: string;
  userId: string;
}) {
  const [reactedSubComment, setReactedSubComment] =
    useState<ReactedCommentTypes | null>(null);

  useEffect(() => {
    getReactedSubCommentByUserIdSubCommentId({ subCommentId, userId }).then(
      (r) => {
        if (r) {
          setReactedSubComment(r);
        }
      }
    );
  }, [subCommentId, userId]);

  return reactedSubComment;
}
