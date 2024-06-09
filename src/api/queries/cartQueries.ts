import { CartTypes } from "../../types/CartTypes";
import { axiosPublic } from "../axios";

type GetCartsTypes = {
  userId: string;
};

export const getCartsByUserId = async ({ userId }: GetCartsTypes) => {
  try {
    return await axiosPublic
      .get<CartTypes[]>(`/carts/users/${userId}`)
      .then((r) => r.data);
  } catch (error) {
    console.error(error);
  }
};

type AddToCartParamTypes = {
  userId: string;
  productId: string;
  quantity: number;
};

export const addToCart = async ({
  productId,
  quantity,
  userId,
}: AddToCartParamTypes) => {
  try {
    return await axiosPublic
      .put<CartTypes[]>(`/carts/users/${userId}/products/${productId}`, {
        quantity,
      })
      .then((r) => r.data);
  } catch (error) {
    console.error(error);
  }
};

type DecreaseAmountFromCartParamTypes = {
  userId: string;
  productId: string;
  quantity: number;
};

export const decreaseAmountFromCart = async ({
  productId,
  quantity,
  userId,
}: DecreaseAmountFromCartParamTypes) => {
  try {
    return await axiosPublic
      .patch<CartTypes[]>(`/carts/users/${userId}/products/${productId}`, {
        quantity,
      })
      .then((r) => r.data);
  } catch (error) {
    console.error(error);
  }
};

type RemoveFromCartParamTypes = {
  cartId: string;
};

export const removeFromCart = async ({ cartId }: RemoveFromCartParamTypes) => {
  try {
    return await axiosPublic
      .delete<CartTypes[]>(`/carts/${cartId}`)
      .then((r) => r.data);
  } catch (error) {
    console.error(error);
  }
};

type ClearCartByUserIdTypes = {
  userId: string;
};

export const clearCartByUserId = async ({ userId }: ClearCartByUserIdTypes) => {
  try {
    return await axiosPublic
      .delete<CartTypes[]>(`/carts/users/${userId}`)
      .then((r) => r.data);
  } catch (error) {
    console.error(error);
  }
};

type CheckOutCartByUserIdTypes = {
  userId: string;
};

export const checkOutCart = async ({ userId }: CheckOutCartByUserIdTypes) => {
  try {
    return await axiosPublic
      .delete<CartTypes[]>(`/carts/checkout/users/${userId}`)
      .then((r) => r.data);
  } catch (error) {
    console.error(error);
  }
};
