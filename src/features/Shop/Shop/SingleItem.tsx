import { Link } from "react-router-dom";
import { ProductTypes } from "../../../types/ProductTypes";
import FormatCurrency from "../../../utilities/FormatCurrency";
import heart from "../../../assets/images/Shop/heart.png";
import ButtonHoverPromptModal from "../../shared/ButtonAsideHoverPromtModal/ButtonHoverPromptModal";
import { ShoppingCart } from "lucide-react";
import DisplayRating from "./DisplayRating";
import { addToCart, addToFavourite } from "./shopQueries";

export default function SingleItem({
  category,
  description,
  _id,
  frontImg,
  price,
  rating,
  title,
}: ProductTypes) {
  const userId: string = localStorage.getItem("userId") as string;
  const handleAddingToFavourite = () => {
    addToFavourite({ userId, productId: _id });
  };
  const handleAddingToCart = () => {
    addToCart({ userId, productId: _id, quantity: 1 });
  };
  return (
    <div className="flex flex-col gap-3 h-[50rem] bg-white p-3 rounded-xl justify-between relative">
      <DisplayRating rating={rating} />
      <div className="h-[30rem]">
        <img
          src={frontImg}
          alt={title}
          className="object-contain h-full w-full"
        />
      </div>
      <Link
        to={`${_id}`}
        className="flex justify-between flex-col text-neutral-very-dark-blue hover:opacity-80"
      >
        <h3 className="break-all text-[2rem]">
          {title.length > 20 ? title.substring(0, 20) + "..." : title}
        </h3>
        <p className="text-gray-700 break-all text-[1.5rem]">
          {description.length > 50
            ? description.substring(0, 50) + "..."
            : description}
        </p>
      </Link>
      <h3 className="text-gray-700">Price - {FormatCurrency(+price)}</h3>
      <div className="w-full flex justify-center items-center gap-[2.5rem] mb-[.5rem]">
        <ButtonHoverPromptModal
          contentName="Favourite"
          positionByAbscissa="left"
          variant={"rectangleWithShadow"}
          asideClasses="bottom-[-3.2rem]"
          onClick={handleAddingToFavourite}
          className="w-[6rem] h-[4rem] mt-[.9rem] bg-white shadow-md active:scale-[0.98] hover:scale-[1.02]"
        >
          <img
            alt="Favourite"
            className="w-full h-full object-contain"
            src={heart}
          />
        </ButtonHoverPromptModal>
        <button
          onClick={handleAddingToCart}
          className="bg-primary-orange flex justify-center w-full text-white shadow-primary-orange shadow-md self-center py-[1rem] px-[2rem] rounded-xl hover:opacity-90 active:scale-[.97] transition-all"
        >
          Add To Cart
          <ShoppingCart />
        </button>
      </div>
    </div>
  );
}
