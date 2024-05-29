import { useEffect, useState } from "react";
import useGetDefaultRecommendedProducts from "../../../../hooks/RecommendedProducts/useGetDefaultRecommendedProducts";
import useGetRecommendedProducts from "../../../../hooks/RecommendedProducts/useGetRecommendedProducts";
import { RecommendedProductsTypes } from "../../../../types/RecommendedProducts";
import { DefaultRecommendedProductsTypes } from "../../../../types/DefaultRecommendedProducts";

type SellerProductsTypes = {
  showAdditionalInformation: string;
  productId: string;
  category: string;
  sellerId: string;
  subCategory: string;
};

type ProductTypes = RecommendedProductsTypes | DefaultRecommendedProductsTypes;

export default function SellerProducts({
  showAdditionalInformation,
  category,
  productId,
  sellerId,
  subCategory,
}: SellerProductsTypes) {
  const recommendedProducts = useGetRecommendedProducts({ productId });
  const defaultRecommendedProducts = useGetDefaultRecommendedProducts({
    category,
    sellerId,
    subCategory,
  });

  const [products, setProducts] = useState<ProductTypes[]>([]);

  useEffect(() => {
    if (recommendedProducts.length > 0) {
      setProducts(recommendedProducts);
    } else {
      setProducts(defaultRecommendedProducts);
    }
  }, [recommendedProducts, defaultRecommendedProducts]);

  console.log(products);

  if (products.length <= 0) {
    return (
      <h2
        className={`${
          showAdditionalInformation === "sellerProducts" ? "" : "hidden"
        } text-[3.5rem] mx-auto text-gray-500`}
      >
        Nothing to show
      </h2>
    );
  }

  return (
    <div
      className={`${
        showAdditionalInformation === "sellerProducts" ? "" : "hidden"
      }`}
    ></div>
  );
}
