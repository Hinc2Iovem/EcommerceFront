import { useEffect, useState } from "react";
import { DefaultRecommendedProductsAmountTypes } from "../../types/DefaultRecommendedProducts";
import { getDefaultRecommendedProductsAmount } from "../../api/queries/defaultRecommendedQueries";

type GetDefaultProductsTypes = {
  category: string;
  sellerId: string;
  subCategory: string;
};
export default function useDefaultRecommendedProductsAmount({
  category,
  sellerId,
  subCategory,
}: GetDefaultProductsTypes) {
  const [products, setProducts] =
    useState<DefaultRecommendedProductsAmountTypes>();
  useEffect(() => {
    getDefaultRecommendedProductsAmount({
      category,
      sellerId,
      subCategory,
    }).then((r) => {
      if (r) {
        setProducts(r);
      }
    });
  }, [category, sellerId, subCategory]);
  return products;
}
