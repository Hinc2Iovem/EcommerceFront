import { useEffect, useState } from "react";
import { getRecommendedSellerProducts } from "../../features/Shop/SingleItemPage/SellerProducts/recommendedProductsQueries";
import { RecommendedProductsTypes } from "../../types/RecommendedProducts";

export default function useGetRecommendedProducts({
  productId,
}: {
  productId: string;
}) {
  const [products, setProducts] = useState<RecommendedProductsTypes[] | []>([]);
  useEffect(() => {
    getRecommendedSellerProducts({ productId }).then((r) => {
      if (r) {
        setProducts(r);
      }
    });
  }, [productId]);
  return products;
}
