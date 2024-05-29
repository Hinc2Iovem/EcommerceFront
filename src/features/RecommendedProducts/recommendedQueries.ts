import { axiosPublic } from "../../api/axios";
import { RecommendedProductsAmountTypes } from "../../types/RecommendedProducts";

type GetRecommendedProductsTypes = {
  productId: string;
};

export const getRecommendedSellerProductsAmount = async ({
  productId,
}: GetRecommendedProductsTypes) => {
  try {
    return await axiosPublic
      .get<RecommendedProductsAmountTypes>(
        `/recommendedProductsAmount/products/${productId}`
      )
      .then((r) => r.data);
  } catch (error) {
    console.error(error);
  }
};
