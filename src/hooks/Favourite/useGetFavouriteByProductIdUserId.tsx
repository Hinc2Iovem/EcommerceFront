import { useEffect, useState } from "react";
import { FavouriteTypes } from "../../types/FavouriteTypes";
import { getFavourite } from "../../features/Shop/SingleItemPage/favouriteQueries";

export default function useGetFavouriteByProductIdUserId({
  productId,
  userId,
}: {
  productId: string | undefined;
  userId: string | undefined;
}) {
  const [favourite, setFavourite] = useState<FavouriteTypes | null>(null);
  useEffect(() => {
    if (userId) {
      getFavourite({ productId, userId }).then((r) => setFavourite(r));
    }
  }, [userId, productId]);
  return favourite;
}
