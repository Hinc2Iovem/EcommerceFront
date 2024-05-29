import { axiosPublic } from "../../../../api/axios";

type UpdateRatingTypes = {
  productId: string | undefined;
  userId: string;
  rating: number;
};

export const updateRating = async ({
  productId,
  userId,
  rating,
}: UpdateRatingTypes) => {
  try {
    return await axiosPublic
      .patch(`/products/${productId}/users/${userId}`, {
        rating,
      })
      .then((r) => r.data);
  } catch (error) {
    console.error(error);
  }
};
