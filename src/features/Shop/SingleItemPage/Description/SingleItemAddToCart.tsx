import { Minus, Plus, ShoppingCart } from "lucide-react";
import FormatCurrency from "../../../../utilities/FormatCurrency";
import { useState } from "react";
import useCart from "../../../../hooks/useCart";
import { CartItem } from "../../../Cart/CartContext";

type SingleItemAddToCartTypes = {
  price: number;
  productId: string;
  description: string;
  image: string;
  rating: number;
  title: string;
  category: string;
};

export default function SingleItemAddToCart({
  price,
  productId,
  description,
  image,
  rating,
  title,
  category,
}: SingleItemAddToCartTypes) {
  const { dispatch, REDUCER_ACTIONS, cart } = useCart();
  const currentItem = cart.find((item) => item.id === Number(productId));

  const [currentItemQty, setCurrentItemQty] = useState(currentItem?.qty || 0);

  const handleMinus = () => {
    setCurrentItemQty((prev) => {
      if (prev >= 1) {
        return prev - 1;
      } else {
        return prev;
      }
    });
    if (currentItem && currentItem.qty > 0) {
      dispatch({
        type: REDUCER_ACTIONS.MINUS,
        payload: { id: currentItem.id } as CartItem,
      });
    }
  };

  const handlePlus = () => {
    setCurrentItemQty((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    if (currentItemQty > 0) {
      dispatch({
        type: REDUCER_ACTIONS.ADD,
        payload: {
          id: Number(productId),
          description: description,
          img: image,
          price: price,
          rating: {
            rate: rating,
            count: 1,
          },
          title: title,
          qty: currentItemQty,
          category: category,
        },
      });
    }
  };
  return (
    <div className="flex flex-col w-full">
      <h3 className="md:block hidden text-[3rem] font-medium mb-5">
        {FormatCurrency(price)}
      </h3>
      <div className="flex items-center md:flex-row flex-col gap-3 md:gap-7 w-full">
        <div className="flex bg-neutral-magnolia justify-between items-center rounded-xl w-full md:w-[20rem] ">
          <button
            className="text-[2rem] p-[1rem] text-primary-orange outline-none border-none"
            onClick={handleMinus}
          >
            <Minus />
          </button>
          <div className="p-[1rem] font-medium">{currentItemQty}</div>
          <button
            className="p-[1rem] text-primary-orange outline-none border-none "
            onClick={handlePlus}
          >
            <Plus />
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-primary-orange flex justify-center w-full text-white shadow-primary-orange shadow-md self-center py-[1rem] px-[1rem] rounded-xl hover:opacity-90 active:scale-[.97] transition-all"
        >
          Add To Cart
          <ShoppingCart />
        </button>
      </div>
    </div>
  );
}
