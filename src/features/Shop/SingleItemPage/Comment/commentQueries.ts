import { axiosPublic } from "../../../../api/axios";
import { CommentTypes } from "../../../../types/CommentTypes";
import { ReactedCommentTypes } from "../../../../types/ReactedCommentTypes";

export const getAllComments = async ({ productId }: { productId: string }) => {
  try {
    const res = await axiosPublic.get<CommentTypes[]>(
      `/comments/products/${productId}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getReactedCommentByUserIdCommentId = async ({
  userId,
  commentId,
}: {
  userId: string;
  commentId: string;
}) => {
  try {
    const res = await axiosPublic.get<ReactedCommentTypes>(
      `/reactedComments/${commentId}/users/${userId}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const createComment = async ({
  productId,
  userId,
  text,
}: {
  productId: string;
  userId: string;
  text: string;
}) => {
  try {
    const res = await axiosPublic.post<CommentTypes>(
      `/comments/products/${productId}/users/${userId}`,
      {
        text,
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateComment = async ({
  commentId,
  text,
}: {
  commentId: string;
  text: string;
}) => {
  try {
    const res = await axiosPublic.patch<CommentTypes>(
      `/comments/${commentId}`,
      {
        text,
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateCommentLikes = async ({
  commentId,
  userId,
  isLiked,
}: {
  commentId: string;
  userId: string;
  isLiked: boolean;
}) => {
  try {
    const res = await axiosPublic.patch<CommentTypes>(
      `/comments/${commentId}/users/${userId}`,
      {
        isLiked,
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteComment = async ({ commentId }: { commentId: string }) => {
  try {
    const res = await axiosPublic.delete<CommentTypes>(
      `/comments/${commentId}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
