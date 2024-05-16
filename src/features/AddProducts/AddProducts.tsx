import { ImagePlus, Save } from "lucide-react";
import { useState } from "react";
import { axiosPublic } from "../../api/axios";
import Header from "../../components/Header/Header";
import { CATEGORIES } from "../../const/PillsCategories";
import ButtonHoverPromptModal from "../shared/ButtonAsideHoverPromtModal/ButtonHoverPromptModal";
import InputLabelGoesDown from "../shared/InputLabelGoesDown";
import PreviewImage from "../shared/PreviewImage";
import ModalImages from "./ModalImages";
import { ProductTypes } from "./ProductTypes";
import { useNavigate } from "react-router-dom";
import AddProductCategories from "./AddProductCategories";

export default function AddProducts() {
  const [currentCategory, setCurrentCategory] = useState(CATEGORIES.All);
  const [subCurrentCategory, setSubCurrentCategory] = useState("");
  const [title, setTitle] = useState("");
  const [brandName, setBrandName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [showImgsModal, setShowImgsModal] = useState(false);

  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [imgsPreview, setImgsPreview] = useState<string[] | ArrayBuffer | null>(
    []
  );
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  const canSave = [preview, description, price, brandName, title].every(
    Boolean
  );

  const navigate = useNavigate();
  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (typeof preview === "undefined") return;
    if (!canSave || !imgsPreview) {
      console.log(canSave);
      console.log("All fields are required");
      return;
    }

    try {
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

      console.log("results", frontImg);

      if (imgsPreview && Array.isArray(imgsPreview)) {
        for (const img of imgsPreview) {
          const formDataImgs = new FormData();
          formDataImgs.append(`file_${img}`, img);
          formData.append("upload_preset", "ecommerce");
          formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
          const imgResult = await fetch(
            "https://api.cloudinary.com/v1_1/dbfyil6fb/image/upload",
            {
              method: "POST",
              body: formData,
            }
          ).then((r) => r.json());
          setImgUrls((prev) => [...prev, imgResult.secure_url]);
          console.log("imgResult", imgResult);
        }
      }

      const userId = localStorage.getItem("userId");
      const priceToNum = Number(price);
      console.log("userId: ", userId);
      console.log("priceToNum: ", priceToNum);
      const res = await axiosPublic.post<ProductTypes>(
        `/products/users/${userId}`,
        {
          title,
          description,
          price: priceToNum,
          brand: brandName,
          imgUrls,
          category: currentCategory,
          frontImg: frontImg.secure_url,
        }
      );
      console.log(res);
      navigate(`/profile/${userId}`);
    } catch (error) {
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
      <section className="flex flex-col gap-[1rem] p-[1rem] max-w-[146rem] m-auto relative items-center">
        <ButtonHoverPromptModal
          type="submit"
          form="addProduct"
          contentName="Submit Form"
          marginAutoSide="ml-auto"
          positionByAbscissa="right"
          position="relative"
          className="p-[1rem] active:scale-[.97] bg-white hover:text-white hover:bg-primary-orange"
          variant="rectangleWithShadow"
        >
          <Save />
        </ButtonHoverPromptModal>
        <PreviewImage
          divClasses="bg-white max-w-[70rem] w-full rounded-md h-[40rem] shadow-md relative"
          setPreview={setPreview}
          imagePreview={preview}
        >
          <p className="absolute top-[-4rem] text-[3rem] font-medium text-gray-700">
            Front Image
          </p>
        </PreviewImage>

        <form
          onSubmit={handleOnSubmit}
          className="bg-white max-w-[70rem] w-full rounded-md h-fit shadow-md shadow-black px-[1rem] py-[3rem] flex flex-col gap-[2rem] mt-[2rem] relative"
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
        </form>
        <ModalImages
          setShowImgsModal={setShowImgsModal}
          showImgsModal={showImgsModal}
          setImgsPreview={setImgsPreview}
          imgsPreview={imgsPreview}
        />
      </section>
    </>
  );
}
