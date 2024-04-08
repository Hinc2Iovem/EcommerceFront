import { Heart, ShoppingCart, User2Icon, X } from "lucide-react";
import { Link } from "react-router-dom";

type BurgerMenuProps = {
  setExpandBurgerMenu: React.Dispatch<React.SetStateAction<boolean>>;
  expandBurgerMenu: boolean;
};

export default function BurgerMenu({
  expandBurgerMenu,
  setExpandBurgerMenu,
}: BurgerMenuProps) {
  return (
    <aside
      className={`fixed p-[1rem] md:hidden flex flex-col gap-[3rem] z-10 top-0 bottom-0 left-[60%] transition-all delay-150 bg-white ${
        expandBurgerMenu
          ? "right-0 translate-x-0"
          : "right-[-100%] translate-x-[100%]"
      } shadow-sm shadow-black rounded-tl-lg`}
    >
      <div className="flex items-center bg-primary-orange justify-center p-[1rem] rounded-xl text-white relative">
        <h1 className="font-bold text-[3rem] transition-all">
          <Link to={"/shop"}>Hinc2Iovem</Link>
        </h1>
        <button
          onClick={() => setExpandBurgerMenu(false)}
          className="transition-all  absolute top-[5px] right-[5px]  hover:text-primary-orange hover:bg-white rounded-full self-center"
        >
          <X />
        </button>
      </div>
      <div className="flex flex-col gap-[1rem]">
        <Link
          to="/cart"
          className="flex items-center gap-[.4rem] transition-all rounded-lg hover:p-[1rem] hover:bg-primary-orange hover:text-white"
        >
          <ShoppingCart />
          <h3>Cart</h3>
        </Link>
        <Link
          to="/profile/:userId"
          className="flex items-center gap-[.4rem] transition-all rounded-lg hover:p-[1rem] hover:bg-primary-orange hover:text-white"
        >
          <User2Icon />
          <h3>My Profile</h3>
        </Link>

        <Link
          to="/favourite"
          className="flex items-center gap-[.4rem] transition-all rounded-lg hover:p-[1rem] hover:bg-primary-orange hover:text-white"
        >
          <Heart />
          <h3>Favourite</h3>
        </Link>
      </div>
    </aside>
  );
}
