type RenderImagesProps = {
  image?: string;
  currentImg: number;
};

export default function RenderImages({ image, currentImg }: RenderImagesProps) {
  return (
    <>
      <img
        className={`${
          currentImg === 1 ? "opacity-100" : "opacity-0"
        } rounded-xl object-cover w-full shadow-md shadow-neutral-dark-grayish-blue p-3 transition-all cursor-pointer`}
        src={image}
      />
      <div
        className={`${
          currentImg === 2 ? "opacity-100" : "opacity-0"
        }  absolute bg-green-600 inset-0 transition-all cursor-pointer`}
      >
        Green
      </div>
      <div
        className={`${
          currentImg === 3 ? "opacity-100 " : "opacity-0"
        }  absolute bg-orange-600 inset-0 transition-all cursor-pointer`}
      >
        Orange
      </div>
      <div
        className={`${
          currentImg === 4 ? "opacity-100 " : "opacity-0"
        }  absolute bg-red-600 inset-0 transition-all cursor-pointer`}
      >
        Red
      </div>
    </>
  );
}
