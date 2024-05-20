import { useEffect, useState } from "react";
import { getAllKrogerProducts } from "../features/Shop/Shop/shopQueries";
import { ProductTypes } from "../features/Shop/Shop/Shop";

type AllKrogerProductsTypes = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setProducts: React.Dispatch<React.SetStateAction<ProductTypes[]>>;
  limit: number;
  currentCategory: string;
  subCategory: string;
};

export default function useAllKrogerProducts({
  setLoading,
  setProducts,
  limit,
  currentCategory,
  subCategory,
}: AllKrogerProductsTypes) {
  const [preventRerenders] = useState(true);

  useEffect(() => {
    if (preventRerenders) {
      const handler = async () => {
        setLoading(true);
        const currLimit = limit ? limit : 12;
        const currentCateg = currentCategory === "All" ? "" : currentCategory;
        const currentSubCategory = subCategory ? subCategory : "";
        // getAllKrogerProducts({
        //   limit: currLimit,
        //   category: currentCateg,
        //   subCategory: currentSubCategory,
        // }).then((r) => setProducts(r));
        // setLoading(false);
      };

      handler();
    }
  }, [
    limit,
    preventRerenders,
    setLoading,
    setProducts,
    currentCategory,
    subCategory,
  ]);
}
