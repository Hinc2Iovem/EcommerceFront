import RenderAllCharacteristicsShowCase from "./RenderAllCharacteristicsShowCase";

type SingleItemCharacteristicsTypes = {
  showDescription: boolean;
  allMainTitles: string[];
  allSubTitles: string[][];
  allTexts: string[][];
};

export default function SingleItemCharacteristicsShowCase({
  showDescription,
  allMainTitles,
  allSubTitles,
  allTexts,
}: SingleItemCharacteristicsTypes) {
  const renderCharacteristicsItems = () => {
    return allMainTitles.map((mainTitle, index) => {
      const subTitlesThisMainTitle = allSubTitles[index];
      const textsThisMainTitle = allTexts[index];

      return (
        <RenderAllCharacteristicsShowCase
          key={index}
          mainTitle={mainTitle}
          subTitlesForThisMainTitle={subTitlesThisMainTitle}
          textsForThisMainTitle={textsThisMainTitle}
        />
      );
    });
  };
  return (
    <div
      className={`${
        showDescription ? "hidden" : ""
      } flex flex-col h-full gap-7 w-full text-start mt-[2rem]`}
    >
      {renderCharacteristicsItems()}
    </div>
  );
}
