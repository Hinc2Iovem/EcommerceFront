import { useEffect, useState } from "react";
import { getProductsByUserId } from "../../features/Profile/profileQueries";
import { ProductTypes } from "../../features/AddProducts/ProductTypes";

export default function useGetProductByUserId({ userId }: { userId: string }) {
  const [products, setProducts] = useState<ProductTypes[] | []>([]);

  useEffect(() => {
    getProductsByUserId({ userId }).then((r) => {
      if (r) {
        setProducts(r);
      }
    });
  }, [userId]);
  return products;
}
