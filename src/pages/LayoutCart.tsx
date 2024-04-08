import { Outlet } from "react-router-dom";
import { CartProvider } from "../features/Cart/CartContext";

export default function LayoutCart() {
  return (
    <CartProvider>
      <section className={`h-full bg-neutral-magnolia`}>
        <Outlet />
      </section>
    </CartProvider>
  );
}
