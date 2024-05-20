import FormatCurrency from "../../../../utilities/FormatCurrency";

type SingleItemDescriptionTypes = {
  title: string;
  price: number;
  description: string;
  brand: string;
};

export default function SingleItemDescription({
  description,
  price,
  title,
  brand,
}: SingleItemDescriptionTypes) {
  return (
    <div
      className={`flex flex-col h-full md:gap-5 gap-7 w-full justify-between md:items-start md:text-start items-center text-center`}
    >
      <div className="flex flex-col w-full">
        <div>
          <h3 className="text-primary-orange font-bold uppercase text-[3rem]">
            {brand}
          </h3>
          <h2 className="text-[4rem] font-bold tracking-[-0.05em] leading-[5rem] break-words">
            {title}
            <span className="md:hidden block">{FormatCurrency(price)}</span>
          </h2>
        </div>
      </div>

      <p className="text-neutral-dark-grayish-blue break-all">{description}</p>
    </div>
  );
}
