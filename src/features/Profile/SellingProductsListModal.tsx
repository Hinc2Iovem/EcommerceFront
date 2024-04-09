import { Beef } from "lucide-react";
import { Link } from "react-router-dom";

export default function SellingProductsListModal({
  isLightBox,
}: {
  isLightBox: boolean;
}) {
  return (
    <aside
      className={`${
        isLightBox
          ? "absolute z-[4] bg-neutral-magnolia w-[30rem] h-[50rem] top-[calc(50%-25rem)] left-[calc(50%-15rem)]"
          : "hidden"
      } transition-all rounded-md opacity-90 p-[1rem]`}
    >
      <ul className="flex flex-col gap-[1rem] h-full overflow-y-auto">
        <li className="border-primary-pastel-blue border-[3px] border-dotted flex gap-[1rem] items-center p-[.4rem] rounded-sm">
          <Link to="/products/:productId">
            <Beef className="cursor-pointer hover:scale-[1.1] w-[4rem] h-[4rem]" />
          </Link>
          <div className="text-neutral-cool-gray font-medium">
            <Link to="/products/:productId">
              <h5 className="hover:text-black">
                Product Title - <span>Price</span>
              </h5>
            </Link>
            <p className="text-[1.4rem]">Product text</p>
          </div>
        </li>
        <li className="border-primary-pastel-blue border-[3px] border-dotted flex gap-[1rem] items-center p-[.4rem] rounded-sm">
          <Link to="/products/:productId">
            <Beef className="cursor-pointer hover:scale-[1.1] w-[4rem] h-[4rem]" />
          </Link>
          <div className="text-neutral-cool-gray font-medium">
            <Link to="/products/:productId">
              <h5 className="hover:text-black">
                Product Title - <span>Price</span>
              </h5>
            </Link>
            <p className="text-[1.4rem]">Product text</p>
          </div>
        </li>
        <li className="border-primary-pastel-blue border-[3px] border-dotted flex gap-[1rem] items-center p-[.4rem] rounded-sm">
          <Link to="/products/:productId">
            <Beef className="cursor-pointer hover:scale-[1.1] w-[4rem] h-[4rem]" />
          </Link>
          <div className="text-neutral-cool-gray font-medium">
            <Link to="/products/:productId">
              <h5 className="hover:text-black">
                Product Title - <span>Price</span>
              </h5>
            </Link>
            <p className="text-[1.4rem]">Product text</p>
          </div>
        </li>
        <li className="border-primary-pastel-blue border-[3px] border-dotted flex gap-[1rem] items-center p-[.4rem] rounded-sm">
          <Link to="/products/:productId">
            <Beef className="cursor-pointer hover:scale-[1.1] w-[4rem] h-[4rem]" />
          </Link>
          <div className="text-neutral-cool-gray font-medium">
            <Link to="/products/:productId">
              <h5 className="hover:text-black">
                Product Title - <span>Price</span>
              </h5>
            </Link>
            <p className="text-[1.4rem]">Product text</p>
          </div>
        </li>
        <li className="border-primary-pastel-blue border-[3px] border-dotted flex gap-[1rem] items-center p-[.4rem] rounded-sm">
          <Link to="/products/:productId">
            <Beef className="cursor-pointer hover:scale-[1.1] w-[4rem] h-[4rem]" />
          </Link>
          <div className="text-neutral-cool-gray font-medium">
            <Link to="/products/:productId">
              <h5 className="hover:text-black">
                Product Title - <span>Price</span>
              </h5>
            </Link>
            <p className="text-[1.4rem]">Product text</p>
          </div>
        </li>
        <li className="border-primary-pastel-blue border-[3px] border-dotted flex gap-[1rem] items-center p-[.4rem] rounded-sm">
          <Link to="/products/:productId">
            <Beef className="cursor-pointer hover:scale-[1.1] w-[4rem] h-[4rem]" />
          </Link>
          <div className="text-neutral-cool-gray font-medium">
            <Link to="/products/:productId">
              <h5 className="hover:text-black">
                Product Title - <span>Price</span>
              </h5>
            </Link>
            <p className="text-[1.4rem]">Product text</p>
          </div>
        </li>
        <li className="border-primary-pastel-blue border-[3px] border-dotted flex gap-[1rem] items-center p-[.4rem] rounded-sm">
          <Link to="/products/:productId">
            <Beef className="cursor-pointer hover:scale-[1.1] w-[4rem] h-[4rem]" />
          </Link>
          <div className="text-neutral-cool-gray font-medium">
            <Link to="/products/:productId">
              <h5 className="hover:text-black">
                Product Title - <span>Price</span>
              </h5>
            </Link>
            <p className="text-[1.4rem]">Product text</p>
          </div>
        </li>
        <li className="border-primary-pastel-blue border-[3px] border-dotted flex gap-[1rem] items-center p-[.4rem] rounded-sm">
          <Link to="/products/:productId">
            <Beef className="cursor-pointer hover:scale-[1.1] w-[4rem] h-[4rem]" />
          </Link>
          <div className="text-neutral-cool-gray font-medium">
            <Link to="/products/:productId">
              <h5 className="hover:text-black">
                Product Title - <span>Price</span>
              </h5>
            </Link>
            <p className="text-[1.4rem]">Product text</p>
          </div>
        </li>
        <li className="border-primary-pastel-blue border-[3px] border-dotted flex gap-[1rem] items-center p-[.4rem] rounded-sm">
          <Link to="/products/:productId">
            <Beef className="cursor-pointer hover:scale-[1.1] w-[4rem] h-[4rem]" />
          </Link>
          <div className="text-neutral-cool-gray font-medium">
            <Link to="/products/:productId">
              <h5 className="hover:text-black">
                Product Title - <span>Price</span>
              </h5>
            </Link>
            <p className="text-[1.4rem]">Product text</p>
          </div>
        </li>
      </ul>
    </aside>
  );
}
