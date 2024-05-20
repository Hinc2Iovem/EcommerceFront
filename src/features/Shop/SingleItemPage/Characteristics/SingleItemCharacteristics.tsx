import useGetAllMainTitlesCharacteristic from "../../../../hooks/Characteristic/useGetAllMainTitlesCharacteristic";
import RenderAllCharacteristics from "./RenderAllCharacteristics";

type SingleItemCharacteristicsTypes = {
  showCharacteristics: boolean;
  productId: string;
};

export default function SingleItemCharacteristics({
  showCharacteristics,
  productId,
}: SingleItemCharacteristicsTypes) {
  const mainTitles = useGetAllMainTitlesCharacteristic({
    productId,
  });
  console.log(mainTitles);

  return (
    <div
      className={`${
        showCharacteristics ? "hidden" : ""
      } flex flex-col sm:flex-row h-full gap-7 w-full text-start mt-[2rem] sm:justify-between`}
    >
      {mainTitles.map((mt) => (
        <RenderAllCharacteristics
          key={mt._id}
          mainTitle={mt.title}
          mainTitleId={mt._id}
        />
      ))}
    </div>
  );
}
