import { User2 } from "lucide-react";
import { CATEGORIES } from "../../const/PillsCategories";
import { useState } from "react";

const CATEGORIES_SELLER = {
  BOUGHT_PRODUCTS: "Bought Products",
  SOLD_PRODUCTS: "Sold Products",
};

type ProfileUserSideTypes = {
  currentCategory: string;
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
  role: string;
};

export default function ProfileUserSide({
  currentCategory,
  setCurrentCategory,
  role,
}: ProfileUserSideTypes) {
  const [currentCategorySeller, setCurrentCategorySeller] = useState(
    CATEGORIES_SELLER.BOUGHT_PRODUCTS
  );
  return (
    <div className="gap-[3rem] flex-col flex flex-shrink-0">
      <div className="flex md:flex-col items-center gap-[2rem]">
        <div className="flex flex-col shrink-0 gap-[1rem] md:m-0 items-center m-auto w-full">
          <div className="bg-white p-[1rem] rounded-lg border-primary-pastel-blue border-[3px] border-dotted flex flex-col items-center w-full">
            <User2 className="w-[15rem] h-[20rem] text-black" />
            <h5 className="font-medium">Username</h5>
            <p className="font-medium">Status: Seller</p>
          </div>
          <div
            className={` ${
              role === "seller" ? "block" : "hidden"
            } bg-white flex flex-col w-full gap-[1rem] shadow-sm p-[1.5rem] rounded-lg border-primary-pastel-blue border-[3px] border-dotted`}
          >
            {Object.values(CATEGORIES_SELLER).map((c) => (
              <div key={c} className="flex items-center gap-[1rem] w-full">
                <button
                  className={`${
                    c === currentCategorySeller
                      ? " bg-green-400 hover:opacity-100 text-white p-[1rem]"
                      : ""
                  } w-full hover:opacity-90 hover:bg-green-400 flex font-medium items-center gap-[.4rem] transition-all rounded-lg hover:p-[1rem]  hover:text-white outline-white`}
                  onClick={() => setCurrentCategorySeller(c)}
                >
                  {c}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white w-full overflow-y-auto h-full max-h-[40rem] hidden md:flex flex-col gap-[1rem] shadow-sm p-[1.5rem] rounded-lg border-primary-pastel-blue border-[3px] border-dotted">
          {Object.values(CATEGORIES).map((c) => (
            <button
              key={c}
              onClick={() => setCurrentCategory(c)}
              className={`${
                c === currentCategory
                  ? "bg-primary-orange text-white p-[1rem]"
                  : ""
              } outline-white hover:opacity-90 flex font-medium items-center gap-[.4rem] transition-all rounded-lg hover:p-[1rem] hover:bg-primary-orange hover:text-white`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
