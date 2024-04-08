import { useState } from "react";
import BurgerMenu from "./BurgerMenu";
import HeaderPills from "./HeaderPills";
import HeaderSearch from "./HeaderSearch";

type HeaderTypes = {
  currentCategory?: string;
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
};

export default function Header({
  currentCategory = "All",
  setCurrentCategory,
}: HeaderTypes) {
  const [expandBurgerMenu, setExpandBurgerMenu] = useState(false);

  return (
    <>
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
    </>
  );
}
