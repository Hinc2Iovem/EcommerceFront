import { useEffect, useState } from "react";
import { ProductTypes } from "../../types/ProductTypes";
import { getAllProducts } from "../../features/Shop/Shop/shopQueries";

export default function useGetProducts() {
  const [products, setProducts] = useState<ProductTypes[] | []>([]);

  useEffect(() => {
    getAllProducts().then((r) => {
      if (r) {
        setProducts(r);
      }
    });
  }, []);
  return products;
}
