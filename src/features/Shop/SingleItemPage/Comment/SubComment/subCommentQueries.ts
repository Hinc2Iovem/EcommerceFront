import { axiosPublic } from "../../../../../api/axios";
import { ReactedCommentTypes } from "../../../../../types/ReactedCommentTypes";
import { SubCommentTypes } from "../../../../../types/SubCommentTypes";

export const getAllSubComments = async ({
  commentId,
}: {
  commentId: string;
}) => {
  try {
    const res = await axiosPublic.get<SubCommentTypes[]>(
      `/subComments/comments/${commentId}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getReactedSubCommentByUserIdSubCommentId = async ({
  userId,
  subCommentId,
}: {
  userId: string;
  subCommentId: string;
}) => {
  try {
    const res = await axiosPublic.get<ReactedCommentTypes>(
      `/reactedSubComments/${subCommentId}/users/${userId}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const createSubComment = async ({
  commentId,
  userId,
  text,
}: {
  commentId: string;
  userId: string;
  text: string;
}) => {
  try {
    const res = await axiosPublic.post<SubCommentTypes>(
      `/subComments/comments/${commentId}/users/${userId}`,
      {
        text,
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateSubComment = async ({
  subCommentId,
  text,
}: {
  subCommentId: string;
  text: string;
}) => {
  try {
    const res = await axiosPublic.patch<SubCommentTypes>(
      `/subComments/${subCommentId}`,
      {
        text,
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateSubCommentLikes = async ({
  subCommentId,
  userId,
  isLiked,
}: {
  subCommentId: string;
  userId: string;
  isLiked: boolean;
}) => {
  try {
    const res = await axiosPublic.patch<SubCommentTypes>(
      `/subComments/${subCommentId}/users/${userId}`,
      {
        isLiked,
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteSubComment = async ({
  subCommentId,
}: {
  subCommentId: string;
}) => {
  try {
    const res = await axiosPublic.delete<SubCommentTypes>(
      `/subComments/${subCommentId}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
