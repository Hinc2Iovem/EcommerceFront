import { axiosPublic } from "../../../../api/axios";
import { DefaultRecommendedProductsTypes } from "../../../../types/DefaultRecommendedProducts";
import { RecommendedProductsTypes } from "../../../../types/RecommendedProducts";

type GetRecommendedProductsTypes = {
  productId: string;
};

export const getRecommendedSellerProducts = async ({
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

type GetDefaultRecommendedProductsTypes = {
  sellerId: string;
  category: string;
  subCategory: string;
};

export const getDefaultRecommendedSellerProducts = async ({
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
