import { useState } from "react";
import Header from "../../components/Header/Header";
import { CATEGORIES } from "../../const/PillsCategories";
import InputLabelGoesDown from "./InputLabelGoesDown";
import { ImagePlus, Save } from "lucide-react";
import ButtonHoverPromptModal from "../shared/ButtonAsideHoverPromtModal/ButtonHoverPromptModal";

export default function ConfigureProducts() {
  const [currentCategory, setCurrentCategory] = useState(CATEGORIES.All);
  const [title, setTitle] = useState("");
  const [brandName, setBrandName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  console.log(price);
  console.log(title);

  return (
    <>
      <Header
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        showPillsOrNot={false}
      />
      <section className="flex flex-col gap-[1rem] p-[1rem] max-w-[146rem] m-auto relative items-center">
        <form
          className="bg-white max-w-[70rem] w-full rounded-md h-fit shadow-md shadow-black px-[1rem] py-[2rem] flex flex-col gap-[2rem] mt-[5rem] relative"
          id="addProduct"
        >
          <InputLabelGoesDown
            htmlFor="productTitle"
            id="productTitle"
            placeHolder="Product Title"
            setValue={setTitle}
            type="text"
            value={title}
          />

          <textarea
            className="w-full max-h-[50rem] overflow-y-auto outline-neutral-grayish-blue border-neutral-grayish-blue border-[2px] p-[1rem] rounded-md text-gray-600 font-medium focus:border-[3px]"
            name="ProductDescription"
            id="productDescription"
            rows={15}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Product Description"
          />
          <div className="flex gap-[.5rem] justify-center">
            {Object.values(CATEGORIES).map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => setCurrentCategory(c)}
                className={`${
                  c === currentCategory
                    ? "bg-green-400 hover:opacity-100 text-white"
                    : "bg-white hover:bg-green-300"
                } outline-white p-[1rem] shadow-sm shadow-neutral-grayish-blue hover:translate-x-1 active:scale-[.97] hover:opacity-90 flex font-medium items-center gap-[.4rem] transition-all rounded-lg hover:p-[1rem]  hover:text-white`}
              >
                {c}
              </button>
            ))}
          </div>

          <InputLabelGoesDown
            htmlFor="productBrandName"
            id="productBrandName"
            placeHolder="Brand Name"
            setValue={setBrandName}
            type="text"
            value={brandName}
          />

          <InputLabelGoesDown
            htmlFor="productPrice"
            id="productPrice"
            placeHolder="Price"
            setValue={setPrice}
            type="number"
            value={price}
          />

          <ButtonHoverPromptModal
            contentName="Upload Images"
            type="button"
            positionByAbscissa="right"
            className="p-[1rem] active:scale-[.97]"
            marginAutoSide="ml-auto"
          >
            <ImagePlus />
          </ButtonHoverPromptModal>
          <ButtonHoverPromptModal
            type="submit"
            id="addProduct"
            contentName="Submit Form"
            positionByAbscissa="right"
            position="absolute"
            className="p-[1rem] active:scale-[.97] bg-white hover:text-white hover:bg-primary-orange"
            positionForDiv="right-[0rem] top-[-5rem]"
            variant="rectangleWithShadow"
          >
            <Save />
          </ButtonHoverPromptModal>
        </form>
      </section>
    </>
  );
}
