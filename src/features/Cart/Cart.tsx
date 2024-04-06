import { useState } from "react";
import BurgerMenu from "../../components/Header/BurgerMenu";
import HeaderPills from "../../components/Header/HeaderPills";
import HeaderSearch from "../../components/Header/HeaderSearch";
import { CATEGORIES } from "../../const/PillsCategories";
import useCart from "../../hooks/useCart";
import CartItemPage from "./CartItem";

type CartProps = {
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
  currentCategory: string;
};

export default function Cart({
  currentCategory,
  setCurrentCategory,
}: CartProps) {
  const [expandBurgerMenu, setExpandBurgerMenu] = useState(false);
  const { totalItems, totalPrice, cart, dispatch, REDUCER_ACTIONS } = useCart();

  return (
    <section>
      <header className={`sticky  bg-white w-full top-0 z-[2]`}>
        <HeaderSearch setExpandBurgerMenu={setExpandBurgerMenu} />
        <div className="block md:hidden">
          <HeaderPills
            setCurrentCategory={setCurrentCategory}
            currentCategory={currentCategory}
          />
        </div>
      </header>
      <BurgerMenu
        setExpandBurgerMenu={setExpandBurgerMenu}
        expandBurgerMenu={expandBurgerMenu}
      />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] grid-rows-[repeat(auto-fit,minmax(30rem,1fr))] p-3 gap-3 bg-neutral-magnolia ">
        <div
          className={`md:flex hidden md:row-span-12 md:col-span-1 h-fit flex-col gap-[3rem] sticky top-[90px] max-w-[20rem]`}
        >
          <div className="bg-white flex flex-col gap-[1rem] shadow-sm p-[1.5rem] rounded-lg">
            {Object.values(CATEGORIES).map((c) => (
              <button
                key={c}
                onClick={() => setCurrentCategory(c)}
                className={`${
                  c === currentCategory
                    ? "bg-primary-orange text-white p-[1rem]"
                    : ""
                } flex font-medium items-center gap-[.4rem] transition-all rounded-lg hover:p-[1rem] hover:bg-primary-orange hover:text-white`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="bg-white flex flex-col gap-[1rem] shadow-sm p-[1.5rem] rounded-lg font-medium">
            <h3>Total Items: {totalItems}</h3>
            <h3>Total Price: {totalPrice}</h3>
          </div>

          <div className="bg-white flex flex-col gap-[1rem] shadow-sm rounded-lg font-medium">
            <button
              onClick={() => dispatch({ type: REDUCER_ACTIONS.CHECKOUT })}
              className="p-[1.5rem] hover:bg-green-100"
            >
              Checkout
            </button>
          </div>
        </div>
        {cart &&
          cart.map((c) => (
            <CartItemPage
              key={c.id}
              item={c}
              dispatch={dispatch}
              REDUCER_ACTIONS={REDUCER_ACTIONS}
            />
          ))}
      </div>
    </section>
  );
}
