import axios from "axios";
import { useEffect, useRef, useState } from "react";
import BurgerMenu from "../../components/Header/BurgerMenu";
import HeaderPills from "../../components/Header/HeaderPills";
import HeaderSearch from "../../components/Header/HeaderSearch";
import { CATEGORIES } from "../../const/PillsCategories";
import SingleItem from "./SingleItem";

export type ProductTypes = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
};

type ShopProps = {
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
  currentCategory: string;
};

export default function Shop({
  currentCategory,
  setCurrentCategory,
}: ShopProps) {
  const rerenderRef = useRef(true);
  const [products, setProducts] = useState<ProductTypes[]>();
  const [expandBurgerMenu, setExpandBurgerMenu] = useState(false);
  console.log(products);

  useEffect(() => {
    if (rerenderRef.current) {
      const handler = async () => {
        const res = await axios
          .get<ProductTypes[]>("https://fakestoreapi.com/products")
          .then((res) => res.data);
        setProducts(res);
      };

      handler();
    }

    return () => {
      rerenderRef.current = false;
    };
  }, []);

  if (!products) {
    return <h2>Loading...</h2>;
  }

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
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] grid-rows-[repeat(auto-fit,50rem)] p-3 gap-3 bg-neutral-magnolia ">
        <div
          className={`md:flex hidden md:row-span-12 bg-white h-fit flex-col gap-[1rem] p-[1.5rem] rounded-lg shadow-sm sticky top-[90px]`}
        >
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
        {products && products.map((p) => <SingleItem key={p.id} {...p} />)}
      </div>
    </section>
  );
}
