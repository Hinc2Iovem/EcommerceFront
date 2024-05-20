import { axiosPublic } from "../../../api/axios";

type GetFavouriteTypes = {
  productId: string | undefined;
  userId: string;
};

export const getFavourite = async ({
  productId,
  userId,
}: GetFavouriteTypes) => {
  try {
    return await axiosPublic
      .get(`/favourite/${productId}/users/${userId}`)
      .then((r) => r.data);
  } catch (error) {
    console.error(error);
  }
};
