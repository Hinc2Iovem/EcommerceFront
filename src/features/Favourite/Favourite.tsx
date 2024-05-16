import { Pencil, Trash2, User2 } from "lucide-react";
import { useState } from "react";
import Header from "../../components/Header/Header";
import { CATEGORIES } from "../../const/PillsCategories";
import SearchBar from "../shared/SearchBar";

export default function Favourite() {
  const [currentCategory, setCurrentCategory] = useState(CATEGORIES.All);

  return (
    <>
      <Header
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />
      <section className="max-w-[146rem] p-[1rem] flex flex-col m-auto gap-[1rem]">
        <SearchBar />
        <div className="flex flex-col gap-[1.5rem]">
          <div className="md:flex hidden gap-[.5rem] justify-center">
            {Object.entries(CATEGORIES).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setCurrentCategory(value)}
                className={`${
                  value === currentCategory
                    ? "bg-green-400 hover:opacity-100 text-white"
                    : "bg-white hover:bg-green-300"
                } outline-white p-[1rem] shadow-sm shadow-neutral-grayish-blue hover:translate-x-1 active:scale-[.97] hover:opacity-90 flex font-medium items-center gap-[.4rem] transition-all rounded-lg hover:p-[1rem]  hover:text-white`}
              >
                {key}
              </button>
            ))}
          </div>

          <div className="h-full grid grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] grid-rows-[repeat(auto-fit,minmax(30rem,1fr))] p-3 gap-3 justify-items-center items-center">
            <div className="bg-white w-full h-full overflow-hidden p-[1rem] rounded-lg border-primary-pastel-blue border-[3px] border-dotted flex flex-col gap-[1rem] justify-between">
              <User2 className="self-center h-[5rem] w-[5rem]" />
              <div className="flex flex-col gap-[.3rem]">
                <div className="mb-[3rem] font-medium">
                  <h5>Title</h5>
                  <h5>Price</h5>
                </div>
                <div className={`${"flex flex-col gap-[.5rem] "}`}>
                  <h4 className="font-medium">Id</h4>
                  <div className="flex items-center gap-[1px]">
                    <button className="w-[50%] self-center border-[1px] transition-all border-black hover:text-white p-[.1rem] active:scale-[.97] rounded-md hover:bg-red-300">
                      <Trash2 className="m-auto" />
                    </button>
                    <button className="w-[50%] border-[1px] border-black transition-all hover:text-white p-[.1rem] active:scale-[.97] rounded-md hover:bg-orange-300">
                      <Pencil className="m-auto" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
