import { useEffect, useState } from "react";
import SearchBar from "../shared/SearchBar";
import DefaultChosenCategories from "./DefaultUpperParts/DefaultChosenCategories";
import DefaultProductsCategoryPills from "./DefaultUpperParts/DefaultProductsCategoryPills";
import useMatchMedia from "../../hooks/useMatchMedia";
import { MATCHMEDIA } from "../../const/MatchMedia";
import DefaultProductsList from "./DefaultMainPart/DefaultProductsList";
import useDebounce from "../../hooks/useDebounce";

type Timeout = ReturnType<typeof setTimeout>;

const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number
): T => {
  let lastFunc: Timeout;
  let lastRan: number | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (lastRan === null) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan! >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  } as T;
};

export default function DefaultProducts() {
  const [value, setValue] = useState("");
  const userId: string = localStorage.getItem("userId") as string;
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentSubCategory, setCurrentSubCategory] = useState("");
  const [lockCategories, setLockCategories] = useState(false);
  const debouncedValue = useDebounce({ value, delay: 500 });
  useEffect(() => {
    setCurrentSubCategory("");
  }, [currentCategory]);

  return (
    <section className="max-w-[146rem] p-[1rem] flex flex-col m-auto gap-[1rem]">
      <DefaultProductsCategoryPills
        currentCategory={currentCategory}
        currentSubCategory={currentSubCategory}
        setCurrentCategory={setCurrentCategory}
        setCurrentSubCategory={setCurrentSubCategory}
        lockCategories={lockCategories}
      />
      <SearchBar setValue={setValue} />
      <DefaultChosenCategories
        currentCategory={currentCategory}
        currentSubCategory={currentSubCategory}
        setLockCategories={setLockCategories}
      />
      <DefaultProductsList
        currentCategory={currentCategory}
        currentSubCategory={currentSubCategory}
        debouncedValue={debouncedValue}
        userId={userId}
      />
    </section>
  );
}
