import {
  DefaultRecommendedProductsAmountTypes,
  DefaultRecommendedProductsTypes,
} from "../../types/DefaultRecommendedProducts";
import { axiosPublic } from "../axios";

type GetDefaultRecommendedProductsAmountTypes = {
  sellerId: string;
  category: string;
  subCategory: string;
};

export const getDefaultRecommendedProductsAmount = async ({
  category,
  sellerId,
  subCategory,
}: GetDefaultRecommendedProductsAmountTypes) => {
  try {
    return await axiosPublic
      .get<DefaultRecommendedProductsAmountTypes>(
        `/defaultRecommendedProductsAmount/sellers/${sellerId}`,
        {
          params: {
            category,
            subCategory,
          },
        }
      )
      .then((r) => r.data);
  } catch (error) {
    console.error(error);
  }
};

type GetDefaultRecommendedProductsTypes = {
  sellerId: string;
  category: string;
  subCategory: string;
};

export const getDefaultRecommendedProducts = async ({
  sellerId,
  category,
  subCategory,
}: GetDefaultRecommendedProductsTypes) => {
  try {
    return await axiosPublic
      .get<DefaultRecommendedProductsTypes[]>(
        `/defaultRecommendedProducts/sellers/${sellerId}`,
        {
          params: {
            category,
            subCategory,
          },
        }
      )
      .then((r) => r.data);
  } catch (error) {
    console.error(error);
  }
};

type GetSingledefaultRecommendedProductsTypes = {
  category: string;
  subCategory: string;
  productId: string;
};

export const getSingleDefaultRecommendedProduct = async ({
  category,
  subCategory,
  productId,
}: GetSingledefaultRecommendedProductsTypes) => {
  try {
    const data = await axiosPublic
      .get<DefaultRecommendedProductsTypes>(
        `/defaultRecommendedProducts/products/${productId}`,
        {
          params: {
            category,
            subCategory,
          },
        }
      )
      .then((r) => r.data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

type AddDefaultRecommendedProductTypes = {
  sellerId: string;
  productId: string;
  subCategory: string;
  category: string;
};

export const addToDefaultRecommendedProducts = async ({
  sellerId,
  productId,
  category,
  subCategory,
}: AddDefaultRecommendedProductTypes) => {
  try {
    return await axiosPublic
      .put(`/defaultRecommendedProducts/sellers/${sellerId}`, {
        productId,
        subCategory,
        category,
      })
      .then((r) => r.data);
  } catch (error) {
    console.error(error);
  }
};

type RemoveDefaultRecommendedProductTypes = {
  sellerId: string;
  productId: string;
  subCategory: string;
  category: string;
};

export const removeFromDefaultRecommendedProducts = async ({
  sellerId,
  productId,
  category,
  subCategory,
}: RemoveDefaultRecommendedProductTypes) => {
  try {
    return await axiosPublic
      .delete(
        `/defaultRecommendedProducts/products/${productId}/sellers/${sellerId}`,
        {
          params: {
            category,
            subCategory,
          },
        }
      )
      .then((r) => r.data);
  } catch (error) {
    console.error(error);
  }
};
