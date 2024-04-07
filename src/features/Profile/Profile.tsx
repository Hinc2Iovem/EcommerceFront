import { Bolt, Pencil, Trash2, User2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import { CATEGORIES } from "../../const/PillsCategories";
import ButtonHoverPromptModal from "../shared/ButtonAsideHoverPromtModal/ButtonHoverPromptModal";
import SearchBar from "../shared/SearchBar";

const CATEGORIES_SELLER = {
  BOUGHT_PRODUCTS: "Bought Products",
  SOLD_PRODUCTS: "Sold Products",
};

export default function Profile() {
  const [role, setRole] = useState("seller");
  const [currentCategory, setCurrentCategory] = useState(CATEGORIES.All);
  const [currentCategorySeller, setCurrentCategorySeller] = useState(
    CATEGORIES_SELLER.BOUGHT_PRODUCTS
  );

  // Этот див просто боженька, нужно его везде пихнуть потом <div className="fixed bg-neutral-magnolia top-0 bottom-0 left-0 right-0 z-[-999]"></div>

  return (
    <>
      <div className="fixed bg-neutral-magnolia top-0 bottom-0 left-0 right-0 z-[-999]"></div>
      <section className="h-full">
        <Header
          chosenCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
        />
        <div className="flex flex-col p-[2rem] max-w-[144rem] m-auto h-full">
          <div className="self-end mb-[3rem]">
            <ButtonHoverPromptModal
              className="bg-white m-0 shadow-md hover:bg-primary-orange font-medium text-[1.5rem]"
              variant="rectangleWithShadow"
              contentName="Configure Products"
              positionByAbscissa="right"
            >
              <Link to="/configure/products">
                <Bolt />
              </Link>
            </ButtonHoverPromptModal>
          </div>

          <div className="flex gap-[2rem] justify-between">
            <div className="gap-[3rem] flex-col md:flex hidden flex-shrink-0">
              <div className="bg-white p-[1rem] rounded-lg border-primary-pastel-blue border-[3px] border-dotted">
                <User2 className="w-[15rem] h-[20rem] text-black" />
                <h5 className="font-medium">Username</h5>
                <p className="font-medium">Status: Seller</p>
              </div>

              <div
                className={` ${
                  role === "seller" ? "block" : "hidden"
                } bg-white flex flex-col gap-[1rem] shadow-sm p-[1.5rem] rounded-lg border-primary-pastel-blue border-[3px] border-dotted`}
              >
                {Object.values(CATEGORIES_SELLER).map((c) => (
                  <div key={c} className="flex items-center gap-[1rem]">
                    <button
                      className={`${
                        c === currentCategorySeller
                          ? " bg-green-400 hover:opacity-100 text-white p-[1rem]"
                          : ""
                      } hover:opacity-90 hover:bg-green-400 flex font-medium items-center gap-[.4rem] transition-all rounded-lg hover:p-[1rem]  hover:text-white outline-white`}
                      onClick={() => setCurrentCategorySeller(c)}
                    >
                      {c}
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-white flex flex-col gap-[1rem] shadow-sm p-[1.5rem] rounded-lg border-primary-pastel-blue border-[3px] border-dotted">
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
            <div className="flex-grow">
              <SearchBar />
              <div className="h-full grid grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] grid-rows-[repeat(auto-fit,40rem)] p-3 gap-3 justify-items-center items-center">
                <div className="bg-white w-full h-full overflow-hidden p-[1rem] rounded-lg border-primary-pastel-blue border-[3px] border-dotted flex flex-col gap-[1rem] justify-between">
                  <User2 className="self-center h-[5rem] w-[5rem]" />
                  <div className="flex flex-col gap-[.3rem]">
                    <div className="mb-[3rem] font-medium">
                      <h5>Title</h5>
                      <h5>Price</h5>
                    </div>
                    <div
                      className={`${
                        role === "seller"
                          ? "flex flex-col gap-[.5rem]"
                          : "hidden"
                      }`}
                    >
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
          </div>
        </div>
      </section>
    </>
  );
}
