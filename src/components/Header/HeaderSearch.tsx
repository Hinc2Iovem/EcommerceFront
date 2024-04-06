import { Menu, Search, ShoppingCart, UserCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useLocalStorage from "../../hooks/useLocalStorage";
import useOutOfModal from "../../hooks/useOutOfModal";
import "./styles.css";
import FormatCurrency from "../../utilities/FormatCurrency";

type HeaderSearchProps = {
  setExpandBurgerMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const CART_MODAL_HEIGHT = 70 + 24 + 10;

export default function HeaderSearch({
  setExpandBurgerMenu,
}: HeaderSearchProps) {
  const [showModal, setShowModal] = useState(false);
  const [showProductTitle, setShowProductTitle] = useState({
    show: false,
    text: "",
    index: -1,
  });
  const [search, setSearch] = useLocalStorage("search", "");
  const modalRef = useRef<HTMLDivElement | null>(null);
  const modalContainerRef = useRef<HTMLDivElement | null>(null);
  useOutOfModal({ setShowModal, showModal, modalRef });
  const { totalPrice, totalItems, cart, dispatch, REDUCER_ACTIONS } = useCart();

  useEffect(() => {
    if (!showModal) {
      setShowProductTitle({
        show: false,
        text: "",
        index: -1,
      });
    }
  }, [showModal]);

  const calculateTopPosition = () => {
    return (
      CART_MODAL_HEIGHT +
      25 * showProductTitle.index +
      7.5 * showProductTitle.index -
      32.5
    );
  };

  return (
    <>
      <nav className="flex justify-between md:shadow-white flex-grow md:shadow-md p-5 items-center w-full">
        <h1 className="bg-primary-orange hover:opacity-90 shadow-inner shadow-white py-[.5rem] px-[3rem] rounded-xl text-white font-bold text-[3rem] md:block hidden">
          <Link to={"/shop"}>Hinc2Iovem</Link>
        </h1>
        <form className="flex items-center h-[5rem] md:w-[45%] md:mx-auto">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
            className="z-[2]  border-r-0 border-none shadow-sm  shadow-black  h-full w-full font-bold md:px-[2rem] px-[1rem] py-[1rem] rounded-l-full outline-none"
          />
          <button
            type="button"
            className="hover:z-[3] hover:scale-[1.01] h-full px-[2.5rem] cursor-pointer rounded-r-full border-l-[1px] border-none shadow-sm  shadow-black"
          >
            <Search />
          </button>
        </form>
        <ul className="md:flex items-center gap-[2rem] hidden">
          <div
            ref={modalRef}
            className="flex relative outline-none border-none"
          >
            <button
              className={`z-[999] transition-all hover:translate-x-[5%] hover:bg-white hover:shadow-sm hover:shadow-black hover:rounded-full p-[.7rem] top-[.5rem] left-[.5rem] font-medium
              ${
                showModal
                  ? ""
                  : "hover:before:shadow-sm hover:before:bg-white hover:before:rounded-sm hover:before:shadow-black hover:before:content-['Cart'] hover:before:absolute hover:before:bottom-[-4rem] hover:before:left-[-1.5rem] hover:before:p-[.5rem] hover:before:w-[8rem] hover:before:z-[999]"
              }
              `}
              onClick={() => setShowModal((prev) => !prev)}
            >
              <ShoppingCart />
            </button>
            <div
              ref={modalContainerRef}
              className={`${
                !showModal
                  ? "hidden"
                  : "flex flex-col gap-3 fixed overflow-y-scroll"
              } right-[5px] top-28 bg-white p-[2rem] w-max rounded-lg z-[20] border-[1px] border-solid border-black | cart-arrow-up`}
            >
              <h3>Items Count: {totalItems}</h3>
              <hr />
              {cart.map((c, index) => (
                <div
                  key={c.id}
                  className="flex flex-shrink items-center gap-[.2rem] w-[14.5rem]"
                >
                  <img
                    onMouseOver={() =>
                      setShowProductTitle({
                        show: true,
                        text: c.title,
                        index: index + 1,
                      })
                    }
                    src={c.img}
                    alt={c.title}
                    className="w-[2.5rem] h-[2.5rem] object-contain cursor-pointer relative"
                  />

                  <div className="flex flex-col gap-[.1rem]">
                    <h5>
                      {FormatCurrency(c.price * c.qty)}{" "}
                      <span className="font-bold text-[1.3rem]">x{c.qty}</span>
                    </h5>
                  </div>
                </div>
              ))}
              <hr />
              <p>Total: {totalPrice}</p>
              <hr />
              <div className="flex flex-col gap-3">
                <Link
                  className="flex gap-3 px-3 py-1 rounded-lg border-neutral-magnolia bg-neutral-magnolia hover:bg-neutral-light-grayish-blue"
                  to="/cart"
                  onClick={() => setShowModal(false)}
                >
                  View <ShoppingCart />
                </Link>
                <button
                  onClick={() => dispatch({ type: REDUCER_ACTIONS.CHECKOUT })}
                  className=" bg-green-50 hover:bg-green-100 px-3 py-1 rounded-lg"
                >
                  Checkout
                </button>
              </div>
            </div>
            <aside
              className={`${
                showProductTitle.show
                  ? `opacity-100 right-[135px] whitespace-nowrap h-auto absolute py-[.5rem] px-[1rem] z-[100] text-ellipsis shadow-sm shadow-black`
                  : "opacity-0 "
              }  bg-white text-black text-[1.4rem]  overflow-hidden`}
              style={{ top: calculateTopPosition() }}
            >
              {showProductTitle.text}
            </aside>
          </div>
          <Link to="/profile/1">
            <UserCircle2 />
          </Link>
        </ul>
        <div className="md:hidden flex">
          <Menu
            className="w-[3rem] h-[3rem] cursor-pointer text-black"
            onClick={() => setExpandBurgerMenu(true)}
          />
        </div>
      </nav>
    </>
  );
}
