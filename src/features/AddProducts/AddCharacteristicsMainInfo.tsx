import { useEffect, useState } from "react";

type AddCharacteristicsMainInfoTypes = {
  setAllSubTitles: React.Dispatch<React.SetStateAction<string[]>>;
  setAllTexts: React.Dispatch<React.SetStateAction<string[]>>;
  currentIndex: number;
};

export default function AddCharacteristicsMainInfo({
  setAllSubTitles,
  setAllTexts,
  currentIndex,
}: AddCharacteristicsMainInfoTypes) {
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setAllSubTitles((prev) => {
      const newSubTitles = [...prev];
      newSubTitles[currentIndex] = subTitle;
      return newSubTitles;
    });
  }, [currentIndex, setAllSubTitles, subTitle]);

  useEffect(() => {
    setAllTexts((prev) => {
      const newTexts = [...prev];
      newTexts[currentIndex] = description;
      return newTexts;
    });
  }, [currentIndex, setAllTexts, description]);
  return (
    <>
      <input
        className="w-full outline-neutral-grayish-blue border-neutral-grayish-blue border-[2px] p-[1rem] rounded-md text-gray-600 font-medium focus:border-[3px]"
        id="subTitle"
        placeholder="Sub Title"
        onChange={(e) => setSubTitle(e.target.value)}
        type="text"
        value={subTitle}
      />
      <input
        className="w-full outline-neutral-grayish-blue border-neutral-grayish-blue border-[2px] p-[1rem] rounded-md text-gray-600 font-medium focus:border-[3px]"
        id="description"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        value={description}
      />
    </>
  );
}
