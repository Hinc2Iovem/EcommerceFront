import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MATCHMEDIA } from "../../../const/MatchMedia";
import { addToFavourite, deleteFromFavourite } from "../Shop/shopQueries";
import characteristics from "../../../assets/images/SingleItemPage/characteristics.png";
import owner from "../../../assets/images/SingleItemPage/owner.png";
import heart from "../../../assets/images/Shop/heart.png";
import hollowHeart from "../../../assets/images/Shop/hollowHeart.png";
import Header from "../../Header/Header";
import useMatchMedia from "../../../hooks/useMatchMedia";
import ButtonHoverPromptModal from "../../shared/ButtonAsideHoverPromtModal/ButtonHoverPromptModal";
import LightBox from "../../shared/LightBox";
import RenderImages from "./ImagesComponents/RenderImages";
import RenderImagesLarge from "./ImagesComponents/RenderImagesLarge";
import ShowImagesOnLightBox from "./ImagesComponents/ShowImagesOnLightBox";
import SingleItemAddToCart from "./Description/SingleItemAddToCart";
import SingleItemDescription from "./Description/SingleItemDescription";
import useGetProductById from "../../../hooks/Products/useGetProductById";
import SingleItemCharacteristics from "./Characteristics/SingleItemCharacteristics";
import useGetFavouriteByProductIdUserId from "../../../hooks/Favourite/useGetFavouriteByProductIdUserId";
import Rating from "./Rating/Rating";
import Comment from "./Comment/Comment";
import useGetUser from "../../../hooks/Profile/useGetUser";
import SellerProducts from "./SellerProducts/SellerProducts";
import OverAllRating from "./Rating/OverAllRating";
import SingleItemPreLoadPage from "./SingleItemPreLoadPage";
import useGetDecodedJWTValues from "../../../hooks/Auth/useGetDecodedJWTValues";
import InformativeModal from "../../shared/Modal/InformativeModal";

export default function SingleItemPage() {
  const [showInformativeModal, setShowInformativeModal] = useState(false);
  const [informativeModalType, setInformativeModalType] = useState<
    "info" | "error" | "success"
  >("info");
  const [informativeModalMessage, setInformativeModalMessage] = useState(
    "You need to Register first"
  );
  const [informativeModalLinkMessage, setInformativeModalLinkMessage] =
    useState("");

  const [loading] = useState(true);
  const params = useParams<{ productId?: string }>();
  const product = useGetProductById(params?.productId);
  const [currentImage, setCurrentImage] = useState(1);
  const [isLightBox, setIsLightBox] = useState(false);
  const [value, setValue] = useState("");
  const mobile = useMatchMedia(MATCHMEDIA.Mobile);
  const { userId } = useGetDecodedJWTValues();
  const seller = useGetUser({ userId: product?.userId as string });
  const favourite = useGetFavouriteByProductIdUserId({
    userId: userId ?? "",
    productId: product?._id,
  });
  const [showAdditionalInformation, setShowAdditionalInformation] =
    useState("");
  const [isFavouriteOrNot, setIsFavouriteOrNot] = useState(
    favourite ? true : false
  );
  const [overAllRating, setOverAllRating] = useState(
    product?.rating ? product.rating : 0
  );

  useEffect(() => {
    if (product) {
      setOverAllRating(product.rating);
    }
  }, [product]);

  useEffect(() => {
    if (favourite) {
      setIsFavouriteOrNot(true);
    }
  }, [favourite]);
  useEffect(() => {
    if (mobile) {
      setIsLightBox(false);
    }
  }, [mobile]);

  if (!product && loading) {
    return <SingleItemPreLoadPage />;
  }

  const handleRemoveOrAddFavourite = () => {
    if (isFavouriteOrNot) {
      if (userId) {
        setIsFavouriteOrNot(false);
        deleteFromFavourite({ userId, productId: product?._id as string });
      }
    } else if (!isFavouriteOrNot) {
      if (userId) {
        setIsFavouriteOrNot(true);
        addToFavourite({ userId, productId: product?._id as string });
      }
    }
  };

  const allImgs = [
    product?.frontImg as string,
    ...(product?.imgUrls as string[]),
  ];

  if (!product) {
    return <h1>Product wasn't found</h1>;
  }

  console.log("overAllRating: ", overAllRating);

  return (
    <>
      <Header setValue={setValue} showPillsOrNot={false} />
      <div className={"bg-neutral-magnolia p-[1rem] flex flex-col gap-[1rem]"}>
        <div className="flex w-full mx-auto max-w-[1110px] items-baseline justify-between relative">
          <ul className="flex mt-[2rem] mb-[0rem] items-center gap-[1rem] ">
            <li className="px-[1rem] py-[.5rem] rounded-md text-black bg-white text-[1.8rem] font-medium w-fit">
              {product!.category}
            </li>
            <li className="px-[1rem] py-[.5rem] rounded-md text-black bg-white text-[1.8rem] font-medium w-fit">
              {product!.subCategory}
            </li>
          </ul>
          <Rating
            setShowInformativeModal={setShowInformativeModal}
            rating={product!.rating}
            productId={product!._id}
            userId={userId ?? ""}
            mobile={mobile}
            setOverAllRating={setOverAllRating}
            setInformativeModalLinkMessage={setInformativeModalLinkMessage}
          />
        </div>
        <div className="bg-white flex flex-col gap-[2rem] rounded-lg max-w-[1110px] mx-auto p-[3rem] relative w-full">
          <div
            className={`absolute ${
              mobile
                ? "top-[.3rem] left-[.3rem] sm:top-[1rem] sm:left-[1rem]"
                : "top-[.3rem] right-[.3rem] sm:top-[1rem] sm:right-[1rem]"
            }  flex gap-[1rem] z-[1]`}
          >
            <ButtonHoverPromptModal
              contentName={`${
                isFavouriteOrNot ? "Remove From Favourite" : "Add To Favourite"
              }`}
              positionByAbscissa={mobile ? "left" : "right"}
              asideClasses="bottom-[-3rem]"
              className={`w-[3rem] h-[3rem] bg-transparent shadow-md transition-all active:scale-[0.98] hover:scale-[1.02]`}
              variant={"icon"}
              onClick={() => {
                handleRemoveOrAddFavourite();
                setInformativeModalLinkMessage("Register");
                setShowInformativeModal((prev) => !prev);
              }}
            >
              <img
                src={isFavouriteOrNot ? heart : hollowHeart}
                alt="Favourite"
                className="w-full"
              />
            </ButtonHoverPromptModal>
          </div>

          <div
            className={`items-center h-fit flex md:flex-row flex-col md:gap-[8rem] gap-3 relative`}
          >
            {!mobile ? (
              <div className="md:grid grid-cols-4 gap-6 hidden max-w-[35rem] min-w-[20rem]">
                <img
                  className={`col-[1/5] rounded-xl h-full object-cover w-full shadow-md shadow-neutral-dark-grayish-blue hover:scale-[1.01] cursor-pointer transition-all`}
                  src={product!.frontImg}
                  alt={product!.title}
                  onClick={() => setIsLightBox(true)}
                />
                {allImgs.map((img) => (
                  <RenderImagesLarge
                    key={img}
                    img={img}
                    title={product!.title}
                    setIsLightBox={setIsLightBox}
                  />
                ))}
              </div>
            ) : (
              <div className="flex gap-6 max-w-[35rem] relative h-full transition-all ">
                {allImgs.map((img, currentIndex) => (
                  <RenderImages
                    image={img}
                    currentImg={currentImage}
                    currentIndex={currentIndex + 1}
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
            <div className={`flex-col flex md:h-[60%] max-w-[50rem] w-full`}>
              <div>
                <SingleItemDescription
                  description={product!.description}
                  price={+product!.price}
                  title={product!.title}
                  brand={product!.brand}
                />
                <SingleItemAddToCart
                  {...product}
                  customerId={userId}
                  setInformativeModalMessage={setInformativeModalMessage}
                  setInformativeModalType={setInformativeModalType}
                  setShowInformativeModal={setShowInformativeModal}
                  setInformativeModalLinkMessage={
                    setInformativeModalLinkMessage
                  }
                />
              </div>
              {mobile && (
                <>
                  <div className="mt-[1.5rem] flex items-center gap-[2rem] justify-between">
                    <div className="flex items-center gap-[2rem]">
                      <button
                        className={`w-[5rem] h-[5rem] pl-[.5rem] bg-transparent shadow-md transition-all text-center active:scale-[0.98]`}
                        onClick={() => {
                          if (showAdditionalInformation === "characteristics") {
                            setShowAdditionalInformation("");
                          } else {
                            setShowAdditionalInformation("characteristics");
                          }
                        }}
                      >
                        <img
                          src={characteristics}
                          alt="characteristics"
                          className="w-full "
                        />
                      </button>
                      <button
                        className={`w-[5rem] h-[5rem] pl-[.5rem] bg-transparent shadow-md transition-all text-center active:scale-[0.98]`}
                        onClick={() => {
                          if (showAdditionalInformation === "sellerProducts") {
                            setShowAdditionalInformation("");
                          } else {
                            setShowAdditionalInformation("sellerProducts");
                          }
                        }}
                      >
                        <img
                          src={owner}
                          alt="More products"
                          className="w-full "
                        />
                      </button>
                    </div>
                    <OverAllRating rating={overAllRating} />
                  </div>
                  <SingleItemCharacteristics
                    showAdditionalInformation={showAdditionalInformation}
                    productId={params.productId ? params.productId : ""}
                  />
                  <SellerProducts
                    category={product!.category}
                    subCategory={product!.subCategory}
                    productId={product!._id}
                    sellerId={seller._id}
                    showAdditionalInformation={showAdditionalInformation}
                  />
                </>
              )}
            </div>
          </div>

          {!mobile && (
            <>
              <div className="flex items-center justify-between gap-[2rem]">
                <div className="flex items-center gap-[2rem]">
                  <ButtonHoverPromptModal
                    contentName="Characteristics"
                    positionByAbscissa="left"
                    asideClasses="bottom-[-3.5rem]"
                    className={`w-[5rem] h-[5rem] pl-[.5rem] bg-transparent shadow-md transition-all text-center`}
                    variant={"rectangleWithShadow"}
                    onClick={() => {
                      if (showAdditionalInformation === "characteristics") {
                        setShowAdditionalInformation("");
                      } else {
                        setShowAdditionalInformation("characteristics");
                      }
                    }}
                  >
                    <img
                      src={characteristics}
                      alt="characteristics"
                      className="w-full "
                    />
                  </ButtonHoverPromptModal>
                  <ButtonHoverPromptModal
                    contentName={`More products from ${seller.username}`}
                    positionByAbscissa="left"
                    asideClasses="bottom-[-3.5rem]"
                    className={`w-[5rem] h-[5rem] pl-[.5rem] bg-transparent shadow-md transition-all text-center`}
                    variant={"rectangleWithShadow"}
                    onClick={() => {
                      if (showAdditionalInformation === "sellerProducts") {
                        setShowAdditionalInformation("");
                      } else {
                        setShowAdditionalInformation("sellerProducts");
                      }
                    }}
                  >
                    <img src={owner} alt="More products" className="w-full " />
                  </ButtonHoverPromptModal>
                </div>
                <OverAllRating rating={overAllRating} />
              </div>
              <SingleItemCharacteristics
                showAdditionalInformation={showAdditionalInformation}
                productId={params.productId ? params.productId : ""}
              />
              <SellerProducts
                category={product!.category}
                subCategory={product!.subCategory}
                productId={product!._id}
                sellerId={seller._id}
                showAdditionalInformation={showAdditionalInformation}
              />
            </>
          )}
        </div>
        <Comment
          setInformativeModalType={setInformativeModalType}
          setShowInformativeModal={setShowInformativeModal}
          setInformativeModalMessage={setInformativeModalMessage}
          productId={product!._id}
          userId={userId ?? ""}
        />
      </div>

      <LightBox isLightBox={isLightBox} setIsLightBox={setIsLightBox} />

      <ShowImagesOnLightBox
        imgs={allImgs}
        isLightBox={isLightBox}
        setIsLightBox={setIsLightBox}
      />

      <InformativeModal
        closeOnClick={true}
        duration={1500}
        appearsFrom="bottom"
        positionX="right-[1rem]"
        positionY="bottom-[1rem]"
        type={informativeModalType}
        message={informativeModalMessage}
        setShowInformativeModal={setShowInformativeModal}
        showInformativeModal={showInformativeModal}
        linkMessage={informativeModalLinkMessage}
        linkPath="/auth"
      />
    </>
  );
}
