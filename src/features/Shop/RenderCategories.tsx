import { CATEGORIES } from "../../const/PillsCategories";

type RenderCategoriesTypes = {
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
  currentCategory: string;
  setSubCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
  subCurrentCategory: string;
};

export default function RenderCategories({
  setIsClicked,
  setCurrentCategory,
  currentCategory,
  setSubCurrentCategory,
  subCurrentCategory,
}: RenderCategoriesTypes) {
  return (
    <div
      className={`md:flex max-w-[31rem] hidden md:row-span-12 bg-white h-fit flex-col gap-[1rem] p-[1.5rem] rounded-lg shadow-sm sticky top-[90px]`}
    >
      {Object.entries(CATEGORIES).map(
        ([key, value]: [string, string | Record<string, string>]) => {
          if (typeof value === "object") {
            return (
              <div key={key}>
                <button
                  onClick={() => {
                    setIsClicked((prev) => !prev);
                    setCurrentCategory(key);
                    setSubCurrentCategory("");
                  }}
                  className={`${
                    key === currentCategory
                      ? "bg-primary-orange text-white p-[1rem]"
                      : ""
                  } hover:opacity-90 flex font-medium items-center gap-[.4rem] transition-all rounded-lg hover:p-[1rem] hover:bg-primary-orange hover:text-white w-full`}
                >
                  {key}
                </button>
                <ul
                  className={`${
                    key === currentCategory ? "" : "hidden"
                  } flex flex-col gap-[.5rem] ml-[.5rem]`}
                >
                  {Object.entries(value).map(([subKey]) => {
                    return (
                      <li key={subKey}>
                        <button
                          onClick={() => {
                            setIsClicked((prev) => !prev);
                            setSubCurrentCategory(subKey);
                          }}
                          className={`${
                            subKey === subCurrentCategory
                              ? "shadow-inner shadow-gray-600 text-black p-[1rem]"
                              : " shadow-inner  p-[.5rem] text-gray-700 shadow-gray-500 hover:p-[.7rem] "
                          } flex font-medium items-center gap-[.4rem] transition-all rounded-lg w-full`}
                        >
                          {subKey}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          } else {
            return (
              <button
                key={key}
                onClick={() => {
                  setIsClicked((prev) => !prev);
                  setCurrentCategory(key);
                }}
                className={`${
                  key === currentCategory
                    ? "bg-primary-orange text-white p-[1rem]"
                    : ""
                } hover:opacity-90 flex font-medium items-center gap-[.4rem] transition-all rounded-lg hover:p-[1rem] hover:bg-primary-orange hover:text-white`}
              >
                {key}
              </button>
            );
          }
        }
      )}
    </div>
  );
}
