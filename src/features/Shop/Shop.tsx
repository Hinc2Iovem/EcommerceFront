import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import { CATEGORIES } from "../../const/PillsCategories";
import useAllKrogerProducts from "../../hooks/useAllKrogerProducts";
import useFetchOnLimit from "../../hooks/useFetchOnLimit";
import RenderCategories from "./RenderCategories";
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
  const [subCategory, setSubCategory] = useState("");
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const scrollTriggerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [isClicked]);

  console.log(products);

  useAllKrogerProducts({
    limit,
    setLoading,
    setProducts,
    currentCategory,
    subCategory,
  });
  useFetchOnLimit({ loading, scrollTriggerRef, setLimit });

  if (!products) {
    return <h2>Loading...</h2>;
  }

  return (
    <section ref={scrollRef}>
      <Header
        currentCategory={currentCategory}
        setIsClicked={setIsClicked}
        setCurrentCategory={setCurrentCategory}
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] grid-rows-[repeat(auto-fit,50rem)] p-3 gap-3 bg-neutral-magnolia ">
        <RenderCategories
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
          setIsClicked={setIsClicked}
          setSubCurrentCategory={setSubCategory}
          subCurrentCategory={subCategory}
        />
        {products && products.map((p) => <SingleItem key={p.id} {...p} />)}
      </div>
      <div ref={scrollTriggerRef} className="h-[10rem] w-full"></div>
    </section>
  );
}
