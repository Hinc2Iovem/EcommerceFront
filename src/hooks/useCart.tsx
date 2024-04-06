import { useContext } from "react";
import CartContext from "../features/Cart/CartContext";

export default function useCart() {
  return useContext(CartContext);
}
