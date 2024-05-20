import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import characteristicsImg from "../../../assets/images/SingleItemPage/characteristics.png";
import descriptionImg from "../../../assets/images/SingleItemPage/description.png";
import { MATCHMEDIA } from "../../../const/MatchMedia";
import useMatchMedia from "../../../hooks/useMatchMedia";
import RenderImagesLarge from "../../Shop/SingleItemPage/ImagesComponents/RenderImagesLarge";
import ShowImagesOnLightBox from "../../Shop/SingleItemPage/ImagesComponents/ShowImagesOnLightBox";
import SingleItemDescription from "../../Shop/SingleItemPage/Description/SingleItemDescription";
import ButtonHoverPromptModal from "../../shared/ButtonAsideHoverPromtModal/ButtonHoverPromptModal";
import LightBox from "../../shared/LightBox";
import RenderImagesShowCase from "./RenderImagesShowCase";
import SingleItemAddToCartShowCase from "./SingleItemAddToCartShowCase";
import SingleItemCharacteristicsShowCase from "./SingleItemCharacteristicsShowCase";

type SingleItemPageShowCaseTypes = {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  currentPage: string;
  preview: string | ArrayBuffer | null;
  price: number;
  brand: string;
  title: string;
  description: string;
  imgsPreview: string[] | ArrayBuffer | null;
  allMainTitles: string[];
  allSubTitles: string[][];
  allTexts: string[][];
};

export default function SingleItemPageShowCase({
  currentPage,
  setCurrentPage,
  preview,
  price,
  title,
  imgsPreview,
  description,
  allMainTitles,
  allSubTitles,
  allTexts,
  brand,
}: SingleItemPageShowCaseTypes) {
  const { productId } = useParams();
  const [currentImage, setCurrentImage] = useState(1);
  const [isLightBox, setIsLightBox] = useState(false);
  const mobile = useMatchMedia(MATCHMEDIA.Mobile);
  // @ts-expect-error Fuck This Stuff
  const allImgs = imgsPreview ? [preview, ...imgsPreview] : [""];

  const [showDescription, setShowDescription] = useState(true);

  return (
    <>
      <div
        className={`bg-neutral-magnolia p-[1rem] ${
          currentPage === "result" ? "" : "hidden"
        }`}
      >
        <button
          onClick={() => setCurrentPage("form")}
          className="transition-all ml-auto self-end shadow-sm rounded-md p-[1rem] active:scale-[.97] bg-white hover:text-white hover:bg-primary-orange text-gray-700 font-medium"
        >
          Back To Form
        </button>
        <div
          className={`bg-white ${
            showDescription ? "items-center" : "md:items-start"
          } items-center h-fit flex md:flex-row flex-col md:gap-[8rem] gap-3 rounded-lg max-w-[1110px] mx-auto my-[2rem] p-[3rem] relative`}
        >
          <div className="absolute top-[-1.5rem] sm:top-[1rem] right-[1rem] flex gap-[1rem]">
            <ButtonHoverPromptModal
              contentName="Description"
              positionByAbscissa="right"
              asideClasses="bottom-[-3rem]"
              className={`w-[4.6rem] h-[4.6rem] bg-transparent ${
                showDescription ? "shadow-md" : ""
              } transition-all`}
              variant={"icon"}
              onClick={() => setShowDescription(true)}
            >
              <img src={descriptionImg} alt="description" className="w-full" />
            </ButtonHoverPromptModal>
            <ButtonHoverPromptModal
              contentName="Characteristics"
              positionByAbscissa="right"
              asideClasses="bottom-[-3rem]"
              className={`w-[4rem] h-[4rem] bg-transparent ${
                showDescription
                  ? ""
                  : "shadow-md p-[.3rem] w-[4.5rem] h-[4.5rem]"
              } transition-all`}
              variant={"icon"}
              onClick={() => setShowDescription(false)}
            >
              <img
                src={characteristicsImg}
                alt="characteristics"
                className="w-full"
              />
            </ButtonHoverPromptModal>
          </div>
          {!mobile ? (
            <div className="md:grid grid-cols-4 gap-6 hidden max-w-[35rem] min-w-[20rem]">
              <img
                className={`col-[1/5] rounded-xl h-full object-cover w-full shadow-md shadow-neutral-dark-grayish-blue hover:scale-[1.01] cursor-pointer transition-all`}
                src={preview as string}
                alt={title}
                onClick={() => setIsLightBox(true)}
              />
              {allImgs.map((img) => (
                <RenderImagesLarge
                  key={img}
                  img={img}
                  title={"title"}
                  setIsLightBox={setIsLightBox}
                />
              ))}
            </div>
          ) : (
            <div className="flex gap-6 max-w-[35rem] relative h-full transition-all ">
              {allImgs.map((img, i) => (
                <RenderImagesShowCase
                  image={img}
                  key={img}
                  currentIndex={i + 1}
                  currentImg={currentImage}
                />
              ))}
              <button
                className="absolute top-[calc(50%-1.2rem)] left-[1rem] flex items-center justify-center w-[4rem] h-[4rem] bg-white rounded-full"
                onClick={() =>
                  setCurrentImage((prev) => {
                    if (prev > 1) {
                      return prev - 1;
                    } else {
                      return 4;
                    }
                  })
                }
              >
                <ArrowLeftIcon />
              </button>
              <button
                className="absolute top-[calc(50%-1.2rem)] flex items-center justify-center right-[1rem] w-[4rem] h-[4rem] bg-primary-orange text-white rounded-full"
                onClick={() =>
                  setCurrentImage((prev) => {
                    if (prev >= 4) {
                      return 1;
                    } else {
                      return prev + 1;
                    }
                  })
                }
              >
                <ArrowRightIcon />
              </button>
            </div>
          )}
          <div
            className={` ${
              showDescription ? "flex-col " : "flex-col-reverse"
            } flex md:h-[60%] max-w-[50rem] w-full`}
          >
            <SingleItemCharacteristicsShowCase
              showDescription={showDescription}
              allMainTitles={allMainTitles}
              allSubTitles={allSubTitles}
              allTexts={allTexts}
            />
            <SingleItemDescription
              brand={brand}
              description={description}
              price={price}
              showDescription={showDescription}
              title={title}
            />
            <SingleItemAddToCartShowCase
              price={price}
              productId={productId as string}
            />
          </div>
        </div>
      </div>

      <LightBox isLightBox={isLightBox} setIsLightBox={setIsLightBox} />

      <ShowImagesOnLightBox
        imgs={allImgs}
        isLightBox={isLightBox}
        setIsLightBox={setIsLightBox}
      />
    </>
  );
}
