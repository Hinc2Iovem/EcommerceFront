import { useEffect, useState } from "react";
import { getCartsByUserId } from "../../api/queries/cartQueries";
import { CartTypes } from "../../types/CartTypes";

export default function useGetAllCarts({ userId }: { userId: string }) {
  const [carts, setCarts] = useState<CartTypes[] | []>([]);

  useEffect(() => {
    getCartsByUserId({ userId }).then((r) => {
      if (r) {
        setCarts(r);
      }
    });
  }, [userId]);

  return carts;
}
