import { useState } from "react";
import arrowDown from "../../../assets/images/SingleItemPage/down-arrow.png";
import arrowRight from "../../../assets/images/SingleItemPage/right-arrow.png";

type SingleItemCharacteristicsTypes = {
  showDescription: boolean;
};

export default function SingleItemCharacteristics({
  showDescription,
}: SingleItemCharacteristicsTypes) {
  const [hideSubTitle, setHideSubTitle] = useState(false);
  const [hideText, setHideText] = useState(false);

  return (
    <div
      className={`${
        showDescription ? "hidden" : ""
      } flex flex-col h-full gap-7 w-full text-start mt-[2rem]`}
    >
      <div className="flex flex-col">
        <div className="relative w-fit">
          <h3 className="text-[2.5rem] font-medium border-l-[2px] pl-[.5rem] border-black w-fit">
            Main Title
          </h3>
          <ShowArrowDownOrRight
            hide={hideSubTitle}
            setHideValue={setHideSubTitle}
          />
        </div>
        <div>
          <div className={`${hideSubTitle ? "hidden" : ""} relative w-fit`}>
            <h5
              className={`text-[2rem] border-l-[2px] ml-[.5rem] pl-[.5rem] border-black w-fit`}
            >
              SubTitle
            </h5>
            <ShowArrowDownOrRight hide={hideText} setHideValue={setHideText} />
          </div>
          <p
            className={`text-gray-700 ${
              hideText || hideSubTitle ? "hidden" : ""
            } border-b-[2px] border-gray-600 pl-[1.5rem] w-full`}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores
            commodi, quas doloremque soluta, dignissimos non minus iste
            distinctio impedit, accusamus deserunt exercitationem aspernatur
            voluptatibus atque blanditiis at vitae voluptates dolor.
          </p>
        </div>
      </div>
    </div>
  );
}

type ShowArrowDownOrRightTypes = {
  hide: boolean;
  setHideValue: React.Dispatch<React.SetStateAction<boolean>>;
};

function ShowArrowDownOrRight({
  hide,
  setHideValue,
}: ShowArrowDownOrRightTypes) {
  return (
    <>
      {hide ? (
        <button
          onClick={() => setHideValue((prev) => !prev)}
          className="absolute right-[-2.5rem] top-[.5rem] hover:scale-[1.01] active:scale-[0.99]"
        >
          <img
            src={arrowDown}
            alt={hide ? "Show Text" : "Hide Text"}
            className=" w-[2rem] "
          />
        </button>
      ) : (
        <button
          onClick={() => setHideValue((prev) => !prev)}
          className="absolute right-[-2.5rem] top-[.5rem] hover:scale-[1.01] active:scale-[0.99]"
        >
          <img
            src={arrowRight}
            alt={hide ? "Show Text" : "Hide Text"}
            className=" w-[2rem] "
          />
        </button>
      )}
    </>
  );
}
