import { X } from "lucide-react";
import { Link } from "react-router-dom";
import FormatCurrency from "../../utilities/FormatCurrency";
import { CartItem, ReducerActTypes, ReducerActionTypes } from "./CartContext";

type CartItemProps = {
  item: CartItem;
  dispatch: React.Dispatch<ReducerActTypes>;
  REDUCER_ACTIONS: ReducerActionTypes;
};

export default function CartItemPage({
  item,
  REDUCER_ACTIONS,
  dispatch,
}: CartItemProps) {
  return (
    <div className="flex flex-col bg-white p-[1rem] rounded-lg shadow-sm gap-[.5rem] font-medium justify-between relative w-full h-full ">
      <img
        src={item.img}
        className="object-contain w-full h-[20rem]"
        alt={item.title}
      />
      <Link to={`/shop/${item.id}`}>
        <h3 className="text-ellipsis hover:text-primary-orange">
          {item.title}
        </h3>
      </Link>
      <div>
        <p>{FormatCurrency(item.price)}</p>
        <h3>Total Price: {FormatCurrency(item.price * item.qty)}</h3>
      </div>
      <button
        className="transition-all absolute hover:bg-white hover:shadow-sm hover:shadow-black hover:rounded-full p-[.5rem] hover:before:shadow-sm hover:before:bg-white hover:before:rounded-sm hover:before:shadow-black hover:before:content-['Remove'] hover:before:absolute hover:before:bottom-[-4rem] hover:before:left-[-1.5rem] hover:before:p-[.5rem] top-[.5rem] left-[.5rem]"
        onClick={() =>
          dispatch({
            type: REDUCER_ACTIONS.REMOVE,
            payload: { id: item.id } as CartItem,
          })
        }
      >
        <X />
      </button>
      <div className="absolute right-[10px] top-[9px] font-bold text-[1.4rem]">
        x{item.qty}
      </div>
    </div>
  );
}
