import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import characteristics from "../../../assets/images/SingleItemPage/characteristics.png";
import description from "../../../assets/images/SingleItemPage/description.png";
import img1 from "../../../assets/images/testingSingleItemPage/pexels-avonne-stalling-3916420.jpg";
import img2 from "../../../assets/images/testingSingleItemPage/pexels-josh-hild-17685567.jpg";
import img3 from "../../../assets/images/testingSingleItemPage/pexels-paige-thompson-19841521.jpg";
import Header from "../../../components/Header/Header";
import { MATCHMEDIA } from "../../../const/MatchMedia";
import useMatchMedia from "../../../hooks/useMatchMedia";
import ButtonHoverPromptModal from "../../shared/ButtonAsideHoverPromtModal/ButtonHoverPromptModal";
import LightBox from "../../shared/LightBox";
import RenderImages from "./RenderImages";
import RenderImagesLarge from "./RenderImagesLarge";
import ShowImagesOnLightBox from "./ShowImagesOnLightBox";
import SingleItemAddToCart from "./SingleItemAddToCart";
import SingleItemDescription from "./SingleItemDescription";
import useGetProductById from "./useGetProductById";
import SingleItemCharacteristics from "./SingleItemCharacteristics";

const imgs = Array.from([img2, img3, img1]);

export default function SingleItemPage() {
  const { productId } = useParams();
  const product = useGetProductById(Number(productId));
  const [currentImage, setCurrentImage] = useState(1);
  const [isLightBox, setIsLightBox] = useState(false);
  const mobile = useMatchMedia(MATCHMEDIA.Mobile);

  const [showDescription, setShowDescription] = useState(true);

  if (!product) {
    return <h2>Loading...</h2>;
  }
  const allImgs = [product.image, ...imgs];

  return (
    <>
      <Header showPillsOrNot={false} />
      <div className={"bg-neutral-magnolia p-[1rem]"}>
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
              <img src={description} alt="description" className="w-full" />
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
                src={characteristics}
                alt="characteristics"
                className="w-full"
              />
            </ButtonHoverPromptModal>
          </div>
          {!mobile ? (
            <div className="md:grid grid-cols-4 gap-6 hidden max-w-[35rem] min-w-[20rem]">
              <img
                className={`col-[1/5] rounded-xl h-full object-cover w-full shadow-md shadow-neutral-dark-grayish-blue hover:scale-[1.01] cursor-pointer transition-all`}
                src={product.image}
                alt={product.title}
                onClick={() => setIsLightBox(true)}
              />
              {allImgs.map((img) => (
                <RenderImagesLarge
                  key={img}
                  img={img}
                  title={product.title}
                  setIsLightBox={setIsLightBox}
                />
              ))}
            </div>
          ) : (
            <div className="flex gap-6 max-w-[35rem] relative  h-full transition-all ">
              <RenderImages image={product.image} currentImg={currentImage} />
              <button
                className="absolute top-[calc(50%-1.2rem)] left-[1rem] flex items-center justify-center w-[4rem] h-[4rem] bg-white rounded-full"
                onClick={() =>
                  setCurrentImage((prev) => {
                    if (prev > 1) {
                      return prev - 1;
                    } else {
                      // product.images.length
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
                    // product.images.length
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
          {/* characteristics */}
          <div
            className={` ${
              showDescription ? "flex-col " : "flex-col-reverse"
            } flex md:h-[60%] max-w-[50rem] w-full`}
          >
            <SingleItemCharacteristics showDescription={showDescription} />
            <SingleItemDescription
              category={product.category}
              description={product.description}
              price={product.price}
              showDescription={showDescription}
              title={product.title}
            />
            <SingleItemAddToCart
              category={product.category}
              description={product.description}
              image={product.image}
              price={product.price}
              productId={productId as string}
              rating={2}
              title={product.title}
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
