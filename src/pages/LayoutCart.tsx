import { Outlet } from "react-router-dom";
import { CartProvider } from "../features/Cart/CartContext";
import DivBgColor from "../features/shared/DivBgColor";

export default function LayoutCart() {
  return (
    <>
      <DivBgColor />
      <CartProvider>
        <main className={`h-full bg-neutral-magnolia`}>
          <Outlet />
        </main>
      </CartProvider>
    </>
  );
}
