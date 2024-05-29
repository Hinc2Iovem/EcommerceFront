import { axiosPublic } from "../../../api/axios";

export const getAllProducts = async () => {
  // let p = `/products`;
  // if (category) {
  //   p += `/category/${category}`;
  // }
  // if (subCategory) {
  //   p += `/subCategory/${subCategory}`;
  // }
  // p += `?limit=${limit}`;

  const path = `/products`;
  const products = await axiosPublic.get(path);
  return products.data;
};

// FAVOURITE ---------------------------------------- FAVOURITE ------------------------------

type GetFavouriteTypes = {
  userId: string;
};

export const getAllFavouriteProducts = async ({
  userId,
}: GetFavouriteTypes) => {
  try {
    const products = await axiosPublic.get(`/favourite/users/${userId}`);
    return products.data;
  } catch (error) {
    console.error(error);
  }
};

type AddToFavouriteTypes = {
  productId: string;
  userId: string;
};

export const addToFavourite = async ({
  productId,
  userId,
}: AddToFavouriteTypes) => {
  try {
    await axiosPublic.post(`/favourite/${productId}/users/${userId}`);
  } catch (error) {
    console.error(error);
  }
};

type DeleteFromFavouriteTypes = {
  productId: string;
  userId: string;
};

export const deleteFromFavourite = async ({
  productId,
  userId,
}: DeleteFromFavouriteTypes) => {
  try {
    await axiosPublic.delete(`/favourite/${productId}/users/${userId}`);
  } catch (error) {
    console.error(error);
  }
};

// CART ---------------------------------------- CART ------------------------------

type CartUserIdTypes = {
  userId: string;
};

export const getAllCartProducts = async ({ userId }: CartUserIdTypes) => {
  try {
    const products = await axiosPublic.get(`/carts/users/${userId}`);
    return products.data;
  } catch (error) {
    console.error(error);
  }
};

type AddDecreaseFromCartTypes = {
  userId: string;
  quantity: number;
  productId: string;
};

export const addToCart = async ({
  userId,
  quantity,
  productId,
}: AddDecreaseFromCartTypes) => {
  try {
    await axiosPublic.put(`/carts/users/${userId}/products/${productId}`, {
      quantity: quantity,
    });
  } catch (error) {
    console.error(error);
  }
};

export const decreaseQuantityFromCart = async ({
  userId,
  quantity,
  productId,
}: AddDecreaseFromCartTypes) => {
  try {
    await axiosPublic.patch(`/carts/users/${userId}/products/${productId}`, {
      quantity: quantity,
    });
  } catch (error) {
    console.error(error);
  }
};

export const clearCartByUserId = async ({ userId }: CartUserIdTypes) => {
  try {
    await axiosPublic.delete(`/carts/users/${userId}`);
  } catch (error) {
    console.error(error);
  }
};

type DeleteFromCartTypes = {
  cartId: string;
};

export const deleteFromCart = async ({ cartId }: DeleteFromCartTypes) => {
  try {
    await axiosPublic.delete(`/carts/${cartId}`);
  } catch (error) {
    console.error(error);
  }
};

export const checkOutCart = async ({ userId }: CartUserIdTypes) => {
  try {
    await axiosPublic.delete(`/carts/checkout/users/${userId}`);
  } catch (error) {
    console.error(error);
  }
};
