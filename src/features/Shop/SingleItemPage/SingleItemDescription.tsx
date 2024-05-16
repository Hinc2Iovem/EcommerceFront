import FormatCurrency from "../../../utilities/FormatCurrency";

type SingleItemDescriptionTypes = {
  showDescription: boolean;
  category: string;
  title: string;
  price: number;
  description: string;
};

export default function SingleItemDescription({
  showDescription,
  category,
  description,
  price,
  title,
}: SingleItemDescriptionTypes) {
  return (
    <div
      className={`${
        showDescription ? "" : "hidden"
      } flex flex-col h-full md:gap-5 gap-7 w-full justify-between md:items-start md:text-start items-center text-center`}
    >
      <div className="flex flex-col">
        <div>
          <h3 className="text-primary-orange font-bold uppercase text-[3rem]">
            {category}
          </h3>
          <h2 className="text-[4rem] font-bold tracking-[-0.05em] leading-[5rem]">
            {title}
            <span className="md:hidden"> - {FormatCurrency(price)}</span>
          </h2>
        </div>
      </div>

      <p className="text-neutral-dark-grayish-blue">{description}</p>
    </div>
  );
}
