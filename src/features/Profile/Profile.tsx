import { Gem, ListPlus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import { CATEGORIES_SELLER } from "../../const/CATEGORIES_SELLER";
import { CATEGORIES_WITHOUT_SUBCATEGORIES } from "../../const/PillsCategories";
import useGetUser from "../../hooks/Profile/useGetUser";
import ButtonHoverPromptModal from "../shared/ButtonAsideHoverPromtModal/ButtonHoverPromptModal";
import LightBox from "../shared/LightBox";
import SellingProductsListModal from "./ForSellers/SellingProductsListModal";
import ProfileFooter from "./ProfileFooter";
import ProfileProductsSide from "./ProfileProductsSide";
import ProfileUserSide from "./ProfileUserSide";

export default function Profile() {
  const [currentCategory, setCurrentCategory] = useState(
    CATEGORIES_WITHOUT_SUBCATEGORIES.All
  );
  const [isLightBox, setIsLightBox] = useState(false);
  const [showProdactsListModal, setShowProdactsListModal] = useState(false);
  const { roles, _id: userId, balance, username } = useGetUser();
  const [currentCategoryUser, setCurrentCategoryUser] = useState(
    CATEGORIES_SELLER.SELLING_PRODUCTS
  );

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
          <div className="flex items-center justify-between">
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
              {/* <ButtonHoverPromptModal
                className="bg-white m-0 shadow-md hover:bg-primary-orange font-medium text-[1.5rem]"
                variant="rectangleWithShadow"
                contentName="Products For Sale"
                positionByAbscissa="right"
                onClick={() => {
                  setShowProdactsListModal(true);
                  setIsLightBox(true);
                }}
              >
                <List />
              </ButtonHoverPromptModal> */}
            </div>
          </div>

          <div className="flex gap-[2rem] justify-between md:flex-row flex-col">
            <ProfileUserSide
              roles={roles}
              currentCategoryUser={currentCategoryUser}
              setCurrentCategoryUser={setCurrentCategoryUser}
              username={username}
              currentCategory={currentCategory}
              setCurrentCategory={setCurrentCategory}
              balance={balance}
            />
            <ProfileProductsSide
              userId={userId}
              currentCategoryUser={currentCategoryUser}
              currentCategory={currentCategory}
            />
          </div>
        </div>
        <ProfileFooter userId={userId} roles={roles} />
      </section>

      <LightBox
        isLightBox={isLightBox}
        setIsLightBox={setIsLightBox}
        multipleLightBoxesOnOnePage={true}
        showModal={setShowProdactsListModal}
      />

      <SellingProductsListModal
        isLightBox={isLightBox}
        showProdactsListModal={showProdactsListModal}
        userId={userId}
      />
    </>
  );
}
