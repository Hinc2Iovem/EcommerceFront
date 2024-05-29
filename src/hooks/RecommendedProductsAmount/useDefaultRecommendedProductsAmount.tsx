import { useEffect, useState } from "react";
import { getDefaultRecommendedSellerProductsAmount } from "../../features/DefaultProducts/defaultQueries";
import { DefaultRecommendedProductsAmountTypes } from "../../types/DefaultRecommendedProducts";

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
    getDefaultRecommendedSellerProductsAmount({
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
