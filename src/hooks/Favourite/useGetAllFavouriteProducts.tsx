import { useEffect, useState } from "react";
import { FavouriteTypes } from "../../types/FavouriteTypes";
import { getAllFavouriteProducts } from "../../features/Shop/Shop/shopQueries";

export default function useGetAllFavouriteProducts({
  userId,
}: {
  userId: string;
}) {
  const [favouriteProducts, setFavouriteProducts] = useState<
    FavouriteTypes[] | []
  >([]);

  useEffect(() => {
    getAllFavouriteProducts({ userId }).then((r) => setFavouriteProducts(r));
  }, [userId]);

  return favouriteProducts;
}
