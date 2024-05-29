import { useEffect, useState } from "react";
import { getDefaultRecommendedSellerProducts } from "../../features/Shop/SingleItemPage/SellerProducts/recommendedProductsQueries";
import { DefaultRecommendedProductsTypes } from "../../types/DefaultRecommendedProducts";

type GetDefaultProductsTypes = {
  category: string;
  sellerId: string;
  subCategory: string;
};

export default function useGetDefaultRecommendedProducts({
  category,
  sellerId,
  subCategory,
}: GetDefaultProductsTypes) {
  const [products, setProducts] = useState<
    DefaultRecommendedProductsTypes[] | []
  >([]);
  useEffect(() => {
    getDefaultRecommendedSellerProducts({
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
