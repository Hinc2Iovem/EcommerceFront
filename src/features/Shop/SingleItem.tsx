import { Link } from "react-router-dom";
import FormatCurrency from "../../utilities/FormatCurrency";
import { ProductTypes } from "./Shop";
import useCart from "../../hooks/useCart";

export default function SingleItem({
  category,
  description,
  id,
  image,
  price,
  rating,
  title,
}: ProductTypes) {
  const { dispatch, REDUCER_ACTIONS } = useCart();

  return (
    <div className="flex flex-col gap-3 h-[50rem] bg-white p-3 rounded-xl justify-between ">
      <div className="h-[30rem]">
        <img src={image} alt={title} className="object-contain h-full w-full" />
      </div>
      <Link
        to={`${id}`}
        className="flex justify-between flex-col text-neutral-very-dark-blue hover:opacity-80"
      >
        <h3>{title}</h3>
        <h3 className="font-bold">Price - {FormatCurrency(price)}</h3>
      </Link>
      <button
        onClick={() =>
          dispatch({
            type: REDUCER_ACTIONS.ADD,
            payload: {
              id,
              img: image,
              description,
              price,
              qty: 1,
              rating: { rate: rating.rate, count: rating.count },
              title,
              category,
            },
          })
        }
        className="bg-primary-orange text-white shadow-primary-orange shadow-lg self-center py-[1rem] px-[2rem] rounded-xl hover:opacity-90 active:scale-[.97] transition-all"
      >
        Add To Cart
      </button>
    </div>
  );
}
