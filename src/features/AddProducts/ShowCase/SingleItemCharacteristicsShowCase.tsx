import { useEffect, useState } from "react";
import RenderAllCharacteristics from "../../Shop/SingleItemPage/RenderAllCharacteristics";

type SingleItemCharacteristicsTypes = {
  showDescription: boolean;
  allMainTitles: string[];
  allSubTitles: string[];
  allTexts: string[];
  amountOfMainInfoAll: number[];
};

export default function SingleItemCharacteristicsShowCase({
  showDescription,
  allMainTitles,
  allSubTitles,
  allTexts,
  amountOfMainInfoAll,
}: SingleItemCharacteristicsTypes) {
  const [newAllSubTitles, setNewAllSubTitles] = useState<string[]>([]);

  useEffect(() => {
    setNewAllSubTitles(allSubTitles);
  }, [allSubTitles]);

  console.log(allSubTitles);

  return (
    <div
      className={`${
        showDescription ? "hidden" : ""
      } flex flex-col h-full gap-7 w-full text-start mt-[2rem]`}
    >
      {newAllSubTitles?.map((mainTitle, index) => {
        const subTitlesForThisMainTitle = allSubTitles.slice(
          0,
          amountOfMainInfoAll[index] + 1
        );

        const leftSubTitles = allSubTitles.slice(
          amountOfMainInfoAll[index] + 1,
          amountOfMainInfoAll.length
        );
        setNewAllSubTitles(leftSubTitles);
        return (
          <RenderAllCharacteristics
            mainTitle={mainTitle}
            key={mainTitle}
            subTitlesForThisMainTitle={subTitlesForThisMainTitle}
          />
        );
      })}
    </div>
  );
}
