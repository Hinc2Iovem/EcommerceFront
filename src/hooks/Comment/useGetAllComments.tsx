import { useEffect, useState } from "react";
import { CommentTypes } from "../../types/CommentTypes";
import { getAllComments } from "../../features/Shop/SingleItemPage/Comment/commentQueries";

export default function useGetAllComments({
  productId,
}: {
  productId: string;
}) {
  const [comments, setComments] = useState<CommentTypes[] | []>([]);

  useEffect(() => {
    getAllComments({ productId }).then((r) => {
      if (r) {
        setComments(r);
      }
    });
  }, [productId]);
  return comments;
}
