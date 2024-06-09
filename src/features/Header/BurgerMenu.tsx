import { Heart, LogIn, LogOut, ShoppingCart, User2Icon, X } from "lucide-react";
import { Link } from "react-router-dom";
import useGetDecodedJWTValues from "../../hooks/Auth/useGetDecodedJWTValues";
import InformativeModal from "../shared/Modal/InformativeModal";
import { useState } from "react";

type BurgerMenuProps = {
  setExpandBurgerMenu: React.Dispatch<React.SetStateAction<boolean>>;
  expandBurgerMenu: boolean;
};

export default function BurgerMenu({
  expandBurgerMenu,
  setExpandBurgerMenu,
}: BurgerMenuProps) {
  const { userId } = useGetDecodedJWTValues();
  const [showInformativeModal, setShowInformativeModal] = useState(false);
  return (
    <aside
      className={`fixed p-[1rem] md:hidden flex flex-col gap-[3rem] z-10 top-0 bottom-0 left-[40%] max-w-[30rem] ml-auto transition-all delay-150 bg-white ${
        expandBurgerMenu
          ? "right-0 translate-x-0"
          : "right-[-100%] translate-x-[100%]"
      } shadow-sm shadow-black rounded-tl-lg`}
    >
      <div className="flex items-center p-[.5rem] rounded-xl relative justify-center hover:scale-[1.02] shadow-sm shadow-gray-500">
        <h1 className="text-[3rem] transition-all text-neutral-dark-grayish-blue">
          <Link to={"/shop"}>Hinc2Iovem</Link>
        </h1>
        <button
          onClick={() => setExpandBurgerMenu(false)}
          className="transition-all absolute top-[5px] text-neutral-dark-grayish-blue right-[5px] hover:shadow-md hover:bg-white rounded-full self-center"
        >
          <X />
        </button>
      </div>
      <div className="flex flex-col gap-[1rem] justify-between h-full">
        <div className="flex flex-col gap-[1rem]">
          <Link
            to="/cart"
            className="flex items-center gap-[.4rem] transition-all rounded-lg hover:p-[1rem] hover:bg-primary-orange hover:text-white"
          >
            <ShoppingCart />
            <h3>Cart</h3>
          </Link>
          {userId ? (
            <Link
              to={`/profile/${userId}`}
              className="flex items-center gap-[.4rem] transition-all rounded-lg hover:p-[1rem] hover:bg-primary-orange hover:text-white"
            >
              <User2Icon />
              <h3>My Profile</h3>
            </Link>
          ) : (
            <button
              onClick={() => setShowInformativeModal((prev) => !prev)}
              className="flex items-center gap-[.4rem] transition-all rounded-lg hover:p-[1rem] hover:bg-primary-orange hover:text-white"
            >
              <User2Icon />
              <h3>My Profile</h3>
            </button>
          )}

          <Link
            to="/favourite"
            className="flex items-center gap-[.4rem] transition-all rounded-lg hover:p-[1rem] hover:bg-primary-orange hover:text-white"
          >
            <Heart />
            <h3>Favourite</h3>
          </Link>
          <Link
            to="/auth"
            className={`${
              userId ? "hidden" : "flex"
            } items-center gap-[.4rem] transition-all rounded-lg hover:p-[1rem] hover:bg-primary-orange hover:text-white`}
          >
            <LogIn />
            <h3>Register / Login</h3>
          </Link>
        </div>

        <Link
          to="/auth"
          className={`${
            userId ? "flex" : "hidden"
          } self-end items-center gap-[.4rem] transition-all rounded-lg hover:p-[1rem] hover:bg-primary-orange hover:text-white`}
        >
          <LogOut />
          <h3>Logout</h3>
        </Link>
      </div>

      <InformativeModal
        appearsFrom="right"
        closeOnClick={true}
        message="You need to Register first"
        positionX="right-[1rem]"
        positionY="bottom-[1rem]"
        setShowInformativeModal={setShowInformativeModal}
        showInformativeModal={showInformativeModal}
        type="info"
        duration={1500}
        linkMessage="Register"
        linkPath="/auth"
      />
    </aside>
  );
}
