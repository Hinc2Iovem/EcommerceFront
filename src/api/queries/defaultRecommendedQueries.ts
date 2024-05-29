import { DefaultRecommendedProductsTypes } from "../../types/DefaultRecommendedProducts";
import { axiosPublic } from "../axios";

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

export const getSingleDefaultRecommendedProducts = async ({
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
      .post(`/defaultRecommendedProducts/sellers/${sellerId}`, {
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
  defaultRecommendedProductId: string;
  subCategory: string;
  category: string;
};

export const removeFromDefaultRecommendedProducts = async ({
  sellerId,
  defaultRecommendedProductId,
  category,
  subCategory,
}: RemoveDefaultRecommendedProductTypes) => {
  try {
    return await axiosPublic
      .delete(
        `/defaultRecommendedProducts/${defaultRecommendedProductId}/sellers/${sellerId}`,
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
