import { useRef, useState } from "react";
import { CATEGORIES } from "../../const/PillsCategories";
import useOutOfModal from "../../hooks/useOutOfModal";

type AddProductCategoriesTypes = {
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
  currentCategory: string;
  setSubCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
  subCurrentCategory: string;
};

export default function AddProductCategories({
  setCurrentCategory,
  currentCategory,
  setSubCurrentCategory,
  subCurrentCategory,
}: AddProductCategoriesTypes) {
  const [showModal, setShowModal] = useState(false);
  const modalRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentRefIndex, setCurrentRefIndex] = useState(0);
  useOutOfModal({
    modalRef: modalRefs[currentRefIndex],
    setShowModal,
    showModal,
  });
  console.log(currentRefIndex);

  return (
    <div className="w-full flex flex-wrap gap-[.5rem]">
      {Object.entries(CATEGORIES).map(
        ([key, value]: [string, string | Record<string, string>]) => {
          if (typeof value === "object") {
            return (
              <div
                ref={(e) => (modalRefs.current[currentRefIndex] = e)}
                className="relative"
                key={key}
              >
                <button
                  type="button"
                  onClick={() => {
                    setCurrentCategory(key);
                    setShowModal(true);
                    if (
                      !Object.entries(value).find(
                        ([subKey]) => subKey === subCurrentCategory
                      )
                    ) {
                      setSubCurrentCategory("");
                    }
                  }}
                  className={`${
                    key === currentCategory
                      ? "bg-green-400 hover:opacity-100 text-white"
                      : "bg-white hover:bg-green-300"
                  } whitespace-nowrap self-center outline-white p-[1rem] shadow-sm shadow-neutral-grayish-blue hover:translate-x-1 active:scale-[.97] hover:opacity-90 flex font-medium items-center gap-[.4rem] transition-all rounded-lg hover:text-white`}
                >
                  {key}
                </button>
                <ul
                  className={`${
                    showModal && key === currentCategory ? "" : "hidden"
                  } flex flex-col gap-[.5rem] ml-[.5rem] absolute z-[10] bg-white mt-[.5rem] shadow-md shadow-gray-600 max-h-[20rem] overflow-y-auto`}
                >
                  {Object.entries(value).map(([subKey]) => {
                    return (
                      <li className="relative overflow-hidden" key={subKey}>
                        <button
                          type="button"
                          onClick={() => {
                            setSubCurrentCategory(subKey);
                          }}
                          className={`${
                            subKey === subCurrentCategory ? "ml-[.5rem]" : ""
                          } p-[1rem] flex font-medium items-center gap-[.4rem] transition-all rounded-lg w-full`}
                        >
                          {subKey}
                        </button>
                        <div
                          className={`${
                            subKey === subCurrentCategory
                              ? "w-[1rem] h-[1rem] rounded-full bg-green-500 left-[.3rem] top-[calc(50%-.5rem)]"
                              : " "
                          } absolute`}
                        ></div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          } else {
            return (
              <button
                type="button"
                key={key}
                onClick={() => {
                  setCurrentCategory(key);
                  setSubCurrentCategory("");
                }}
                className={`${
                  key === currentCategory
                    ? "bg-green-400 hover:opacity-100 text-white"
                    : "bg-white hover:bg-green-300"
                } hover:translate-x-1 shadow-sm shadow-neutral-grayish-blue flex font-medium items-center gap-[.4rem] transition-all rounded-lg p-[1rem] hover:text-white`}
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
