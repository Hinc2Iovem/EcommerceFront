import { useEffect, useMemo, useState } from "react";
import { ProductTypes } from "../../types/ProductTypes";
import SearchBar from "../shared/SearchBar";
import {
  getBoughtProductsByUserId,
  getProductsByUserId,
  getSoldProductsByUserId,
} from "./profileQueries";
import useDebounce from "../../hooks/useDebounce";
import FormatCurrency from "../../utilities/FormatCurrency";
import { Link } from "react-router-dom";

type ProfileProductsSideTypes = {
  userId: string;
  currentCategoryUser: string;
  currentCategory: string;
};

export default function ProfileProductsSide({
  userId,
  currentCategoryUser,
  currentCategory,
}: ProfileProductsSideTypes) {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce({ value, delay: 500 });

  const [sellingProducts, setSellingProducts] = useState<ProductTypes[] | []>(
    []
  );
  const [boughtProducts, setBoughtProducts] = useState<ProductTypes[] | []>([]);
  const [soldProducts, setSoldProducts] = useState<ProductTypes[] | []>([]);

  useEffect(() => {
    getProductsByUserId({ userId }).then((r) => {
      if (r) {
        setSellingProducts(r);
      }
    });
    getBoughtProductsByUserId({ userId }).then((r) => {
      if (r) {
        setBoughtProducts(r);
      }
    });
    getSoldProductsByUserId({ userId }).then((r) => {
      if (r) {
        setSoldProducts(r);
      }
    });
  }, [userId]);

  const productsToDisplay: ProductTypes[] = useMemo(() => {
    let filtered: ProductTypes[] = [];

    if (currentCategoryUser === "Selling Products") {
      filtered = sellingProducts;
    } else if (currentCategoryUser === "Bought Products") {
      filtered = boughtProducts;
    } else if (currentCategoryUser === "Sold Products") {
      filtered = soldProducts;
    }

    if (currentCategory !== "All") {
      filtered = filtered.filter((p) =>
        p.category.toLowerCase().includes(currentCategory.toLowerCase())
      );
    }
    if (debouncedValue) {
      filtered = filtered.filter(
        (p) =>
          p.title
            .trim()
            .toLowerCase()
            .includes(debouncedValue.trim().toLowerCase()) ||
          p.description
            .trim()
            .toLowerCase()
            .includes(debouncedValue.trim().toLowerCase())
      );
    }
    return filtered;
  }, [
    sellingProducts,
    boughtProducts,
    soldProducts,
    currentCategoryUser,
    currentCategory,
    debouncedValue,
  ]);

  return (
    <div className="flex-grow">
      <SearchBar setValue={setValue} />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] grid-rows-[repeat(auto-fit,minmax(30rem,1fr))] p-3 gap-3 justify-items-center items-center">
        {productsToDisplay.map((p) => (
          <ProfileProductItem key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}

type ProfileProductItemTypes = {
  product: ProductTypes;
};

function ProfileProductItem({ product }: ProfileProductItemTypes) {
  return (
    <div className="bg-white w-full h-full overflow-hidden p-[1rem] rounded-lg border-primary-pastel-blue border-[3px] border-dotted flex flex-col gap-[1rem] justify-between">
      <img
        src={product.frontImg}
        alt={product.title}
        className="w-full object-contain h-[25rem]"
      />
      <div className="flex flex-col gap-[.3rem] w-full">
        <Link
          to={`/shop/${product._id}`}
          className="font-medium hover:opacity-80 transition-all w-full break-words"
        >
          <h5>{product.title}</h5>
        </Link>

        <p className=" text-gray-700 break-words">
          {product.description.length > 200
            ? product.description.substring(0, 200) + "..."
            : product.description}
        </p>
        <h5 className="font-medium text-[1.5rem]">
          Price: {FormatCurrency(Number(product.price))}
        </h5>
      </div>
    </div>
  );
}
