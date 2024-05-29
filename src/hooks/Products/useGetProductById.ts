import { useEffect, useState } from "react";
import { getProductById } from "../../api/queries/productQueries";
import { ProductTypes } from "../../types/ProductTypes";

export default function useGetProductById(
  productId: string | undefined
): ProductTypes | undefined {
  const [product, setProduct] = useState<ProductTypes>();

  useEffect(() => {
    if (productId !== null) {
      getProductById({ productId: productId as string }).then((r) => {
        if (r) {
          setProduct(r);
        }
      });
    }
  }, [productId]);
  return product ? product : undefined;
}
