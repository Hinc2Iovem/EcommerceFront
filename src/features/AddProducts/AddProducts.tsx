import { ImagePlus, Save } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosPublic } from "../../api/axios";
import Header from "../../components/Header/Header";
import { isNonEmptyMatrix } from "../../utilities/IsNonEmptyMatrix";
import ButtonHoverPromptModal from "../shared/ButtonAsideHoverPromtModal/ButtonHoverPromptModal";
import InputLabelGoesDown from "../shared/InputLabelGoesDown";
import ClipLoad from "../shared/Miscellaneous/Loaders/ClipLoad";
import SyncLoad from "../shared/Miscellaneous/Loaders/SyncLoad";
import PreviewImage from "../shared/PreviewImage";
import AddProductCategories from "./AddProductCategories";
import AddProductCharacteristics from "./AddProductCharacteristics";
import {
  ProductCharacteristicsResponse,
  ProductSubCharacteristicsResponse,
} from "./CharacteristicTypes";
import ModalImages from "./ModalImages";
import { ProductTypes } from "../../types/ProductTypes";
import SingleItemPageShowCase from "./ShowCase/SingleItemPageShowCase";

export default function AddProducts() {
  const [submitionStarted, setSubmitionStarted] = useState(false);
  const [loading, setLoading] = useState({
    frontImg: true,
    imgs: true,
    form: true,
    characteristics: true,
  });

  const [currentCategory, setCurrentCategory] = useState("");
  const [subCurrentCategory, setSubCurrentCategory] = useState("");
  const [title, setTitle] = useState("");
  const [brandName, setBrandName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [showImgsModal, setShowImgsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("form");
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [imgsPreview, setImgsPreview] = useState<string[] | ArrayBuffer | null>(
    []
  );

  const [allMainTitles, setAllMainTitles] = useState<string[]>([]);
  const [allSubTitles, setAllSubTitles] = useState<string[][]>([]);
  const [allTexts, setAllTexts] = useState<string[][]>([]);
  const [amountOfMainTitles, setAmountOfMainTitles] = useState(1);
  const [amountOfMainInfoAll, setAmountOfMainInfoAll] = useState<number[]>([1]);

  const canSave = () => {
    return (
      [preview, description, price, brandName, title].every(Boolean) &&
      isNonEmptyMatrix(allTexts) &&
      isNonEmptyMatrix(allSubTitles) &&
      Array.isArray(allMainTitles) &&
      allMainTitles.length > 0 &&
      allMainTitles.every(Boolean) &&
      Array.isArray(imgsPreview) &&
      imgsPreview.length === 3
    );
  };

  console.log(canSave());

  const navigate = useNavigate();

  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      if (submitionStarted) {
        console.log("Submition has been already started");
        return;
      }
      if (typeof preview === "undefined") {
        setSubmitionStarted(false);

        return;
      }
      if (!canSave()) {
        setSubmitionStarted(false);
        console.log(canSave());
        console.log("All fields are required");
        return;
      }

      if (Array.isArray(imgsPreview) && imgsPreview.length !== 3) {
        console.log("All images are required");
        setSubmitionStarted(false);
        return;
      }

      setSubmitionStarted(true);
      const formData = new FormData();

      formData.append("file", preview as string);
      formData.append("upload_preset", "ecommerce");
      formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);

      const frontImg = await fetch(
        "https://api.cloudinary.com/v1_1/dbfyil6fb/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());
      setLoading((prev) => ({
        ...prev,
        frontImg: false,
      }));
      const uploadedImgUrls = [];
      for (const img of imgsPreview as string[]) {
        const formDataImgs = new FormData();
        formDataImgs.append("file", img);
        formDataImgs.append("upload_preset", "ecommerce");
        formDataImgs.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
        const imgResult = await fetch(
          "https://api.cloudinary.com/v1_1/dbfyil6fb/image/upload",
          {
            method: "POST",
            body: formDataImgs,
          }
        ).then((r) => r.json());
        uploadedImgUrls.push(imgResult.secure_url);
      }
      setLoading((prev) => ({
        ...prev,
        imgs: false,
      }));
      const userId = localStorage.getItem("userId");
      const priceToNum = Number(price);
      const res = await axiosPublic.post<ProductTypes>(
        `/products/users/${userId}`,
        {
          title,
          description,
          price: priceToNum,
          brand: brandName,
          imgUrls: uploadedImgUrls,
          category: currentCategory,
          frontImg: frontImg.secure_url,
          subCategory: subCurrentCategory,
        }
      );
      setLoading((prev) => ({
        ...prev,
        form: false,
      }));
      for (let i = 0; i < amountOfMainTitles; i++) {
        const characteristicsMainTitles =
          await axiosPublic.post<ProductCharacteristicsResponse>(
            `/productCharacteristics/products/${res.data._id}`,
            {
              title: allMainTitles[i],
            }
          );

        for (let j = 0; j < amountOfMainInfoAll[i]; j++) {
          const subCharacteristics =
            await axiosPublic.post<ProductSubCharacteristicsResponse>(
              `/productSubCharacteristics/productCharacteristics/${characteristicsMainTitles.data._id}`,
              {
                subTitle: allSubTitles[i][j],
                text: allTexts[i][j],
              }
            );
          console.log("subCharacteristics.data: ", subCharacteristics.data);
        }
      }
      setLoading((prev) => ({
        ...prev,
        characteristics: false,
      }));
      navigate(`/profile/${userId}`);
    } catch (error) {
      setSubmitionStarted(false);
      console.error(error);
    }
  }

  return (
    <>
      <Header
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        showPillsOrNot={false}
      />
      <section
        className={`${
          currentPage === "form" ? "" : "hidden"
        } flex flex-col gap-[1rem] p-[1rem] max-w-[146rem] m-auto relative items-center`}
      >
        <div className="flex w-full items-center gap-[1rem]">
          <button
            disabled={!canSave()}
            onClick={() => setCurrentPage("result")}
            className={` ${
              !canSave() ? "cursor-not-allowed opacity-50" : ""
            } transition-all ml-auto self-end shadow-sm rounded-md p-[1rem] active:scale-[.97] bg-white hover:text-white hover:bg-primary-orange text-gray-700 font-medium`}
          >
            See Results
          </button>
          <ButtonHoverPromptModal
            disabled={!canSave()}
            type="submit"
            form="addProduct"
            contentName="Submit Form"
            positionByAbscissa="right"
            position="relative"
            className={`${
              !canSave() ? "cursor-not-allowed opacity-50" : ""
            } p-[1rem] active:scale-[.97] bg-white hover:text-white hover:bg-primary-orange`}
            variant="rectangleWithShadow"
          >
            <Save />
          </ButtonHoverPromptModal>
        </div>
        <PreviewImage
          divClasses="bg-white max-w-[70rem] w-full rounded-md h-[40rem] shadow-md relative"
          setPreview={setPreview}
          imagePreview={preview}
        >
          <p className="absolute top-[-4rem] text-[2rem] sm:text-[3rem] font-medium text-gray-700">
            Front Image
          </p>
          <SyncLoad
            className="bottom-[1rem] right-[1rem]"
            conditionToLoading={loading.frontImg}
            conditionToStart={submitionStarted}
          />
        </PreviewImage>

        <form
          onSubmit={handleOnSubmit}
          className="max-w-[70rem] w-full h-fit flex flex-col gap-[2rem] mt-[2rem] relative"
          id="addProduct"
        >
          <div className="bg-white w-full rounded-md shadow-md shadow-black px-[1rem] py-[3rem] flex flex-col gap-[2rem] relative">
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
            <AddProductCategories
              currentCategory={currentCategory}
              setCurrentCategory={setCurrentCategory}
              setSubCurrentCategory={setSubCurrentCategory}
              subCurrentCategory={subCurrentCategory}
            />

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
              type="text"
              value={price}
            />

            <ButtonHoverPromptModal
              onClick={() => setShowImgsModal((prev) => !prev)}
              contentName="Upload Images"
              type="button"
              positionByAbscissa="right"
              className="p-[1rem] active:scale-[.97]"
              marginAutoSide="ml-auto"
            >
              <ImagePlus />
            </ButtonHoverPromptModal>
            <ClipLoad
              className={`${
                loading.form
                  ? "top-[.3rem] right-[.1rem]"
                  : "top-[0rem] right-[.1rem]"
              }`}
              conditionToLoading={loading.form}
              conditionToStart={submitionStarted}
            />
            <SyncLoad
              className="bottom-[1rem] left-[1rem]"
              conditionToLoading={loading.imgs}
              conditionToStart={submitionStarted}
            />
          </div>
          <AddProductCharacteristics
            setAllMainTitles={setAllMainTitles}
            setAllSubTitles={setAllSubTitles}
            setAllTexts={setAllTexts}
            setAmountOfMainTitles={setAmountOfMainTitles}
            setAmountOfMainInfoAll={setAmountOfMainInfoAll}
            loading={loading}
            submitionStarted={submitionStarted}
          />
        </form>
        <ModalImages
          setShowImgsModal={setShowImgsModal}
          showImgsModal={showImgsModal}
          setImgsPreview={setImgsPreview}
          imgsPreview={imgsPreview}
        />
      </section>
      <SingleItemPageShowCase
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        preview={preview}
        title={title}
        brand={brandName}
        price={Number(price)}
        imgsPreview={imgsPreview}
        description={description}
        allMainTitles={allMainTitles}
        allSubTitles={allSubTitles}
        allTexts={allTexts}
      />
    </>
  );
}
