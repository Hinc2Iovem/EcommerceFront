import { axiosPublic } from "../../api/axios";
import { ProductTypes } from "../../types/ProductTypes";
import { UserTypes } from "../../types/ProfileTypes";

export const getUser = async ({ userId }: { userId: string }) => {
  try {
    userId = JSON.parse(userId);
    const res = await axiosPublic.get<UserTypes>(`/users/${userId}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const becomeSeller = async ({ userId }: { userId: string }) => {
  try {
    const res = await axiosPublic.patch<UserTypes>(`/users/${userId}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductsByUserId = async ({ userId }: { userId: string }) => {
  try {
    const res = await axiosPublic.get<ProductTypes[]>(
      `/products/users/${userId}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getBoughtProductsByUserId = async ({
  userId,
}: {
  userId: string;
}) => {
  try {
    const res = await axiosPublic.get<ProductTypes[]>(
      `/boughtProducts/users/${userId}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSoldProductsByUserId = async ({
  userId,
}: {
  userId: string;
}) => {
  try {
    const res = await axiosPublic.get<ProductTypes[]>(
      `/soldProducts/users/${userId}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
