import { ShoppingCart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import heart from "../../../assets/images/Shop/heart.png";
import hollowHeart from "../../../assets/images/Shop/hollowHeart.png";
import useGetDecodedJWTValues from "../../../hooks/Auth/useGetDecodedJWTValues";
import useGetFavouriteByProductIdUserId from "../../../hooks/Favourite/useGetFavouriteByProductIdUserId";
import { ProductTypes } from "../../../types/ProductTypes";
import FormatCurrency from "../../../utilities/FormatCurrency";
import ButtonHoverPromptModal from "../../shared/ButtonAsideHoverPromtModal/ButtonHoverPromptModal";
import DisplayRating from "./DisplayRating";
import { addToCart, addToFavourite, deleteFromFavourite } from "./shopQueries";

type SingleItemTypes = {
  setProductAddedToCart: React.Dispatch<React.SetStateAction<boolean>>;
  setShowInformativeModal: React.Dispatch<React.SetStateAction<boolean>>;
} & ProductTypes;

export default function SingleItem({
  description,
  _id,
  frontImg,
  price,
  rating,
  title,
  imgUrls,
  setShowInformativeModal,
  setProductAddedToCart,
}: SingleItemTypes) {
  const { userId } = useGetDecodedJWTValues();
  const isFavourite = useGetFavouriteByProductIdUserId({
    productId: _id,
    userId: userId ?? undefined,
  });

  const [showAllImgs, setShowAllImgs] = useState(false);
  const [showCurrentImgNumber, setShowCurrentImgNumber] = useState(1);
  const [showCurrentImg, setShowCurrentImg] = useState(frontImg);

  const allImgs = useMemo(() => {
    return [frontImg, ...imgUrls];
  }, [frontImg, imgUrls]);

  useEffect(() => {
    setShowCurrentImg(() => {
      if (allImgs[showCurrentImgNumber]) {
        return allImgs[showCurrentImgNumber];
      } else {
        return allImgs[0];
      }
    });
  }, [allImgs, showCurrentImgNumber]);

  const [currentlyFavourite, setCurrentlyFavourite] = useState(
    isFavourite ? isFavourite : false
  );

  useEffect(() => {
    if (isFavourite) {
      setCurrentlyFavourite(isFavourite);
    }
  }, [isFavourite]);

  const handleAddingToFavourite = () => {
    if (userId) {
      addToFavourite({ userId, productId: _id });
    } else {
      setShowInformativeModal((prev) => !prev);
    }
  };

  const handleRemovingFromFavourite = () => {
    if (userId) {
      deleteFromFavourite({ userId, productId: _id });
    }
  };

  const handleAddingToCart = () => {
    if (userId) {
      addToCart({ userId, productId: _id, quantity: 1 }).then(() =>
        setProductAddedToCart((prev) => !prev)
      );
    } else {
      setShowInformativeModal((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col shadow-sm gap-3 bg-white p-3 rounded-xl justify-between relative h-[60rem] ">
      <DisplayRating rating={rating} />
      <div
        onMouseOver={() => setShowAllImgs(true)}
        onMouseOut={() => setShowAllImgs(false)}
        className="h-[23rem] mt-[2rem] w-full relative"
      >
        <img
          src={showAllImgs ? showCurrentImg : frontImg}
          alt={title}
          className="object-contain h-[23rem] w-full"
        />
        <div
          onMouseLeave={() => setShowCurrentImgNumber(0)}
          className={`${
            showAllImgs ? "flex" : "hidden"
          } absolute  top-0 bottom-0 w-full gap-[.2rem]`}
        >
          <div
            onMouseOver={() => setShowCurrentImgNumber(0)}
            className={`${
              showCurrentImgNumber === 0
                ? "border-green-300"
                : "border-gray-700"
            } w-[25%] border-b-[2px] rounded-sm transition-all`}
          ></div>
          <div
            onMouseOver={() => setShowCurrentImgNumber(1)}
            className={`${
              showCurrentImgNumber === 1
                ? "border-green-300"
                : "border-gray-700"
            } w-[25%] border-b-[2px] rounded-sm transition-all`}
          ></div>
          <div
            onMouseOver={() => setShowCurrentImgNumber(2)}
            className={`${
              showCurrentImgNumber === 2
                ? "border-green-300"
                : "border-gray-700"
            } w-[25%] border-b-[2px] rounded-sm transition-all`}
          ></div>
          <div
            onMouseOver={() => setShowCurrentImgNumber(3)}
            className={`${
              showCurrentImgNumber === 3
                ? "border-green-300"
                : "border-gray-700"
            } w-[25%] border-b-[2px] rounded-sm transition-all`}
          ></div>
        </div>
      </div>
      <Link
        to={`${_id}`}
        className="flex justify-between flex-col text-neutral-very-dark-blue hover:opacity-80"
      >
        <h3 className="break-all text-[2rem]">
          {title.length > 20 ? title.substring(0, 20) + "..." : title}
        </h3>
        <p className="text-gray-700 break-all text-[1.5rem]">
          {description.length > 200
            ? description.substring(0, 200) + "..."
            : description}
        </p>
      </Link>
      <h3 className="text-gray-700">Price - {FormatCurrency(+price)}</h3>

      <div className="w-full flex justify-center items-center gap-[.5rem]">
        <ButtonHoverPromptModal
          contentName={`${isFavourite ? "Remove Favourite" : "Add Favourite"}`}
          positionByAbscissa="left"
          variant={"rectangleWithShadow"}
          asideClasses="bottom-[-3.2rem]"
          onClick={() => {
            if (currentlyFavourite) {
              handleRemovingFromFavourite();
            } else {
              handleAddingToFavourite();
            }
            if (userId) {
              setCurrentlyFavourite((prev) => !prev);
            }
          }}
          className={`mt-[.9rem] bg-white shadow-md active:scale-[0.98] hover:scale-[1.02]`}
        >
          <img
            alt="Favourite"
            className={`${
              currentlyFavourite ? "w-[7rem] h-[4rem]" : "w-[7rem] h-[4rem]"
            }  object-contain p-[.2rem]`}
            src={currentlyFavourite ? heart : hollowHeart}
          />
        </ButtonHoverPromptModal>
        <button
          onClick={handleAddingToCart}
          className="bg-primary-orange flex justify-center w-full text-white shadow-primary-orange shadow-md self-center py-[.7rem] px-[1rem] rounded-xl hover:opacity-90 active:scale-[.97] transition-all"
        >
          Add To Cart
          <ShoppingCart />
        </button>
      </div>
    </div>
  );
}
