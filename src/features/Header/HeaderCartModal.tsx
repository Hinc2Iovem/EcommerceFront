import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderCartModalItem from "./HeaderCartModalItem";
import useGetUser from "../../hooks/Profile/useGetUser";
import { getCartsByUserId } from "../../api/queries/cartQueries";
import { CartTypes } from "../../types/CartTypes";
import FormatCurrency from "../../utilities/FormatCurrency";
import useGetDecodedJWTValues from "../../hooks/Auth/useGetDecodedJWTValues";

type HeaderCartModalTypes = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  productAddedToCart?: boolean;
};

export default function HeaderCartModal({
  setShowModal,
  showModal,
  productAddedToCart,
}: HeaderCartModalTypes) {
  const { userId } = useGetDecodedJWTValues();
  const [carts, setCarts] = useState<CartTypes[] | []>([]);
  const user = useGetUser({ userId: userId ?? "" });

  useEffect(() => {
    if (userId) {
      getCartsByUserId({ userId }).then((r) => {
        if (r) {
          setCarts(r);
        }
      });
    }
  }, [userId, productAddedToCart]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (carts) {
      setTotalPrice(() => {
        return carts.reduce((acc, curr) => {
          return acc + curr.totalPrice;
        }, 0);
      });
      setTotalItems(() => {
        return carts.reduce((acc, curr) => {
          return acc + curr.quantity;
        }, 0);
      });
    }
  }, [carts]);

  return (
    <div
      className={`${
        !showModal ? "hidden" : "flex flex-col gap-3 fixed overflow-y-auto"
      } right-[10px] top-28 bg-white p-[2rem] w-max rounded-lg z-[20] border-[1px] border-solid border-black | cart-arrow-up`}
    >
      <h3>Items Count: {totalItems}</h3>
      <hr />
      <div className="flex flex-col gap-3 max-h-[20rem] overflow-y-auto relative">
        {carts.map((c) => (
          <HeaderCartModalItem key={c._id} {...c} />
        ))}
      </div>

      <hr />
      <p>Total: {FormatCurrency(totalPrice ? totalPrice : 0)}</p>
      <p>Balance: {FormatCurrency(user.balance ? user.balance : 0)}</p>
      <hr />
      <div className="flex flex-col gap-3">
        <Link
          className="flex gap-3 px-3 py-1 rounded-lg border-neutral-magnolia bg-neutral-magnolia hover:bg-blue-100 transition-all"
          to="/cart"
          onClick={() => setShowModal(false)}
        >
          <h3 className="mx-auto whitespace-nowrap flex gap-[.2rem]">
            View <ShoppingCart />
          </h3>
        </Link>
        <button
          disabled={totalPrice >= user.balance}
          className={`${
            totalPrice >= user.balance
              ? "bg-red-50 hover:bg-red-100 hover:cursor-not-allowed"
              : "bg-green-50 hover:bg-green-100"
          }  px-3 py-1 rounded-lg transition-all`}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
