import { User2 } from "lucide-react";
import Admin from "../../assets/images/profile/admin.png";
import Customer from "../../assets/images/profile/customer.png";
import dollar from "../../assets/images/profile/dollar.png";
import Seller from "../../assets/images/profile/seller.png";
import { CATEGORIES_SELLER } from "../../const/CATEGORIES_SELLER";
import { CATEGORIES_WITHOUT_SUBCATEGORIES } from "../../const/PillsCategories";
import FormatCurrency from "../../utilities/FormatCurrency";
import ButtonHoverPromptModal from "../shared/ButtonAsideHoverPromtModal/ButtonHoverPromptModal";

type ProfileUserSideTypes = {
  currentCategory: string;
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
  roles: string[];
  username: string;
  setCurrentCategoryUser: React.Dispatch<React.SetStateAction<string>>;
  currentCategoryUser: string;
  balance: number;
};

export default function ProfileUserSide({
  currentCategory,
  setCurrentCategory,
  roles,
  username,
  currentCategoryUser,
  setCurrentCategoryUser,
  balance,
}: ProfileUserSideTypes) {
  return (
    <div className="gap-[3rem] flex-col flex flex-shrink-0">
      <div className="flex md:flex-col items-center gap-[2rem]">
        <div className="flex flex-col shrink-0 gap-[1rem] md:m-0 items-center m-auto w-full">
          <div className="bg-white p-[1rem] rounded-lg border-primary-pastel-blue border-[3px] border-dotted flex flex-col items-center w-full">
            <User2 className="w-[15rem] h-[20rem] text-black" />
            <h5 className="font-medium">{username}</h5>
            <div className="font-medium flex items-center gap-[.5rem]">
              <h3>Status: </h3>
              <div className="flex gap-[.5rem]">
                {roles?.map((r) => (
                  <ButtonHoverPromptModal
                    type="button"
                    contentName={r}
                    key={r}
                    positionByAbscissa="left"
                    variant={"iconWithShadow"}
                    className="w-[4.5rem] h-[4.5rem] p-[.6rem] active:scale-[0.98]"
                  >
                    {r === "Admin" && (
                      <img
                        src={Admin}
                        alt={r}
                        className="w-full h-full"
                        draggable="false"
                      />
                    )}
                    {r === "Seller" && (
                      <img
                        src={Seller}
                        alt={r}
                        className="w-full h-full"
                        draggable="false"
                      />
                    )}
                    {r === "Customer" && (
                      <img
                        src={Customer}
                        alt={r}
                        className="w-full h-full"
                        draggable="false"
                      />
                    )}
                  </ButtonHoverPromptModal>
                ))}{" "}
              </div>
            </div>
          </div>
          <div className="bg-white w-full overflow-y-auto h-full max-h-[40rem] flex flex-col gap-[1rem] shadow-sm p-[1.5rem] rounded-lg border-primary-pastel-blue border-[3px] border-dotted">
            <h4 className="font-medium md:self-start self-center flex items-center gap-[.3rem]">
              <img src={dollar} alt="$" className="w-[3rem] h-[3rem]" />
              {FormatCurrency(balance)}
            </h4>
          </div>
          <div
            className={` ${
              roles?.includes("Seller") ? "block" : "hidden"
            } bg-white flex flex-col w-full gap-[1rem] shadow-sm p-[1.5rem] rounded-lg border-primary-pastel-blue border-[3px] border-dotted`}
          >
            {Object.values(CATEGORIES_SELLER).map((c) => (
              <div key={c} className="flex items-center gap-[1rem] w-full">
                <button
                  className={`${
                    c === currentCategoryUser
                      ? " bg-green-400 hover:opacity-100 text-white p-[1rem]"
                      : ""
                  } w-full hover:opacity-90 hover:bg-green-400 flex font-medium items-center gap-[.4rem] transition-all rounded-lg hover:p-[1rem]  hover:text-white outline-white`}
                  onClick={() => setCurrentCategoryUser(c)}
                >
                  {c}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white w-full overflow-y-auto h-full max-h-[40rem] hidden md:flex flex-col gap-[1rem] shadow-sm p-[1.5rem] rounded-lg border-primary-pastel-blue border-[3px] border-dotted">
          {Object.entries(CATEGORIES_WITHOUT_SUBCATEGORIES).map(
            ([key, value]) => (
              <button
                key={key}
                onClick={() => setCurrentCategory(value)}
                className={`${
                  value === currentCategory
                    ? "bg-primary-orange text-white p-[1rem]"
                    : ""
                } outline-white hover:opacity-90 flex font-medium items-center gap-[.4rem] transition-all rounded-lg hover:p-[1rem] hover:bg-primary-orange hover:text-white`}
              >
                {key}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
