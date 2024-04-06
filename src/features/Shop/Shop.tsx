import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
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

export default function Shop() {
  const [currentCategory, setCurrentCategory] = useState(CATEGORIES.All);
  const [products, setProducts] = useState<ProductTypes[]>();
  const rerenderRef = useRef(true);
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
      <Header chosenCategory={currentCategory} />
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
