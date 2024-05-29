import { useEffect, useRef, useState } from "react";
import Header from "../../../components/Header/Header";
import { CATEGORIES } from "../../../const/PillsCategories";
import useGetProducts from "../../../hooks/Products/useGetProducts";
import RenderCategories from "./RenderCategories";
import SingleItem from "./SingleItem";

export default function Shop() {
  const [currentCategory, setCurrentCategory] = useState(CATEGORIES.All);
  const [subCategory, setSubCategory] = useState("");
  const products = useGetProducts();
  // const [loading, setLoading] = useState(false);
  // const [limit, setLimit] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const scrollTriggerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [isClicked]);

  // useAllKrogerProducts({
  //   limit,
  //   setLoading,
  //   setProducts,
  //   currentCategory,
  //   subCategory,
  // });
  // useFetchOnLimit({ loading, scrollTriggerRef, setLimit });

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
      <div className="md:flex">
        <RenderCategories
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
          setIsClicked={setIsClicked}
          setSubCurrentCategory={setSubCategory}
          subCurrentCategory={subCategory}
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(25rem,40rem))] p-3 gap-3 bg-neutral-magnolia w-full justify-center">
          {products && products.map((p) => <SingleItem key={p._id} {...p} />)}
        </div>
      </div>
      <div ref={scrollTriggerRef} className="h-[10rem] w-full"></div>
    </section>
  );
}
