import { useEffect, useState } from "react";
import { axiosPublic } from "../../api/axios";
import { ProductTypes } from "../../types/ProductTypes";

export default function useGetProductById(
  productId: string | undefined
): ProductTypes | undefined {
  const [product, setProduct] = useState<ProductTypes>();
  console.log("productId: ", productId);

  useEffect(() => {
    if (productId !== null) {
      const handler = async () => {
        const res = await axiosPublic
          .get(`products/${productId}`)
          .then((res) => res.data);
        setProduct(res);
        console.log(res);
      };
      handler();
    }
  }, [productId]);

  return product ? product : undefined;
}
