import { useEffect, useState } from "react";
import { RecommendedProductsAmountTypes } from "../../types/RecommendedProducts";
import { getRecommendedSellerProductsAmount } from "../../features/RecommendedProducts/recommendedQueries";

type GetProductsTypes = {
  productId: string;
};
export default function useRecommendedProductsAmount({
  productId,
}: GetProductsTypes) {
  const [products, setProducts] = useState<RecommendedProductsAmountTypes>();
  useEffect(() => {
    getRecommendedSellerProductsAmount({
      productId,
    }).then((r) => {
      if (r) {
        setProducts(r);
      }
    });
  }, [productId]);
  return products;
}
