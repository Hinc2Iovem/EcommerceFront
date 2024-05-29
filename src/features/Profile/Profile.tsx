import { Gem, ListPlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES_SELLER } from "../../const/CATEGORIES_SELLER";
import { CATEGORIES_WITHOUT_SUBCATEGORIES } from "../../const/PillsCategories";
import Header from "../../components/Header/Header";
import useGetUser from "../../hooks/Profile/useGetUser";
import ButtonHoverPromptModal from "../shared/ButtonAsideHoverPromtModal/ButtonHoverPromptModal";
import ProfileFooter from "./ProfileFooter";
import ProfileProductsSide from "./ProfileProductsSide";
import ProfileUserSide from "./ProfileUserSide";
import useOutOfModalTwoRefs from "../../hooks/useOutOfModalTwoRefs";
import MoneyModel from "./MoneyModel";
import dollar from "../../assets/images/profile/dollar.png";
import recommendation from "../../assets/images/profile/recommendation.png";
import defaultRecommendation from "../../assets/images/profile/defaultRecommendation.png";

export default function Profile() {
  const [currentCategory, setCurrentCategory] = useState(
    CATEGORIES_WITHOUT_SUBCATEGORIES.All
  );
  const userId: string = localStorage.getItem("userId") as string;
  const { roles, _id: id, balance, username } = useGetUser({ userId });
  const [currentCategoryUser, setCurrentCategoryUser] = useState(
    CATEGORIES_SELLER.SELLING_PRODUCTS
  );

  const [updatedMoney, setUpdatedMoney] = useState(balance ? balance : 0);
  const [moneyModal, setMoneyModal] = useState(false);
  useEffect(() => {
    if (balance) {
      setUpdatedMoney(balance);
    }
  }, [balance]);

  const secondModalRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useOutOfModalTwoRefs({
    modalRef,
    secondModalRef,
    setShowModal: setMoneyModal,
    showModal: moneyModal,
  });
  return (
    <>
      <section
        className={`h-full flex flex-col ${
          roles?.includes("Seller") ? "" : "justify-between"
        }  items-center`}
      >
        <Header
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
        />
        <div className="flex flex-col p-[2rem] pt-[1rem] max-w-[144rem] w-full">
          <div className="flex items-center justify-between relative">
            <div
              className={`${
                roles?.includes("Admin") || roles?.includes("Moderator")
                  ? "visible"
                  : "hidden"
              } mb-[3rem] flex gap-[.5rem]`}
            >
              <Link to="/permissions">
                <ButtonHoverPromptModal
                  className="bg-white m-0 shadow-md hover:bg-primary-orange font-medium text-[1.5rem]"
                  variant="rectangleWithShadow"
                  contentName="Give Permission For Becoming A Seller"
                  positionByAbscissa="left"
                >
                  <Gem />
                </ButtonHoverPromptModal>
              </Link>
            </div>

            <div
              className={`${
                roles?.includes("Seller") ? "visible" : "hidden"
              } mb-[1rem] flex gap-[.5rem] ml-auto`}
            >
              <Link to="/add/products">
                <ButtonHoverPromptModal
                  className="bg-white m-0 shadow-md hover:bg-primary-orange font-medium w-[4rem] h-[4rem] p-[.5rem]"
                  variant="rectangleWithShadow"
                  contentName="Add Product"
                  positionByAbscissa="right"
                >
                  <ListPlus className="w-full h-full" />
                </ButtonHoverPromptModal>
              </Link>
              <Link to="/defaultProducts">
                <ButtonHoverPromptModal
                  className="bg-white m-0 shadow-md w-[4rem] h-[4rem] p-[.5rem] active:scale-[0.96]"
                  variant="rectangleWithShadow"
                  contentName="Add Default Recommendations"
                  positionByAbscissa="right"
                >
                  <img
                    src={defaultRecommendation}
                    alt="defaultRecommendations"
                  />
                </ButtonHoverPromptModal>
              </Link>
              <Link to="/recommendedProducts">
                <ButtonHoverPromptModal
                  className="bg-white m-0 shadow-md w-[4rem] h-[4rem] p-[.5rem] active:scale-[0.96]"
                  variant="rectangleWithShadow"
                  contentName="Add Recommendations"
                  positionByAbscissa="right"
                >
                  <img src={recommendation} alt="Recommendations" />
                </ButtonHoverPromptModal>
              </Link>

              <div ref={modalRef}>
                <ButtonHoverPromptModal
                  className="bg-white m-0 shadow-md w-[4rem] h-[4rem] p-[.5rem] active:scale-[0.96]"
                  variant="rectangleWithShadow"
                  contentName="Add Money"
                  positionByAbscissa="right"
                  onClick={() => {
                    if (moneyModal) {
                      setMoneyModal(false);
                    } else {
                      setMoneyModal(true);
                    }
                  }}
                >
                  <img src={dollar} alt="Money" className="w-full h-full" />
                </ButtonHoverPromptModal>
              </div>
            </div>
            <MoneyModel
              userId={userId}
              setUpdatedMoney={setUpdatedMoney}
              setMoneyModal={setMoneyModal}
              moneyModal={moneyModal}
              secondModalRef={secondModalRef}
            />
          </div>

          <div className="flex gap-[2rem] justify-between md:flex-row flex-col">
            <ProfileUserSide
              roles={roles}
              currentCategoryUser={currentCategoryUser}
              setCurrentCategoryUser={setCurrentCategoryUser}
              username={username}
              currentCategory={currentCategory}
              setCurrentCategory={setCurrentCategory}
              balance={updatedMoney}
            />
            <ProfileProductsSide
              userId={id}
              currentCategoryUser={currentCategoryUser}
              currentCategory={currentCategory}
            />
          </div>
        </div>
        <ProfileFooter userId={id} roles={roles} />
      </section>
    </>
  );
}
