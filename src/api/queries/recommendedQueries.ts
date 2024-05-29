import { RecommendedProductsTypes } from "../../types/RecommendedProducts";
import { axiosPublic } from "../axios";

type GetRecommendedProductsTypes = {
  productId: string;
};

export const getRecommendedProducts = async ({
  productId,
}: GetRecommendedProductsTypes) => {
  try {
    return await axiosPublic
      .get<RecommendedProductsTypes[]>(
        `/recommendedProducts/products/${productId}`
      )
      .then((r) => r.data);
  } catch (error) {
    console.error(error);
  }
};

type GetSingleRecommendedProductsTypes = {
  recommendedProductId: string;
  productId: string;
};

export const getSingleRecommendedProducts = async ({
  recommendedProductId,
  productId,
}: GetSingleRecommendedProductsTypes) => {
  try {
    const data = await axiosPublic
      .get<RecommendedProductsTypes>(
        `/recommendedProducts/${recommendedProductId}/products/${productId}`
      )
      .then((r) => r.data);
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
  }
};

type AddRecommendedProductTypes = {
  productId: string;
  recommendedProductId: string;
};

export const addToRecommendedProducts = async ({
  productId,
  recommendedProductId,
}: AddRecommendedProductTypes) => {
  try {
    return await axiosPublic
      .post(`/recommendedProducts/products/${productId}`, {
        recommendedProductId,
      })
      .then((r) => r.data);
  } catch (error) {
    console.error(error);
  }
};

export const removeFromRecommendedProducts = async ({
  productId,
  recommendedProductId,
}: AddRecommendedProductTypes) => {
  try {
    return await axiosPublic
      .delete(
        `/recommendedProducts/${recommendedProductId}/products/${productId}`
      )
      .then((r) => r.data);
  } catch (error) {
    console.error(error);
  }
};
