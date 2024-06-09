import { useEffect, useState } from "react";
import { CATEGORIES } from "../../const/PillsCategories";
import Header from "../Header/Header";
import useGetAllFavouriteProducts from "../../hooks/Favourite/useGetAllFavouriteProducts";
import useDebounce from "../../hooks/useDebounce";
import SearchBar from "../shared/SearchBar";
import FavouriteItem from "./FavouriteItem";
import useGetDecodedJWTValues from "../../hooks/Auth/useGetDecodedJWTValues";

export default function Favourite() {
  const [loading, setLoading] = useState(true);
  const { userId } = useGetDecodedJWTValues();
  const [currentCategory, setCurrentCategory] = useState(CATEGORIES.All);
  const [value, setValue] = useState("");
  const [headerValue, setHeaderValue] = useState("");

  const debouncedValue = useDebounce({ value, delay: 500 });
  const allFavouriteProductIds = useGetAllFavouriteProducts({
    userId: userId ?? "",
  });

  useEffect(() => {
    if (allFavouriteProductIds) {
      setLoading(false);
    }
  }, [allFavouriteProductIds]);

  return (
    <>
      <Header
        setValue={setHeaderValue}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />
      <section className="max-w-[146rem] p-[1rem] flex flex-col m-auto gap-[1rem]">
        <SearchBar setValue={setValue} />
        <div className="flex flex-col gap-[1.5rem]">
          <div className="md:flex hidden gap-[.5rem] justify-center">
            {Object.keys(CATEGORIES).map((key) => (
              <button
                key={key}
                onClick={() => setCurrentCategory(key)}
                className={`${
                  key === currentCategory
                    ? "bg-green-400 hover:opacity-100 text-white"
                    : "bg-white hover:bg-green-300"
                } outline-white p-[1rem] shadow-sm shadow-neutral-grayish-blue hover:translate-x-1 active:scale-[.97] hover:opacity-90 flex font-medium items-center gap-[.4rem] transition-all rounded-lg hover:p-[1rem]  hover:text-white`}
              >
                {key}
              </button>
            ))}
          </div>

          <div className="h-full w-full grid grid-cols-[repeat(auto-fit,minmax(25rem,35rem))] grid-rows-[repeat(auto-fit,minmax(30rem,1fr))] p-3 gap-3 justify-center">
            {userId && allFavouriteProductIds.length ? (
              allFavouriteProductIds.map((pId, i) => {
                return (
                  <FavouriteItem
                    key={pId._id}
                    currentIndex={i}
                    currentCategory={currentCategory}
                    debouncedValue={debouncedValue}
                    {...pId}
                  />
                );
              })
            ) : loading ? (
              <>
                <div className="w-[29rem] h-[50rem] bg-white rounded-lg border-primary-pastel-blue border-[3px] border-dotted"></div>
              </>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
