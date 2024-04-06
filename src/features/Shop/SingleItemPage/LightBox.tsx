import { useEffect, useRef } from "react";
import { ArrowLeftIcon, ArrowRightIcon, LucideXCircle } from "lucide-react";
import RenderImagesLargeLightbox from "./RenderImagesLargeLightbox";

type LightBoxProps = {
  isLightBox: boolean;
  setCurrentImageLarge: React.Dispatch<React.SetStateAction<number>>;
  currentImageLarge: number;
  setIsLightBox: React.Dispatch<React.SetStateAction<boolean>>;
  imgs: string[];
};

export default function LightBox({
  isLightBox,
  setCurrentImageLarge,
  currentImageLarge,
  setIsLightBox,
  imgs,
}: LightBoxProps) {
  const lightBoxImagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleExitClick = (e: MouseEvent) => {
      if (isLightBox && e.target === lightBoxImagesRef.current) {
        setIsLightBox(false);
      }
    };

    const handleExitKey = (e: KeyboardEvent) => {
      if (isLightBox && e.key == "Escape") {
        setIsLightBox(false);
      }
    };

    document.addEventListener("click", handleExitClick);
    document.addEventListener("keydown", handleExitKey);

    return () => {
      document.removeEventListener("click", handleExitClick);
      document.removeEventListener("keydown", handleExitKey);
    };
  }, [isLightBox, setIsLightBox]);

  return (
    <>
      <div
        ref={lightBoxImagesRef}
        className={` ${isLightBox ? "md:opacity-90 fixed inset-0" : "opacity-0"}
        bg-black
        z-[3]
        transition-opacity
        `}
      ></div>
      <div
        className={`${
          isLightBox
            ? "fixed z-[4] top-[calc(50%-309px)] left-[calc(50%-175px)]"
            : "hidden"
        } `}
      >
        <div className="flex-col gap-6 max-w-[35rem] hidden md:flex relative h-full">
          <img src={imgs[currentImageLarge]} className="h-[52.5rem]" />
          <div className="md:flex gap-6 hidden w-full ">
            {imgs.map((img, index) => (
              <RenderImagesLargeLightbox
                img={img}
                key={img}
                index={index}
                currentImg={currentImageLarge}
                changeImg={setCurrentImageLarge}
              />
            ))}
          </div>
          <button
            onClick={() => setIsLightBox(false)}
            className=" h-[3rem] w-[3rem] flex items-center justify-center absolute text-white top-[-3rem] right-[-.5rem] hover:text-primary-orange"
          >
            <LucideXCircle />
          </button>
          <button
            className="absolute outline-none top-[calc(41%-1.2rem)] left-[1rem] flex items-center justify-center w-[4rem] h-[4rem] bg-white rounded-full"
            onClick={() =>
              setCurrentImageLarge((prev) => {
                if (prev >= 1) {
                  return prev - 1;
                } else {
                  // product.images.length
                  return 3;
                }
              })
            }
          >
            <ArrowLeftIcon />
          </button>
          <button
            className="absolute outline-none top-[calc(41%-1.2rem)] flex items-center justify-center right-[1rem] w-[4rem] h-[4rem] bg-primary-orange text-white rounded-full"
            onClick={() =>
              setCurrentImageLarge((prev) => {
                // product.images.length
                if (prev >= 3) {
                  return 0;
                } else {
                  return prev + 1;
                }
              })
            }
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </>
  );
}
