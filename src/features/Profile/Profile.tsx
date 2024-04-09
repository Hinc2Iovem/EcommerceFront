import { List, ListPlus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import { CATEGORIES } from "../../const/PillsCategories";
import ButtonHoverPromptModal from "../shared/ButtonAsideHoverPromtModal/ButtonHoverPromptModal";
import LightBox from "../shared/LightBox";
import ProfileProductsSide from "./ProfileProductsSide";
import ProfileUserSide from "./ProfileUserSide";
import SellingProductsListModal from "./ForSellers/SellingProductsListModal";
import ProfileFooter from "./ProfileFooter";
import { Gem } from "lucide-react";

export default function Profile() {
  const [role, setRole] = useState("Admin");
  const [currentCategory, setCurrentCategory] = useState(CATEGORIES.All);
  const [isLightBox, setIsLightBox] = useState(false);
  const [showProdactsListModal, setShowProdactsListModal] = useState(false);
  useState(false);
  return (
    <>
      <section
        className={`h-full flex flex-col ${
          role !== "seller" ? "justify-between" : ""
        }  items-center`}
      >
        <Header
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
        />
        <div className="flex flex-col p-[2rem] max-w-[144rem] w-full">
          <div className="flex items-center justify-between">
            <div
              className={`${
                role === "Admin" || role === "Moderator" ? "visible" : "hidden"
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
                role === "seller" ? "visible" : "hidden"
              } mb-[3rem] flex gap-[.5rem] ml-auto`}
            >
              <Link to="/add/products">
                <ButtonHoverPromptModal
                  className="bg-white m-0 shadow-md hover:bg-primary-orange font-medium text-[1.5rem]"
                  variant="rectangleWithShadow"
                  contentName="Add Product"
                  positionByAbscissa="right"
                >
                  <ListPlus />
                </ButtonHoverPromptModal>
              </Link>
              <ButtonHoverPromptModal
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
              </ButtonHoverPromptModal>
            </div>
          </div>

          <div className="flex gap-[2rem] justify-between md:flex-row flex-col">
            <ProfileUserSide
              role={role}
              currentCategory={currentCategory}
              setCurrentCategory={setCurrentCategory}
            />
            <ProfileProductsSide role={role} />
          </div>
        </div>
        <ProfileFooter setRole={setRole} role={role} />
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
      />
    </>
  );
}
