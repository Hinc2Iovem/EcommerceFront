import { useEffect, useState } from "react";
import { checkOutCart } from "../../api/queries/cartQueries";
import Header from "../Header/Header";
import { CATEGORIES } from "../../const/PillsCategories";
import useGetAllCarts from "../../hooks/Cart/useGetAllCarts";
import useGetUser from "../../hooks/Profile/useGetUser";
import FormatCurrency from "../../utilities/FormatCurrency";
import CartItemPage from "./CartItem";
import useGetDecodedJWTValues from "../../hooks/Auth/useGetDecodedJWTValues";

export default function Cart() {
  const { userId } = useGetDecodedJWTValues();
  const [value, setValue] = useState("");
  const [currentCategory, setCurrentCategory] = useState(CATEGORIES.All);
  const carts = useGetAllCarts({ userId: userId ?? "" });
  const user = useGetUser({ userId: userId ?? "" });
  const [checkedOut, setCheckOut] = useState(false);
  const [overAllQuantity, setOverAllQuantity] = useState(0);
  const [overAllPrice, setOverAllPrice] = useState(0);
  const [userBalance, setUserBalance] = useState(
    user.balance ? user.balance : 0
  );

  useEffect(() => {
    if (carts) {
      setOverAllQuantity(() => {
        return carts.reduce((acc, curr) => {
          return acc + curr.quantity;
        }, 0);
      });
      setOverAllPrice(() => {
        return carts.reduce((acc, curr) => {
          return acc + curr.totalPrice;
        }, 0);
      });
    }
  }, [carts]);

  useEffect(() => {
    if (user) {
      setUserBalance(user.balance);
    }
  }, [user]);

  const handleCheckOut = () => {
    if (user) {
      if (overAllPrice && user.balance >= overAllPrice) {
        checkOutCart({ userId: userId ?? "" });
        setUserBalance((prev) => (prev -= overAllPrice));
        setCheckOut(true);
      }
    }
  };
  const [allowCheckout, setAllowCheckout] = useState(
    overAllPrice ? user.balance <= overAllPrice : true
  );

  useEffect(() => {
    if (overAllPrice && user.balance) {
      setAllowCheckout(user.balance >= overAllPrice);
    }
  }, [overAllPrice, user]);

  return (
    <>
      <section>
        <Header
          setValue={setValue}
          showPillsOrNot={false}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
        />

        <div className="flex gap-[2rem] p-[1rem] md:flex-row flex-col w-full">
          <div
            className={`flex md:w-fit w-full flex-shrink-0 md:row-span-12 md:col-span-1 md:flex-col gap-[1rem] sticky top-[90px] items-start`}
          >
            <div className="flex flex-col gap-[.5rem]">
              <div className="bg-white flex flex-col gap-[1rem] shadow-sm p-[1.5rem] rounded-lg font-medium">
                <h3>Total Items: {overAllQuantity}</h3>
                <h3>
                  Total Price: {FormatCurrency(overAllPrice ? overAllPrice : 0)}
                </h3>
              </div>
              <div className="bg-white flex flex-col gap-[1rem] shadow-sm p-[1.5rem] rounded-lg font-medium">
                <h3>
                  Balance: {FormatCurrency(userBalance ? userBalance : 0)}
                </h3>
              </div>
            </div>
            <div className="bg-white flex flex-col md:ml-0 ml-auto gap-[1rem] shadow-sm rounded-lg font-medium ">
              <button
                disabled={!allowCheckout}
                onClick={handleCheckOut}
                className={`${
                  !allowCheckout
                    ? "hover:bg-red-100 hover:cursor-not-allowed"
                    : "hover:bg-green-100"
                } p-[1.5rem]`}
              >
                Checkout
              </button>
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] gap-3 w-full">
            {!checkedOut && carts.length ? (
              carts.map((c) => (
                <CartItemPage
                  key={c._id}
                  balance={user.balance}
                  overAllPrice={overAllPrice}
                  setOverAllPrice={setOverAllPrice}
                  setOverAllQuantity={setOverAllQuantity}
                  setAllowCheckout={setAllowCheckout}
                  {...c}
                />
              ))
            ) : checkedOut ? (
              <h2>Thanks For Purchasing</h2>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
