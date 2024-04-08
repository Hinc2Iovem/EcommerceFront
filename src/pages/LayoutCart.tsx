import { Outlet } from "react-router-dom";
import { CartProvider } from "../features/Cart/CartContext";

export default function LayoutCart() {
  return (
    <CartProvider>
      <main className={`h-full bg-neutral-magnolia`}>
        <Outlet />
      </main>
    </CartProvider>
  );
}
