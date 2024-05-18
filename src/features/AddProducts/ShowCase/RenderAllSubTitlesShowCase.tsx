import { useState } from "react";
import { ShowArrowDownOrRight } from "../../Shop/SingleItemPage/RenderAllCharacteristics";

type RenderAllSubTitlesShowCaseTypes = {
  hideSubTitle: boolean;
  subTitle: string;
};

export default function RenderAllSubTitlesShowCase({
  hideSubTitle,
  subTitle,
}: RenderAllSubTitlesShowCaseTypes) {
  const [hideText, setHideText] = useState(false);

  return (
    <div>
      <div className={`${hideSubTitle ? "hidden" : ""} relative w-fit`}>
        <h5
          className={`text-[2rem] border-l-[2px] ml-[.5rem] pl-[.5rem] border-black w-fit`}
        >
          {subTitle}
        </h5>
        <ShowArrowDownOrRight hide={hideText} setHideValue={setHideText} />
      </div>
      <p
        className={`text-gray-700 ${
          hideText || hideSubTitle ? "hidden" : ""
        } border-b-[2px] border-gray-600 pl-[1.5rem] w-full`}
      >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores
        commodi, quas doloremque soluta, dignissimos non minus iste distinctio
        impedit, accusamus deserunt exercitationem aspernatur voluptatibus atque
        blanditiis at vitae voluptates dolor.
      </p>
    </div>
  );
}
