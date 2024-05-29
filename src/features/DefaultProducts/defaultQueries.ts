import { axiosPublic } from "../../api/axios";
import { DefaultRecommendedProductsAmountTypes } from "../../types/DefaultRecommendedProducts";

type GetDefaultRecommendedProductsTypes = {
  sellerId: string;
  category: string;
  subCategory: string;
};

export const getDefaultRecommendedSellerProductsAmount = async ({
  sellerId,
  category,
  subCategory,
}: GetDefaultRecommendedProductsTypes) => {
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
