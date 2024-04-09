import { ArrowLeftIcon, ArrowRightIcon, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import img1 from "../../../assets/images/testingSingleItemPage/pexels-avonne-stalling-3916420.jpg";
import img2 from "../../../assets/images/testingSingleItemPage/pexels-josh-hild-17685567.jpg";
import img3 from "../../../assets/images/testingSingleItemPage/pexels-paige-thompson-19841521.jpg";
import img4 from "../../../assets/images/testingSingleItemPage/pexels-tetyana-kovyrina-13398438.jpg";
import Header from "../../../components/Header/Header";
import { MATCHMEDIA } from "../../../const/MatchMedia";
import useCart from "../../../hooks/useCart";
import useMatchMedia from "../../../hooks/useMatchMedia";
import FormatCurrency from "../../../utilities/FormatCurrency";
import { CartItem } from "../../Cart/CartContext";
import RenderImages from "./RenderImages";
import RenderImagesLarge from "./RenderImagesLarge";
import ShowImagesOnLightBox from "./ShowImagesOnLightBox";
import useGetProductById from "./useGetProductById";
import LightBox from "../../shared/LightBox";

const imgs = Array.from([img1, img2, img3, img4]);

export default function SingleItemPage() {
  const { productId } = useParams();
  const product = useGetProductById(Number(productId));
  const [currentImage, setCurrentImage] = useState(1);

  const [isLightBox, setIsLightBox] = useState(false);
  const mobile = useMatchMedia(MATCHMEDIA.Mobile);
  const { dispatch, REDUCER_ACTIONS, cart } = useCart();
  const currentItem = cart.find((item) => item.id === Number(productId));
  const [currentItemQty, setCurrentItemQty] = useState(currentItem?.qty || 0);

  if (!product) {
    return <h2>Loading...</h2>;
  }

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
          description: product.description,
          img: product.image,
          price: product.price,
          rating: product.rating,
          title: product.title,
          qty: currentItemQty,
          category: product.category,
        },
      });
    }
  };

  return (
    <>
      <Header showPillsOrNot={false} />
      <div className={"bg-neutral-magnolia p-[1rem]"}>
        <div className="bg-white h-fit flex md:flex-row flex-col md:gap-[4rem] gap-3 justify-between rounded-lg items-center max-w-[1110px] mx-auto my-[2rem] p-[3rem] ">
          {!mobile ? (
            <div className="md:grid grid-cols-4 gap-6 hidden max-w-[35rem]">
              <img
                className={`col-[1/5] rounded-xl h-full object-cover w-full shadow-md shadow-neutral-dark-grayish-blue hover:scale-[1.01] cursor-pointer transition-all`}
                src={imgs[0]}
                alt={product.title}
                onClick={() => setIsLightBox(true)}
              />
              {imgs.map((img) => (
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
          <div className="flex flex-col md:h-[60%] md:gap-5s gap-7 max-w-[50rem] justify-between md:items-start md:text-start items-center text-center">
            <div className="flex flex-col">
              <div>
                <h3 className="text-primary-orange font-bold uppercase text-[3rem]">
                  {product.category}
                </h3>
                <h2 className="text-[4rem] font-bold tracking-[-0.05em] leading-[5rem]">
                  {product.title}
                  <span className="md:hidden">
                    {" "}
                    - {FormatCurrency(product.price)}
                  </span>
                </h2>
              </div>
            </div>

            <p className="text-neutral-dark-grayish-blue">
              {product.description}
            </p>
            <div className="flex flex-col w-full">
              <h3 className="md:block hidden text-[3rem] font-medium mb-5">
                {FormatCurrency(product.price)}
              </h3>
              <div className="flex items-center md:flex-row flex-col gap-3 md:gap-7 w-full">
                <div className="flex bg-neutral-magnolia w-full md:w-[40%] justify-between items-center rounded-xl ">
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
                  className="bg-primary-orange text-white shadow-primary-orange shadow-lg py-[1rem] w-full md:w-[60%] rounded-xl hover:opacity-90"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LightBox isLightBox={isLightBox} setIsLightBox={setIsLightBox} />

      <ShowImagesOnLightBox
        imgs={imgs}
        isLightBox={isLightBox}
        setIsLightBox={setIsLightBox}
      />
    </>
  );
}
