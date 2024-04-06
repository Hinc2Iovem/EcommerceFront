import { useState } from "react";
import BurgerMenu from "./BurgerMenu";
import HeaderPills from "./HeaderPills";
import HeaderSearch from "./HeaderSearch";
import { CATEGORIES } from "../../const/PillsCategories";

type HeaderTypes = {
  chosenCategory?: string;
};

export default function Header({ chosenCategory }: HeaderTypes) {
  const [currentCategory, setCurrentCategory] = useState(
    chosenCategory ? chosenCategory : CATEGORIES.All
  );
  const [expandBurgerMenu, setExpandBurgerMenu] = useState(false);

  return (
    <>
      <header className={`sticky  bg-white w-full top-0 z-[2]`}>
        <HeaderSearch setExpandBurgerMenu={setExpandBurgerMenu} />
        <div className="block md:hidden">
          <HeaderPills
            setCurrentCategory={setCurrentCategory}
            currentCategory={chosenCategory ? chosenCategory : currentCategory}
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
