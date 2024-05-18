import { useState } from "react";
import arrowDown from "../../../assets/images/SingleItemPage/down-arrow.png";
import arrowRight from "../../../assets/images/SingleItemPage/right-arrow.png";
import RenderAllSubTitlesShowCase from "../../AddProducts/ShowCase/RenderAllSubTitlesShowCase";

type RenderAllCharacteristicsTypes = {
  mainTitle: string;
  subTitlesForThisMainTitle: string[];
};

export default function RenderAllCharacteristics({
  mainTitle,
  subTitlesForThisMainTitle,
}: RenderAllCharacteristicsTypes) {
  const [hideSubTitle, setHideSubTitle] = useState(false);
  console.log("mainTitle: ", mainTitle);
  console.log("subTitlesForThisMainTitle: ", subTitlesForThisMainTitle);

  return (
    <div className="flex flex-col">
      <div className="relative w-fit">
        <h3 className="text-[2.5rem] font-medium border-l-[2px] pl-[.5rem] border-black w-fit">
          {mainTitle}
        </h3>
        <ShowArrowDownOrRight
          hide={hideSubTitle}
          setHideValue={setHideSubTitle}
        />
      </div>
      {subTitlesForThisMainTitle.map((st) => (
        <RenderAllSubTitlesShowCase
          key={st}
          hideSubTitle={hideSubTitle}
          subTitle={st}
        />
      ))}
    </div>
  );
}

type ShowArrowDownOrRightTypes = {
  hide: boolean;
  setHideValue: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ShowArrowDownOrRight({
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
