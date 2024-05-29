import { Link } from "react-router-dom";
import { ProductTypes } from "../../../types/ProductTypes";
import FormatCurrency from "../../../utilities/FormatCurrency";
import plus from "../../../assets/images/shared/plus.png";
import minus from "../../../assets/images/shared/minus.png";

export default function DefaultProductItem({
  _id,
  amountOfRatings,
  amountOfReports,
  brand,
  category,
  description,
  frontImg,
  imgUrls,
  isActive,
  isAvailable,
  price,
  rating,
  subCategory,
  title,
  userId,
}: ProductTypes) {
  return (
    <div
      className={`w-full max-w-[50rem] bg-white h-full overflow-hidden p-[1rem] rounded-lg border-primary-pastel-blue border-[3px] border-dotted flex flex-col gap-[1rem] justify-between`}
    >
      <img
        src={frontImg}
        alt={title}
        className="w-full object-contain max-h-[25rem] h-fit"
      />
      <div className="flex flex-col gap-[.3rem] w-full">
        <Link
          to={`/shop/${_id}`}
          className="font-medium hover:opacity-80 transition-all w-full break-words"
        >
          <h5>{title}</h5>
        </Link>

        <h5 className="font-medium text-[1.5rem]">
          Price: {FormatCurrency(Number(price))}
        </h5>
      </div>
      <button className={`absolute hover:scale-[1.02] active:scale-[0.98]`}>
        <img className="w-[3rem]" src={plus} alt="Add" />
      </button>
    </div>
  );
}
