import { useEffect, useState } from "react";
import { SubCommentTypes } from "../../types/SubCommentTypes";
import { getAllSubComments } from "../../features/Shop/SingleItemPage/Comment/SubComment/subCommentQueries";

export default function useGetAllSubComments({
  commentId,
}: {
  commentId: string;
}) {
  const [subcomments, setSubComments] = useState<SubCommentTypes[] | []>([]);

  useEffect(() => {
    getAllSubComments({ commentId }).then((r) => {
      if (r) {
        setSubComments(r);
      }
    });
  }, [commentId]);
  return subcomments;
}
