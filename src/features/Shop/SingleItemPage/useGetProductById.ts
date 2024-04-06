import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ProductTypes } from "../Shop";

export default function useGetProductById(
  productId: number
): ProductTypes | undefined {
  const rerenderRef = useRef(true);
  const [product, setProduct] = useState<ProductTypes>();

  useEffect(() => {
    if (rerenderRef.current) {
      const handler = async () => {
        const res = await axios
          .get(`https://fakestoreapi.com/products/${Number(productId)}`)
          .then((res) => res.data);

        setProduct(res);
      };
      handler();
    }

    return () => {
      rerenderRef.current = false;
    };
  }, [productId]);

  return product ? product : undefined;
}
