import { useEffect, useState } from "react";
import creditCard from "../../assets/images/profile/creditCard.png";
import { addMoney } from "./profileQueries";

const CHECK_NUMBER = /^\d+$/;

type MoneyModelTypes = {
  userId: string;
  setMoneyModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdatedMoney: React.Dispatch<React.SetStateAction<number>>;
  moneyModal: boolean;
  secondModalRef: React.MutableRefObject<HTMLDivElement | null>;
};

export default function MoneyModel({
  userId,
  moneyModal,
  setMoneyModal,
  setUpdatedMoney,
  secondModalRef,
}: MoneyModelTypes) {
  const [money, setMoney] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (CHECK_NUMBER.test(money)) {
      let moneyToNumber = +money;
      if (moneyToNumber < 0) {
        moneyToNumber = moneyToNumber * -1;
      }
      addMoney({ userId, money: moneyToNumber }).then(() =>
        setUpdatedMoney((prev) => (prev += moneyToNumber))
      );
      setMoneyModal(false);
      return;
    } else {
      setError(true);
      return;
    }
  };

  useEffect(() => {
    if (error) {
      if (CHECK_NUMBER.test(money)) {
        setError(false);
      }
    }
  }, [error, money]);

  return (
    <aside
      ref={secondModalRef}
      className={`${
        moneyModal ? "" : "hidden"
      } absolute top-[5rem] right-0 z-[1] bg-neutral-magnolia w-[20rem] shadow-sm h-[6.5rem] rounded-md p-[1rem]`}
    >
      <div className="absolute w-full flex justify-between items-center bottom-[-.3rem]">
        {error ? (
          <p className="text-[1.4rem] text-red-400">Only numbers</p>
        ) : (
          ""
        )}
        <img src={creditCard} alt="" className="w-[3rem]" />
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <input
          className={`${
            error
              ? "border-red-500 border-[2px] border-dotted text-red-400"
              : ""
          } w-full outline-none text-gray-600 p-[.1rem]`}
          type="text"
          value={money}
          onChange={(e) => setMoney(e.target.value)}
        />
      </form>
    </aside>
  );
}
